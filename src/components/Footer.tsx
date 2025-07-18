import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Award
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Paiement Sécurisé</div>
                <div className="text-sm opacity-80">SSL & Crypté</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Livraison DOM-TOM</div>
                <div className="text-sm opacity-80">Rapide & Fiable</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Achat Protégé</div>
                <div className="text-sm opacity-80">Garantie 30j</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Qualité Certifiée</div>
                <div className="text-sm opacity-80">Produits Vérifiés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IK</span>
              </div>
              <span className="font-bold text-xl">Ikabay Caraïbeen</span>
            </div>
            <p className="mb-6 opacity-90">
              La marketplace caribéenne qui connecte les artisans locaux 
              avec le monde entier. Authenticité, qualité et tradition.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Boutique</h3>
            <ul className="space-y-3">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Gastronomie Créole</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Mode & Accessoires</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Artisanat Local</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Bijoux Créoles</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Rhums & Spiritueux</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Épices & Condiments</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Service Client</h3>
            <ul className="space-y-3">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Centre d'Aide</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Devenir Vendeur</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Programme IKB</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Conditions d'Utilisation</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Confidentialité</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <div>
                  <div className="font-medium">Siège Social</div>
                  <div className="opacity-80 text-sm">
                    Fort-de-France, Martinique<br />
                    97200, France
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium">+596 696 XX XX XX</div>
                  <div className="opacity-80 text-sm">Lun-Ven 9h-18h</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium">support@ikabay.com</div>
                  <div className="opacity-80 text-sm">Réponse sous 24h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm opacity-80 mb-4 md:mb-0">
              © 2024 Ikabay Caraïbeen. Tous droits réservés. Made with ❤️ in the Caribbean.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="opacity-80">Langues:</span>
              <a href="#" className="hover:text-accent transition-colors">🇫🇷 Français</a>
              <a href="#" className="hover:text-accent transition-colors">🇬🇧 English</a>
              <a href="#" className="hover:text-accent transition-colors">🏝️ Kreyòl</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}