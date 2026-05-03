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

  // EXEMPLE (laissé en commentaire pour montrer le format) :
  // "k7m9-xq2v-3rt8": {
  //   nom: "Dr Jean Dupont",
  //   rpps: "10000456789",
  //   profession: "Médecin MPR",
  //   etabl: "Centre Hospitalier de Cayenne",
  //   email: "j.dupont@example.fr",
  //   date_octroi: "2026-05-02",
  //   expire: null
  // },

  "2cjr-afeb-34ed": {
    nom: "ANATOVI Marc",
    rpps: "88+7+77",
    profession: "Medecin MPR",
    etabl: "Cayenne",
    email: "m;anatovi@aol.fr",
    date_octroi: "2026-05-03",
    expire: null
  },
};
