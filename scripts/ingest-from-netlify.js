// Génère index.html + styles.css + products.json (Airtable si dispo) et déploie sur Netlify.
// Logs ultra-clairs + WhatsApp prérempli + échec seulement si déploiement Netlify échoue AVEC creds fournis.
const fs=require('fs'),path=require('path'),axios=require('axios');
const out=p=>path.join(process.cwd(),p), w=(p,c)=>fs.writeFileSync(out(p),c), ex=p=>fs.existsSync(out(p));

const WA=(process.env.WHATSAPP_NUMBER||'+596696000000').replace('+','');
const STRIPE={iphone:process.env.STRIPE_IPHONE||'',scooter:process.env.STRIPE_SCOOTER||'',jewel:process.env.STRIPE_JEWEL||''};
const HAS_NETLIFY = !!(process.env.NETLIFY_AUTH_TOKEN && process.env.NETLIFY_SITE_ID);

const html = () => `<!doctype html><html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>IKABAY - Marketplace Caribéenne | DOM-TOM</title>
<link rel="stylesheet" href="styles.css"></head><body>
<header class="hero"><h1>🏝️ IKABAY</h1><p>Marketplace Caribéenne</p></header>
<section class="offers"><h2>🔥 OFFRES FLASH -50%</h2><div class="grid">
${[
  {k:'iphone',n:'iPhone 15 Pro',old:1200,new:600},
  {k:'scooter',n:'Scooter Électrique 60km',old:800,new:400},
  {k:'jewel',n:'Bijoux Or 18k',old:500,new:250},
].map(o=>`<div class="card"><h3>${o.n}</h3><p><s>${o.old}€</s> <b>${o.new}€</b></p>
<p>
  <a class="btn" href="https://wa.me/${WA}?text=${encodeURIComponent('Bonjour ! Je veux commander ' + o.n + ' à ' + o.new + '€')}" target="_blank">WhatsApp</a>
  ${STRIPE[o.k]?`<a class="btn pay" href="${STRIPE[o.k]}" target="_blank">Payer</a>`:''}
</p></div>`).join('')}
</div></section>
<section><h2>🏪 Produits Locaux & Import</h2><div id="products"></div></section>
<script>
fetch('products.json').then(r=>r.json()).then(list=>{
  document.getElementById('products').innerHTML=list.map(p=>\`<div class="card"><img src="\${p.image}" alt=""><h4>\${p.name}</h4><p>\${p.price}€ • \${p.category} • \${p.origin_type}</p></div>\`).join('');
}).catch(()=>{});
</script></body></html>`;

const css = `body{font-family:system-ui,Arial;background:#f6f7fb;margin:0}
.hero{padding:48px;text-align:center;background:linear-gradient(135deg,#14b8a6,#f97316);color:#fff}
.offers{padding:32px;background:#fff;margin:24px;border-radius:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.card{background:#fff;border:1px solid #eee;border-radius:12px;padding:16px}
.card img{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px}
.btn{display:inline-block;margin-top:8px;margin-right:8px;padding:8px 12px;border-radius:8px;background:#0ea5e9;color:#fff;text-decoration:none}
.btn.pay{background:#10b981}`;

(async()=>{
  try{
    console.log('== IKABAY AGENT ==');
    console.log('WhatsApp:', WA ? 'present' : 'missing');
    console.log('Stripe links:', Object.keys(STRIPE).map(k=>STRIPE[k]?'✓':'-').join(' '));
    console.log('Netlify creds:', HAS_NETLIFY ? 'present' : 'missing');

    if(!ex('index.html')) w('index.html', html());
    if(!ex('styles.css')) w('styles.css', css);

    // Airtable → products.json (tolère nom de table OU ID tblxxxxx)
    let products=null,{AIRTABLE_API_KEY,AIRTABLE_BASE_ID,AIRTABLE_TABLE}=process.env;
    if(AIRTABLE_API_KEY&&AIRTABLE_BASE_ID&&AIRTABLE_TABLE){
      try{
        const url=`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?pageSize=24`;
        console.log('Fetching Airtable:', url.replace(AIRTABLE_BASE_ID,'<base>').replace(encodeURIComponent(AIRTABLE_TABLE),'<table>'));
        const r=await axios.get(url,{headers:{Authorization:`Bearer ${AIRTABLE_API_KEY}`}});
        products=(r.data.records||[]).map(x=>{
          const f=x.fields||{}, s=(f.supplier||'').toString().toLowerCase();
          const origin=['martinique','guadeloupe','guyane','dom','antilles','caribbean','local'].some(k=>s.includes(k))?'local':'import';
          const img=Array.isArray(f.image)?(f.image[0]?.url):f.image;
          return {name:f.name||'Produit',price:+(f.price||0),image:img||'https://via.placeholder.com/400x300?text=IKABAY',category:f.category||'Général',sku:f.sku||x.id,stock:+(f.stock||0),origin_type:origin};
        });
        console.log(`Airtable OK: ${products.length} produits`);
      }catch(e){
        console.warn('Airtable KO → fallback demo.', e?.response?.status || e.message);
      }
    }
    if(!products)products=[
      {name:'Sirop de canne local',price:8,image:'https://via.placeholder.com/400x300?text=Local',category:'Gourmand',sku:'LOC-001',stock:50,origin_type:'local'},
      {name:'Punch coco artisanal',price:14,image:'https://via.placeholder.com/400x300?text=Local',category:'Boisson',sku:'LOC-002',stock:30,origin_type:'local'},
      {name:'Madras premium',price:29,image:'https://via.placeholder.com/400x300?text=Local',category:'Textile',sku:'LOC-003',stock:20,origin_type:'local'},
      {name:'iPhone 15 Pro',price:600,image:'https://via.placeholder.com/400x300?text=iPhone+15',category:'High-Tech',sku:'IMP-IPH15',stock:5,origin_type:'import'},
      {name:'Scooter électrique 60km',price:400,image:'https://via.placeholder.com/400x300?text=Scooter',category:'Mobilité',sku:'IMP-SCOOT',stock:7,origin_type:'import'},
      {name:'Bijoux Or 18k',price:250,image:'https://via.placeholder.com/400x300?text=Or+18k',category:'Luxe',sku:'IMP-GOLD',stock:12,origin_type:'import'}
    ];
    w('products.json',JSON.stringify(products,null,2));

    // Déploiement Netlify
    if(HAS_NETLIFY){
      try{
        console.log('Deploying to Netlify PROD…');
        require('child_process').execSync(
          `npx netlify-cli@17 deploy --dir . --prod --site ${process.env.NETLIFY_SITE_ID}`,
          {stdio:'inherit'}
        );
        console.log('Netlify deploy: OK');
      }catch(e){
        console.error('Netlify deploy FAILED. Vérifie NETLIFY_AUTH_TOKEN (Personal Access Token) et NETLIFY_SITE_ID.');
        throw e; // fait échouer le job si les creds sont là mais déploiement échoue
      }
    }else{
      console.warn('NETLIFY creds absents → pas de déploiement (fichiers générés/commit quand même).');
    }

    // State
    w('AGENT_STATE.json',JSON.stringify({
      ts:new Date().toISOString(),
      products:products.length,
      whatsapp:`+${WA}`,
      stripe:{
        iphone:!!STRIPE.iphone, scooter:!!STRIPE.scooter, jewel:!!STRIPE.jewel
      },
      netlify: HAS_NETLIFY ? 'attempted' : 'skipped'
    },null,2));

    console.log('Done.');
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();
