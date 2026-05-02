# CLAUDE.md — Site Ortho Espace 3D (refonte v2)

> Mémoire projet à lire en début de session.
> Dernière mise à jour : 1er mai 2026

---

## 🎯 Projet

Refonte complète du site `www.orthoespace3d.fr` — cabinet d'orthoprothèse en Guyane française.

**Branding :**
- Tagline officielle : « **L'innovation au service de l'autonomie** »
- Couleurs identité : bleu marine `#2d4a8a` (ESPACE3D) + orange `#e67e22` (ORTHO)
- Site siège : 1 rue des Arômes, 97354 Remire-Montjoly
- Sites de consultation : Remire-Montjoly · Saint-Laurent-du-Maroni · Kourou
- Téléphone/WhatsApp : +594 594 28 28 08
- Email : c.maina@me.com

---

## 📁 Workflow actuel

**Clone local :** `~/Developer/site-oe3d/` (hors iCloud, plus de souci de locks Git)
**Branche de travail :** `claude/resume-website-redesign-v2-Vvwhh`
**Branche de production :** `main` ⚠️ ne jamais merger sans validation visuelle complète
**Repo GitHub :** https://github.com/christophe-maina/site-oe3d

**Serveur local avec hot-reload :**
```bash
live-server --port=8000 --no-browser ~/Developer/site-oe3d
```
Le navigateur se rafraîchit automatiquement à chaque modification de fichier.

**Cowork** modifie directement les fichiers dans `~/Developer/site-oe3d/`, le navigateur recharge tout seul. Les commits/push se font via les scripts `.command` sur le Bureau.

---

## 🏗️ Architecture

```
~/Developer/site-oe3d/
├── index.html                       # Splash : rideau d'entrée + choix langue + 2 portes
├── patients/index.html              # Espace patients
├── pro/index.html                   # Espace professionnels de santé
├── pro/outil-prescription.html      # Outil de prescription LPP
├── 404.html, mentions-legales.html, sitemap.xml, robots.txt
│
├── css/style.css                    # Design system (1500+ lignes)
├── js/
│   ├── i18n.js                      # 9 langues (FR, EN, ES, PT, NL, AR, ZH, GCR, HMN)
│   ├── a11y.js                      # Panel accessibilité
│   ├── main.js                      # Navigation, hamburger, FAQ
│   └── bg-slideshow.js              # Diaporama photos arrière-plan global
│
├── assets/
│   ├── 3d/
│   │   ├── botte.glb                # Botte d'immobilisation (1.7 Mo, 88k faces)
│   │   ├── siege-mousse-tetiere.glb # Siège mousse (1.7 Mo, 88k faces)
│   │   └── tibiale.glb              # ⚠️ À convertir depuis Desktop/tibiale .3mf
│   ├── bg-photos/                   # 13 photos Guyane + locaux (5 Mo total)
│   ├── logo/
│   │   ├── oe3d-logo.png            # Splash 600x387 transparent
│   │   ├── oe3d-logo-small.png      # Header 200x129 transparent
│   │   └── oe3d-logo-color.png      # Sur fond blanc
│   ├── team/
│   │   ├── oe3d-equipe.jpg          # Photo de groupe IA Microsoft Designer (1600x1067)
│   │   ├── PROMPT.md                # Traçabilité de l'image IA
│   │   └── apoina/celine/etc.jpg    # Anciens portraits individuels (non utilisés)
│   ├── fleuve-maroni.jpg            # Photo du rideau d'entrée (270 Ko)
│   └── guyane-placeholder.svg       # Fallback si la photo manque
│
├── data/                            # JSON appareils + situations LPPR
├── subtitles/                       # 45 VTT (5 scripts × 9 langues)
│
├── photos et films/                 # ❌ gitignored (lourd, présent localement)
├── videos/                          # ❌ gitignored (45 MP4 HeyGen, 82 Mo)
├── site/                            # ❌ gitignored (PDFs modes d'emploi + médias, 121 Mo)
│
├── .github/workflows/pages.yml      # Déploiement GitHub Pages auto
├── .nojekyll                        # Empêche Jekyll
└── BRIEF-CTA-OE3D.md, INSTRUCTIONS-TEST.md, MEDIAS-A-INCLURE.md, ...
```

---

## ✅ Refontes faites (état au 1er mai 2026)

