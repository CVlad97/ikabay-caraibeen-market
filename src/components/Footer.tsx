import { FileText, MessageCircle, Package, Phone, ShipWheel, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const whatsappHref =
  "https://wa.me/596696905164?text=Bonjour%2C%20je%20souhaite%20recevoir%20la%20liste%20du%20d%C3%A9stockage%20nautique%20Ikabay.";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Source PDF réelle</div>
                <div className="text-sm opacity-80">Inventaire vérifié</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Retrait ou expédition</div>
                <div className="text-sm opacity-80">Selon volume et produit</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">WhatsApp rapide</div>
                <div className="text-sm opacity-80">Message prérempli prêt</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-accent" />
              <div>
                <div className="font-semibold">Top 12 + Top 24</div>
                <div className="text-sm opacity-80">Vente rapide déjà structurée</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IK</span>
              </div>
              <span className="font-bold text-xl">Ikabay Destok 972</span>
            </div>
            <p className="mb-6 opacity-90">
              Démo commerciale orientée déstockage nautique, montée à partir d un PDF réel, avec visuels, références, stock, prix et CTA rapides.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-accent hover:text-accent-foreground">
                Accueil démo
              </Link>
              <Link
                to="/destockage-nautique"
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-accent hover:text-accent-foreground"
              >
                Catalogue
              </Link>
              <Link
                to="/strategies"
                className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-accent hover:text-accent-foreground"
              >
                Stratégies
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Catégories mises en avant</h3>
            <ul className="space-y-3">
              <li><span className="opacity-80">Trappes de visite</span></li>
              <li><span className="opacity-80">Ventilation marine</span></li>
              <li><span className="opacity-80">Feux de navigation</span></li>
              <li><span className="opacity-80">Sécurité marine</span></li>
              <li><span className="opacity-80">Pare-battages</span></li>
              <li><span className="opacity-80">Passe-coques et raccords</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Logique de conversion</h3>
            <ul className="space-y-3">
              <li><span className="opacity-80">Voir la référence</span></li>
              <li><span className="opacity-80">Contrôler le prix PDF</span></li>
              <li><span className="opacity-80">Cliquer WhatsApp</span></li>
              <li><span className="opacity-80">Confirmer la disponibilité</span></li>
              <li><span className="opacity-80">Réserver ou organiser le retrait</span></li>
              <li><span className="opacity-80">Proposer un lot si besoin</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Canal commercial</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ShipWheel className="h-5 w-5 text-accent mt-1" />
                <div>
                  <div className="font-medium">Périmètre de la démo</div>
                  <div className="opacity-80 text-sm">
                    Martinique et Caraibes
                    <br />
                    Déstockage nautique à rotation rapide
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium">+596 696 90 51 64</div>
                  <div className="opacity-80 text-sm">Appel direct si besoin</div>
                </div>
              </div>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-medium">WhatsApp commercial</div>
                  <div className="opacity-80 text-sm">Message prérempli prêt à partir</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm opacity-80 mb-4 md:mb-0">
              © 2026 Ikabay Destok 972. Démo commerciale démontrable sur inventaire réel.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="opacity-80">Source :</span>
              <span className="hover:text-accent transition-colors">Inventaire visuel Destok972.pdf</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
