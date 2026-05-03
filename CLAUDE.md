# CLAUDE.md — Site Ortho Espace 3D (refonte v2)

> Mémoire projet à lire en début de session.
> Dernière mise à jour : 3 mai 2026
> Dernière mise à jour : 3 mai 2026

---

## 🎯 Projet

Refonte complète du site `www.orthoespace3d.fr` — cabinet d'orthoprothèse en Guyane française.

**Branding :**
- **Tagline officielle** : « **L'INNOVATION AU SERVICE DE L'AUTONOMIE** »
- **Couleurs identité** : bleu marine `#2d4a8a` (ESPACE3D) + orange `#e67e22` (ORTHO) + accent doré `#d4a847`
- **Co-dirigeants** : Christophe Maina + Apoïna Abienso
- **Site siège** : 1 rue des Arômes, 97354 Remire-Montjoly, Guyane française
- **Sites de consultation** : Remire-Montjoly · Saint-Laurent-du-Maroni · Kourou
- **Téléphone/WhatsApp** : +594 594 28 28 08
- **Email** : c.maina@me.com
- **Domaine cible** : www.orthoespace3d.fr (IONOS — à brancher quand V2 validée)

---

## ⚖️ Positionnement légal — IMPORTANT

**OE3D est un site d'INFORMATION**, pas de vente en ligne.
- Fourniture d'orthèses/prothèses **uniquement sur prescription médicale**
- Partenariat **Sécurité sociale (LPPR Chapitre 4 — grand appareillage)**
- Sécu rembourse **100 % du tarif LPP** sur le grand appareillage → mutuelle non nécessaire sauf options hors nomenclature
- **Petit appareillage** (Chapitre 1 LPPR : ceintures, semelles, bandages, aides techniques) → service à venir, marqué "Bientôt"
- Avertissement légal présent : encart sous le hero + bandeau dans le footer

---

## 📁 Workflow actuel

**Clone local de travail** : `~/Developer/site-oe3d/` (hors iCloud — workflow Git fiable)
**Branche de travail** : `claude/resume-website-redesign-v2-Vvwhh`
**Branche de production** : `main` ⚠️ ne jamais merger sans validation visuelle complète
**Repo GitHub** : https://github.com/christophe-maina/site-oe3d
**Archive iCloud** : `~/iCloud Drive/PROJETS/EN_COURS/site OE3D/` (V1 dans `site-web/`, snapshot dans `site-web-redesign-v2/`)

**Serveur local hot-reload :**
```bash
live-server --port=8000 --no-browser ~/Developer/site-oe3d
```
Pour relancer : double-clic sur `~/Desktop/restart-server.command`.

**Pour pousser sur GitHub** : double-clic sur `~/Desktop/push-changes.command` (à recréer si effacé).

---

## 🏗️ Architecture

