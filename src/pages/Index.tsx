import { ArrowRight, FileText, MessageCircle, Package, Phone, ShieldCheck, Truck, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-caribbean.jpg";
import {
  nauticalDestockingCategories,
  nauticalDestockingProducts,
  nauticalDestockingSource,
  nauticalDestockingSummary,
} from "@/data/nauticalDestocking";

const whatsappHref =
  "https://wa.me/596696905164?text=Bonjour%2C%20je%20souhaite%20recevoir%20la%20liste%20du%20d%C3%A9stockage%20nautique%20Ikabay.";

const stats = [
  {
    label: "Top 12 en ligne",
    value: nauticalDestockingSummary.featuredCount,
    icon: Package,
  },
  {
    label: "Top 24 prêt",
    value: nauticalDestockingSummary.totalCount,
    icon: FileText,
  },
  {
    label: "Unités visibles",
    value: nauticalDestockingSummary.totalUnits,
    icon: Truck,
  },
  {
    label: "Canal rapide",
    value: "WhatsApp",
    icon: MessageCircle,
  },
];

const processSteps = [
  {
    title: "1. Voir la référence",
    text: "Le client voit la référence, le prix PDF et le stock retenu sur la démo Ikabay.",
  },
  {
    title: "2. Cliquer WhatsApp",
    text: "Le message prérempli part avec le SKU et la demande de disponibilité.",
  },
  {
    title: "3. Confirmer vite",
    text: "Réservation, retrait local ou expédition sont validés directement avec le client.",
  },
];

const featuredProducts = nauticalDestockingProducts.slice(0, 6);
const featuredCategories = nauticalDestockingCategories.slice(0, 6);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(4,31,51,0.95),rgba(6,74,108,0.82),rgba(9,19,28,0.86))]" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div className="max-w-3xl text-white">
              <Badge className="mb-5 bg-accent text-accent-foreground">Ikabay Destok 972</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Une démo Ikabay concrète pour vendre du stock nautique réel vite.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/84 md:text-xl">
                La base est déjà montée : top 12 visible, top 24 prêt, messages commerciaux injectés et CTA directs vers WhatsApp.
                Source officielle : <span className="font-semibold">{nauticalDestockingSource.fileName}</span>.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
                  <Link to="/destockage-nautique">
                    Voir la démo complète
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/strategies">
                    Voir les stratégies prudentes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 text-white shadow-caribbean backdrop-blur-md">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">Cockpit démo</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/12 bg-black/20 p-4">
                      <item.icon className="h-5 w-5 text-accent" />
                      <p className="mt-3 text-sm text-white/70">{item.label}</p>
                      <p className="mt-1 text-xl font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 text-sm leading-7 text-white/84">
                  <p>Stock réel uniquement. Pas de ligne inventée.</p>
                  <p>Démo pensée pour Martinique, retrait local et conversion rapide.</p>
                  <p>Les stratégies affichées restent prudentes et sans promesse de gain.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Catégories visibles</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">La démo est déjà structurée comme une vraie opération</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Le tri est prêt pour vente rapide : trappes, ventilation, feux, sécurité, passe-coques et pare-battages.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {featuredCategories.map((category) => (
              <Card key={category} className="border-border bg-card shadow-soft">
                <CardContent className="flex min-h-[140px] flex-col justify-between p-5">
                  <Waves className="h-7 w-7 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Catégorie prête à pousser sur site et réseaux.</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="demo-ikabay" className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Aperçu produit</p>
              <h2 className="mt-3 text-4xl font-bold text-foreground">La démo a déjà ses cartes réelles</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Le root sert maintenant de rampe de démonstration. La page complète garde le catalogue détaillé et les messages par produit.
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/destockage-nautique">
                Ouvrir le catalogue complet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.reference} className="overflow-hidden border-border bg-card shadow-soft">
                <div className="aspect-[4/3] bg-muted" />
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge className="bg-destructive text-destructive-foreground">Stock {product.stock}</Badge>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.reference}</p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <p>Prix PDF : {product.price} €</p>
                    <p>Fournisseur : {product.supplier ?? "à confirmer"}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
                      <a
                        href={`https://wa.me/596696905164?text=${encodeURIComponent(product.messages.whatsappReservation)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Réserver
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/destockage-nautique">Voir la fiche</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border bg-card shadow-soft">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Process vente rapide</p>
                <h2 className="text-4xl font-bold text-foreground">Simple, court, démontrable</h2>
                <div className="grid gap-4">
                  {processSteps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-border bg-muted/40 p-4">
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-soft">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Canaux déjà prêts</p>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Messages préremplis déjà générés pour dispo, vente et réservation produit par produit.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Réseaux</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Facebook, Instagram et LinkedIn sont déjà préparés dans la source de données pour la diffusion rapide.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Appel direct</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      La démo peut être montrée comme vitrine, puis basculer immédiatement sur appel ou validation WhatsApp.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
                    <a href={whatsappHref} target="_blank" rel="noreferrer">
                      Ouvrir WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/destockage-nautique">Voir la démo complète</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="vendeurs" className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Version démontrable</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">Ikabay a maintenant une vraie rampe de démonstration commerciale</h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Le root présente la logique, la page déstockage montre le catalogue réel, et la donnée produit porte déjà les messages commerciaux.
              La prochaine marche utile est la diffusion, pas une refonte supplémentaire.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/destockage-nautique"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Ouvrir la démo complète
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-4 text-lg font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                Lancer WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
