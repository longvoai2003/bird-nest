# Yến Sào Tiên Sa MVP Website PRD

## 1. Project Overview

Yến Sào Tiên Sa currently has an existing website at `https://www.yensaotiensa.com/`. The current website contains company information, product categories, news, videos, bird-house construction content, equipment content, policies, and contact information.

For this demo MVP, the goal is not to rebuild the full existing website. The goal is to create a focused, modern, user-friendly website that demonstrates how customers can learn about the company, view important pages, add bird-nest products to a cart, choose packaging services, and submit an order.

This MVP will be used as a solution proposal/demo for the company. Because the solution provider does not own the company's Zalo Official Account or Facebook Business Page, the MVP will not include Zalo, Messenger, or external social chat integrations.

## 2. Product Goal

Build a demo MVP website where customers can:

- View the landing page.
- Learn about the company.
- Read news or updates about the company.
- Contact the business through a basic contact form.
- View bird-nest products.
- Add products to an order cart.
- Choose packaging services during checkout.
- Submit an order request.

The MVP should show the business value of a clearer product-ordering experience without requiring a full production e-commerce system.

## 3. Problem Statement

The original website contains many useful sections, but the customer purchase journey is not the main focus. A customer who wants to buy bird-nest products may need a simpler experience that clearly supports product browsing, cart review, checkout, and packaging selection.

The demo MVP should solve this by presenting a streamlined website experience focused on the most important customer actions.

## 4. MVP Scope

### Must Have

- Landing Page
- About Us Page
- News About Us Page
- Contact Page
- Product Listing Page
- Order Cart
- Checkout / Order Submission
- Packaging Service Selection

### Explicitly Out of Scope for Demo MVP

- Zalo integration
- Facebook Messenger integration
- WhatsApp integration
- Custom real-time chat system
- Online payment
- Customer login/register
- Admin dashboard
- Delivery tracking
- Inventory management
- Product reviews
- Discount codes
- Full migration of all old website categories
- Bird-house equipment checkout
- Bird-house construction service checkout

## 5. Target Users

### Primary Users

- Customers who want to buy bird-nest products for personal use.
- Customers who want to buy bird-nest products as gifts.
- New customers who want to learn about Yến Sào Tiên Sa before ordering.
- Returning customers who want a faster ordering experience.

### Secondary Users

- Company staff who receive order requests.
- Company staff who review customer contact submissions.
- Stakeholders evaluating the proposed solution demo.

## 6. Current Website Reference

The current website includes these major areas:

- Homepage
- Company introduction
- Bird-nest products
- Bird-house equipment
- Wood and bird-house accessories
- Bird-house construction and consulting articles
- News and blog posts
- Videos
- Contact information
- Policy pages

For the demo MVP, the recommended focus is bird-nest product ordering. The broader bird-house construction and equipment content can be considered future scope or secondary content.

## 7. Recommended MVP Navigation

The demo MVP should use simple navigation:

- Home
- About Us
- Products
- News
- Contact
- Cart

This keeps the experience focused and avoids overwhelming users with too many categories.

## 8. Functional Requirements

### 8.1 Landing Page

The landing page introduces the company and encourages users to view products or place an order.

Required content:

- Hero section with brand message.
- Short company introduction.
- Featured bird-nest products.
- Product quality or trust section.
- Packaging service highlight.
- News preview.
- Call-to-action buttons.

Primary calls to action:

- `View Products`
- `Order Now`

Acceptance criteria:

- Users can access the landing page from the main URL.
- Users can understand that the website sells bird-nest products.
- Users can navigate to About Us, Products, News, Contact, and Cart.
- Users can start the ordering flow from the landing page.
- The page is usable on desktop and mobile.

### 8.2 About Us Page

The About Us page builds trust by explaining who the company is and why customers should trust the products.

Required content:

- Company background.
- Mission and values.
- Product quality commitment.
- Brand credibility section.
- Reference to Yến Sào Tiên Sa's existing brand identity.

Acceptance criteria:

- Users can access the About Us page from the navigation menu.
- Users can understand the company story.
- Users can understand why the products are trustworthy.
- The page supports the purchase decision.