```
~/Developer/site-oe3d/
├── index.html                       # Splash : rideau d'entrée (Fleuve Maroni + logo OE3D 3D doré) + 9 langues + 2 portes
├── patients/index.html              # Espace patients (mega-menu, 18 sections)
├── pro/index.html                   # Espace prescripteurs (hero + lien outil + lien demande accès)
├── pro/outil-prescription.html      # Outil de prescription LPP V3 + gate "Pour qui ?" + token system
├── pro/demande-acces.html           # Formulaire demande accès pro (mailto pré-rempli)
├── pro/_access-list.js              # Liste blanche des tokens d'accès — édition manuelle ou via app
├── pro/_admin.html                  # Page admin web (génère un token, prépare ligne JS + email)
│
├── 404.html, mentions-legales.html, sitemap.xml, robots.txt
├── css/style.css                    # Design system unifié (~2700 lignes)
├── js/
│   ├── i18n.js                      # 9 langues, RTL pour AR, persistance localStorage
│   ├── a11y.js                      # Panel accessibilité (taille texte, thèmes, OpenDyslexic)
│   ├── main.js                      # Navigation, hamburger, FAQ accordéon
│   └── bg-slideshow.js              # Diaporama photos d'arrière-plan global
│
├── assets/
│   ├── 3d/
│   │   ├── botte.glb                # 1.7 Mo, 88k faces
│   │   ├── siege-mousse-tetiere.glb # 1.7 Mo, 88k faces
│   │   └── tibiale.glb              # ⚠️ à convertir depuis Desktop/tibiale .3mf (bloqué Py 3.9)
│   ├── bg-photos/                   # 13 photos Guyane + locaux (5 Mo total)
│   ├── logo/
│   │   ├── oe3d-logo.png            # 600x387 transparent (splash + hero)
│   │   ├── oe3d-logo-small.png      # 200x129 transparent (header)
│   │   └── oe3d-logo-color.png      # 800x517 sur fond blanc
│   ├── team/
│   │   ├── oe3d-equipe.jpg          # 1600x1067, 237 Ko, photo de groupe IA Microsoft Designer
│   │   └── PROMPT.md                # Traçabilité IA (AI Act)
│   ├── sections/
│   │   ├── impression3d/            # 3 photos (Cheneau, CFAO, slicer)
│   │   ├── motifs/                  # 6 motifs (ballons, circuit, dinosaures, gouttes, graffitis, jeans)
│   │   └── nouveautes/              # 5 photos produits
│   ├── fleuve-maroni.jpg            # 270 Ko, photo du rideau d'entrée
│   └── guyane-placeholder.svg       # Fallback si la photo manque
│
├── data/                            # JSON appareils + situations LPPR
├── subtitles/                       # 45 VTT (5 scripts × 9 langues)
│
├── photos et films/, videos/, site/ # ❌ gitignored (médias lourds, présents en local)
│
├── .github/workflows/pages.yml      # Déploiement GitHub Pages auto (workflow prêt)
├── .nojekyll                        # Empêche Jekyll de bloquer _archive/
└── CLAUDE.md, MEMO.md, MEMO-MISE-EN-LIGNE.md, MEMO-ACCES-PRO.md, BRIEF-CTA-OE3D-V2.md, INSTRUCTIONS-TEST.md
```

---

## ✅ Espace patient — sections (ordre d'affichage)

1. **Topbar** : `☰ Menu` (gauche) · logo OE3D petit · sélecteur langue · "Espace Pro"
2. **#accueil** — Hero avec **logo OE3D officiel en grand** au-dessus + "📍 Remire-Montjoly..." + H1 « L'innovation au service de l'autonomie » + modèle 3D siège mousse + CTA "Prendre rendez-vous"
3. **Avertissement légal** (encart `.legal-notice`) — site info, pas de vente, partenariat Sécu LPPR Chapitre 4
4. **#expertises** — 4 cartes : Orthèses · Prothèses · Impression 3D · Petit appareillage (badge "Bientôt", bordure pointillée)
5. **#impression3d** — 4 tech-cards (Impression FDM filament, Scan 3D, CAO médicale, Local Guyane) + 3 photos atelier + bloc explicatif grand public dépliable. **OE3D ne pratique QUE le FDM filament** (PP, PETG, PLA…), pas de SLA résine.
6. **#vues-3d** — Galerie 3D interactive avec 3 modèles OE3D (botte / tibiale / siège), caméra orbit, AR iOS/Android, plein écran
7. **#esthetique** — Couleurs & motifs : 3 cartes infos + grille 6 motifs disponibles + note "motifs adultes au cabinet"
8. **#nouveautes** — 5 produits : Aqualeg · Genoux microprocesseur · Mains bioniques · Prothèses mammaires · Ultraflex
9. **#equipe** — Photo de groupe IA Microsoft Designer (légende transparente AI Act) + liste compacte 6 membres
10. **#modes** — 6 PDFs multi-langues (modal iframe)
11. **#videos** — 5 vidéos FAQ HeyGen multilingues (modal lecteur + sélecteur 9 langues + sous-titres VTT)
12. **#prise-en-charge** — **3 cartes** (Sécu 100% LPP / Tiers payant / CAF-MDPH) + parcours admin 5 étapes + badge LPPR + note explicative mutuelle (uniquement petit appareillage)
13. **#faq** — Questions fréquentes
14. **#parcours** — Parcours patient en étapes
15. **#temoignages** — 3 témoignages illustratifs (à remplacer par vrais avec consentement écrit)
16. **#partenaires** — Partenariats associatifs **locaux Guyane** : H'Art Guyane (culture/danse) + L'Espoir Cycliste Guyanais (sport). Soutien technique bénévole. Pas de fabricants internationaux affichés.
17. **#depot** — Dépôt de documents sécurisé via **BlueFiles** (HDS/ANSSI) + canaux alternatifs (cabinet, email, WhatsApp)
18. **#ethique** — Engagement éthique
19. **#contact** — Adresse, téléphone, email, WhatsApp, sites de consultation + formulaire de contact (labels en bleu marine pour contraste)

