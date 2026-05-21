# Backend And Docker Technical Design

## 1. Purpose

This document describes the recommended backend and local hosting design for the Yến Sào Tiên Sa MVP website.

The goal is to add real backend services for order submission and contact requests while keeping the project simple enough to run locally on a laptop with Docker Compose.

The design supports:

- Bun as the project package manager/runtime.
- Next.js App Router for frontend pages and backend API routes.
- PostgreSQL as the default local database.
- Docker Compose for local development and laptop hosting.
- A future path to Vercel deployment without rewriting the API layer.

## 2. Recommended Strategy

Use a single full-stack Next.js application with backend services implemented through App Router API route handlers.

The local environment should be containerized with Docker Compose:

- `app`: Bun + Next.js application.
- `postgres`: PostgreSQL database.
- `adminer`: optional local database UI.

This avoids running a separate Express/Nest backend for the MVP while still giving the project real backend behavior and persistent order storage.

## 3. High-Level Architecture

```mermaid
flowchart TD
    User[Customer Browser] --> Web[Next.js Frontend Pages]
    Web --> Cart[Client Cart State]
    Web --> OrdersApi[POST /api/orders]
    Web --> ContactApi[POST /api/contact]

    OrdersApi --> OrderValidation[Order Validation]
    OrdersApi --> OrderService[Order Service]
    OrderService --> CatalogData[Trusted Product And Packaging Data]
    OrderService --> OrderRepo[Order Repository]
    OrderRepo --> Postgres[(PostgreSQL)]

    ContactApi --> ContactValidation[Contact Validation]
    ContactApi --> ContactService[Contact Service]
    ContactService --> ContactRepo[Contact Repository]
    ContactRepo --> Postgres
```

## 4. Runtime Architecture

```mermaid
flowchart LR
    subgraph Laptop[Local Laptop]
        subgraph Compose[Docker Compose]
            App[app\nBun + Next.js\nPort 3000]
            Db[(postgres\nPostgreSQL 16\nPort 5432)]
            Adminer[adminer\nDB UI\nPort 8080]
        end
    end

    Browser[Browser] -->|http://localhost:3000| App
    App -->|DATABASE_URL| Db
    Browser -->|http://localhost:8080| Adminer
    Adminer --> Db
```

## 5. Why This Design

This design is recommended because the PRD requires a lightweight MVP ordering flow, not a full production e-commerce backend.

Benefits:

- Keeps frontend and backend in one deployable app.
- Works well with the existing Next.js App Router structure.
- Uses PostgreSQL for real persistence.
- Uses Docker Compose for reproducible laptop hosting.
- Keeps Bun as the package manager/runtime.
- Avoids unnecessary backend service complexity.
- Can later support Vercel by keeping API routes inside the Next.js app.

## 6. Backend Scope

The initial backend should support:

- Order request submission.
- Contact request submission.
- Server-side input validation.
- Server-side order total calculation.
- PostgreSQL persistence.
- Safe success/error responses to the frontend.

The backend should not support yet:

- Online payment.
- Customer login/register.
- Admin dashboard.
- Inventory management.
- Delivery tracking.
- Product reviews.
- Discount codes.
- Zalo, Messenger, WhatsApp, or custom chat integration.

These exclusions match the MVP PRD scope.

## 7. Proposed File Structure

```txt
app/
  about/
    page.tsx
  api/
    contact/
      route.ts
    orders/
      route.ts
  cart/
    page.tsx
  checkout/
    page.tsx
  contact/
    page.tsx
  news/
    [slug]/
      page.tsx
    page.tsx
  order-success/
    page.tsx
  products/
    page.tsx
  globals.css
  home.css
  layout.tsx
  page.tsx
  pages.css

components/
  ui/
    button.tsx
    footer.tsx
    header.tsx
    section-heading.tsx
  button.css
  cards.css
  cart.css
  layout.css
  shared.css

features/
  cart/
    context/
      cart-context.tsx
  catalog/
    components/
      product-card.tsx
  checkout/
    components/
      order-summary.tsx
  news/
    components/
      news-card.tsx

server/
  catalog/
    packaging.ts
    products.ts
  content/
    news.ts
  db/
    client.ts
  repositories/
    contact.ts
    orders.ts
  services/
    contact.ts
    orders.ts
  validation/
    common.ts
    contact.ts
    orders.ts

shared/
  catalog/
    packaging.ts
    products.ts
  config/
    company.ts
  utils/
    currency.ts

db/
  init/

Dockerfile
docker-compose.yml
.dockerignore
.env.example
```