### 8.3 News About Us Page

The News page presents company updates, articles, and bird-nest knowledge.

Required content:

- List of news items.
- Article title.
- Article summary.
- Publish date.
- Read more action or article detail view.

Recommended article categories for future expansion:

- Company news.
- Bird-nest knowledge.
- Health and nutrition.
- Product updates.
- Certification or company achievements.

Acceptance criteria:

- Users can access the News page from the navigation menu.
- Users can view a list of news items.
- Users can open or read a news item.
- The layout is easy to scan on mobile.

### 8.4 Contact Page

The Contact page allows customers to submit inquiries through a basic contact form.

Required content:

- Contact form.
- Company name.
- Address.
- Hotline or phone number as plain contact information.
- Email address.
- Optional map placeholder.

Required form fields:

- Full name.
- Phone number.
- Email address.
- Message.

Acceptance criteria:

- Users can access the Contact page from the navigation menu.
- Users can submit a contact inquiry.
- Required fields are validated.
- Users receive a success message after submitting the form.
- No Zalo, Messenger, or external chat integration is required.

### 8.5 Product Listing Page

The Product Listing page allows customers to browse available bird-nest products.

Required content:

- Product image.
- Product name.
- Short product description.
- Price.
- Quantity selector or add-to-cart action.
- Add to cart button.

Recommended demo product examples:

- Raw bird nest.
- Cleaned bird nest.
- Rock sugar steamed bird nest.
- Bird-nest drink.
- Bird-nest gift set.

Acceptance criteria:

- Users can view available products.
- Users can see product name, description, and price.
- Users can add a product to the cart.
- Users can navigate from product listing to cart.

### 8.6 Order Cart

The Order Cart allows customers to review selected products before checkout.

Required content:

- Product name.
- Product image, if available.
- Unit price.
- Quantity.
- Subtotal.
- Remove item action.
- Cart total.
- Checkout button.

Acceptance criteria:

- Users can view all selected products.
- Users can update product quantity.
- Users can remove products from the cart.
- Cart total updates correctly.
- Users can proceed to checkout.

### 8.7 Packaging Service Selection

Packaging service selection allows customers to choose how the bird-nest products should be packaged.

Recommended packaging options for the demo:

- Standard packaging.
- Premium gift box.
- Luxury gift box.
- Gift message card.

Packaging option fields:

- Packaging name.
- Packaging description.
- Additional price, if applicable.

Acceptance criteria:

- Users can select a packaging option during checkout.
- Users can see whether the packaging option has an additional price.
- The selected packaging option appears in the order summary.
- The selected packaging option is included in the submitted order.

### 8.8 Checkout / Order Submission

The Checkout page collects customer and delivery details, then submits the order request.

Required checkout fields:

- Full name.
- Phone number.
- Email address.
- Delivery address.
- Packaging option.
- Order notes.

Order summary should include:

- Selected products.
- Product quantities.
- Product subtotal.
- Packaging option.
- Packaging fee, if applicable.
- Estimated total.

Acceptance criteria:

- Users cannot submit checkout without required fields.
- Users can review order details before submission.
- Users can select packaging during checkout.
- Users receive a confirmation message after submitting the order.
- The MVP can simulate order submission without real payment integration.

## 9. Non-Functional Requirements

### 9.1 Usability

- The site should be easy to navigate.
- The cart and checkout flow should be simple.
- Users should not need an account to place an order.
- Primary actions should be visually clear.
- Mobile usability should be prioritized.

### 9.2 Performance

- Pages should load quickly.
- Images should be optimized.
- Cart interactions should feel responsive.
- The MVP should avoid unnecessary heavy scripts.

### 9.3 Responsiveness

The website should work on:

- Desktop.
- Tablet.
- Mobile.

### 9.4 Security

- Form input should be validated.
- Customer information should not be exposed publicly.
- HTTPS should be used in production.
- No payment card information should be collected in the MVP.

### 9.5 Reliability