**Mega-menu plein écran** (slide depuis la **gauche**) : 18 boutons-cartes accessibles via le bouton "☰ Menu". Mobile-first (grille 2 colonnes < 480px).

---

## 🩺 Espace pro — outil de prescription

### Architecture du contrôle d'accès
| Fichier | Rôle |
|---|---|
| `pro/demande-acces.html` | Formulaire public — pro remplit RPPS, profession, etc. → email pré-rempli vers c.maina@me.com |
| `pro/_access-list.js` | **Liste blanche** des tokens individuels (édition manuelle ou via app) |
| `pro/_admin.html` | Page admin web (génère un token, construit la ligne JS + email type) |
| `pro/outil-prescription.html` | Gate "Pour qui ?" + outil V3. Reconnaît `?acces=TOKEN`, mémorise en localStorage, bandeau vert "Connecté : Dr X" |
| **App native macOS** `~/Desktop/OE3D-Acces-Pro.app` (V6) | Workflow complet : formulaire dialogues → token → modif fichier → push GitHub → email Mail.app + mode "Test local" qui ouvre Chrome direct |

### Liste des prescripteurs autorisés (alignée onglet Obligations V3 — LPPR Chapitre 4)
**Première mise — médecin spécialiste obligatoire :**
- Médecin MPR (Médecine Physique et Réadaptation)
- Chirurgien orthopédiste
- Rhumatologue
- Neurochirurgien
- Neurologue
- Endocrinologue
- Chirurgien plasticien
- Chirurgien vasculaire

**Sous condition de rattachement à un établissement de santé :**
- Pédiatre
- Dermatologue
- Gériatre

**Renouvellement à l'identique :** tout médecin (y compris médecin traitant)

**Autre :** orthoprothésiste agréé exclusivement

### Cas particuliers nécessitant MPR
- Orthèses **Ultraflex** (DIRAME) — prescription MPR obligatoire
- Genoux électroniques **NEURO TRONIC**, **SPL2 BASKO** — MPR en service spécialisé
- Genoux à microprocesseur **E-MAG ACTIVE**, **C-BRACE** — MPR + validation préalable
- **Prothèses myoélectriques** — avis favorable MPR + entente préalable

### Procédure administrative LPPR
- **CERFA 12042*02** (S 3135 b) — 3 volets, ordonnance séparée
- **Entente préalable obligatoire** (formulaire S3604d) — silence 15 jours = acceptation
- Encre noire ou bleue, sans rature, signature manuscrite sous la dernière ligne
- Moulage en sus du tarif de base (sauf mention contraire)

---

## 📋 Specs techniques des modèles 3D OE3D

| Modèle | Indication | Matériau | Délai/Suivi |
|---|---|---|---|
| **Botte d'immobilisation** | Entorse sévère, fracture, post-op | **Polypropylène (PP) ou polyéthylène (PE)** | Adapté à l'urgence de la prescription |
| **Prothèse tibiale** | Amputation transtibiale | Composite carbone + emboîture polymère | Accompagnement personnalisé, comme tous nos appareillages |
| **Siège mousse avec têtière** | Maintien postural, scoliose, IMC | Mousse haute densité moulée | Adapté enfants et adultes |

---

## 🌐 Multilingue (9 langues)

**FR · EN · ES · PT · NL · AR (RTL) · ZH · GCR (Kréyòl gwiyané) · HMN (Hmoob)**

- **Tagline + hero_title** alignés sur « L'innovation au service de l'autonomie » dans les 9 langues
- Mots-clés en orange via `<span class="t-key">` : "L'innovation" et "L'autonomie"
- **Persistance** localStorage, **fallback** FR
- **RTL natif** automatique pour l'arabe (panel a11y et navigation s'inversent)
- **Sous-titres VTT** : 9 langues × 5 scripts vidéo = 45 fichiers

---

## ⚖️ Obligations et conformité

