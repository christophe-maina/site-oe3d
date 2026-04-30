#!/bin/bash
# OE3D — Lance le site en local et ouvre le navigateur
# Sur Mac : double-cliquer sur ce fichier (clic droit → Ouvrir la 1re fois)
# Sur Linux : rendre exécutable (chmod +x lancer-site.command) puis double-cliquer

cd "$(dirname "$0")"
PORT=8000

# Cherche un port libre à partir de 8000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://localhost:$PORT/"

echo "═══════════════════════════════════════════"
echo "  OE3D — Site local"
echo "  Adresse : $URL"
echo "  Ferme cette fenêtre pour arrêter le serveur"
echo "═══════════════════════════════════════════"

# Ouvre le navigateur après 1s (laisse le temps au serveur de démarrer)
( sleep 1 && (open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || start "$URL" 2>/dev/null) ) &

# Démarre Python http server (Python 3 préféré, sinon Python 2)
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server $PORT
elif command -v python >/dev/null 2>&1; then
  python -m SimpleHTTPServer $PORT
else
  echo "ERREUR : Python n'est pas installé."
  echo "Installe-le depuis https://www.python.org/ puis relance ce script."
  read -p "Appuie sur Entrée pour fermer..."
fi