- Users should receive clear feedback when submitting forms.
- Failed form submissions should show useful error messages.
- Cart data should not disappear unexpectedly during a normal browsing session.

### 9.6 Maintainability

- Product data should be easy to update.
- Packaging options should be easy to change.
- Page content should be organized clearly.
- The MVP should allow future integration with payment, chat, or admin features.

## 10. User Stories

### Landing Page

As a customer, I want to quickly understand what the company sells so that I can decide whether to view products.

As a customer, I want to see a clear order action so that I can start buying easily.

### About Us

As a new customer, I want to learn about the company so that I can trust the brand before ordering.

### News

As a customer, I want to read news or articles so that I can learn more about the company and bird-nest products.

### Contact

As a customer, I want to submit a contact form so that I can ask questions without needing a social chat account.

### Products

As a customer, I want to browse bird-nest products so that I can choose what to buy.

### Cart

As a customer, I want to review my selected products so that I can confirm my order before checkout.

As a customer, I want to update quantities so that I can control how much I buy.

### Packaging

As a customer, I want to choose gift packaging so that I can order bird-nest products as a gift.

### Checkout

As a customer, I want to submit my delivery information so that the company can process my order request.

## 11. MVP User Flow

1. Customer visits the landing page.
2. Customer reads company and product highlights.
3. Customer clicks `View Products` or `Order Now`.
4. Customer browses bird-nest products.
5. Customer adds one or more products to the cart.
6. Customer opens the cart.
7. Customer reviews products and quantities.
8. Customer proceeds to checkout.
9. Customer enters contact and delivery information.
10. Customer selects a packaging option.
11. Customer reviews the order summary.
12. Customer submits the order request.
13. Website displays an order confirmation message.

## 12. Data Requirements

### Product Data

- Product ID.
- SKU.
- Slug.
- Product name.
- Product description.
- Product image.
- Price.
- Unit.
- Category.
- Availability status.
- Source URL for migrated/reference content.
- Sort order.

Recommended PostgreSQL `products` table fields for future backend integration:

- `id` UUID primary key.
- `sku` unique text.
- `slug` unique text.
- `name` text.
- `description` text.
- `price_vnd` integer.
- `image_url` text.
- `badge` text nullable.
- `category` text.
- `unit` text.
- `availability` text, for example `in_stock`, `preorder`, or `out_of_stock`.
- `source_url` text nullable.
- `sort_order` integer.
- `created_at` timestamp.
- `updated_at` timestamp.

### Cart Data

- Product ID.
- Product name.
- Quantity.
- Unit price.
- Subtotal.

### Packaging Data

- Packaging ID.
- Packaging name.
- Packaging description.
- Packaging price.

### Customer Data

- Full name.
- Phone number.
- Email address.
- Delivery address.
- Order notes.

### Order Data

- Order ID.
- Customer information.
- Product list.
- Packaging option.
- Estimated total.
- Order status.
- Created date.

## 13. Demo MVP Success Criteria

The demo MVP is successful if:

- Users can understand the website purpose from the landing page.
- Users can navigate between all Must Have pages.
- Users can browse products.
- Users can add products to the cart.
- Users can update and remove cart items.
- Users can choose packaging during checkout.
- Users can submit a demo order request.
- Users can submit a contact form.
- The website works well on desktop and mobile.
- The solution clearly demonstrates improvement over the original site's ordering experience.

## 14. Future Enhancements

After the demo MVP, the following features can be considered:

- Zalo Official Account integration.
- Facebook Messenger business integration.
- Online payment.
- Admin dashboard.
- Product inventory management.
- Order status tracking.
- Email notifications.
- Customer accounts.
- Product reviews.
- Discount codes.
- Multi-language support.
- Migration of old website articles.
- Bird-house equipment catalog.
- Bird-house construction service inquiry flow.

## 15. Key MVP Recommendation

For the demo, the website should focus on the Must Have customer journey:

`Landing Page -> Products -> Cart -> Checkout -> Packaging Selection -> Order Confirmation`

Contact should be handled through a basic website form instead of Zalo or Messenger, because the demo provider does not own the company's official social business accounts.
