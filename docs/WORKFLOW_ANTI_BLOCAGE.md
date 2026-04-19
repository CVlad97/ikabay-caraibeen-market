# Workflow anti-blocage IKABAY

## Objectif
Eviter qu'une page ou un catalogue valable reste seulement en local ou sur un preview temporaire.

## Regle
Toute passe importante doit etre :
- dans GitHub
- verifiee sur GitHub Pages
- controlee publiquement sur les routes critiques

## Methode recommandee
1. Modifier localement.
2. Verifier le build.
3. Verifier les pages critiques en local.
4. Pousser sur GitHub.
5. Verifier GitHub Pages.
6. Valider publiquement les routes attendues.

## Check de publication
- home OK
- `/destockage-nautique` OK
- assets OK
- CTA WhatsApp OK
- donnees produits attendues visibles
- contenu public = contenu local attendu

## Si le push local est bloque
- utiliser le connecteur GitHub si possible
- sinon arreter la passe et signaler la divergence
- ne pas presenter un preview temporaire comme version finale

## Regle d'exploitation
GitHub Pages stable est la reference publique. Un tunnel ou preview n'est qu'un outil transitoire.

## Lien public de reference
https://cvlad97.github.io/ikabay-caraibeen-market/