## 8. Backend Responsibility Split

```mermaid
flowchart TD
    Route[API Route Handler] --> Validate[Validation Schema]
    Route --> Service[Service Layer]
    Service --> BusinessRules[Business Rules]
    BusinessRules --> Catalog[Product And Packaging Catalog]
    Service --> Repository[Repository Layer]
    Repository --> DbClient[Database Client]
    DbClient --> Database[(PostgreSQL)]
```

Responsibilities:

- API routes handle HTTP request parsing and response formatting.
- Validation schemas validate unsafe client input.
- Services apply business rules and calculate totals.
- Repositories read and write PostgreSQL data.
- `server/db/client.ts` owns the PostgreSQL connection client.

## 9. API Design

### 9.1 Create Order

Endpoint:

```txt
POST /api/orders
```

Request body:

```ts
{
  customer: {
    fullName: string;
    phone: string;
    email: string;
    deliveryAddress: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  packagingId: string;
  notes?: string;
}
```

Success response:

```ts
{
  orderId: string;
  status: "received";
  subtotalVnd: number;
  packagingFeeVnd: number;
  estimatedTotalVnd: number;
}
```

Error response:

```ts
{
  error: string;
  issues?: Array<{
    path: string;
    message: string;
  }>;
}
```

### 9.2 Create Contact Request

Endpoint:

```txt
POST /api/contact
```

Request body:

```ts
{
  fullName: string;
  phone: string;
  email: string;
  message: string;
}
```

Success response:

```ts
{
  contactId: string;
  status: "received";
}
```

Error response:

```ts
{
  error: string;
  issues?: Array<{
    path: string;
    message: string;
  }>;
}
```

## 10. Order Submission Flow

```mermaid
sequenceDiagram
    participant Customer
    participant CheckoutPage
    participant OrdersApi as /api/orders
    participant OrderService
    participant Catalog as Product/Packaging Data
    participant Postgres

    Customer->>CheckoutPage: Fill checkout form
    CheckoutPage->>OrdersApi: POST order payload
    OrdersApi->>OrdersApi: Validate request body
    OrdersApi->>OrderService: createOrder(payload)
    OrderService->>Catalog: Load trusted products and packaging
    OrderService->>OrderService: Recalculate subtotal and total
    OrderService->>Postgres: Insert order
    OrderService->>Postgres: Insert order items
    Postgres-->>OrderService: Saved order ID
    OrderService-->>OrdersApi: Order confirmation
    OrdersApi-->>CheckoutPage: Success response
    CheckoutPage->>CheckoutPage: Clear cart
    CheckoutPage-->>Customer: Redirect to order success page
```

Important rule:

The backend must not trust prices, product names, packaging names, or totals from the browser. The browser should only send product IDs, quantities, customer details, packaging ID, and notes.

## 11. Contact Submission Flow

```mermaid
sequenceDiagram
    participant Customer
    participant ContactPage
    participant ContactApi as /api/contact
    participant ContactService
    participant Postgres

    Customer->>ContactPage: Fill contact form
    ContactPage->>ContactApi: POST contact payload
    ContactApi->>ContactApi: Validate request body
    ContactApi->>ContactService: createContactRequest(payload)
    ContactService->>Postgres: Insert contact request
    Postgres-->>ContactService: Saved contact ID
    ContactService-->>ContactApi: Contact confirmation
    ContactApi-->>ContactPage: Success response
    ContactPage-->>Customer: Show success message
```

## 12. Database Design

Use PostgreSQL as the default persistence layer.

### 12.1 Entity Relationship Diagram

```mermaid
erDiagram
    ORDERS ||--o{ ORDER_ITEMS : contains

    ORDERS {
        uuid id PK
        text customer_name
        text customer_phone
        text customer_email
        text delivery_address
        text packaging_id
        text packaging_name
        integer packaging_fee_vnd
        integer subtotal_vnd
        integer estimated_total_vnd
        text notes
        text status
        timestamptz created_at
        timestamptz updated_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        text product_id
        text sku
        text product_name
        text unit
        integer unit_price_vnd
        integer quantity
        integer subtotal_vnd
        timestamptz created_at
    }

    CONTACT_REQUESTS {
        uuid id PK
        text full_name
        text phone
        text email
        text message
        text status
        timestamptz created_at
    }
```

