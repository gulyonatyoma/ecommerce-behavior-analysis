# Kaspi Analytics Lab

Presentation website for a portfolio e-commerce event-log analytics project. The site is built with Next.js App Router, React, Tailwind CSS, Lucide React and Recharts, with RU/KZ language labels and optional Yandex DataLens embedding.

> This is a portfolio / educational analytics project and is not an official Kaspi.kz product.

## What is already reflected on the site

The content is populated with the actual results of the analysis rather than demo placeholders:

- **411,709,736 raw events** and **411,558,649 clean events**.
- **15,632,734 canonical users** and **386,299 products**.
- **6,697,737 purchase-events** and **$2,010,694,217.73 purchase-event value** after the confirmed February purchase deduplication.
- **17 documented data-quality rules**.
- Confirmed February view/cart logging gap, two November purchase gaps, April purchase outage and April general logging disruption.
- **7,037 conflicting real `user_session` values** reconciled transitively: 13,927 raw user IDs → 6,858 canonical users.
- Trusted 1-day user×product funnel with DQ-window exclusions and right-censoring controls.
- User lifecycle / repeat purchase activity, product and user concentration, assortment turnover, brand concentration and price-band analysis.
- April diagnostic case study with explicit distinction between association and causal explanation.

## Core analytical conclusions shown on the site

- Trusted `View→Purchase 1d` rose from **0.890% in Oct** to **2.090% in Mar**, then decreased to **1.823% in Apr**.
- Comparable repeat cohorts are stable: roughly **16–17% D7**, **28–29% D30**, median time to second purchase-day **5 days**.
- Top 10% users by purchase-event value generate **59.84%** of value.
- Top 1% purchased products generate roughly **75–82%** of purchase-event value; previous-month top products continue to generate roughly **71–80%** of next-month value.
- Apple, Samsung and Xiaomi stay top-3 by purchase-event value across all seven months; on Dec–Mar they generate roughly **71–78%** of known-brand value.
- The observed assortment shifts toward lower prices, while products above **$160** still generate roughly **83–85%** of purchase-event value on the comparable Dec–Mar period.

## Metric limitations

The extract does **not** contain `order_id`, `event_id`, `quantity`, checkout or remove-from-cart events. Therefore:

- `purchase` event is not presented as a guaranteed unique order;
- `purchase-event value` is a value proxy, not exact GMV/order revenue;
- exact AOV, units sold and basket size are not claimed;
- the first-observed user×product funnel is diagnostic, not causal;
- event-time category is preserved because product→category mapping is unstable.

## Website features

- RU ⇄ KZ language switching with persistence in `localStorage` (the internal Kazakh locale code remains the standards-compliant `kk`).
- Responsive presentation layout for projectors, laptops and mobile devices.
- Project KPI cards, executive-summary findings and a dedicated Data Quality section.
- Data-quality case study and explicit analytical limitations.
- Yandex DataLens iframe integration with browser fullscreen support.
- Fallback Recharts dashboard populated with real project metrics when DataLens URL is absent.
- Metric glossary with project-specific definitions.
- Actual raw schema and a summary of the main ClickHouse marts.
- Team/workstream cards ready for real names and social links.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## DataLens configuration

For a private dashboard, create an embedding in DataLens and keep the downloaded private key outside the repository:

```bash
NEXT_PUBLIC_DATALENS_SECURE_EMBED=1
DATALENS_EMBED_ID=your-embed-id
DATALENS_PRIVATE_KEY_PATH=D:/secure/private_key.pem
```

The server signs a short-lived PS256 token. The private key is never sent to the browser, and the iframe token is refreshed without resetting dashboard filters.

For a public dashboard, provide its public/embeddable URL instead:

```bash
NEXT_PUBLIC_DATALENS_URL=https://datalens.yandex/your-public-dashboard
NEXT_PUBLIC_GITHUB_URL=https://github.com/gulyonatyoma/ecommerce-behavior-analysis
```

If `NEXT_PUBLIC_DATALENS_URL` is empty, the site displays the bundled project-data mock dashboard.

> Ensure the Yandex DataLens dashboard is configured to allow embedding. Browser/server security headers from the DataLens side control whether an iframe may render.

## Content customization

- RU/KZ copy and project metrics: `data/translations.ts`
- Team social URLs: `data/teamLinks.ts`
- Data Quality section: `components/DataQualitySection.tsx`
- Project mock dashboard: `components/MockDashboard.tsx`
- Methodology / marts: `components/MethodologySection.tsx`
- Global styles: `app/globals.css`
- Theme tokens: `tailwind.config.ts`

## Before publishing

1. Replace `Участник 1–4` / `Қатысушы 1–4` with the real team names in `data/translations.ts`.
2. Replace placeholder Telegram/GitHub/LinkedIn URLs in `data/teamLinks.ts`.
3. Add the real repository URL to `NEXT_PUBLIC_GITHUB_URL`.
4. Add the public DataLens URL to `NEXT_PUBLIC_DATALENS_URL` when the dashboard is ready.
5. Run production checks:

```bash
npm run typecheck
npm run build
```

## Vercel deployment

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the repository into Vercel.
3. Add `NEXT_PUBLIC_DATALENS_URL` and `NEXT_PUBLIC_GITHUB_URL` in Project Settings → Environment Variables.
4. Deploy; Vercel detects Next.js automatically.
