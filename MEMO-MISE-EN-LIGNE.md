# MEMO — Mise en ligne du site OE3D V2

> Checklist complète à dérouler quand on est prêt à passer en production.
> À lire avant d'appuyer sur le bouton.

---

## 🎯 Décision stratégique préalable

Avant tout, **trancher 1 question** :

### Où héberger la V2 ?

| Option | Avantages | Inconvénients | Coût |
|---|---|---|---|
| **GitHub Pages** | Gratuit, intégré au repo, déploiement auto via Actions, déjà préparé (`.github/workflows/pages.yml`) | Limite 100 Go/mois bande passante (large pour un cabinet) | 0 € |
| **Cloudflare Pages** | Gratuit, CDN mondial, plus rapide qu'GitHub, déjà utilisé pour la V1 | Limite 500 builds/mois (anti-spam) | 0 € |
| **Netlify** | Gratuit, simple, branch deploys auto | 100 Go/mois, parfois lent depuis Outre-Mer | 0 € |
| **IONOS direct** | Hébergeur historique du domaine | Tu paies déjà l'hébergement → autant l'utiliser ; mais déploiement manuel (FTP) | Inclus dans l'abo IONOS |

**Reco** : **Cloudflare Pages** (déjà configuré pour V1, dev expérience top, latence excellente depuis la Guyane via points de présence régionaux). Sinon GitHub Pages pour rester 100 % dans GitHub.

---

## Phase 1 — Prérequis techniques (à faire AVANT le go)

- [ ] **Convertir `tibiale.3mf`** en GLB optimisé (~400 Ko) — actuellement bloqué Python 3.9
- [ ] **Optimiser les 3 GLB** existants avec `gltf-transform optimize` (Draco) → 1.7 Mo → 400 Ko chacun
- [ ] **Générer les `.usdz`** correspondants pour AR iOS native (Reality Converter Apple)
- [ ] **Compléter motifs adultes** (~6 photos manquantes dans `assets/sections/motifs/`)
- [ ] **Renseigner le vrai lien BlueFiles** dans `pro/index.html` (`#bluefilesUploadLink`) — actuellement pointe sur `bluefiles.fr` générique
- [ ] **Compléter `assets/team/PROMPT.md`** avec le prompt exact Microsoft Designer (traçabilité AI Act)
- [ ] **Brancher le formulaire de contact** réel (Formspree, Netlify Forms, ou backend custom)
- [ ] **Auto-héberger Google Fonts** localement dans `assets/fonts/` (RGPD strict — éviter le transfert UE→US)
- [ ] **Compléter traductions** EN/ES/PT/NL/AR/ZH/GCR/HMN (de ~30 à ~150 clés par langue)

## Phase 2 — Audit et tests

### Performance
- [ ] **Lighthouse audit** sur chaque page (cible : ≥ 90 sur Performance, ≥ 95 sur Accessibilité, ≥ 95 sur SEO)
- [ ] Vérifier que les **GLB sont en lazy load** (pas chargés avant scroll)
- [ ] Vérifier que les **photos sont en lazy load** (`loading="lazy"`)
- [ ] **Compresser** les images > 500 Ko si pas déjà fait

### Accessibilité (WCAG AA)
- [ ] Test au **clavier** : Tab, Shift+Tab, Échap, Entrée, Espace
- [ ] **Contraste** sur tous les textes (WebAIM Contrast Checker → 4.5:1 minimum)
- [ ] **Alt sur 100 %** des `<img>`
- [ ] **ARIA** correct sur les éléments interactifs (modals, gates, sliders)
- [ ] Test avec **VoiceOver** (Cmd+F5 sur Mac) sur la home + 1 page
- [ ] **prefers-reduced-motion** : vérifier que les animations sont désactivables

### Responsive
- [ ] **Mobile** (iPhone) : 320px, 375px, 414px de large
- [ ] **Tablette** (iPad) : 768px, 1024px
- [ ] **Desktop** : 1280px, 1440px, 1920px
- [ ] Tester en **landscape mobile** aussi (paysage)

### Multilingue
- [ ] Tester chaque langue : FR / EN / ES / PT / NL / AR (RTL) / ZH / GCR / HMN
- [ ] Vérifier l'**RTL arabe** (panel a11y, navigation, alignement texte)

### Compatibilité navigateurs
- [ ] **Safari** (Mac + iPhone)
- [ ] **Chrome** (Mac + Android)
- [ ] **Firefox** (Mac)
- [ ] **Edge** (Windows si tu peux)

