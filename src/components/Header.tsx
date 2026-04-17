import { ArrowRight, FileText, Menu, MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const whatsappHref =
  "https://wa.me/596696905164?text=Bonjour%2C%20je%20souhaite%20recevoir%20la%20liste%20du%20d%C3%A9stockage%20nautique%20Ikabay.";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-ocean">
                <span className="text-white font-bold text-sm">IK</span>
              </div>
              <div>
                <p className="bg-gradient-hero bg-clip-text text-lg font-bold text-transparent md:text-xl">
                  Ikabay Destok 972
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Martinique / Caraibes
                </p>
              </div>
            </Link>
            <Badge className="hidden bg-accent text-accent-foreground lg:inline-flex">
              PDF reel
            </Badge>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            <Link
              to="/"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
            >
              Accueil demo
            </Link>
            <Link
              to="/destockage-nautique"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
            >
              Catalogue nautique
            </Link>
            <a
              href="#vendeurs"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted"
            >
              Vente rapide
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <a href="tel:+596696905164">
                <Phone className="mr-2 h-4 w-4" />
                Appeler
              </a>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-4 lg:hidden">
          <Link
            to="/destockage-nautique"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
          >
            Catalogue nautique
          </Link>
          <a
            href="#vendeurs"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
          >
            Vente rapide
          </a>
          <a
            href="tel:+596696905164"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
          >
            Appeler
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