### Données personnelles (RGPD)
- **Aucune donnée patient** stockée côté serveur (site statique)
- **BlueFiles HDS/ANSSI** pour les documents médicaux
- **Formulaire contact** : à brancher avec consentement explicite
- **Demande d'accès pro** : RPPS + email + profession utilisés uniquement pour vérifier le statut, conservés 3 ans
- **Registre des traitements** OE3D à tenir à jour (formulaire contact, BlueFiles, _access-list.js, app native)
- **Politique de confidentialité** dans `mentions-legales.html`
- **Hébergement** : viser hébergeur UE (Cloudflare Pages, IONOS, OVH) pour conformité

### Données de santé HDS
- Site statique → **pas de stockage de données de santé** ✅
- BlueFiles certifié **HDS** (Hébergeur de Données de Santé) pour le dépôt patient ✅
- L'outil de prescription **ne stocke aucune donnée patient** (calculs JS purs en navigateur)
- L'app `OE3D-Acces-Pro` traite seulement les infos professionnelles (RPPS, email pro)

### Modèles 3D et imagerie
- Ne publier que **l'appareil seul**, jamais le corps du patient
- Sinon = donnée de santé identifiante → hébergement HDS requis
- **Cession écrite** des patients si scan utilisé même partiellement

### Image et droit à l'image (art. 9 Code civil)
- **Image équipe IA** (Microsoft Designer) ✅ pas de personne réelle
- **Légende transparente** explicite sur l'origine IA (conformité **AI Act UE 2024 art. 52**)
- Témoignages : actuellement illustratifs, **consentement écrit** obligatoire avant publication réelle

### LCEN (Loi pour la Confiance dans l'Économie Numérique)
- **Mentions légales** complètes (`mentions-legales.html`) : éditeur, directeur de publication, hébergeur, contact
- **Politique cookies** : à compléter selon hébergeur final
- Note explicite "Site d'information uniquement, pas de vente en ligne"

### Propriété intellectuelle (CPI)
- **Œuvre IA** : pas de droit d'auteur classique (jurisprudence évolutive)
- **CGU Microsoft Designer** : usage commercial autorisé pour le compte qui a généré (à vérifier)
- **Logos partenaires** (Aqualeg, Ottobock, Össur, Blatchford, Anita, Bodynov, Bird, Ultraflex) : utilisation = mention textuelle, demander leur accord pour les logos officiels
- **Polices Google Fonts** : auto-héberger pour éviter transfert UE→US (RGPD strict)

### AI Act UE 2024 (août 2024 — applicable progressivement)
- **Art. 52** : transparence sur les contenus générés par IA → légende explicite sur la photo équipe ✅
- Mention sur le site : faire un encart "Contenus IA" dans `mentions-legales.html` quand on aura plus d'éléments générés

