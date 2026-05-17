# UI/UX Design Skill: Yến Sào Tiên Sa MVP

## Purpose

Use this skill when designing or implementing UI/UX for the Yến Sào Tiên Sa demo MVP website.

The goal is to match the brand feeling of the original website at `https://www.yensaotiensa.com/` while improving usability, mobile responsiveness, and the customer ordering flow.

This project is built with **Next.js (App Router) and TypeScript**, styled with **Tailwind CSS v3**.

This project is a demo MVP. Do not implement Zalo, Facebook Messenger, WhatsApp, custom real-time chat, online payment, customer accounts, or admin dashboard unless explicitly requested.

## MVP Scope — What to Include and Exclude

**Include only:**

- Bird-nest food products (Sản phẩm từ yến sào): raw nests, cleaned nests, steamed nests, drinks, gift sets.
- The full ordering flow from landing page to order confirmation.
- About, News, and Contact pages.

**Explicitly exclude:**

- Bird-house equipment (Thiết bị nhà yến).
- Nesting boards and wood supplies (Thanh làm tổ, Gỗ nhà yến).
- Construction consulting services (Tư vấn thi công nhà yến).

The original site mixes two separate business lines. The MVP covers only the food product ordering side.

## Brand Reference

The original website has these recognizable traits:

- Vietnamese bird-nest brand identity.
- White background with vivid dark red accents.
- Gold/amber visual highlights.
- Strong company trust, commitment, and OCOP 4-star certification messaging.
- Product, news, video, and article-heavy content.
- Hotline prominently displayed: 0903.595.688.
- Address: 20–22 Trung Lương 2, Phường Hoà Xuân, Quận Cẩm Lệ, Đà Nẵng.
- Email: infoyensaotiensa@gmail.com.

For this MVP, preserve the brand feeling but simplify the information architecture around bird-nest product ordering.

## Design Direction

Design the MVP as a premium Vietnamese health and gift product website.

The visual tone should be:

- Trustworthy and warm.
- Premium but not overly luxurious.
- Clear, approachable, and product-focused.
- Suitable for customers buying bird-nest for health, family, or gifting.

Avoid generic SaaS styling. Avoid fake social chat buttons. Avoid layouts that feel unrelated to a Vietnamese consumer product brand.

## MVP Navigation

Use simple, flat navigation:

- Trang chủ (Home)
- Giới thiệu (About Us)
- Sản phẩm (Products)
- Tin tức (News)
- Liên hệ (Contact)
- Giỏ hàng / Cart (with item count badge)

Do not copy the original website's large multi-level navigation. The original structure is too broad for the demo ordering journey.

## Core User Flow

Design and code around this primary flow:

`Landing Page → Products → Add to Cart → Cart → Checkout → Packaging Selection → Order Confirmation`

All UI decisions should support this flow.

---

## Color Palette

The original site uses a vivid, saturated dark red — closer to crimson than maroon. The SKILL uses corrected values based on direct observation of the live site.

```ts
// lib/tokens.ts
export const colors = {
  primary:     "#9B1010",  // vivid dark red — primary actions, headings, price
  primaryDark: "#7A0C0C",  // deeper red — footer background, hero accents
  accent:      "#C8922A",  // rich amber gold — badges, dividers, packaging highlights
  accentLight: "#FDF0D5",  // warm cream — gold tint backgrounds
  background:  "#FFFEF9",  // near-white warm — page background
  surface:     "#FFFFFF",  // white — cards and form surfaces
  text:        "#1E1410",  // near-black warm — body text
  muted:       "#6B5B4E",  // warm mid-brown — secondary text, captions
  border:      "#E5D5C0",  // warm cream — card and input borders
  success:     "#2F7D46",  // green — order confirmation, success states
} as const;
```

**Usage rules:**

