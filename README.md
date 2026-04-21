# IKABAY — lancement MVP Martinique-first

IKABAY est actuellement resserré autour d'un lancement concret : **déstockage, sourcing et réservation rapide pour la Martinique / DOM**, avec conversion par WhatsApp.

Le périmètre public réellement montrable aujourd'hui est la démo **Ikabay Destok 972 — déstockage nautique** basée sur un inventaire PDF réel.

## Ce qui est réel maintenant

- Page d'accueil orientée démo commerciale.
- Page `/destockage-nautique` avec produits issus de l'inventaire réel.
- Top 12 produits exploitables : stock > 0, prix présent, référence claire.
- Top 24 préparé dans la source de données.
- Messages WhatsApp, Facebook, Instagram et LinkedIn générés par produit.
- CTA de réservation rapide via WhatsApp.
- Build statique compatible GitHub Pages.

## Ce qui n'est pas encore une promesse publique

- Paiement en ligne complet.
- Marketplace multi-vendeurs automatisée.
- Livraison DHL/TTOM branchée en production.
- Token, mining, NFT, DeFi ou récompenses crypto.
- Admin production complet.
- Tracking logistique automatique.

Ces sujets restent en backlog tant que le flux simple `produit -> WhatsApp -> réservation -> confirmation -> retrait/expédition` n'a pas généré de ventes réelles.

## Parcours MVP

1. Le client ouvre la page déstockage.
2. Il identifie une référence, un prix et un stock.
3. Il clique sur WhatsApp / Réserver.
4. Le message contient la référence et la demande de disponibilité.
5. L'opérateur confirme stock, retrait local ou expédition.
6. La vente est suivie manuellement au départ.

## Routes principales

- `/` : façade commerciale Ikabay Destok 972.
- `/destockage-nautique` : catalogue déstockage nautique.
- `/produits/:id` : route Supabase existante, non prioritaire pour le lancement public.
- `/compte` et `/admin` : routes Supabase/auth existantes, à valider avant usage production.

## Variables d'environnement

| Variable | Usage |
|---|---|
| `VITE_BASE_PATH` | Base path GitHub Pages, ex: `/ikabay-caraibeen-market/` |
| `VITE_SUPABASE_URL` | Requis seulement pour routes Supabase/auth/admin |
| `VITE_SUPABASE_ANON_KEY` | Requis seulement pour routes Supabase/auth/admin |

La page publique de déstockage nautique ne dépend pas de Supabase.

## Commandes

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Validation avant publication

- `npm run build` doit passer.
- `/destockage-nautique` doit afficher les produits réels.
- Les CTA WhatsApp doivent ouvrir un message prérempli avec référence produit.
- Aucun produit sans stock/prix/référence ne doit être dans la vitrine principale.
- Les textes doivent rester orientés vente rapide, sans promesse technique non branchée.

## Documents d'exploitation

- `docs/IKABAY_LAUNCH_AUDIT.md` : audit KayGo vs IKABAY et plan MVP.
- `docs/WORKFLOW_ANTI_BLOCAGE.md` : règle local -> GitHub -> Pages -> validation publique.
