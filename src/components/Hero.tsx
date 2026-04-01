import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-caribbean.jpg";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <Badge className="mb-6 bg-accent text-accent-foreground hover:bg-accent-hover inline-flex items-center space-x-2 px-4 py-2 animate-caribbean-pulse">
            <Star className="h-4 w-4" />
            <span>Marketplace Caribéenne #1</span>
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Découvrez les 
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Trésors des Antilles
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Produits locaux authentiques, artisanat creole et saveurs tropicales.
            Une vitrine simple pour tester des ventes en Martinique des cette semaine.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Precommandes Martinique</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Star className="h-5 w-5 text-accent" />
              <span>Selection locale</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Test vendeur rapide</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent-hover text-accent-foreground text-lg px-8 py-6 shadow-glow transition-all duration-300 hover:scale-105"
            >
              <a href="#catalogue">
                Voir les meilleures ventes
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300"
            >
              <a href="#vendeurs">Lancer un test vendeur</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">48h</div>
              <div className="text-sm text-white/80">Mise en ligne test</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">Top 8</div>
              <div className="text-sm text-white/80">Produits a pousser</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">1er lot</div>
              <div className="text-sm text-white/80">Objectif ventes demain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float hidden lg:block" style={{ animationDelay: "1s" }}></div>
    </section>
  );
}
