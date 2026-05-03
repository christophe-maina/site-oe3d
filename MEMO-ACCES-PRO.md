# MEMO — Accès individuel à l'outil de prescription pro

> Procédure pour octroyer un accès personnel à un professionnel de santé.
> Dernière mise à jour : 3 mai 2026

---

## 🔐 Accès permanents en cours

Ces accès sont configurés en dur dans `pro/_access-list.js` avec `expire: null`.

| Personne | Rôle | URL d'accès directe |
|---|---|---|
| **Christophe Maina** | Admin OE3D | `/pro/outil-prescription.html?acces=cm-master-7e3a-9b4c-1f2d-5a8e` |
| **Marc Anatovi** | Bêta-testeur | `/pro/outil-prescription.html?acces=ma-beta-8b1d-3f5a-9c2e-6d7b` |

Les liens complets, à envoyer à chacun :
- **Christophe (toi)** : `https://www.orthoespace3d.fr/pro/outil-prescription.html?acces=cm-master-7e3a-9b4c-1f2d-5a8e`
- **Marc Anatovi** : `https://www.orthoespace3d.fr/pro/outil-prescription.html?acces=ma-beta-8b1d-3f5a-9c2e-6d7b`

Quand la personne ouvre son lien :
1. Le token est lu, validé contre `_access-list.js`
2. Le token est mémorisé dans le `localStorage` du navigateur
3. L'URL est nettoyée (le token disparaît de la barre)
4. Un bandeau vert "Connecté : Christophe Maina" / "Connecté : Marc Anatovi" apparaît
5. Toutes les visites suivantes depuis le même navigateur passent en automatique

**Pour révoquer un accès** : commenter ou supprimer la ligne dans `pro/_access-list.js`, puis push GitHub.

⚠️ **Nouveau verrouillage strict** : le bypass "Je confirme être un professionnel de santé"
(simple checkbox) a été retiré. **Aucune entrée possible sans token valide.**
Les visiteurs sans token voient un message "Accès strictement sur invitation"
et un bouton "Demander un accès" vers `demande-acces.html`.

---

## Architecture en 3 fichiers

| Fichier | Rôle |
|---|---|
| `pro/demande-acces.html` | Formulaire public — le pro remplit ses infos, ça génère un email pré-rempli vers `c.maina@me.com` |
| `pro/_access-list.js` | **Liste blanche** des tokens — modifiée à la main |
| `pro/_admin.html` | Page admin (à ne pas partager) — génère un token aléatoire et la ligne JS à coller |
| `pro/outil-prescription.html` | Outil avec gate qui valide le token automatiquement |

---

## Workflow étape par étape

### Côté pro
1. Le pro va sur **`/pro/demande-acces.html`** (lien depuis la gate de l'outil ou depuis l'espace pro)
2. Il remplit le formulaire (Nom, Prénom, RPPS/ADELI, Profession, Établissement, Email, Téléphone, Motif)
3. Au clic "Envoyer", son client mail s'ouvre avec l'email pré-rempli vers `c.maina@me.com`
4. Il envoie l'email

### Côté Christophe (toi)
1. **Reçoit l'email** "[OE3D Pro] Demande d'accès…"
2. **Vérifie le RPPS** sur https://annuaire.sante.fr (gratuit, public)
   - Pour les orthoprothésistes : numéro ADELI ou agrément CPAM
3. **Si OK**, ouvre `/pro/_admin.html` dans le navigateur (en local : `http://localhost:8000/pro/_admin.html`)
4. Étape 1 : clique **"Générer un token"** → un token type `k7m9-xq2v-3rt8` apparaît
5. Étape 2 : remplit les champs (nom complet, RPPS, profession, etc.)
6. Clique **"Construire la ligne JS"** → 3 zones apparaissent :
   - La ligne JS à coller dans `_access-list.js`
   - Le lien personnel à envoyer au pro
   - Un email type prêt à copier
7. **Édite** `pro/_access-list.js` :
   - Colle la ligne à l'intérieur de `OE3D_ACCESS_LIST = { ... }`
   - Sauvegarde
8. **Push sur GitHub** :
   ```bash
   cd ~/Developer/site-oe3d
   git add pro/_access-list.js
   git commit -m "ajoute accès pro : Dr X (RPPS XXX)"
   git push origin claude/resume-website-redesign-v2-Vvwhh
   ```
9. **Envoie le lien personnel** au pro par email (copie l'email type depuis l'admin)

### Côté pro (suite)
1. Reçoit l'email avec le lien `https://orthoespace3d.fr/pro/outil-prescription.html?acces=k7m9-xq2v-3rt8`
2. Clique le lien
3. La gate reconnaît le token, le mémorise en `localStorage`, **nettoie l'URL** (le token disparaît de la barre)
4. Voit un **bandeau vert** en haut : "✅ Connecté : Dr X — Se déconnecter"
5. À ses prochaines visites, plus besoin du lien — son navigateur se souvient

---

## Révocation d'un accès

1. Ouvrir `pro/_access-list.js`
2. Supprimer (ou commenter avec `//`) la ligne du pro concerné
3. Commit + push
4. À sa prochaine visite, il sera bloqué (la gate s'affichera à nouveau)

---

## Expiration automatique

Pour fixer une date d'expiration au token :
- Dans l'admin, remplir le champ **"Date d'expiration"** (par défaut : vide = pas d'expiration)
- La ligne générée aura `expire: "2027-01-01"` au lieu de `expire: null`
- Le système vérifie automatiquement à chaque visite, et révoque si la date est passée

---

## ⚖️ Conformité

- **RGPD** : les infos collectées sur `demande-acces.html` sont utilisées uniquement pour vérifier le statut pro et octroyer/révoquer l'accès. Conservation : 3 ans après dernière utilisation.
- **Vérification RPPS** : ne pas donner d'accès sans avoir vérifié le numéro sur `annuaire.sante.fr`. C'est ta protection juridique.
- **Page `_admin.html`** : ne jamais partager son URL. Si jamais elle fuit, ce n'est pas grave car elle ne donne pas d'accès — elle aide seulement à fabriquer la ligne JS. Mais c'est plus propre de la garder discrète.
- **Tokens** : générés en local côté navigateur (pas de fuite). Format dictable au téléphone (sans `i`, `l`, `o`, `0`, `1` qui sont ambigus).

---

## ⚠️ Limites de cette approche (à savoir)

1. **Pas de vraie sécurité serveur** : la liste blanche est dans un fichier JS public. Quelqu'un qui inspecte le code source peut voir tous les tokens. → Pour un outil d'aide à la prescription **non sensible aux données patient**, c'est suffisant. Pour stocker des données patient → passer à une vraie auth backend (Cloudflare Access, Auth0, Supabase).
2. **Partage de lien possible** : si un pro envoie son lien à un confrère, le confrère peut accéder. → C'est un effet "wifi password" — gérable en révoquant le token concerné.
3. **Charge manuelle** : ~5 minutes par demande validée. Pour > 100 pros, envisager un service d'auth.

---

*Pour le détail technique, voir le fichier `pro/_access-list.js` et le bloc `<script>` en haut de `pro/outil-prescription.html`.*
