# 🧪 Instructions de test — Refonte v2 du site OE3D

Bonjour 👋

Christophe a fait refondre le site **orthoespace3d.fr** par Claude Code. La refonte est sur une **branche séparée** du repo GitHub. Il aimerait pouvoir prévisualiser le résultat **sans toucher au site actuellement en ligne**.

---

## 📍 Ce qu'il faut savoir

- **Repo GitHub** : `https://github.com/christophe-maina/site-oe3d`
- **Branche de la refonte** : `claude/redesign-oe3d-website-PEXWX`
- **Branche de production (à ne pas toucher)** : `main`
- **Le site actuellement en ligne** sur orthoespace3d.fr est déployé depuis `main` (probablement via Netlify, vu le dossier `.netlify/` du repo).

> ⚠️ **Important** : il NE FAUT PAS merger la branche `claude/...` dans `main` tant que Christophe n'a pas validé visuellement la nouvelle version.

---

## ✅ Trois façons de prévisualiser (du plus simple au plus technique)

### Option 1 — GitHub Pages (1 minute, zéro Terminal)

C'est la solution la plus rapide. Elle crée une **URL de preview parallèle** sans toucher à la production.

1. Aller sur : `https://github.com/christophe-maina/site-oe3d/settings/pages`
2. Sous **Source**, choisir **`GitHub Actions`** (au lieu de "Deploy from a branch")
3. Sauvegarder
4. Aller sur l'onglet **Actions** du repo : un workflow `Deploy site to GitHub Pages` doit se lancer (rond jaune qui tourne, puis vert)
5. Une fois vert, le site est en ligne sur :
   ```
   https://christophe-maina.github.io/site-oe3d/
   ```

> Cette URL est **différente** de `orthoespace3d.fr` — les deux coexistent. Pour la désactiver plus tard : Settings → Pages → Source → "None".

---

### Option 2 — Netlify Branch Deploy (si Netlify est utilisé)

Si Netlify déploie déjà la prod, il peut générer automatiquement une URL de preview pour la branche.

1. Aller sur le **dashboard Netlify** du site OE3D
2. **Site settings → Build & deploy → Continuous deployment → Branches**
3. Activer **Deploy all branches** OU ajouter explicitement `claude/redesign-oe3d-website-PEXWX`
4. Lancer un nouveau déploiement (Deploys → Trigger deploy → Deploy branch)
5. Netlify donne une URL de preview du type :
   ```
   https://claude--redesign-oe3d-website-pexwx--<nom-site>.netlify.app
   ```

---

### Option 3 — Aperçu en local (Terminal)

```bash
git clone https://github.com/christophe-maina/site-oe3d.git
cd site-oe3d
git checkout claude/redesign-oe3d-website-PEXWX
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans le navigateur.

> Sur Mac, il y a aussi un script `lancer-site.command` à la racine : double-clic après clic droit → Ouvrir.

---

## 🔍 Que tester

Une fois le site visible :

1. **Splash d'accueil** (`/`)
   - Sélecteur de 9 langues : FR / EN / ES / PT / NL / AR / 中文 / Kréol / Hmoob
   - Deux portes : "Patients & Curieux" et "Professionnels de santé"
   - L'arabe doit basculer automatiquement en RTL (texte de droite à gauche)

2. **Espace Patient** (`/patients/`)
   - Hero avec vue 3D interactive (modèle de démo en attendant les vrais scans)
   - Sections : Expertises, Vues 3D, Équipe (6 portraits), Modes d'emploi (6), Vidéos FAQ (5), FAQ texte, Parcours patient, Témoignages, Partenaires, Dépôt de documents, Éthique, Contact
   - Formulaire de contact (en démo locale, pas branché)

3. **Espace Pro** (`/pro/`)
   - Hero pro avec lien vers l'outil de prescription
   - Cartes services, protocoles, ressources
   - L'outil LPPR v3 doit s'ouvrir via `/pro/outil-prescription.html`

4. **Panel d'accessibilité** (bouton ♿ en bas à droite de chaque page)
   - Taille du texte : 4 niveaux (A− / A / A+ / A++)
   - Thème : Auto / Clair / Sombre / Contraste élevé
   - Police OpenDyslexic
   - Espacement renforcé
   - Désactivation des animations
   - Bouton "Tout réinitialiser"

5. **Pages utilitaires**
   - `/mentions-legales.html` — RGPD, hébergement, cookies, accessibilité
   - `/404.html` — page d'erreur

---

## 📁 Ce qui a été préservé

- Toutes les **photos d'équipe** (6 portraits) aux mêmes chemins (`photos et films/photos-equipe/*.jpg`)
- Les **vidéos** et leurs **sous-titres VTT** dans `/subtitles/` (9 langues × 5 scripts)
- Les **données métier** : `/data/appareils-prescription.json`, `/data/situations-prescription.json`
- L'**outil LPPR v3** complet (déplacé dans `/pro/outil-prescription.html`)
- Les **anciens fichiers** dans `_archive/` (en cas de besoin)

---

## 🐛 Si quelque chose ne marche pas

Vérifier dans la console du navigateur (F12) :

- Erreur **CORS sur `<model-viewer>`** → ne fonctionne qu'avec un serveur HTTP (pas en `file://`). Utiliser un serveur local ou GitHub Pages.
- Erreur **404 sur les photos d'équipe** → les vrais fichiers `.jpg` sont peut-être absents du commit (fichiers lourds). Le site affiche alors un fallback avec les initiales en gradient bleu/turquoise.
- **Fonts ne se chargent pas** → besoin d'une connexion internet (Google Fonts via CDN).

---

## 📞 Pour me joindre / valider

Christophe peut tester ensuite et valider. **Ne pas merger sur `main` sans son feu vert.**

Pour me poser des questions techniques, il faudra recontacter Claude Code dans la session de Christophe — je n'ai pas de contact direct.

Bon test 🚀
