/* ============================================================
   LISTE BLANCHE — Accès à l'outil de prescription OE3D
   ============================================================
   Chaque entrée = un professionnel de santé validé.
   Procédure pour ajouter une entrée : voir MEMO-ACCES-PRO.md à la racine.

   Format :
     "TOKEN": {
       nom: "Dr Prénom NOM",
       rpps: "10000XXXXXX",
       profession: "MPR | Orthopédiste | Rhumatologue | ...",
       etabl: "CHC / Cabinet / ...",
       email: "...@...",
       date_octroi: "YYYY-MM-DD",
       expire: null      // null = pas d'expiration ; sinon "YYYY-MM-DD"
     }

   Pour révoquer un accès : commenter ou supprimer la ligne, puis push.
   ============================================================ */

window.OE3D_ACCESS_LIST = {

  // ============================================================
  // ACCÈS PERMANENTS — Équipe OE3D et bêta-testeurs
  // ============================================================

  "cm-master-7e3a-9b4c-1f2d-5a8e": {
    nom: "Christophe Maina",
    rpps: "—",
    profession: "Co-direction OE3D · Orthoprothésiste",
    etabl: "Ortho Espace 3D — Remire-Montjoly",
    email: "c.maina@me.com",
    date_octroi: "2026-05-03",
    expire: null,
    role: "admin"
  },

  "ma-beta-8b1d-3f5a-9c2e-6d7b": {
    nom: "Marc Anatovi",
    rpps: "—",
    profession: "Bêta-testeur",
    etabl: "—",
    email: "—",
    date_octroi: "2026-05-03",
    expire: null,
    role: "beta-tester"
  },

  // ============================================================
  // EXEMPLE (laissé en commentaire pour montrer le format) :
  // ============================================================
  // "k7m9-xq2v-3rt8": {
  //   nom: "Dr Jean Dupont",
  //   rpps: "10000456789",
  //   profession: "Médecin MPR",
  //   etabl: "Centre Hospitalier de Cayenne",
  //   email: "j.dupont@example.fr",
  //   date_octroi: "2026-05-02",
  //   expire: null
  // },

};
