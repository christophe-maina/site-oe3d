#!/bin/bash
# Double-cliquez ce fichier pour lancer le site Ortho Espace 3D en local.
cd "$(dirname "$0")"
PORT=8765
echo "Démarrage du serveur local sur http://localhost:$PORT ..."
python3 -m http.server $PORT >/dev/null 2>&1 &
SRV=$!
sleep 1
open "http://localhost:$PORT/index.html"
echo ""
echo "  Site ouvert dans votre navigateur : http://localhost:$PORT"
echo "  Laissez cette fenêtre ouverte pendant la navigation."
echo "  Fermez-la (ou Ctrl+C) pour arrêter le serveur."
echo ""
trap "kill $SRV 2>/dev/null" EXIT
wait $SRV