- `primary` (#9B1010) — primary buttons, active nav links, product headings, price labels.
- `primaryDark` (#7A0C0C) — footer background, hero title, strong brand sections. Also used on `primary` hover states.
- `accent` (#C8922A) — OCOP badge, gold dividers, packaging card highlights, trust markers, secondary decorative accents.
- `accentLight` (#FDF0D5) — selected packaging card background, hero gradient warm end, section tint backgrounds.
- `background` (#FFFEF9) — page-level background. Never use cold gray (#F5F5F5 or similar).
- `text` (#1E1410) — all body copy. Never use pure black (#000000).
- `muted` (#6B5B4E) — descriptions, captions, placeholder text, secondary nav labels.
- `border` (#E5D5C0) — card outlines, input borders, section dividers.

---

## Typography

Load fonts via `next/font/google` in `app/layout.tsx`. Do not use `@import` in CSS.

```ts
// app/layout.tsx
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
})
```

Include `vietnamese` subset in Inter for correct diacritical rendering.

Apply font variables to the root `<html>` element:

```tsx
<html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
```

Then reference in Tailwind config:

```ts
// tailwind.config.ts
fontFamily: {
  heading: ["var(--font-heading)", "Georgia", "serif"],
  body:    ["var(--font-body)", "Arial", "sans-serif"],
},
```

**Usage rules:**

- `font-heading` (Playfair Display) — hero titles, section headings, product names on cards.
- `font-body` (Inter) — all body copy, navigation, buttons, form fields.
- Minimum body font size: 16px. Minimum mobile body: 15px.
- Avoid very thin font weights (300 or below) for important content.

---

## Tailwind Configuration

Full brand token setup for `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red:       "#9B1010",
          darkRed:   "#7A0C0C",
          gold:      "#C8922A",
          lightGold: "#FDF0D5",
          cream:     "#FFFEF9",
          text:      "#1E1410",
          muted:     "#6B5B4E",
          border:    "#E5D5C0",
          success:   "#2F7D46",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body:    ["var(--font-body)", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "1.5rem",   // 24px — product cards, packaging cards
        input: "0.875rem", // 14px — form inputs
      },
      boxShadow: {
        soft:    "0 16px 40px rgba(122, 12, 12, 0.08)",
        card:    "0 4px 24px rgba(122, 12, 12, 0.07)",
        selected:"0 12px 30px rgba(155, 16, 16, 0.14)",
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Project Structure

Use Next.js App Router. All pages are Server Components by default. Add `"use client"` only to components that require interactivity (cart, forms, packaging selector).

```
app/
  layout.tsx                  ← root layout: fonts, Header, Footer, CartProvider
  page.tsx                    ← landing page (Server Component)
  products/
    page.tsx                  ← product listing (Server Component)
    [slug]/
      page.tsx                ← product detail (Server Component)
  cart/
    page.tsx                  ← cart page ("use client")
  checkout/
    page.tsx                  ← checkout form + packaging ("use client")
  confirmation/
    page.tsx                  ← order confirmation (Server Component)
  about/
    page.tsx
  news/
    page.tsx
    [slug]/
      page.tsx
  contact/
    page.tsx

components/
  layout/
    Header.tsx                ← sticky header with mobile nav
    Footer.tsx
    MobileMenu.tsx            ← "use client"
  ui/
    Button.tsx
    Input.tsx
    SectionHeading.tsx
    Badge.tsx
  product/
    ProductCard.tsx
    ProductGrid.tsx
  packaging/
    PackagingOptionCard.tsx   ← "use client"
    PackagingSelector.tsx     ← "use client"
  cart/
    CartItem.tsx              ← "use client"
    CartSummary.tsx
    CartIcon.tsx              ← "use client" (shows count)
  checkout/
    CheckoutForm.tsx          ← "use client"
    OrderSummary.tsx
  news/
    NewsCard.tsx
  contact/
    ContactForm.tsx           ← "use client"

lib/
  tokens.ts                   ← color constants
  cartStore.ts                ← Zustand cart store
  types.ts                    ← shared TypeScript types

data/
  products.ts                 ← demo product data
  packaging.ts                ← packaging options data
  news.ts                     ← demo news articles
  company.ts                  ← brand info, hotline, address

public/
  images/
    products/
    news/
    brand/
```

---

## Cart State Management

Use **Zustand** with `persist` middleware for cart state. This is client-side only.

```ts
// lib/cartStore.ts
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "./types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.product.id !== productId)
            : state.items.map((i) =>
                i.product.id === productId ? { ...i, quantity } : i
              ),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "yensaotiensa-cart" }
  )
)
```

---

## TypeScript Types

```ts
// lib/types.ts

export interface Product {
  id: string
  slug: string
  name: string          // Vietnamese product name
  nameEn?: string       // Optional English name
  description: string
  price: number         // VND
  weight?: string       // e.g. "100g", "50g"
  image: string         // path under /public/images/products/
  category: ProductCategory
  badge?: string        // e.g. "OCOP 4★", "Bán chạy"
  inStock: boolean
}

export type ProductCategory =
  | "to-yen-tho"        // raw bird nest
  | "to-yen-sach"       // cleaned bird nest
  | "yen-chung"         // steamed/ready-to-eat
  | "nuoc-yen"          // bird-nest drink
  | "qua-tang"          // gift set

export interface PackagingOption {
  id: string
  name: string
  description: string
  additionalPrice: number  // 0 for standard
  image?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  category: string
  date: string          // ISO date string
  image: string
}

export interface OrderFormData {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  packagingId: string
  notes?: string
}
```

---

## Layout Rules

Container and section spacing:

```ts
// Use these Tailwind classes consistently
// Container: mx-auto w-full max-w-[1120px] px-4 sm:px-6
// Section: py-16 sm:py-20 (desktop) | py-10 sm:py-12 (tighter sections)
```

General rules:

- Max content width: 1120px, centered.
- Horizontal padding: 16px mobile, 24px tablet and up.
- Use generous vertical whitespace — sections breathe.
- Cards use `rounded-card` (24px) with `shadow-card`.
- Avoid dense content blocks. One idea per section.
- Prioritize mobile layout first, then expand.

---

## Header

The header is a Server Component shell with a `"use client"` mobile menu child.

Desktop: logo left, nav center or right, cart icon right with count badge, optional hotline text.
Mobile: logo left, cart icon, hamburger right — collapsible nav slides down.

```tsx
// Tailwind classes for the header wrapper:
// sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-md border-b border-brand-border
```

Active nav link: `text-brand-red font-semibold`.
Inactive nav link: `text-brand-text hover:text-brand-red transition-colors`.

Do not add Zalo, Messenger, WhatsApp, or fake chat buttons to the header.

---

## Footer

```tsx
// Footer background: bg-brand-darkRed text-brand-cream
// Footer links: text-brand-lightGold hover:text-white
```

Footer sections:

- Left: company logo (inverted/light), short brand tagline, OCOP 4-star mention.
- Center: quick links (Home, Products, About, News, Contact).
- Right: contact info — address, hotline (`tel:` link), email.
- Bottom bar: copyright, policy placeholder links.

Real contact details to use in the demo:

- Address: 20–22 Trung Lương 2, Phường Hoà Xuân, Quận Cẩm Lệ, Đà Nẵng
- Hotline: 0903.595.688 (also 0903.585.688)
- Email: infoyensaotiensa@gmail.com

---

## Buttons

Use a shared `Button` component with variant props:

```tsx
// components/ui/Button.tsx
type ButtonVariant = "primary" | "secondary" | "ghost"

// Primary — bg-brand-red text-white hover:bg-brand-darkRed rounded-full px-6 py-3 font-semibold
// Used for: Add to Cart, Order Now, Checkout, Submit Order

// Secondary — bg-transparent text-brand-red border border-brand-gold hover:bg-brand-lightGold rounded-full px-6 py-3 font-semibold
// Used for: View Products, Learn More, secondary nav actions

// Ghost — text-brand-red underline-offset-2 hover:underline
// Used for: inline text links, Read More
```

Always use `<Link>` from `next/link` for internal navigation, not `<a>` tags.

---

## Images

All images must use `next/image` — never use bare `<img>` tags.

```tsx
import Image from "next/image"

// Product card image:
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  className="aspect-[4/3] object-cover w-full"
/>
```

Add all image domains to `next.config.ts` if using remote URLs.

---

## Landing Page

Recommended sections in order:

1. **Hero** — brand headline, subtext, two CTAs, product/package visual.
2. **Featured products** — 3–4 best-selling products.
3. **Why choose Yến Sào Tiên Sa** — trust points (OCOP 4★, traceability, natural source).
4. **Packaging services preview** — brief teaser of gift packaging options.
5. **News preview** — 2–3 latest articles.
6. **Contact CTA** — hotline banner or contact strip.
7. **Footer.**

Hero:

```tsx
// Hero background — Tailwind inline style or CSS:
// background: radial-gradient(circle at top right, rgba(200,146,42,0.15), transparent 40%),
//             linear-gradient(135deg, #FFFEF9 0%, #FDF0D5 100%)
// Padding: py-20 sm:py-28

// Hero title — font-heading text-5xl sm:text-7xl leading-tight text-brand-darkRed
// Subtext — font-body text-lg text-brand-muted max-w-xl
// CTAs — primary button + secondary button, gap-4, flex-wrap
```

---

## Product UI

Product card structure (Server Component):

```tsx
// ProductCard receives: product: Product
// Card wrapper: bg-surface border border-brand-border rounded-card shadow-card overflow-hidden
// Image: aspect-[4/3] object-cover bg-brand-lightGold (fallback)
// Product name: font-heading text-xl font-bold text-brand-darkRed
// Description: text-sm text-brand-muted line-clamp-2
// Price: font-body text-lg font-extrabold text-brand-red  (format: toLocaleString("vi-VN") + "₫")
// Add to Cart button: primary Button, full width, "use client" wrapper
```

Product grid:

```tsx
// grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
```

Demo product categories and examples:

- `to-yen-tho` — Tổ yến thô nguyên chất (raw whole nests)
- `to-yen-sach` — Tổ yến làm sạch (cleaned and sorted nests)
- `yen-chung` — Yến chưng đường phèn (rock sugar steamed nest)
- `nuoc-yen` — Nước yến đóng chai (bottled bird-nest drink)
- `qua-tang` — Hộp quà yến sào cao cấp (premium gift set)

Price formatting for VND — always use:

```ts
price.toLocaleString("vi-VN") + "₫"
// e.g. 1.200.000₫
```

---

## Packaging UI

Packaging is a key MVP feature. Use selectable cards, not a dropdown.

Packaging options data shape:

```ts
// data/packaging.ts
export const packagingOptions: PackagingOption[] = [
  { id: "standard",  name: "Đóng gói tiêu chuẩn",    description: "Túi giấy thương hiệu", additionalPrice: 0 },
  { id: "premium",   name: "Hộp quà cao cấp",         description: "Hộp cứng in logo, ruy băng", additionalPrice: 50000 },
  { id: "luxury",    name: "Hộp quà sang trọng",      description: "Hộp gỗ khắc tên, túi lụa", additionalPrice: 150000 },
  { id: "gift-card", name: "Thiệp chúc mừng",         description: "In thông điệp cá nhân", additionalPrice: 20000 },
]
```

Packaging card behavior:

- Clicking a card selects it. Only one option selected at a time.
- Selected state: `border-brand-red bg-brand-lightGold shadow-selected`.
- Unselected state: `border-brand-border bg-surface`.
- Show additional price (or "Miễn phí" for 0).
- Selected option appears in the order summary with its price.

```tsx
// PackagingOptionCard is a "use client" component
// Selected indicator: checkmark icon top-right corner in brand-red
```

---

## Cart UI

Each cart item shows:

- Product image (60×60, rounded-lg).
- Product name and weight/variant.
- Unit price.
- Quantity controls (minus, number, plus).
- Line subtotal.
- Remove button (×).

Cart page layout:

```tsx
// Items list left/top, order summary right/bottom
// Empty state: centered message + Link to /products
// Total: font-heading text-2xl font-bold text-brand-red
// Checkout button: primary Button, full width on mobile
```

---

## Checkout UI

`CheckoutForm` is a `"use client"` component.

Desktop layout:

```tsx
// grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8
// Left: form fields + packaging selector
// Right: sticky top-24 order summary
```

Mobile: single column, order summary below the form.

Required form fields:

- Họ và tên (Full name) — required
- Số điện thoại (Phone) — required, Vietnamese format validation
- Email — required
- Địa chỉ giao hàng (Delivery address) — required
- Tỉnh/Thành phố (City/Province) — required
- Hình thức đóng gói (Packaging) — required, use PackagingSelector
- Ghi chú (Notes) — optional textarea

Input component Tailwind classes:

```tsx
// Base: w-full border border-brand-border rounded-input px-4 py-3 bg-surface text-brand-text font-body text-base
// Focus: focus:outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/10
// Error: border-red-400 focus:border-red-500
// Label: text-sm font-semibold text-brand-text mb-1 block
```

Use `react-hook-form` for form state and validation. Use `zod` for schema validation.

```ts
// Minimal checkout schema
import { z } from "zod"

export const checkoutSchema = z.object({
  fullName:    z.string().min(2, "Vui lòng nhập họ tên"),
  phone:       z.string().regex(/^(0|\+84)\d{9,10}$/, "Số điện thoại không hợp lệ"),
  email:       z.string().email("Email không hợp lệ"),
  address:     z.string().min(5, "Vui lòng nhập địa chỉ"),
  city:        z.string().min(1, "Vui lòng chọn tỉnh thành"),
  packagingId: z.string().min(1, "Vui lòng chọn hình thức đóng gói"),
  notes:       z.string().optional(),
})
```

---

## Order Confirmation Page

Show after successful checkout form submission (no real payment in MVP).

Content:

- Success icon (✓) in brand-green.
- Heading: "Đặt hàng thành công!"
- Order reference number (generated client-side, e.g. `YS-${Date.now()}`).
- Summary of ordered items and packaging.
- Contact reminder: "Chúng tôi sẽ liên hệ qua số điện thoại của bạn trong vòng 24 giờ."
- Hotline for urgent queries.
- CTA back to Home or Products.

Clear the cart on this page via `cartStore.clearCart()`.

---

## About Page

Sections:

1. Brand hero — "Tinh hoa đất Việt" tagline, warm cream background.
2. Company story — origin, founding, mission.
3. Quality commitment — the original site has a strong pledge about product ethics and traceability. Reflect this: product codes for source verification, OCOP 4-star certification from Đà Nẵng.
4. Values grid — 3–4 cards: Natural Source / Tự nhiên, Transparency / Minh bạch, Quality / Chất lượng, Community / Cộng đồng.
5. Contact strip.

Use `bg-brand-lightGold` tint backgrounds to separate sections. Headings in `text-brand-darkRed font-heading`.

---

## News Page

News cards include:

- Image (16:9, `object-cover`, `rounded-xl`).
- Category badge (e.g. "Sức khỏe", "Kỹ thuật yến") — `bg-brand-lightGold text-brand-gold text-xs font-semibold px-2 py-1 rounded-full`.
- Title — `font-heading text-lg font-bold text-brand-text`.
- Summary — `text-sm text-brand-muted line-clamp-3`.
- Date — `text-xs text-brand-muted`.
- "Đọc thêm" link — ghost Button or text link.

Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.

Use `next/link` for article links. Article detail page at `/news/[slug]`.

---

## Contact Page

Contact page should never include fake social chat widgets.

Layout: two-column on desktop (form left, info right), single column on mobile.

Contact form fields: Họ tên, Số điện thoại, Email, Nội dung (textarea). Submit with loading state.

Info panel:

- Company full name: CÔNG TY TNHH YẾN SÀO TIÊN SA
- Address: 20–22 Trung Lương 2, Phường Hoà Xuân, Quận Cẩm Lệ, Đà Nẵng
- Hotline: `<a href="tel:0903595688">0903.595.688</a>` and 0903.585.688
- Email: `<a href="mailto:infoyensaotiensa@gmail.com">infoyensaotiensa@gmail.com</a>`
- Website: www.yensaotiensa.com
- Optional: static map embed placeholder (Google Maps iframe or placeholder image).

---

## Section Heading Component

Reusable heading used across all pages:

```tsx
// components/ui/SectionHeading.tsx
// Props: title: string, subtitle?: string, centered?: boolean

// Title: font-heading text-3xl sm:text-4xl font-bold text-brand-darkRed
// Subtitle: font-body text-base text-brand-muted mt-2
// Gold divider line below title: w-16 h-1 bg-brand-gold rounded mt-3 (centered or left)
```

---

## Implementation Priorities

When asked to build UI, implement in this order:

1. Tailwind config and token setup.
2. TypeScript types (`lib/types.ts`).
3. Font setup and root layout.
4. Header and Footer.
5. Reusable UI components: Button, Input, SectionHeading, Badge.
6. Cart store (Zustand).
7. Landing page.
8. Product listing and product card.
9. Cart page.
10. Checkout page with packaging selector and form validation.
11. Order confirmation page.
12. About, News, and Contact pages.
13. Mobile polish and accessibility pass.

---

## Quality Checklist

Before finishing UI work, verify:

- Colors match the original site's vivid dark red / amber gold / warm white identity. The red is `#9B1010`, not a muted maroon.
- No bare `<img>` tags — all images use `next/image`.
- No bare `<a>` tags for internal links — all use `next/link`.
- Interactive components (cart, forms, packaging selector, mobile menu) have `"use client"` directive.
- Navigation is simpler than the original website's multi-level menu.
- The ordering flow is clear end-to-end.
- Packaging selection is visible as cards, not buried in a dropdown.
- No Zalo, Messenger, WhatsApp, or fake chat widgets anywhere.
- Contact page uses a normal form with real company details.
- Product cards show price in Vietnamese VND format (e.g. 1.200.000₫).
- Checkout validates phone numbers in Vietnamese format.
- The website feels Vietnamese, trustworthy, and product-focused.
- Vietnamese text renders correctly — Inter with `vietnamese` subset loaded.
- Mobile layout tested at 375px width — no horizontal overflow.
