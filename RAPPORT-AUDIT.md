# Rapport d'audit — Site Ortho Espace 3D

Audit réalisé le 24 mai 2026 sur le dossier « Site OE3D (a mettre en ligne) ».
Méthode : analyse statique complète (liens, assets, structure) + rendu réel sous navigateur Chromium en mobile (390 px) et desktop (1440 px).

Périmètre : 25 pages HTML, 10 images, 2 feuilles CSS, 1 script JS, 26 polices auto-hébergées, 15 fichiers vidéo (5 vidéos + posters + sous-titres).

---

## 1. Verdict global

Le site est **techniquement sain et déployable**. Aucun lien mort, aucun asset manquant, structure cohérente, conformité RGPD bien pensée. Les réserves restantes sont **éditoriales et juridiques** (champs à compléter, formulaires à brancher, sélecteur de langue décoratif), pas techniques.

État : **prêt pour une mise en ligne dès que les mentions légales sont complétées et les formulaires connectés.**

---

## 2. Ce qui fonctionne bien (avantages)

**Intégrité technique.** Les 24 pages réelles renvoient toutes vers des cibles existantes — zéro lien `.html` cassé, zéro image ou média manquant. Le cache-busting est homogène (`?v=20` sur le CSS et le JS de toutes les pages), ce qui évite les problèmes de cache après mise à jour.

