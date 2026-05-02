export type StrategySide = "BUY" | "SELL" | "WAIT";

export interface StrategyCard {
  name: string;
  side: StrategySide;
  confidenceBand: string;
  entryLogic: string;
  invalidation: string;
  riskControls: string[];
  whenToUse: string;
  whenToSkip: string;
}

export const strategyShowcase: StrategyCard[] = [
  {
    name: "trendMomentum",
    side: "BUY",
    confidenceBand: "68-82",
    entryLogic: "Prix au-dessus de la moyenne courte, volume au-dessus de la normale et tendance encore propre.",
    invalidation: "Cassure de la structure, hausse trop verticale ou volume qui retombe trop vite.",
    riskControls: ["Stop-loss serré", "Taille réduite", "Pas d'all-in"],
    whenToUse: "Quand le marché est déjà directionnel mais pas euphorique.",
    whenToSkip: "Si le mouvement est déjà trop étendu ou si le spread se dégrade.",
  },
  {
    name: "breakoutRetest",
    side: "BUY",
    confidenceBand: "70-84",
    entryLogic: "Cassure claire puis retest propre du niveau, sans achat directement sur la bougie d'impulsion.",
    invalidation: "Le niveau est réintégré ou le retest échoue avec mèche faible.",
    riskControls: ["Attendre confirmation", "Filtrer le faux breakout", "TP modéré"],
    whenToUse: "Quand un niveau connu est repris avec validation du marché.",
    whenToSkip: "Si le marché part en range ou si le retest est trop tardif.",
  },
  {
    name: "volumeSpike",
    side: "BUY",
    confidenceBand: "66-79",
    entryLogic: "Accélération de volume réelle avec spread faible et direction lisible.",
    invalidation: "Spike sans suivi, volume artificiel ou rejet immédiat.",
    riskControls: ["Liquidité minimale", "Éviter les microcaps", "Sortie rapide si rejet"],
    whenToUse: "Quand l'intérêt marché augmente vraiment et reste propre.",
    whenToSkip: "Si le volume est douteux, irrégulier ou trop manipulable.",
  },
  {
    name: "meanReversionSafe",
    side: "WAIT",
    confidenceBand: "60-74",
    entryLogic: "Retour vers la moyenne sur actif liquide, sans excès de volatilité.",
    invalidation: "La baisse s'aggrave ou la moyenne ne joue plus son rôle.",
    riskControls: ["Seulement actifs liquides", "Taille petite", "Aucun levier"],
    whenToUse: "Quand le marché exagère mais reste structurellement sain.",
    whenToSkip: "Si le trend est trop fort contre toi ou si la volatilité explose.",
  },
  {
    name: "defensiveExit",
    side: "SELL",
    confidenceBand: "75-90",
    entryLogic: "Protection quand le drawdown augmente, que le support casse ou que le risque devient asymétrique.",
    invalidation: "Le marché reprend le support avec force ou le signal de sortie disparaît.",
    riskControls: ["Coupe pertes", "Préserve le capital", "Priorité à la survie"],
    whenToUse: "Quand il faut réduire l'exposition plutôt que chercher à forcer un trade.",
    whenToSkip: "Si le plan ne montre pas de risque immédiat.",
  },
  {
    name: "noTrade",
    side: "WAIT",
    confidenceBand: "0-64",
    entryLogic: "Aucun signal propre, contexte trop bruité, ou conditions de risque non remplies.",
    invalidation: "Une vraie configuration propre apparaît et remonte au-dessus du seuil.",
    riskControls: ["Aucune exécution", "Observation seulement", "Capital protégé"],
    whenToUse: "Quand la meilleure décision est de ne rien faire.",
    whenToSkip: "Jamais si les critères de prudence sont en défaut.",
  },
];

export const strategyPrinciples = [
  "Pas de promesse de gain.",
  "Pas de levier.",
  "Pas de martingale.",
  "Pas d'ordre réel sans validation humaine.",
  "Le no-trade est une décision valide.",
];

export const strategyChecklist = [
  "Signal lisible",
  "Spread acceptable",
  "Volatilité supportable",
  "Stop-loss défini",
  "Take-profit défini",
  "Capital disponible suffisant",
];
