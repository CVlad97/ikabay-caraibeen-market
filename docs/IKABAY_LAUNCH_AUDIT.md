# IKABAY launch audit — KayGo discipline applied

Date: 2026-04-21
Scope: KayGo (`/root/workspace/projects/Kaygo`), IKABAY current demo (`/root/workspace/projects/ikabay-caraibeen-market`), IKABAY_CARAIBEEN remote metadata/README through GitHub connector.

## Decision

IKABAY must launch first as: **marketplace caribeenne sourcing + livraison DOM, cashflow-first, Martinique-first**.

The current strongest launch slice is the nautical destocking operation because it has real inventory, clear products, prices, stock, WhatsApp CTAs, and a public demo route.

## Comparative audit

| Functionality | KayGo | IKABAY current demo | IKABAY_CARAIBEEN remote | Real/mock/doc | Launch criticality | Recommendation |
|---|---|---|---|---|---|---|
| Clear value proposition | Strong: small parcels France-Martinique | Medium: nautical destocking is clear, broader home still demo-oriented | Too broad: crypto, jobs, SOS, education, marketplace, logistics | KayGo real product discipline; IKABAY mixed | High | Reduce public message to sourcing + destocking + delivery DOM |
| Public homepage | Static MVP and mobile/admin structure | Real Vite home focused on destocking | README promises broad ecosystem | IKABAY current demo real enough for one vertical | High | Keep one launch-facing home, remove broad claims from docs |
| Real catalogue | Not product catalogue; shipments/trips seeded | Nautical top 12/top 24 from PDF source | Claims Airtable/dropshipping | IKABAY nautical real; broader marketplace not proven | High | Launch with curated verticals only, starting nautical |
| Product detail | Not applicable | Supabase `products_new` route exists but depends on live schema/auth | Next app claims marketplace | Partially implemented | Medium | Do not make `/produits/:id` primary until schema/RLS verified |
| Vendors/partners | Users/travelers model defined | No robust public vendor onboarding flow | Claims multi-role sellers | Mostly partial | High | MVP partner intake via WhatsApp/form first |
| Cart/order | KayGo has shipment request and matching model | Supabase shopping cart in `ProductDetail` but not public launch flow | Claims payments/orders | Partial | High | Use WhatsApp reservation/order for launch; defer checkout |
| Auth | KayGo has JWT/auth routes and mobile context | Supabase auth routes in Dashboard/Admin | Claims Supabase auth | Partial | Medium | Keep auth/admin hidden from sales flow until RLS verified |
| Logistics | KayGo has pricing, trips, shipments, proofs | Destocking says retrait/expedition a confirmer | Claims DHL/TTOM/Revolut | Mostly doc | High | State only: retrait local + expedition sur confirmation |
| Payment | KayGo has payments route/schema | No working payment on nautical flow | Claims card/crypto/Revolut | Not launch-ready | High | Manual reservation + payment offline/confirmed first |
| Admin/opérations | KayGo admin has dashboard routes | IKABAY admin exists but schema-dependent | Claims admin 360 | Partial | Medium | Use a lightweight operations checklist before full admin |
| Deployment | KayGo monorepo; not simple static | IKABAY Vite supports Pages via `VITE_BASE_PATH` | Next/Vercel intended | IKABAY current demo easiest to publish | High | Publish current Vite demo first; Next platform later |

## Score by axis

| Axis | Score /10 | Reason |
|---|---:|---|
| Clarity of value | 6 | Destocking is clear; broad Ikabay story is still diffuse |
| Functional coherence | 5 | Public destocking coherent; internal Supabase routes are disconnected from launch flow |
| Technical reliability | 6 | Vite build works; Supabase env was hardcoded and routes rely on unvalidated tables |
| Commercial credibility | 7 | Real PDF inventory, stock and prices make the demo sellable |
| Client journey testability | 7 | WhatsApp reservation path is testable now |
| Deployment capacity | 7 | Static GitHub Pages compatible; backend not required for destocking |
| Rapid monetization | 8 | Nautical stock can be sold immediately through WhatsApp |

## Unproven claims to remove or quarantine

- Native token IKB, mining, DeFi, NFT, staking.
- Automatic DHL/TTOM/Revolut production integrations unless credentials and test transactions are verified.
- Unified tracking, automatic consolidation, AI pricing, real-time marketplace-wide automation.
- SOS geolocation, jobs, news, education modules as launch features.
- 10 000 EUR in 7 days as a product claim.
- Fake or placeholder public URLs/status pages/community links.

## Strict MVP launch scope

### Now

- Public home: Ikabay Destok 972 / sourcing + destocking DOM.
- `/destockage-nautique`: top 12 products from real PDF, top 24 ready if needed.
- Product cards: reference, name, category, stock, price, supplier if available, CTA WhatsApp.
- Manual order/reservation through WhatsApp.
- Retrait Martinique and expedition only on confirmation.
- Simple ops tracking outside app: spreadsheet or issue list.

### Next

- Partner intake form.
- Admin-lite page fed by a controlled table or JSON source.
- Order pipeline statuses: requested, reserved, confirmed, paid, delivered/cancelled.
- Public categories beyond nautical only after real inventory is available.

### Later

- Full marketplace checkout.
- Supabase auth/admin production.
- Payment provider integration.
- Multi-island expansion.
- Rewards/token/crypto only after core orders are working.

## Launch checklist

- Build succeeds with `npm run build`.
- Public route `/destockage-nautique` works on GitHub Pages.
- No public secret hardcoded in source.
- WhatsApp links include product reference and reservation text.
- No price invented beyond source PDF.
- Stock 0 products excluded from first showcase.
- README describes current reality, not future platform claims.
- Every public promise has an operational owner/process.

## Environment variables

| Name | Required for launch demo | Purpose |
|---|---|---|
| `VITE_BASE_PATH` | GitHub Pages only | Repo base path, e.g. `/ikabay-caraibeen-market/` |
| `VITE_SUPABASE_URL` | No for nautical public page; yes for auth/admin | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No for nautical public page; yes for auth/admin | Public anon key |

## Deployment plan

1. Keep current Vite repo as launch demo source of truth.
2. Build: `npm run build`.
3. Publish static output to GitHub Pages.
4. Validate: `/`, `/destockage-nautique`, WhatsApp CTA, mobile layout.
5. If public site fails, rollback to previous GitHub Pages deployment or revert the last commit.

## Immediate engineering tasks

1. Replace generic Lovable README with realistic launch README.
2. Keep Supabase values in env variables instead of hardcoded source.
3. Add this audit as operating document.
4. Validate build.
5. Publish nautic destocking pass only after local/GitHub/public reconciliation.