### RGPD / Cookies
- [ ] Pas de cookies non essentiels par défaut
- [ ] Si Google Fonts en CDN restant : prévoir un consentement
- [ ] Politique de confidentialité dans `mentions-legales.html` à jour
- [ ] **Registre des traitements** OE3D rédigé en parallèle (formulaire contact, BlueFiles, demande accès pro)

### Données de santé
- [ ] **Aucune donnée patient** stockée côté serveur (site statique → OK ✅)
- [ ] BlueFiles HDS configuré et lien URL correct
- [ ] Outil de prescription : pas d'envoi de données identifiantes (validé dans la gate ✅)

---

## Phase 3 — Médias lourds

Décider de la stratégie pour les **vidéos HeyGen + PDFs modes d'emploi** (cf. `MEDIAS-A-INCLURE.md`) :

- [ ] **Option A — Pousser dans le repo** (le plus simple, ~210 Mo, sous limites GitHub/Cloudflare)
- [ ] **Option B — Cloudflare R2 / Bunny CDN** (CDN dédié, plus rapide, ~5 €/mois)
- [ ] **Option C — Vimeo Pro / YouTube non répertorié** pour les vidéos uniquement

**Reco** : option A pour démarrer (simple), migrer vers option B si trafic >10k visites/mois.

Si A choisi : modifier `.gitignore`, copier les médias depuis `~/iCloud/.../site-web/`, commit + push (~5-15 min de push initial).

---

## Phase 4 — Déploiement

