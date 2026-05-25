# OE3D — Guide de mise en ligne (IONOS)

Site statique HTML/CSS/JS. **Aucun build, aucun Node, aucune base de données.**
Il suffit de copier le contenu du dossier `site_oe3d/` à la racine web de l'hébergement.

## 1. Avant de publier — à compléter (obligatoire)

Recherche `[À COMPLÉTER]` dans ces 3 pages et remplace par tes infos réelles :

- `mentions-legales.html` — forme juridique, capital, SIRET, RCS, TVA, adresse exacte du siège, directeur de publication, FINESS le cas échéant.
- `confidentialite.html` — responsable de traitement, DPO éventuel, prestataire HDS, durées de conservation.
- `accessibilite.html` — état de conformité après audit, date.

À vérifier aussi (repris des maquettes, **à confirmer**) :

- Adresses : « 1 rue des Arômes, 97354 Remire-Montjoly » et « Saint-Laurent 97320 ».
- Téléphone `0594 28 28 08` et e-mail `contact@orthoespace3d.com` (relevés sur la photo de la devanture).
- Les **formulaires** (contact, demande d'accès) sont en démonstration : ils n'envoient rien.
  Brancher un service d'envoi (ex. formulaire IONOS, Formspree, ou un script PHP) avant de communiquer dessus.

## 2. Hébergement IONOS

1. Connexion à l'espace client IONOS → **Hébergement** → ton pack web.
2. Récupère les identifiants **SFTP/FTP** (serveur, utilisateur, mot de passe).
3. Avec un client comme **FileZilla** (ou Cyberduck) :
   - Hôte : l'adresse SFTP fournie · Port 22 (SFTP) ou 21 (FTP).
   - Va dans le dossier racine web (souvent `/` ou `htdocs/` ou `/clickandbuilds/...`).
   - **Copie tout le contenu de `site_oe3d/`** (les `.html`, `robots.txt` et le dossier `assets/`)
     directement à la racine — pas le dossier `site_oe3d` lui-même, son **contenu**.
4. `index.html` doit se retrouver à la racine pour s'afficher en page d'accueil.

> Astuce : ce guide `.md` et le dossier `_shots` (captures) n'ont pas besoin d'être uploadés.

## 3. Domaine & DNS

- Si le domaine est chez IONOS : associe-le à l'hébergement via **Domaines → Connecter**.
- Si le domaine pointe ailleurs : crée un enregistrement **A** (ou **CNAME** selon IONOS) vers
  l'IP/cible de l'hébergement, fournie dans l'espace client. Propagation : quelques minutes à 48 h.
- Active le **HTTPS** (certificat SSL gratuit IONOS / Let's Encrypt) et force la redirection
  `http → https` et `www → sans www` (ou l'inverse) dans les réglages du pack.

## 4. Après mise en ligne

- Teste chaque page sur mobile et ordinateur.
- Vérifie les liens du pied de page (mentions, RGPD, accessibilité).
- Soumets le site à Google Search Console et ajoute l'URL du sitemap dans `robots.txt`.

## Structure livrée — 25 pages

```
index.html              Accueil (= espace patients, hub vers toutes les sections)
patients.html           Redirection vers index.html (ancienne URL)

ESPACE PATIENTS (relie par le menu deroulant a gauche)
  expertises.html       impression-3d.html   vues-3d.html
  personnalisation.html materiel-specifique.html  videos.html
  modes-emploi.html     parcours.html        equipe.html
  temoignages.html      engagement-local.html  prise-en-charge.html
  faq.html              depot-documents.html   ethique.html
  contact.html

ESPACE PRESCRIPTEURS (noindex)
  prescripteurs.html    Accueil pro
  outil.html            Outil de prescription LPPR en 4 etapes (demonstration)
  protocoles.html       Protocoles cliniques
  demande-acces.html    Demande d'acces (verification RPPS)

LEGAL
  mentions-legales.html confidentialite.html  accessibilite.html

robots.txt
assets/css/   styles.css + fonts.css
assets/fonts/ polices auto-hebergees (Newsreader, Geist, Geist Mono — OFL)
assets/img/   9 photos optimisees + favicon
assets/js/    site.js  (mega-menu, selecteur de langue, bandeau cookies, stepper de l'outil)
```

> Navigation : le bouton **Menu** (en haut a droite) ouvre le **mega-menu plein ecran**
> qui relie toutes les pages. Sert aussi de menu sur mobile.
