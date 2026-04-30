# Dossier `assets/`

Fichiers visuels du splash et du chrome du site (versionnés dans Git, contrairement à `photos et films/` qui est ignoré).

## Image d'entrée — Îles du Salut

- **Fichier attendu** : `assets/iles-du-salut.jpg`
  - Format JPG, 1920×1080 minimum (4K idéal pour les grands écrans)
  - Cadrage paysage, point d'intérêt centré (les trois îles bien visibles au crépuscule)
  - Poids cible : < 400 ko (compresser via TinyPNG / Squoosh)
- **Fallback** : `assets/iles-du-salut-placeholder.svg` — illustration vectorielle stylisée des trois îles au coucher de soleil. Utilisée automatiquement tant que le `.jpg` n'est pas présent.

Pour remplacer le placeholder :

1. Déposer la photo réelle à la racine de `assets/` sous le nom `iles-du-salut.jpg`
2. Commiter et pousser
3. Le splash utilisera automatiquement la photo (le SVG reste comme filet de sécurité)
