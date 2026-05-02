import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { strategyChecklist, strategyPrinciples, strategyShowcase } from "@/data/strategyShowcase";
import { ArrowRight, ShieldAlert, ShieldCheck, TrendingUp, Waves } from "lucide-react";
import { Link } from "react-router-dom";

const Strategies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">Stratégies prudentes</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Les meilleures idées, sans promesse de gain</h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                Cette page sert de cockpit de décision simple : elle montre les familles de signaux utiles, les règles d'invalidation et le cas où il faut ne pas trader.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/destockage-nautique">
                    Retour au catalogue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Retour accueil</Link>
                </Button>
              </div>
            </div>

            <Card className="border-border bg-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Règles de prudence
                </CardTitle>
                <CardDescription>
                  Une stratégie n'est utile que si elle protège le capital autant qu'elle cherche une opportunité.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategyPrinciples.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
                    <Waves className="mt-0.5 h-4 w-4 text-primary" />
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Alert className="mb-8 border-amber-300/50 bg-amber-50 text-amber-950">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Avertissement</AlertTitle>
            <AlertDescription>
              Le contenu ci-dessous est une présentation de stratégie et de gestion du risque, pas une garantie de performance.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {strategyShowcase.map((strategy) => (
              <Card key={strategy.name} className="border-border bg-card shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl">{strategy.name}</CardTitle>
                    <Badge variant={strategy.side === "BUY" ? "default" : strategy.side === "SELL" ? "destructive" : "secondary"}>
                      {strategy.side}
                    </Badge>
                  </div>
                  <CardDescription>Zone de confiance indicative : {strategy.confidenceBand}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Entrée</p>
                    <p className="mt-1 text-sm text-muted-foreground">{strategy.entryLogic}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Invalidation</p>
                    <p className="mt-1 text-sm text-muted-foreground">{strategy.invalidation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Quand l'utiliser</p>
                    <p className="mt-1 text-sm text-muted-foreground">{strategy.whenToUse}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Quand l'éviter</p>
                    <p className="mt-1 text-sm text-muted-foreground">{strategy.whenToSkip}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Contrôles de risque</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {strategy.riskControls.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-border bg-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Checklist avant décision
                </CardTitle>
                <CardDescription>
                  Si un seul point manque, la sortie correcte est souvent WAIT.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategyChecklist.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-muted/30 p-4 text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-soft">
              <CardHeader>
                <CardTitle>Lecture rapide</CardTitle>
                <CardDescription>
                  Le système préféré est celui qui sait attendre et couper le risque quand le marché ne donne pas de signal propre.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>• BUY seulement quand le signal est clair et la perte possible reste petite.</p>
                <p>• SELL quand la préservation du capital devient plus importante que l'espérance d'un rebond.</p>
                <p>• WAIT ou no-trade quand le marché est sale, trop rapide ou mal lisible.</p>
                <div className="pt-2">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent-hover">
                    <Link to="/destockage-nautique">
                      Revenir au catalogue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Strategies;
