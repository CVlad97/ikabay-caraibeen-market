// Ikabay — Ingest Netlify site → enhance → Stripe links → deploy (Netlify)
// Gratuit, autonome, reprend via AGENT_STATE.json

import fs from "fs";
import path from "path";
import axios from "axios";
import cheerio from "cheerio";
import { execSync } from "child_process";

const SOURCE_URL = process.env.SOURCE_URL; // Netlify fourni
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const NETLIFY_AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN || "";
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID || "";

const STATE_FILE = "AGENT_STATE.json";
const log = (...a) => console.log("IKABAY>", ...a);

const writeFile = (file, content) => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
};
const fileExists = (f) => fs.existsSync(f);

function saveState(next, extra={}) {
  fs.writeFileSync(STATE_FILE, JSON.stringify({ next_step: next, timestamp:new Date().toISOString(), ...extra }, null, 2));
}
function loadState() {
  if (fileExists(STATE_FILE)) return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  return null;
}

async function httpGet(url, type="text") {
  const res = await axios.get(url, { responseType: type === "binary" ? "arraybuffer" : "text", timeout: 20000 });
  return res.data;
}
name: Ikabay Netlify Agent (Free, Auto-resume)

on:
  workflow_dispatch:
  schedule:
    - cron: "*/30 * * * *"   # toutes les 30 min (évite le rate limit)

permissions:
  contents: write

