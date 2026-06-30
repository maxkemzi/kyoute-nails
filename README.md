# Kyoute Nails

A headless e-commerce storefront for a press-on nails brand, built with Next.js and the Shopify Storefront API. Live at [kyoutenails.com](https://kyoutenails.com).

## Overview

Kyoute Nails is a fully custom storefront built on top of Shopify's headless commerce platform. Instead of using Shopify's theme editor, the entire frontend — product pages, cart, checkout flow, reviews, and content — is built from scratch in Next.js, with Shopify acting purely as the commerce backend via its Storefront GraphQL API.

The project was built to combine real e-commerce engineering challenges (cart state management, third-party API resilience, internationalization, caching) with an actual business use case for a nail artist offering custom press-on nails.

## Features

- **Headless Shopify integration** — products, variants, pricing, and checkout via the Storefront GraphQL API
- **Custom cart system** — optimistic UI updates, abort-controller-based request cancellation to prevent race conditions, temporary skeleton line items while items are being added
- **Product variants** — size and shape selectors backed by Shopify product options, with variant-specific pricing and images
- **Customer reviews** — Judge.me integration with verified-purchase badges, photo uploads, and star ratings
- **Internationalization** — English and Russian support via next-intl, with locale-aware Shopify queries
- **Resilient API layer** — shared retry logic (`withRetry` / `fetchWithRetry`) for transient network errors and 502/503/504 responses across both Shopify and Judge.me
- **Caching strategy** — `unstable_cache` with tag-based revalidation, triggered via a secured `/api/revalidate` endpoint
- **Image lightbox & sliders** — custom-built lightbox, product image carousel, and certificate gallery using Embla Carousel
- **Accessible UI components** — custom dropdown, select, accordion, and toast components built from scratch with keyboard navigation and ARIA support
- **Contact form** — Server Actions with Zod validation and email delivery via Nodemailer
- **SEO** — dynamic metadata, Open Graph and Twitter card support per page
- **Legal pages** — shipping, refund, terms, and privacy policy pages

## Tech Stack

**Frontend**

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [next-intl](https://next-intl-docs.vercel.app/) — internationalization
- [Embla Carousel](https://www.embla-carousel.com/) — sliders and carousels

**Commerce & Data**

- [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL)
- [Judge.me](https://judge.me/) — product reviews

**Validation & Forms**

- [Zod](https://zod.dev/)
- Next.js Server Actions

**Testing**

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

**Infrastructure**

- Docker & Docker Compose
- Nginx (reverse proxy)
- AWS Lightsail
- Let's Encrypt (SSL)

## Architecture Highlights

**Optimistic cart updates** — cart mutations update the UI immediately while the request is in flight. Each line item tracks its own abort controller, so rapid successive updates (e.g. quickly clicking the quantity stepper) cancel stale in-flight requests instead of producing flickering or incorrect totals.

**Retry logic** — a shared `lib/retry.ts` module wraps fetch calls with configurable retries, distinguishing between retryable network errors (timeouts, aborts, conflicts) and retryable HTTP status codes (502/503/504), used consistently across both the Shopify and Judge.me integrations.

**Caching** — product and review data is cached with `unstable_cache` using tags (`products`, `reviews`), revalidated on demand via a secret-protected API route rather than relying solely on time-based revalidation. Cart operations are never cached.

## Getting Started

### Prerequisites

- Node.js 20+
- A Shopify store with the Storefront API enabled
- A Judge.me account (optional, falls back gracefully if unavailable)

### Installation

```bash
git clone https://github.com/maxkemzi/kyoute-nails.git
cd kyoute-nails
npm install
```

### Environment Variables

Create a `.env.local` file:

```bash
SHOPIFY_STORE_DOMAIN=shopify_store_domain
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shopify_storefront_access_token
SMTP_HOST=smtp_host
SMTP_PORT=smtp_port
SMTP_USER=smtp_user
SMTP_PASSWORD=smtp_password
CONTACT_EMAIL=contact_email
JUDGEME_PRIVATE_API_TOKEN=judgme_api_token
REVALIDATE_SECRET=revalidate_secret
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Run tests

```bash
npm test
```

## Deployment

The project is deployed via Docker Compose alongside other projects on a single AWS Lightsail instance, behind Nginx. SSL is handled via Let's Encrypt with automatic renewal.

```bash
docker compose up -d --build
```

## Project Status

This is an active demo project for a real nail artist business, built as part of my portfolio. It's fully functional end-to-end (browsing, cart, checkout via Shopify) and could be launched as a live store.

## Author

**Maksym Kyrychenko**
Full Stack Developer based in Riga, Latvia
[Portfolio](https://maxkemzi.com) · [GitHub](https://github.com/maxkemzi)