### Code de la santé publique
- Pas d'obligation aussi stricte que pour les médecins (R.4127-79) sur les orthoprothésistes (Code R.4341-1+)
- Mais **déontologie de proximité** : information honnête au patient (qui le soigne, ce qu'il fait, prix, alternatives)
- L'image IA équipe avec légende transparente respecte ce principe

### Accessibilité
- **WCAG AA** visé : skip-link, focus visible 3px, alt sur 100% des images, ARIA correct
- **prefers-reduced-motion** respecté (toutes animations désactivables)
- **Test au clavier** validé (Tab, Échap, Entrée)
- **Panel d'accessibilité** intégré : taille texte (4 niveaux), thèmes (auto/clair/sombre/contraste élevé), police OpenDyslexic, espacement renforcé, désactivation animations

---

## 🛠️ Conventions de code

- **HTML5 sémantique** + **CSS vanilla** + **JS vanilla** — pas de framework
- **Pas de build step** — fichiers servis tels quels
- **Mobile-first**, responsif via `clamp()` et `auto-fit minmax`
- **Cache-busting** auto via `document.write` + `window.__v = Date.now()`
- **Live-reload** via `live-server` (npm global)
- **Commits Git** en français, descriptifs, sur la branche `claude/resume-website-redesign-v2-Vvwhh`
- **2 fichiers de mémoire** : `CLAUDE.md` (technique) + `MEMO.md` (session)

---

## 🚧 À faire / en attente

### ✅ Fait dans la session du 3 mai 2026
- [x] **Verrouillage strict de l'outil de prescription** : bypass checkbox supprimé, accès uniquement par token whitelist
- [x] **2 accès permanents créés** : Christophe Maina (admin) + Marc Anatovi (bêta-testeur) — voir `MEMO-ACCES-PRO.md`
- [x] **GLB optimisés** avec gltf-transform Draco lossless → 122 Mo source ramenés à 4,7 Mo (-95 %)
- [x] **Cube parasite Blender supprimé** sur les 5 fichiers GLB (recadrage caméra correct)
- [x] **Matériaux PBR réalistes** appliqués sur les 5 modèles (botte beige, Chêneau bleu acier, corset blanc cassé, siège gris-beige, tibiale carbone)
- [x] **Tibiale convertie** depuis source Blender (8,4 Mo → 347 Ko)
- [x] **2 nouveaux modèles** ajoutés : cheneau.glb + corset-lombostat.glb
- [x] **Hero patients refondu** : photo façade + plan Google Maps + 4 boutons CTA
- [x] **Topbar refondue** : logo gauche, menu animé, langue explicite, Espace Pro en bouton
- [x] **Mode "transparence + cards opaques"** sur toutes les sections patients
- [x] **Diaporama Guyane** étendu à toutes les pages publiques
- [x] **Partenariats locaux** réintégrés (H'Art Guyane + ECG)
- [x] **Bug liens prescripteurs.html** corrigé dans outil-prescription.html

### En cours / à faire avant mise en ligne
- [ ] **Renseigner le lien BlueFiles** dans `#bluefilesUploadLink` (actuellement bluefiles.fr générique)
- [ ] **Générer les .usdz** pour AR iOS native (Reality Converter Apple)
- [ ] **Compléter motifs adultes** (~6 photos manquantes dans `assets/sections/motifs/`)
- [ ] **Activer GitHub Pages** (Settings → Pages → GitHub Actions) pour preview publique
- [ ] **Compléter traductions** EN/ES/PT/NL/AR/ZH/GCR/HMN (de ~30 à ~150 clés)
- [ ] **Brancher le formulaire de contact** (Formspree, Netlify Forms, ou backend custom)
- [ ] **Auto-héberger Google Fonts** dans `assets/fonts/` (RGPD strict)
- [ ] **Compléter `assets/team/PROMPT.md`** avec le prompt exact Microsoft Designer
- [ ] **Stratégie médias lourds** (vidéos HeyGen 82 Mo + PDFs modes d'emploi 121 Mo) : Git ou CDN ? voir `MEMO-MISE-EN-LIGNE.md`
- [ ] **Décision Google Maps** : iframe directe / click-to-load / bandeau cookies / OpenStreetMap (RGPD CNIL)
- [ ] **Décision finale** : merger sur `main` ou garder branche refonte séparée
- [ ] **Communication aux pros** : envoyer leurs liens d'accès personnels via l'app

---

## 📂 Documents annexes

| Fichier | Contenu |
|---|---|
| `MEMO.md` | Récap session 2 mai (refonte structurelle) |
| `MEMO-SESSION-3MAI2026.md` | Récap session 3 mai (3D, identité, topbar) |
| `MEMO-MISE-EN-LIGNE.md` | Checklist 9 phases pour la mise en prod |
| `MEMO-ACCES-PRO.md` | Procédure d'octroi d'accès individuel pro |
| `BRIEF-CTA-OE3D-V2.md` | Brief du CTA logo 3D du rideau d'entrée |
| `INSTRUCTIONS-TEST.md` | Guide pour relecteurs/testeurs |
| `assets/team/PROMPT.md` | Traçabilité de l'image IA équipe |
| `pro/_access-list.js` | Liste blanche tokens (sensible) |

---

## 🚀 Reprendre le projet

```bash
# 1. Lancer le serveur live-reload (auto-refresh navigateur)
live-server --port=8000 --no-browser ~/Developer/site-oe3d

# 2. Ouvrir Chrome sur http://localhost:8000

# 3. Modifier les fichiers, le navigateur rafraîchit tout seul

# 4. Pour pousser sur GitHub : double-clic sur ~/Desktop/push-changes.command (à recréer si effacé)

# 5. Pour octroyer un accès pro : double-clic sur ~/Desktop/OE3D-Acces-Pro.app
```

---

*Pour la mise en ligne complète, voir `MEMO-MISE-EN-LIGNE.md` (checklist 9 phases).*
