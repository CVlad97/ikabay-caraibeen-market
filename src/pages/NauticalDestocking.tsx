import { useMemo, useState } from "react";
import {
  Anchor,
  ArrowRight,
  CircleAlert,
  FileText,
  Filter,
  MessageCircle,
  Package,
  Phone,
  ShipWheel,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-caribbean.jpg";
import {
  nauticalDestockingCategories,
  nauticalDestockingExcludedProducts,
  nauticalDestockingMissingData,
  nauticalDestockingProducts,
  nauticalDestockingReserveProducts,
  nauticalDestockingSocialTemplates,
  nauticalDestockingSource,
  nauticalDestockingSummary,
  type NauticalProduct,
} from "@/data/nauticalDestocking";

const masterWhatsappHref =
  "https://wa.me/596696905164?text=Bonjour%2C%20je%20souhaite%20recevoir%20la%20liste%20du%20d%C3%A9stockage%20nautique%20Ikabay.";

const toWhatsAppHref = (message: string) =>
  `https://wa.me/596696905164?text=${encodeURIComponent(message)}`;

const quickPoints = [
  "Source officielle unique : PDF inventaire vérifié",
  "12 références mises en avant pour vente rapide",
  "24 références propres préparées sans faux stock",
  "CTA WhatsApp et réservation déjà branchés",
];

const stats = [
  {
    label: "Top 12 en ligne",
    value: nauticalDestockingSummary.featuredCount,
    icon: Package,
  },
  {
    label: "Références prêtes",
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

export default function NauticalDestocking() {
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");

  const categories = useMemo(
    () => ["Toutes", ...nauticalDestockingCategories],
    [],
  );

  const visibleProducts = useMemo(() => {
    if (activeCategory === "Toutes") {
      return nauticalDestockingProducts;
    }

    return nauticalDestockingProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const visibleReserveProducts = useMemo(() => {
    if (activeCategory === "Toutes") {
      return nauticalDestockingReserveProducts;
    }

    return nauticalDestockingReserveProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const featuredExamples = nauticalDestockingProducts.slice(0, 4);

  const renderProductCard = (product: NauticalProduct, compact = false) => (
    <Card key={product.reference} className="overflow-hidden border-border bg-card shadow-soft">
      {!compact && (
        <div className="aspect-[4/3] bg-muted">
          {product.photo ? (
            <img alt={product.name} className="h-full w-full object-cover object-center" src={product.photo} />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-ocean text-white">
              <Anchor className="h-10 w-10" />
            </div>
          )}
        </div>
      )}
      <CardContent className={compact ? "space-y-3 p-4" : "space-y-4 p-5"}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge className="bg-destructive text-destructive-foreground">Stock {product.stock}</Badge>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.reference}</p>
          <h3 className={compact ? "mt-2 text-lg font-semibold text-foreground" : "mt-2 text-xl font-semibold text-foreground"}>
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>Prix PDF : {product.price} €</p>
          <p>Fournisseur : {product.supplier ?? "Non indiqué dans la ligne retenue"}</p>
          <p>{product.messages.categoryPitch}</p>
          {!compact && <p>Logistique : {product.shipping ?? "À confirmer"}</p>}
          {product.sourceNote && <p className="text-xs text-foreground/80">Source : {product.sourceNote}</p>}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
            <a href={toWhatsAppHref(product.messages.whatsappReservation)} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Réserver
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={toWhatsAppHref(product.messages.whatsappShort)} target="_blank" rel="noreferrer">
              Demander la dispo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(4,31,51,0.94),rgba(6,74,108,0.82),rgba(12,22,31,0.86))]" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl text-white">
              <Badge className="mb-5 bg-accent text-accent-foreground">Déstockage nautique Martinique / Caraïbes</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Top 12 réel en ligne, prêt pour vente rapide via Ikabay + WhatsApp.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/84 md:text-xl">
                Sélection extraite directement du PDF officiel <span className="font-semibold">{nauticalDestockingSource.fileName}</span>.
                Aucun faux stock, aucune ligne inventée, uniquement des références lisibles et actionnables.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
                  <a href={masterWhatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp rapide
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <a href="#catalogue-nautique">
                    Voir le top 12
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {quickPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/88 backdrop-blur-sm">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 text-white shadow-caribbean backdrop-blur-md">
              <CardContent className="space-y-5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">Synthèse opérationnelle</p>
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
                  <p>Top 12 prioritaire : trappes, ventilation, pare-battages, navigation, sécurité, passe-coques.</p>
                  <p>Top 24 prêt : réserve utile pour relance commerciale, pros et ventes par lot.</p>
                  <p>Source encore à confirmer hors PDF : règles exactes d expédition et photos HD séparées.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Filtrer la vitrine</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">Top 12 vente rapide</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                  }`}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  <Filter className="mr-2 inline h-4 w-4" />
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalogue-nautique" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Sélection mise en avant</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">12 produits retenus pour sortir vite</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Priorité aux références visuelles, lisibles, avec stock positif, prix présent et intérêt commercial immédiat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => renderProductCard(product))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Top 24 prêt</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">12 autres références propres déjà nettoyées</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cette seconde vague sert aux relances, aux demandes pros, aux ventes en lot et aux besoins plus techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleReserveProducts.map((product) => renderProductCard(product, true))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Messages prêts</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">Exemples directs réutilisables sur réseaux et WhatsApp</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border bg-card shadow-soft">
              <CardContent className="space-y-5 p-6">
                {nauticalDestockingSocialTemplates.map((template) => (
                  <div key={template.network} className="rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <ShipWheel className="h-5 w-5 text-primary" />
                      <p className="text-lg font-semibold text-foreground">{template.network}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{template.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {featuredExamples.map((product) => (
                <Card key={product.reference} className="border-border bg-card shadow-soft">
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.reference}</p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">{product.name}</h3>
                      </div>
                      <Badge>{product.price} €</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">WhatsApp : {product.messages.whatsappShort}</p>
                    <p className="text-sm text-muted-foreground">Facebook : {product.messages.facebook}</p>
                    <p className="text-sm text-muted-foreground">Instagram : {product.messages.instagram}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <CircleAlert className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">Données encore à verrouiller</h3>
                </div>
                <div className="grid gap-3">
                  {nauticalDestockingMissingData.map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">Exclusions propres</h3>
                </div>
                <div className="grid gap-3">
                  {nauticalDestockingExcludedProducts.slice(0, 8).map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-border bg-gradient-ocean text-white shadow-caribbean">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">CTA final</p>
                <h2 className="mt-3 text-4xl font-bold">Voir la référence, cliquer WhatsApp, réserver vite.</h2>
                <p className="mt-4 max-w-2xl text-lg text-white/84">
                  La logique reste volontairement courte : référence, visuel, stock, prix PDF, message prérempli et validation rapide.
                </p>
              </div>
              <div className="grid gap-3">
                <Button asChild className="bg-white text-primary hover:bg-white/90">
                  <a href={masterWhatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp commercial
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <a href="tel:+596696905164">
                    <Phone className="mr-2 h-5 w-5" />
                    Appeler
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
