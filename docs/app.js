const products = [
  {
    id: 1,
    title: 'Meuble rangement bois',
    category: 'occasion',
    price: '65€',
    oldPrice: '95€',
    tag: 'Occasion',
    image: './assets/placeholder.svg'
  },
  {
    id: 2,
    title: 'Lot vaisselle neuve',
    category: 'destockage',
    price: '29€',
    oldPrice: '45€',
    tag: 'Déstockage',
    image: './assets/caribbean_marketplac_f00166a4.jpg'
  },
  {
    id: 3,
    title: 'Équipement nautisme',
    category: 'nautisme',
    price: '120€',
    oldPrice: '160€',
    tag: 'Stock limité',
    image: './assets/caribbean_marketplac_bcfab90e.jpg'
  },
  {
    id: 4,
    title: 'Vente rapide électroménager',
    category: 'bonsplans',
    price: '75€',
    oldPrice: '110€',
    tag: 'Bon plan',
    image: './assets/caribbean_marketplac_97e8d2f1.jpg'
  },
  {
    id: 5,
    title: 'Canapé 3 places',
    category: 'occasion',
    price: '150€',
    oldPrice: '220€',
    tag: 'Occasion',
    image: './assets/placeholder.svg'
  },
  {
    id: 6,
    title: 'Arrivage maison & déco',
    category: 'destockage',
    price: '40€',
    oldPrice: '60€',
    tag: 'Arrivage',
    image: './assets/hero-caribbean.jpg'
  }
];

const grid = document.getElementById('product-grid');
const filters = document.querySelectorAll('.filter');

function render(list) {
  grid.innerHTML = list.map(p => `
    <div class="card product-card" data-category="${p.category}">
      <img src="${p.image}" alt="${p.title}" />
      <div class="product-meta">
        <span>${p.title}</span>
        <span>${p.price}</span>
      </div>
      <div class="muted">${p.oldPrice ? `<s>${p.oldPrice}</s>` : ''}</div>
      <div class="badge">${p.tag}</div>
      <div class="cta" style="margin-top:10px;">
        <a class="btn btn-primary" href="https://wa.me/596696653589" target="_blank" rel="noreferrer">WhatsApp</a>
        <a class="btn btn-outline" href="tel:+596696653589">Appeler</a>
      </div>
    </div>
  `).join('');
}

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    render(f === 'all' ? products : products.filter(p => p.category === f));
  });
});

render(products);