### Rideau d'entrée (`index.html`)
- Photo plein écran du **Fleuve Maroni**
- Titre « Bienvenue sur · OE3D · Ortho Espace 3D » avec ligne dorée
- **CTA central : logo OE3D 3D** avec extrusion 8 couches dorées, tilt 3D au survol, particules dorées qui tombent (clin d'œil aux orpailleurs du Maroni), tête d'impression animée
- Carte Guyane SVG **retirée** (concentration sur le logo)
- Échap = passage immédiat, clic = split de la photo, sessionStorage pour ne pas rejouer

### Splash de choix de langue
- **Logo OE3D officiel** (PNG transparent, 380px) au centre
- Tagline « L'INNOVATION AU SERVICE DE L'AUTONOMIE » avec "INNOVATION" et "AUTONOMIE" en orange `#e67e22`, reste en bleu marine `#2d4a8a`
- Sélecteur de **9 langues** (drapeaux)
- 2 portes : **Patients & Curieux** + **Professionnels de santé**
- **Diaporama photos** Guyane + locaux en arrière-plan (40 % opacité, fondu 1.6s entre 13 photos toutes les 5s)
- Adresse de Remire-Montjoly en pied

### Espace patient (`patients/index.html`)
- **Header avec logo OE3D officiel** + nav incluant Vidéos
- Hero : titre H1 « L'innovation au service de l'autonomie » + photo 3D du **siège mousse**
- Sections : Expertises, Vues 3D interactives, Notre équipe (photo IA + liste compacte), Modes d'emploi, Vidéos FAQ, Parcours, Témoignages, Partenaires, Dépôt de documents, Éthique, Contact
- **Diaporama photos** en arrière-plan global via `js/bg-slideshow.js`

### Galerie 3D (`patients/index.html` section vues-3d)
- 3 cartes : **Botte (orthèse)**, **Tibiale (prothèse)**, **Siège mousse (posture)**
- Chaque carte : badge, titre, description, specs (indication / matériau / délai ou suivi)
- Caméra orbit configurée individuellement, auto-rotate après 3s d'inactivité
- **Bouton plein écran** + **AR compatible iOS/Android**
- Bandeau CTA « Touchez l'icône RA pour voir en taille réelle »

### Section équipe
- **Bannière photo de groupe** (image Microsoft Designer, 1600×1067, 237 Ko)
- Légende honnête : « Visuel d'ambiance — illustration générée par IA. L'équipe réelle vous accueille en cabinet à Remire-Montjoly, Saint-Laurent et Kourou. »
- Sous la bannière : **liste compacte 2 colonnes** (Apoïna, Céline, Christophe, Christian, Steeve, Thaïna) avec rôle + tags

### Espace pro (`pro/index.html`)
- Header avec logo OE3D officiel + suffix « · Pro »
- Outil de prescription LPP (`outil-prescription.html`) avec adresse Remire-Montjoly

---

## 📋 Specs techniques des modèles 3D

| Modèle | Indication | Matériau | Délai/Suivi |
|---|---|---|---|
| **Botte d'immobilisation** | Entorse sévère, fracture, post-op | **Polypropylène (PP) ou polyéthylène (PE)** | Adapté à l'urgence de la prescription |
| **Prothèse tibiale** | Amputation transtibiale | Composite carbone + emboîture polymère | Accompagnement personnalisé, comme tous nos appareillages |
| **Siège mousse avec têtière** | Maintien postural, scoliose, IMC | Mousse haute densité moulée | Adapté enfants et adultes |

---

## 🌐 Multilingue (9 langues)

Toutes les chaînes principales sont traduites dans `js/i18n.js` :
**FR · EN · ES · PT · NL · AR (RTL) · ZH · GCR (Kréyòl gwiyané) · HMN (Hmoob)**

Tagline et hero_title sont alignés sur « L'innovation au service de l'autonomie » dans les 9 langues, avec mots-clés en orange via `<span class="t-key">`.

---

## 🚧 À faire / en attente

- [ ] **Convertir `tibiale .3mf`** en GLB (sur le Desktop, ~46 Mo, nécessite Python 3.10+ ou approche alternative)
- [ ] **Optimiser les GLB existants** avec `gltf-transform` (Draco compression) → 1.7 Mo → ~400 Ko visés
- [ ] **Générer les `.usdz`** pour AR iOS native
- [ ] Pousser les **vidéos HeyGen + PDFs modes d'emploi** sur Git (décision à prendre, voir `MEDIAS-A-INCLURE.md`)
- [ ] **Activer GitHub Pages** (Settings → Pages → Source : GitHub Actions) pour preview publique
- [ ] Compléter les traductions hors FR/EN (passer de ~30 à ~150 clés)
- [ ] Brancher le **formulaire de contact** (actuellement en démo locale)
- [ ] Auto-héberger les Google Fonts (RGPD strict)
- [ ] Compléter `assets/team/PROMPT.md` avec le prompt exact Microsoft Designer
- [ ] Décider : merger sur `main` OU garder la branche redesign séparée pour la prod ?

---

## ⚖️ Vigilance légale

- **Image IA** : Microsoft Designer, transparence dans la légende (AI Act UE 2024) ✅
- **Droit à l'image** : photo de groupe = avatars IA = pas de cession nécessaire
- **AI Act** : transparence explicite ✅
- **RGPD** : formulaire contact à brancher avec consentement, registre des traitements
- **LCEN** : mentions légales en place (`mentions-legales.html`)
- **Données de santé HDS** : pas de stockage côté serveur (site statique), BlueFiles pour les documents patient ✅
- **Modèles 3D patients** : ne publier que l'appareil seul, pas le corps (sinon donnée de santé identifiante)

---

## 🛠️ Conventions

- **HTML5 sémantique** + **CSS vanilla** + **JS vanilla** — pas de framework
- **Pas de build step** — fichiers servis tels quels
- **Mobile-first**, design responsif via `clamp()` et `auto-fit minmax`
- **Accessibilité WCAG AA** : skip-link, focus visible 3px, alt sur 100% des images, ARIA, prefers-reduced-motion
- **Commits Git en français**, descriptifs, sur la branche `claude/resume-website-redesign-v2-Vvwhh`

---

## 🚀 Reprendre le projet

```bash
# 1. Démarrer le serveur live-reload
live-server --port=8000 --no-browser ~/Developer/site-oe3d

# 2. Ouvrir Chrome sur http://localhost:8000

# 3. Modifier les fichiers, le navigateur rafraîchit tout seul

# 4. Pour pousser sur GitHub : double-clic sur ~/Desktop/push-changes.command
```

---

*Pour le détail du CTA OE3D 3D, voir `BRIEF-CTA-OE3D-V2.md`.*
*Pour la procédure médias lourds, voir `MEDIAS-A-INCLURE.md`.*
*Pour la traçabilité de l'image IA équipe, voir `assets/team/PROMPT.md`.*
