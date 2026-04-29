#!/bin/bash
# ─────────────────────────────────────────────────
#  Ortho Espace 3D — Serveur local
#  Double-cliquer pour lancer
# ─────────────────────────────────────────────────

cd "$(dirname "$0")"

PORT=8080
URL="http://localhost:$PORT/espace-prescripteur-v3.html"

echo ""
echo "  ┌─────────────────────────────────────────┐"
echo "  │  Ortho Espace 3D — Serveur local        │"
echo "  │  Espace Prescripteur v3                 │"
echo "  └─────────────────────────────────────────┘"
echo ""
echo "  Adresse : $URL"
echo "  Dossier : $(pwd)"
echo ""
echo "  → Ctrl+C pour arrêter le serveur"
echo ""

# Ouvre le navigateur après 1 seconde
(sleep 1 && open "$URL") &

# Lance Python 3 (présent par défaut sur macOS)
python3 -m http.server $PORT
