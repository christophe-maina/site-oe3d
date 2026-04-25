/**
 * oe3d-subtitles.js — OE3D Video Subtitle Manager
 *
 * S'intègre au sélecteur de langue du site via MutationObserver sur html[lang].
 * Chaque <video class="oe3d-video"> voit sa piste active changée automatiquement.
 *
 * Utilisation :
 *   <script src="oe3d-subtitles.js"></script>
 *
 * Structure VTT attendue dans /subtitles/ :
 *   OE3D_Script{N}_{lang}.vtt  (ex: OE3D_Script1_fr.vtt)
 */

(function () {
  'use strict';

  // Langues supportées — correspondent aux srclang des <track>
  var SUPPORTED = ['fr', 'en', 'es', 'pt', 'nl', 'ar', 'zh', 'gcr'];

  /**
   * Active la piste de sous-titres correspondant à la langue pour une vidéo donnée.
   * @param {HTMLVideoElement} video
   * @param {string} lang  code langue (ex: "fr", "en", "gcr")
   */
  function switchTrack(video, lang) {
    var tracks = video.textTracks;
    if (!tracks || tracks.length === 0) return;

    var found = false;
    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.language === lang) {
        track.mode = 'showing';
        found = true;
      } else {
        track.mode = 'hidden';
      }
    }

    // Si la langue n'a pas de piste, on affiche le FR par défaut
    if (!found) {
      for (var j = 0; j < tracks.length; j++) {
        if (tracks[j].language === 'fr') {
          tracks[j].mode = 'showing';
          break;
        }
      }
    }
  }

  /**
   * Applique la langue courante à toutes les vidéos OE3D de la page.
   */
  function applyLangToAllVideos(lang) {
    var videos = document.querySelectorAll('video.oe3d-video, video[data-oe3d]');
    for (var i = 0; i < videos.length; i++) {
      switchTrack(videos[i], lang);
    }
  }

  /**
   * Lecture de la langue courante du document.
   */
  function currentLang() {
    return document.documentElement.getAttribute('lang') || 'fr';
  }

  /**
   * Initialisation : observe les changements de html[lang]
   * et applique immédiatement la langue active.
   */
  function init() {
    // Application initiale
    applyLangToAllVideos(currentLang());

    // Observation des changements de langue du site
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'lang') {
          applyLangToAllVideos(currentLang());
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Cas particulier : vidéos chargées dynamiquement (pour les SPA)
    document.addEventListener('oe3d:videoAdded', function (e) {
      if (e.detail && e.detail.video) {
        switchTrack(e.detail.video, currentLang());
      }
    });

    // Compatibilité : si le site dispatch un événement 'langchange'
    document.addEventListener('langchange', function (e) {
      var lang = (e.detail && e.detail.lang) ? e.detail.lang : currentLang();
      applyLangToAllVideos(lang);
    });
  }

  // Lancer après chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export public (pour debug ou appel manuel)
  window.OE3DSubtitles = {
    applyLang: applyLangToAllVideos,
    switchTrack: switchTrack,
  };

})();