**RGPD exemplaire.** C'est le vrai point fort du site. Les polices sont auto-hébergées (aucun appel à Google Fonts), la carte Google Maps ne se charge qu'après clic explicite (« click-to-load » — rien n'est transmis à Google avant), les vidéos sont auto-hébergées en HTML5 natif (aucun traceur YouTube/Vimeo), et il n'y a aucun cookie de suivi — seul un `localStorage` mémorise l'acquittement du bandeau. Les pages mentions légales, confidentialité et accessibilité existent.

**Accessibilité de base solide.** Lien d'évitement « Aller au contenu », `lang="fr"` partout, un seul `<h1>` par page, attribut `alt` présent sur 100 % des images, focus clavier visible, respect de `prefers-reduced-motion`, `font-display: swap` (pas de texte invisible au chargement). Le contraste de l'accent cuivre (#B85036) sur blanc mesure ~4,95:1, conforme WCAG AA pour le texte normal.

**Responsive fonctionnel.** Viewport déclaré partout, points de rupture à 1024 / 860 / 680 px. Les grilles passent en une colonne sur mobile, les formulaires empilent leurs champs, le menu se replie derrière le bouton « Menu » (panneau overlay plein écran). Vérifié visuellement : accueil, galerie, vidéos, contact, outil et prise en charge s'affichent correctement en 390 px.

**Cohérence et qualité de design.** Identité OE3D homogène sur tout le site, galerie de réalisations plein écran avec lightbox, outil de prescription en 4 étapes, vidéos pédagogiques avec posters et sous-titres FR. Labels produits corrects (Motilo, prothèse fémorale à genou microprocesseur).

**SEO de base.** Titres `<title>` uniques sur les 25 pages, meta descriptions présentes, `noindex` sur les pages pro sensibles (outil, protocoles, demande d'accès), `robots.txt` présent.

**Poids maîtrisé.** 2,7 Mo hors vidéos, vidéos en `preload="metadata"` (elles ne se téléchargent pas tant qu'on ne les lance pas).

---

## 3. Ce qui doit être corrigé (inconvénients)

### Priorité haute — bloquant avant mise en ligne

**P0 — Mentions légales et RGPD incomplets.** Plusieurs champs `[À COMPLÉTER]` subsistent : forme juridique, capital, SIRET, RCS, TVA, adresse exacte du siège, directeur de la publication, prestataire HDS, durées de conservation des données. C'est une **obligation légale** (LCEN art. 6 III) : ces champs doivent être renseignés avant publication.

**P0 — Formulaires non fonctionnels.** Les formulaires (contact, dépôt de documents, demande d'accès prescripteur) sont en mode démonstration (`data-demo`) : ils n'envoient rien. À brancher sur un vrai traitement avant la prod. **Attention** : le dépôt de documents de santé ne doit pas passer par un simple formulaire ou e-mail — il faut un canal hébergé HDS (hébergeur de données de santé certifié).

### Priorité moyenne — qualité et crédibilité

**P1 — Sélecteur de langue décoratif.** Le menu affiche 9 langues (FR, EN, ES, PT, NL, AR, ZH, Kréyòl, Hmong) mais 8 d'entre elles pointent vers `href="#"` : seul le français existe. C'est trompeur pour la patientèle multilingue de Guyane. Deux options : soit retirer le sélecteur, soit implémenter au moins les langues prioritaires localement (créole guyanais, portugais, hmong).

**P1 — Aucune balise Open Graph / Twitter Card.** Quand un lien du site est partagé sur WhatsApp, Facebook ou en message, aucun aperçu (titre + image + description) ne s'affiche. Vu le poids de WhatsApp en Guyane pour le bouche-à-oreille, c'est une perte réelle de visibilité. À ajouter sur chaque page (og:title, og:description, og:image).

**P1 — Marque à sécuriser.** Vérifier la disponibilité de « Ortho Espace 3D » / « OE3D » auprès de l'INPI avant d'asseoir la communication, pour éviter un conflit d'antériorité.

### Priorité basse — optimisations

**P2 — Performance images.** Plusieurs images n'ont pas `loading="lazy"` (galerie : 9, matériel : 3) ni dimensions `width`/`height` explicites. Conséquence : chargement non différé du contenu sous la ligne de flottaison et léger décalage de mise en page (CLS). À ajouter.

**P2 — Polices surnuméraires.** 26 fichiers de police déclarés (10 Geist, 6 Geist Mono, 10 Newsreader). Seules quelques graisses sont réellement utilisées. Élaguer les `@font-face` inutiles et ajouter un `preload` sur la police principale du corps de texte.

**P2 — Pas de sitemap.xml.** À générer et déclarer dans `robots.txt` pour améliorer l'indexation.

**P2 — CSS orphelin.** Les classes `.menu-toggle` et `.mobile-nav` sont définies dans le CSS mais absentes du HTML (vestige d'une version antérieure). Sans impact, à nettoyer pour la propreté.

**P2 — Raccourcis du haut masqués en mobile.** Sous 860 px, les liens d'accès rapide (Contact/RDV, Choix des couleurs, Dépôt de documents, Modes d'emploi) disparaissent. Tout reste accessible via le bouton Menu, mais on perd les raccourcis. Envisager de les conserver sous forme d'icônes.

---

## 4. Rappels juridiques (droit français / européen)

> Je ne suis pas juriste : pour tout enjeu sensible, fais valider par un avocat spécialisé PI/santé, un DPO ou un notaire selon le cas.

- **Données de santé (HDS)** : tout dépôt ou stockage de documents patients doit transiter par un hébergeur certifié HDS. Le formulaire de dépôt actuel ne doit pas être branché sur un envoi e-mail classique.
- **Droit à l'image (art. 9 Code civil)** : les photos montrant des personnes (patients portant un appareillage, collaborateurs) nécessitent une autorisation écrite. Autorisation parentale obligatoire pour les mineurs.
- **Vidéos HeyGen** : les avatars et voix de synthèse relèvent de la licence HeyGen. Vérifier que ta licence couvre la **publication commerciale en ligne** (les offres gratuites/essai l'excluent souvent).
- **LCEN (art. 6)** : mentions légales complètes obligatoires (éditeur, hébergeur, directeur de publication) avant mise en ligne.
- **RGPD** : registre des traitements, information des personnes, base légale par traitement — à finaliser côté responsable de traitement.

---

## 5. Plan d'action recommandé

**Avant la mise en ligne (obligatoire)**
1. Renseigner tous les champs `[À COMPLÉTER]` (mentions légales + confidentialité).
2. Brancher les formulaires sur un vrai traitement (canal HDS pour le dépôt de documents de santé).
3. Confirmer la licence commerciale des vidéos HeyGen.

**Dans la foulée (fort impact, faible effort)**
4. Ajouter les balises Open Graph + une image de partage par page.
5. Trancher sur le sélecteur de langue (retirer ou implémenter les langues prioritaires).
6. Vérifier la marque OE3D à l'INPI.

**Optimisations (quand le temps le permet)**
7. `loading="lazy"` + dimensions sur toutes les images.
8. Élaguer les polices + preload de la police principale.
9. Générer un sitemap.xml.
10. Nettoyer le CSS orphelin.

---

*Aucune anomalie technique bloquante détectée. Le site est solide ; les actions ci-dessus relèvent du contenu, du juridique et de l'optimisation.*