### Si Cloudflare Pages (reco)
- [ ] Aller sur https://dash.cloudflare.com → Pages
- [ ] Connecter le repo GitHub `christophe-maina/site-oe3d`
- [ ] **Build settings** : Framework preset = None ; Build output directory = `/` (racine)
- [ ] **Branche de déploiement** : choisir entre :
  - `main` (= passer la V2 en prod sur la branche main → merger d'abord)
  - `claude/resume-website-redesign-v2-Vvwhh` (déployer la branche refonte directement)
- [ ] **Environment variables** : aucune
- [ ] Déployer → Cloudflare donne une URL `xxx.pages.dev`
- [ ] Tester sur cette URL avant de brancher le domaine final

### Si GitHub Pages
- [ ] Repo Settings → Pages → Source = **GitHub Actions**
- [ ] Le workflow `.github/workflows/pages.yml` se déclenche au push
- [ ] URL : `https://christophe-maina.github.io/site-oe3d/`
- [ ] Tester avant DNS

### Test de l'URL de déploiement (avant DNS)
- [ ] Naviguer sur **toutes les sections** de la page patients
- [ ] Tester l'**outil de prescription** avec un token d'accès (depuis l'app `OE3D-Acces-Pro`)
- [ ] Tester les **modèles 3D** (chargement, rotation, AR iOS si tu es sur iPhone)
- [ ] Tester les **vidéos FAQ** + sous-titres VTT multilingues
- [ ] Tester le **formulaire contact** (faut qu'il envoie pour de vrai)

---

## Phase 5 — Bascule du domaine

### Configuration DNS chez IONOS
- [ ] Se connecter au panel IONOS
- [ ] Domaine `orthoespace3d.fr` → DNS / Zone
- [ ] **Pour Cloudflare Pages** :
  - Enregistrement **CNAME** : `www` → `xxx.pages.dev`
  - Enregistrement **A** ou **ALIAS** : `@` (apex) → IPs Cloudflare ou redirect 301 vers `www.`
- [ ] **Pour GitHub Pages** :
  - Enregistrement **CNAME** : `www` → `christophe-maina.github.io`
  - Enregistrement **A** : `@` → IPs GitHub Pages (185.199.108.153 etc.)
  - Settings repo → Custom domain : `www.orthoespace3d.fr`

### Activer HTTPS
- [ ] Cloudflare : automatique via Universal SSL
- [ ] GitHub Pages : cocher "Enforce HTTPS" (après propagation DNS, peut prendre 24h)

### Vérifier la propagation
- [ ] `dig www.orthoespace3d.fr` → doit pointer vers le nouvel hébergeur
- [ ] Tester `https://www.orthoespace3d.fr` dans le navigateur
- [ ] Tester redirection `http://orthoespace3d.fr` → `https://www.orthoespace3d.fr`

---

## Phase 6 — SEO et indexation

- [ ] **`sitemap.xml`** à jour avec toutes les pages (déjà créé)
- [ ] **`robots.txt`** autorise tout sauf `_archive/` et `pro/_admin.html`
- [ ] **Google Search Console** :
  - Ajouter le domaine
  - Soumettre le sitemap
  - Demander l'indexation de la home
- [ ] **Bing Webmaster Tools** (bonus, important pour Outre-Mer)
- [ ] **Mots-clés ciblés** : "orthoprothésiste guyane", "prothèse guyane française", "scoliose corset guyane", "impression 3D médicale guyane"
- [ ] **Open Graph / Twitter Cards** : balises `<meta>` pour les partages sociaux (à ajouter si pas déjà fait)
- [ ] **Schema.org** : balisage `MedicalOrganization` pour le cabinet

---

## Phase 7 — Communication

### Aux patients (V1 actuels)
- [ ] **Email type** annonçant la nouvelle version
- [ ] **Bandeau temporaire** sur l'ancien site Cloudflare V1 : "Notre site fait peau neuve → www.orthoespace3d.fr"
- [ ] **Réseaux sociaux** : annonce sur la page Facebook OE3D (si présente)

### Aux prescripteurs (pros)
- [ ] **Email aux pros déjà en relation** avec leur **lien d'accès personnel** (généré via l'app `OE3D-Acces-Pro`)
- [ ] **Démo de l'outil** lors de la prochaine rencontre / formation continue
- [ ] **Article LinkedIn** pour gagner en visibilité auprès des médecins guyanais

### En interne
- [ ] **Briefer l'équipe** (Apoïna, Céline, Christophe, Christian, Steeve, Thaïna) sur la nouvelle URL
- [ ] **Imprimer une fiche** rappelant : URL, tagline, où trouver les modes d'emploi pour les patients

---

## Phase 8 — Surveillance post-lancement (J+1 à J+7)

- [ ] **Plausible / Matomo** (analytics RGPD) installé pour suivre le trafic
- [ ] **UptimeRobot** (gratuit) configuré pour pinger toutes les 5 min — alerte email si down
- [ ] **Vérifier les retours patients** (cabinet, téléphone) — qu'est-ce qui est confus ?
- [ ] **Vérifier les retours pros** sur l'outil de prescription
- [ ] **Logs Cloudflare / GitHub Pages** : trafic ? 404 ? Erreurs ?

---

## Phase 9 — Décisions stratégiques après lancement

### Merge sur `main` ?
La branche `claude/resume-website-redesign-v2-Vvwhh` peut :
- **Rester séparée** : V2 = branche refonte, V1 = `main` (préservée comme archive)
- **Devenir `main`** : merge → V1 archivée dans `_archive/`, V2 devient officielle

**Reco** : merger sur `main` une fois la V2 stable depuis ~2 semaines. Tu peux tagger l'ancienne `main` comme `v1-archive` avant le merge pour ne rien perdre.

### Décommissionnement V1
- [ ] Désactiver `oe3d.pages.dev` (Cloudflare → Settings → Disable)
- [ ] OU laisser tourner avec une **redirection 301** vers V2 (plus propre pour SEO)
- [ ] Supprimer le repo V1 si différent ? (sinon garder pour archive)

---

## ⚠️ Pièges à éviter

1. **Ne pas toucher au DNS sans avoir testé l'URL de déploiement** — un mauvais CNAME = site offline pendant la propagation (24h)
2. **Ne pas merger sur `main`** sans avoir validé visuellement la V2 sur l'URL de déploiement
3. **Ne pas oublier les `.usdz`** pour AR iOS — sans ça, l'icône AR sur les modèles 3D est inutile sur iPhone
4. **Tester le formulaire contact en réel** — un formulaire qui plante silencieusement = patients perdus
5. **Backup BlueFiles** : si le service tombe, prévoir un canal alternatif clair sur le site (déjà fait : email + WhatsApp + sur place)

---

## 📞 Contacts utiles

| Service | Pour quoi | Contact |
|---|---|---|
| **IONOS** | DNS, domaine | Espace client IONOS |
| **Cloudflare** | Hébergement Pages | dash.cloudflare.com |
| **GitHub** | Repo, Pages | github.com/christophe-maina/site-oe3d |
| **BlueFiles** | Dépôt docs HDS | https://www.bluefiles.fr (compte OE3D) |
| **HeyGen** | Régénérer une vidéo FAQ | heygen.com (compte OE3D) |
| **Microsoft Designer** | Régénérer image équipe IA | designer.microsoft.com |
| **Annuaire santé** | Vérifier RPPS prescripteurs | https://annuaire.sante.fr |

---

## 🚀 Quand on est prêt

1. Lis ce mémo de bout en bout
2. Coche tout ce qui est fait
3. Le jour J : suis Phases 1 à 5 dans l'ordre
4. Le lendemain : Phases 6 à 8
5. Dans 2 semaines : Phase 9

**N'hésite pas à demander à Cowork (ou Claude Code) de t'aider à dérouler chaque étape.**

---

*Bonne mise en ligne ! Tu as bossé dur, le site le mérite.*
