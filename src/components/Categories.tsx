import { 
  Utensils, 
  Shirt, 
  Gem, 
  Home, 
  Palette, 
  Coffee,
  Gift,
  Waves
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "gastronomie",
    name: "Gastronomie",
    icon: Utensils,
    color: "bg-gradient-ocean",
    items: "2,500+ produits"
  },
  {
    id: "mode",
    name: "Mode Créole",
    icon: Shirt,
    color: "bg-gradient-sunset",
    items: "1,200+ articles"
  },
  {
    id: "bijoux",
    name: "Bijoux",
    icon: Gem,
    color: "bg-gradient-emerald",
    items: "800+ créations"
  },
  {
    id: "maison",
    name: "Maison & Déco",
    icon: Home,
    color: "bg-gradient-ocean",
    items: "950+ objets"
  },
  {
    id: "artisanat",
    name: "Artisanat",
    icon: Palette,
    color: "bg-gradient-sunset",
    items: "650+ œuvres"
  },
  {
    id: "boissons",
    name: "Rhums & Boissons",
    icon: Coffee,
    color: "bg-gradient-emerald",
    items: "300+ références"
  },
  {
    id: "cadeaux",
    name: "Cadeaux",
    icon: Gift,
    color: "bg-gradient-ocean",
    items: "1,100+ idées"
  },
  {
    id: "loisirs",
    name: "Loisirs Nautiques",
    icon: Waves,
    color: "bg-gradient-sunset",
    items: "450+ activités"
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Explorez nos Catégories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            De la gastronomie créole à l'artisanat traditionnel, 
            découvrez toute la richesse culturelle des Antilles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id}
                className="group hover:shadow-caribbean transition-all duration-300 hover:-translate-y-2 cursor-pointer border-border bg-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className={`mx-auto w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Items Count */}
                  <p className="text-sm text-muted-foreground">
                    {category.items}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Banner */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 text-center text-white shadow-caribbean">
          <h3 className="text-2xl font-bold mb-4">
            🌴 Spécial Artisans Locaux
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Soutenez l'économie locale ! Chaque achat aide nos artisans créoles.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">
            Découvrir nos Artisans
          </button>
        </div>
      </div>
    </section>
  );
}