import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <ProductGrid />
      <section id="vendeurs" className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Test vendeur rapide</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">Passe de l'idee au test en une journee</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Commence avec 5 a 10 produits, une offre claire et une promesse simple pour la Martinique. Ikabay sert d'abord a valider la demande, puis a structurer la marketplace.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/ikabay-caraibeen-market/compte"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Ouvrir l'espace vendeur
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Revoir le catalogue de test
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
