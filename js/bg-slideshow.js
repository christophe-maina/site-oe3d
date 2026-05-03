/* Diaporama d'arrière-plan permanent — photos de Guyane et locaux OE3D
   À inclure sur toutes les pages. Crée un <div.splash-slideshow> en
   position fixed derrière tout le contenu. Auto-cycle toutes les 5 s. */
(function () {
  if (document.querySelector(".splash-slideshow")) return; // déjà présent (cas du splash)

  // Détermine le préfixe selon la profondeur de la page (racine vs sous-dossier)
  var prefix = (location.pathname.match(/\/(patients|pro)\//)) ? "../" : "";

  var photos = [
    "guyane-dsc00168.jpg",
    "guyane-dsc00261.jpg",
    "guyane-dsc00283.jpg",
    "guyane-img_0325.jpg",
    "guyane-img_0559.jpg",
    "locaux-facade-oe3d.jpg",
    "guyane-img_0919.jpg",
    "guyane-img_0932.jpg",
    "locaux-accueil-oe3d.jpg",
    "guyane-img_1257.jpg",
    "guyane-img_1863.jpg",
    "locaux-accueil-oe3d-2.jpg",
    "guyane-img_1899.jpg"
  ];

  var wrap = document.createElement("div");
  wrap.className = "splash-slideshow splash-slideshow--global";
  wrap.setAttribute("aria-hidden", "true");

  photos.forEach(function (file, idx) {
    var img = document.createElement("img");
    img.src = prefix + "assets/bg-photos/" + file;
    img.alt = "";
    img.loading = "lazy";
    if (idx === 0) img.className = "active";
    wrap.appendChild(img);
  });

  // Insertion en tout début de body pour être derrière tout le contenu
  document.body.insertBefore(wrap, document.body.firstChild);
  // Marque le body pour rendre le background transparent (CSS)
  document.body.classList.add("has-bg-slideshow");

  // Cycle (sauf si reduced motion)
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var slides = wrap.querySelectorAll("img");
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove("active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 14000);
})();
