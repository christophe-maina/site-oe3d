/* OE3D — interactions légères, sans dépendance. */
(function () {
  "use strict";

  // --- Menu déroulant (panneau de navigation) ---
  var mm = document.getElementById("megamenu");
  var mmBtns = document.querySelectorAll("[data-mm-open]");
  function setMM(open) {
    if (!mm) return;
    mm.classList.toggle("is-open", open);
    mm.setAttribute("aria-hidden", open ? "false" : "true");
    mmBtns.forEach(function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
  }
  mmBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      setMM(!mm.classList.contains("is-open"));
    });
  });
  if (mm) {
    // ferme quand on clique un lien du panneau
    mm.addEventListener("click", function (e) { if (e.target.closest("a")) setMM(false); });
    // ferme au clic en dehors
    document.addEventListener("click", function (e) {
      if (mm.classList.contains("is-open") && !mm.contains(e.target) && !e.target.closest("[data-mm-open]")) setMM(false);
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMM(false); });

  // --- Sélecteur de langue : i18n d'interface + bascule des sous-titres vidéo ---
  // Le corps des pages reste en français ; seules l'interface (data-i18n) et la piste
  // de sous-titres changent. Dictionnaire dans assets/js/i18n.js (window.OE3D_I18N).
  var I18N = window.OE3D_I18N || null;
  var LKEY = "oe3d_lang";

  function switchVideoTracks(lang) {
    document.querySelectorAll("video.oe3d-video").forEach(function (v) {
      var tt = v.textTracks; if (!tt || !tt.length) return;
      var hit = false;
      for (var i = 0; i < tt.length; i++) {
        if (tt[i].language === lang) { tt[i].mode = "showing"; hit = true; }
        else tt[i].mode = "hidden";
      }
      if (!hit) { for (var j = 0; j < tt.length; j++) { if (tt[j].language === "fr") { tt[j].mode = "showing"; break; } } }
    });
  }

  function setLang(lang) {
    if (!I18N || !I18N.t[lang]) return;
    var t = I18N.t[lang];
    var fr = I18N.t.fr || {};
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    // Pour toute clé absente de la langue choisie, on rétablit le français (jamais
    // une langue précédemment affichée).
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (t[k] !== undefined) ? t[k] : fr[k];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      var v = (t[k] !== undefined) ? t[k] : fr[k];
      if (v !== undefined) el.placeholder = v;
    });
    document.querySelectorAll(".lang__cur").forEach(function (el) {
      el.textContent = (I18N.labels && I18N.labels[lang]) || lang.toUpperCase();
    });
    document.querySelectorAll(".lang__opt").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    switchVideoTracks(lang);
    try { window.localStorage.setItem(LKEY, lang); } catch (e) {}
  }
  window.OE3DsetLang = setLang;

  document.querySelectorAll(".lang").forEach(function (lang) {
    var btn = lang.querySelector(".lang__btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = lang.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    lang.querySelectorAll(".lang__opt").forEach(function (opt) {
      opt.addEventListener("click", function (e) {
        e.stopPropagation();
        setLang(opt.getAttribute("data-lang"));
        lang.classList.remove("is-open");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".lang.is-open").forEach(function (lang) {
      if (!lang.contains(e.target)) lang.classList.remove("is-open");
    });
  });

  // Langue mémorisée : le HTML est livré en FR, on n'applique l'interface que pour une
  // autre langue. Les sous-titres vidéo suivent toujours la langue courante.
  (function () {
    var saved = null;
    try { saved = window.localStorage.getItem(LKEY); } catch (e) {}
    if (saved && I18N && I18N.t[saved] && saved !== "fr") setLang(saved);
    else switchVideoTracks(saved || "fr");
  })();

  // --- Bandeau cookies (pas de traceur tiers : simple acquittement) ---
  var KEY = "oe3d_cookie_ack";
  var cookie = document.querySelector(".cookie");
  if (cookie) {
    var ack = false;
    try { ack = window.localStorage.getItem(KEY) === "1"; } catch (e) {}
    if (ack) {
      cookie.style.display = "none";
    } else {
      cookie.addEventListener("click", function (e) {
        if (e.target.closest("[data-cookie-ack]")) {
          try { window.localStorage.setItem(KEY, "1"); } catch (e) {}
          cookie.style.display = "none";
        }
      });
    }
  }

  // --- Formulaires de démonstration ---
  document.querySelectorAll("form[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = f.querySelector("[data-demo-msg]");
      if (msg) { msg.hidden = false; msg.scrollIntoView({ block: "nearest" }); }
    });
  });

  // --- Galerie : agrandissement plein écran (lightbox) ---
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    function openLb(src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("lb-open");
    }
    function closeLb() {
      lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lb-open"); lbImg.src = "";
    }
    document.querySelectorAll("[data-full]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLb(btn.getAttribute("data-full"), btn.getAttribute("aria-label"));
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest("[data-lb-close]")) closeLb();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  // --- Carte Google chargée à la demande (RGPD : rien n'est contacté avant le clic) ---
  document.querySelectorAll("[data-map-load]").forEach(function (el) {
    var btn = el.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var q = el.getAttribute("data-map-q") || "";
      var ifr = document.createElement("iframe");
      ifr.title = "Carte Google de localisation";
      ifr.loading = "lazy";
      ifr.referrerPolicy = "no-referrer-when-downgrade";
      ifr.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
      el.innerHTML = "";
      el.classList.add("is-loaded");
      el.appendChild(ifr);
    });
  });

  // --- Outil de prescription : stepper 4 étapes ---
  var tool = document.querySelector("[data-tool]");
  if (tool) {
    var steps = tool.querySelectorAll(".tool-step");
    var stItems = tool.querySelectorAll(".stepper .st");
    var bars = tool.querySelectorAll(".stepper .bar");
    function setStep(i) {
      i = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      stItems.forEach(function (s, k) {
        s.classList.toggle("current", k === i);
        s.classList.toggle("done", k < i);
      });
      bars.forEach(function (b, k) { b.classList.toggle("done", k < i); });
      tool.setAttribute("data-current", String(i));
      var main = tool.querySelector(".tool__main");
      if (main) main.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    tool.addEventListener("click", function (e) {
      var t = e.target.closest("[data-step-next],[data-step-prev],[data-step-go]");
      if (!t) return;
      var cur = parseInt(tool.getAttribute("data-current") || "0", 10);
      if (t.hasAttribute("data-step-next")) setStep(cur + 1);
      else if (t.hasAttribute("data-step-prev")) setStep(cur - 1);
      else if (t.hasAttribute("data-step-go")) setStep(parseInt(t.getAttribute("data-step-go"), 10));
    });
    setStep(0);
  }
})();
