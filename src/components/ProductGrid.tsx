import { ProductCard } from "./ProductCard";

// Données de démonstration
const products = [
  {
    id: "1",
    name: "Rhum Agricole AOC Martinique - Cuvée Spéciale",
    price: 45.99,
    originalPrice: 52.99,
    image: "https://images.unsplash.com/photo-1574870111867-089ad02a1b1e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 124,
    seller: "Distillerie Créole",
    isLocal: true,
    discount: 13
  },
  {
    id: "2",
    name: "Panier Artisanal en Bambou - Fait Main",
    price: 28.50,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    seller: "Artisans des Îles",
    isLocal: true
  },
  {
    id: "3",
    name: "Épices Colombo Traditionnel - Mélange Créole",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 256,
    seller: "Saveurs Antillaises",
    isLocal: true
  },
  {
    id: "4",
    name: "Bijoux Créoles - Collier Perles des Îles",
    price: 75.00,
    originalPrice: 95.00,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 67,
    seller: "Bijouterie Tropicale",
    isLocal: true,
    discount: 21
  },
  {
    id: "5",
    name: "Confiture de Coco Antillaise Bio",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1571197119275-71c4a10e1a26?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 143,
    seller: "Délices Tropicaux",
    isLocal: true
  },
  {
    id: "6",
    name: "Sac Madras Authentique - Motifs Traditionnels",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 92,
    seller: "Mode Créole",
    isLocal: true
  },
  {
    id: "7",
    name: "Punch Coco Maison - Bouteille 70cl",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 78,
    seller: "Cocktails des Îles",
    isLocal: true
  },
  {
    id: "8",
    name: "Sculpture Bois d'Acajou - Art Caribéen",
    price: 125.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 45,
    seller: "Artistes Antillais",
    isLocal: true,
    discount: 17
  }
];

export function ProductGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Produits Populaires
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de produits authentiques des Antilles, 
            choisis avec soin par nos artisans et producteurs locaux.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${parseInt(product.id) * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-ocean text-white px-8 py-4 rounded-lg font-semibold hover:shadow-caribbean transition-all duration-300 hover:scale-105">
            Voir Plus de Produits
          </button>
        </div>
      </div>
    </section>
  );
}