# Dossier `assets/`

Fichiers visuels du splash et du chrome du site (versionnés dans Git, contrairement à `photos et films/` qui est ignoré).

## Image d'entrée — Fleuve Maroni

- **Fichier en place** : `assets/fleuve-maroni.jpg` — photo réelle du fleuve Maroni en Guyane, optimisée (~270 ko, JPEG progressif, 1920×654 px, format panoramique).
- **Fallback** : `assets/guyane-placeholder.svg` — illustration vectorielle stylisée d'une scène tropicale guyanaise, utilisée automatiquement si le `.jpg` venait à manquer.

Pour remplacer la photo :

1. Déposer la nouvelle photo dans `assets/` sous le nom exact `fleuve-maroni.jpg`
2. Idéalement 1920×654 (ratio panoramique ~3:1) ou 1920×1080 (16:9), JPEG progressif < 400 ko
3. Commiter et pousser
4. Le site la prendra automatiquement (le SVG reste comme filet de sécurité)