### 12.2 Initial SQL Schema

```sql
create extension if not exists pgcrypto;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  delivery_address text not null,
  packaging_id text not null,
  packaging_name text not null,
  packaging_fee_vnd integer not null,
  subtotal_vnd integer not null,
  estimated_total_vnd integer not null,
  notes text,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null,
  sku text not null,
  product_name text not null,
  unit text not null,
  unit_price_vnd integer not null,
  quantity integer not null,
  subtotal_vnd integer not null,
  created_at timestamptz not null default now()
);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  message text not null,
  status text not null default 'received',
  created_at timestamptz not null default now()
);
```

## 13. Catalog And Content Data Strategy

Product, packaging, and editorial content should stay in code for the MVP:

```txt
shared/catalog/products.ts
shared/catalog/packaging.ts
server/content/news.ts
```

Server-side order processing should continue to import catalog data through `server/catalog/*` so the backend keeps a clear ownership boundary even when the underlying source remains shared code.

Editorial content can live under `server/content/*` because pages are server-rendered by default in the App Router. That keeps content imports out of generic shared modules and makes a later migration to database-backed content more direct.

Reason:

- Admin dashboard is out of scope.
- Inventory management is out of scope.
- Products only need to be easy to update for the demo.
- Keeping products in code reduces database CRUD complexity.

Recommended evolution path:

```mermaid
flowchart LR
    Phase1[Phase 1\nCatalog and news in TypeScript] --> Phase2[Phase 2\nCatalog tables in PostgreSQL]
    Phase2 --> Phase3[Phase 3\nContent tables in PostgreSQL]
    Phase3 --> Phase4[Phase 4\nAdmin editing tools]
    Phase4 --> Phase5[Phase 5\nInventory and publishing workflows]
```

Suggested migration plan:

- Phase 1: keep `shared/catalog/*` and `server/content/*` as code-owned seed data.
- Phase 2: move product and packaging records into PostgreSQL first, because order creation already depends on trusted catalog data.
- Phase 3: move news articles into PostgreSQL only when you need non-developer editing, drafts, or publishing workflows.
- Phase 4: add admin write paths after read paths and data migration are stable.

Recommended PostgreSQL design for catalogs:

```txt
products
product_images
packaging_options
```

Recommended PostgreSQL design for editorial content:

```txt
news_articles
news_article_blocks
news_categories
```

Recommended table responsibilities:

- `products`: core product identity, pricing, availability, and display metadata.
- `product_images`: optional support for multiple images per product.
- `packaging_options`: selectable packaging choices and fees.
- `news_articles`: slug, title, summary, hero image, publish date, status.
- `news_article_blocks`: ordered paragraph or rich-content blocks for article body content.
- `news_categories`: reusable article categories instead of free-text labels.

For this MVP, I would not move news content into PostgreSQL yet. Catalog data is the stronger candidate because it is already server-trusted business data in the order flow.

## 14. Validation Strategy

Use `zod` for request validation.

Recommended dependencies:

```bash
bun add zod postgres
```

Order validation rules:

- `fullName`: required, minimum 2 characters.
- `phone`: required, basic phone format.
- `email`: required, valid email.
- `deliveryAddress`: required, minimum 8 characters.
- `items`: required, at least one item.
- `productId`: required and must match an existing product.
- `quantity`: integer, minimum 1, maximum 99.
- `packagingId`: required and must match an existing packaging option.
- `notes`: optional, maximum length limit.

Contact validation rules:

- `fullName`: required, minimum 2 characters.
- `phone`: required, basic phone format.
- `email`: required, valid email.
- `message`: required, minimum 10 characters.

## 15. Docker Design

### 15.1 Docker Compose Services

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://birdnest:birdnest@postgres:5432/birdnest
    depends_on:
      - postgres
    volumes:
      - .:/app
      - /app/node_modules

  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: birdnest
      POSTGRES_PASSWORD: birdnest
      POSTGRES_DB: birdnest
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d

  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### 15.2 Dockerfile

```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
```

### 15.3 Environment Variables

`.env.example` should include:

```env
DATABASE_URL=postgres://birdnest:birdnest@localhost:5432/birdnest
POSTGRES_USER=birdnest
POSTGRES_PASSWORD=birdnest
POSTGRES_DB=birdnest
```

Inside Docker Compose, the app should use the internal service hostname:

```env
DATABASE_URL=postgres://birdnest:birdnest@postgres:5432/birdnest
```

## 16. Local Development Workflow

Run the full stack in Docker:

```bash
docker compose up --build
```

Open the app:

```txt
http://localhost:3000
```

Open Adminer:

```txt
http://localhost:8080
```

Alternative workflow: run only PostgreSQL in Docker and run the app directly with Bun.

```bash
docker compose up postgres adminer
bun install
bun run dev
```

## 17. Frontend Integration Plan

Update `app/checkout/page.tsx`:

- Collect checkout form values.
- Send a `POST /api/orders` request.
- Show loading state while submitting.
- Show validation or server errors.
- Clear cart only after successful backend response.
- Redirect to `/order-success?orderId=<id>`.

Update `app/order-success/page.tsx`:

- Read optional `orderId` from search params.
- Show the order confirmation reference.

Update `app/contact/page.tsx`:

- Send a `POST /api/contact` request.
- Show loading state while submitting.
- Show validation or server errors.
- Show success message only after API success.

## 18. Security Considerations

MVP requirements:

- Validate every API payload server-side.
- Recalculate all prices and totals server-side.
- Do not expose customer data publicly.
- Do not collect card or payment data.
- Return safe error messages to the browser.
- Log detailed server errors only on the server.
- Use HTTPS when deployed outside the laptop/local network.

Future improvements:

- Rate limiting for `/api/orders` and `/api/contact`.
- CAPTCHA for the contact form.
- Email notifications for new orders.
- Admin authentication.
- Order status management.
- Audit logs for order changes.

## 19. Future Vercel Compatibility

This design is primarily for Docker-based laptop hosting, but it remains compatible with a future Vercel deployment because the backend uses Next.js API routes.

Future Vercel changes would likely include:

- Replace local PostgreSQL with Neon, Supabase, or Vercel Postgres.
- Set `DATABASE_URL` in Vercel environment variables.
- Keep `/api/orders` and `/api/contact` route handlers unchanged or minimally changed.
- Keep product and packaging data in code until an admin system is needed.

## 20. Implementation Phases

```mermaid
flowchart TD
    P1[Phase 1\nTechnical Design Document] --> P2[Phase 2\nBackend API Foundation]
    P2 --> P3[Phase 3\nPostgreSQL Schema And Docker]
    P3 --> P4[Phase 4\nFrontend API Integration]
    P4 --> P5[Phase 5\nVerification And Local Hosting]
```

### Phase 1: Technical Design Document

- Create this document.
- Confirm Docker, PostgreSQL, and backend direction.

### Phase 2: Backend API Foundation

- Add `zod` and `postgres` dependencies.
- Add `server/db/client.ts`.
- Add validation schemas.
- Add order and contact services.
- Add order and contact repositories.
- Add `/api/orders` route.
- Add `/api/contact` route.

### Phase 3: PostgreSQL Schema And Docker

- Add `db/init/001_init.sql`.
- Add `Dockerfile`.
- Add `docker-compose.yml`.
- Add `.dockerignore`.
- Add `.env.example`.

### Phase 4: Frontend API Integration

- Update checkout page to submit real order requests.
- Update contact page to submit real contact requests.
- Update success page to show order reference.
- Move client feature code under `features/*` and generic UI under `components/ui/*`.
- Keep shared catalog and company config outside `app/*` route files.
- Keep editorial content behind `server/content/*` imports.

### Phase 5: Verification And Local Hosting

- Run lint checks.
- Run production build.
- Run Docker Compose.
- Submit a test order.
- Submit a test contact request.
- Verify database rows through Adminer or `psql`.

## 21. Verification Checklist

Technical verification:

- `bun install` succeeds.
- `bun run lint` succeeds.
- `bun run build` succeeds.
- `docker compose up --build` starts the app and database.
- App is available at `http://localhost:3000`.
- Adminer is available at `http://localhost:8080`.

Functional verification:

- User can add products to cart.
- User can update cart quantities.
- User can submit checkout with valid details.
- Backend rejects invalid checkout payloads.
- Order row is created in PostgreSQL.
- Order item rows are created in PostgreSQL.
- User can submit contact request.
- Contact row is created in PostgreSQL.
- Cart clears only after successful order submission.

## 22. Recommended Next Step

After this document is approved, implement Phase 2 and Phase 3 together. That will create the backend API routes, database schema, and Docker Compose environment needed to run the full MVP locally.