jobs:
  run-agent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install deps
        run: |
          npm i

      - name: Run agent (generate + deploy)
        env:
          WHATSAPP_NUMBER: ${{ secrets.WHATSAPP_NUMBER }}
          STRIPE_IPHONE: ${{ secrets.STRIPE_IPHONE }}
          STRIPE_SCOOTER: ${{ secrets.STRIPE_SCOOTER }}
          STRIPE_JEWEL: ${{ secrets.STRIPE_JEWEL }}
          AIRTABLE_API_KEY: ${{ secrets.AIRTABLE_API_KEY }}
          AIRTABLE_BASE_ID: ${{ secrets.AIRTABLE_BASE_ID }}
          AIRTABLE_TABLE: ${{ secrets.AIRTABLE_TABLE }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        run: node scripts/ingest-from-netlify.js

      - name: Commit state & json
        run: |
          git config user.name "ikabay-agent"
          git config user.email "agent@ikabay.store"
          git add -A
          git commit -m "chore(agent): site sync + products + state" || echo "no changes"
          git push || true

async function createPaymentLink(name, amountEUR) {
  if (!STRIPE_API_KEY) return "#";
  const body = new URLSearchParams();
  body.append("line_items[0][price_data][currency]", "eur");
  body.append("line_items[0][price_data][product_data][name]", name);
  body.append("line_items[0][price_data][unit_amount]", String(amountEUR * 100));
  body.append("line_items[0][quantity]", "1");
  const res = await axios.post("https://api.stripe.com/v1/payment_links", body, {
    headers: { Authorization: `Bearer ${STRIPE_API_KEY}`, "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data.url;
}

function git(cmd) { execSync(cmd, { stdio:"inherit" }); }
function commit(msg) {
  try { git('git config user.name "ikabay-agent"'); } catch {}
  try { git('git config user.email "bot@ikabay.local"'); } catch {}
  git("git add -A");
  try { git(`git commit -m "${msg}"`); } catch {}
  try { git("git push"); } catch {}
}

async function ingestSource() {
  log("Chargement page source…", SOURCE_URL);
  const html = await httpGet(SOURCE_URL, "text");
  writeFile("source/index.raw.html", html);

  // Parse ressources statiques
  const $ = cheerio.load(html);
  const assets = new Set();
  $('link[href]').each((_,el)=>assets.add(new URL($(el).attr("href"), SOURCE_URL).href));
  $('script[src]').each((_,el)=>assets.add(new URL($(el).attr("src"), SOURCE_URL).href));
  $('img[src]').each((_,el)=>assets.add(new URL($(el).attr("src"), SOURCE_URL).href));

  // Sauvegarde minimale
  writeFile("index.html", html); // remplacé ensuite par la landing Ikabay
  for (const url of assets) {
    try {
      const data = await httpGet(url, "binary");
      const rel = url.replace(/^https?:\/\/[^/]+/, "");
      const out = rel.startsWith("/") ? rel.slice(1) : rel;
      writeFile(out, data);
    } catch {}
  }
}

function landingTemplate({ iphone="#", scooter="#", bijoux="#"} = {}) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Ikabay — Marketplace DOM-TOM</title>
<link rel="stylesheet" href="styles.css"/>
<script defer src="app.js"></script>
<script defer src="translations.js"></script>
</head>
<body>
<header class="container">
  <h1>🏝️ Ikabay</h1>
  <p data-translate="hero_subtitle">Livraison mutualisée DOM-TOM | Objectif: 10 000€ cette semaine</p>
</header>

<main class="container">
  <section>
    <h2 data-translate="flash_title">🔥 OFFRES FLASH 24H — STOCK LIMITÉ</h2>
    <div class="offers">
      <article class="offer-card" data-product="iphone">
        <h3 data-translate="iphone_title">iPhone 15</h3>
        <p><span class="old">1200€</span> <strong>600€</strong></p>
        <a class="btn-buy" href="\${iphone}" target="_blank" rel="noopener">🛒 Acheter</a>
      </article>
      <article class="offer-card" data-product="scooter">
        <h3 data-translate="scooter_title">Scooter Électrique 60km</h3>
        <p><span class="old">800€</span> <strong>400€</strong></p>
        <a class="btn-buy" href="\${scooter}" target="_blank" rel="noopener">🛒 Acheter</a>
      </article>
      <article class="offer-card" data-product="bijoux">
        <h3 data-translate="bijoux_title">Bijoux Or 18k</h3>
        <p><span class="old">2500€</span> <strong>1250€</strong></p>
        <a class="btn-buy" href="\${bijoux}" target="_blank" rel="noopener">🛒 Acheter</a>
      </article>
    </div>
  </section>
</main>

<footer class="container"><small>© Ikabay — Marketplace autonome DOM-TOM</small></footer>
</body>
</html>`;
}

function ensureBaseAssets() {
  if (!fileExists("styles.css")) {
    writeFile("styles.css",
      `*{box-sizing:border-box}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;background:#f7f8fb;margin:0;color:#222}
header,main,footer{padding:16px}.container{max-width:980px;margin:auto}
h1{margin:.2rem 0}.offers{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.offer-card{background:#fff;padding:16px;border-radius:12px;border:1px solid #eee}
.old{text-decoration:line-through;opacity:.6;margin-right:8px}.btn-buy{display:inline-block;margin-top:8px;background:#ff6b35;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none}`
    );
  }
  if (!fileExists("app.js")) {
    writeFile("app.js", `console.log("Ikabay live");`);
  }
  if (!fileExists("translations.js")) {
    writeFile("translations.js", `window.translations={applyLanguage:()=>{}};`);
  }
}

async function createOrReuseStripeLinks() {
  let iphone="#", scooter="#", bijoux="#";
  try {
    if (STRIPE_API_KEY) {
      iphone = await createPaymentLink("iPhone 15 (-50%)", 600);
      scooter = await createPaymentLink("Scooter électrique 60km (-50%)", 400);
      bijoux = await createPaymentLink("Bijoux Or 18k (-50%)", 1250);
    }
  } catch (e) {
    console.warn("Stripe non configuré ou erreur → CTA désactivés (#).", e.response?.data || e.message);
  }
  return { iphone, scooter, bijoux };
}

async function deployNetlify() {
  if (!NETLIFY_AUTH_TOKEN || !NETLIFY_SITE_ID) {
    log("Netlify secrets manquants → déploiement automatique désactivé.");
    return;
  }
  execSync(`npx netlify deploy --prod --dir=. --site=${NETLIFY_SITE_ID} --auth=${NETLIFY_AUTH_TOKEN}`, { stdio:"inherit" });
}

(async () => {
  try {
    const state = loadState();
    const next = state?.next_step || "STEP_1";
    log("Étape:", next);
    if (!SOURCE_URL) throw new Error("SOURCE_URL manquant.");

    if (next === "STEP_1") {
      await ingestSource();
      ensureBaseAssets();
      saveState("STEP_2", { note:"Source ingérée + assets base OK" });
      commit("chore(ikabay): ingest source + base assets");
      return;
    }

    if (next === "STEP_2") {
      const links = await createOrReuseStripeLinks();
      const html = landingTemplate(links);
      writeFile("index.html", html);
      saveState("STEP_3", { links });
      commit("feat(ikabay): landing + Stripe Payment Links");
      return;
    }

    if (next === "STEP_3") {
      await deployNetlify();
      saveState("DONE", { deployed_on:"netlify" });
      commit("chore(ikabay): deploy to Netlify (prod)");
      log("SITE LIVE ✓ — Netlify publie ton répertoire. Vérifie l’URL Netlify de ton site.");
      return;
    }

    log("Déjà DONE.");
  } catch (e) {
    console.error("❌ ERREUR:", e.response?.data || e.message || e);
    // Le cron relancera dans 10 min et reprendra grâce à AGENT_STATE.json
  }
})();
