/* OE3D — Panel d'accessibilité */
(function () {
  const STORAGE = "oe3d-a11y";
  const DEFAULTS = { fsMult: 1, theme: "auto", dys: false, spaced: false, still: false };

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE) || "{}")); }
    catch { return { ...DEFAULTS }; }
  }
  function save(s) { localStorage.setItem(STORAGE, JSON.stringify(s)); }

  function applyState(s) {
    document.documentElement.style.setProperty("--fs-mult", s.fsMult);
    document.body.classList.toggle("a11y-contrast", s.theme === "contrast");
    document.body.classList.toggle("a11y-dark", s.theme === "dark");
    document.body.classList.toggle("a11y-light", s.theme === "light");
    document.body.classList.toggle("a11y-dys", s.dys);
    document.body.classList.toggle("a11y-spaced", s.spaced);
    document.body.classList.toggle("a11y-still", s.still);
  }

  let state = load();
  applyState(state);

  function buildPanel() {
    if (document.getElementById("a11yPanel")) return;
    const T = (k) => (window.OE3D_I18N ? window.OE3D_I18N.t(k) : k);
    const fab = document.createElement("button");
    fab.className = "a11y-fab";
    fab.id = "a11yFab";
    fab.setAttribute("aria-label", "Aide à la lecture");
    fab.innerHTML = "♿";
    document.body.appendChild(fab);

    const panel = document.createElement("aside");
    panel.className = "a11y-panel";
    panel.id = "a11yPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "a11yTitle");
    panel.innerHTML = `
      <h2 id="a11yTitle">
        <span data-i18n="a11y_title">Aide à la lecture</span>
        <button class="a11y-close" id="a11yClose" aria-label="Fermer">×</button>
      </h2>
      <div class="a11y-group">
        <h3 data-i18n="a11y_text_size">Taille du texte</h3>
        <div class="a11y-options" role="group">
          <button class="a11y-btn" data-fs="0.9">A−</button>
          <button class="a11y-btn" data-fs="1">A</button>
          <button class="a11y-btn" data-fs="1.18">A+</button>
          <button class="a11y-btn" data-fs="1.4">A++</button>
        </div>
      </div>
      <div class="a11y-group">
        <h3 data-i18n="a11y_contrast">Contraste / Thème</h3>
        <div class="a11y-options" role="group">
          <button class="a11y-btn" data-theme="auto">Auto</button>
          <button class="a11y-btn" data-theme="light">Clair</button>
          <button class="a11y-btn" data-theme="dark">Sombre</button>
          <button class="a11y-btn" data-theme="contrast">Élevé</button>
        </div>
      </div>
      <div class="a11y-group">
        <h3 data-i18n="a11y_dys">Police dyslexie</h3>
        <div class="a11y-options"><button class="a11y-btn" data-toggle="dys">OpenDyslexic</button></div>
      </div>
      <div class="a11y-group">
        <h3 data-i18n="a11y_spaced">Espacement renforcé</h3>
        <div class="a11y-options"><button class="a11y-btn" data-toggle="spaced">Activer</button></div>
      </div>
      <div class="a11y-group">
        <h3 data-i18n="a11y_motion">Animations</h3>
        <div class="a11y-options"><button class="a11y-btn" data-toggle="still">Désactiver</button></div>
      </div>
      <button class="btn btn-ghost" id="a11yReset" style="width:100%;margin-top:1rem"
        data-i18n="a11y_reset">Tout réinitialiser</button>
    `;
    document.body.appendChild(panel);

    function refresh() {
      panel.querySelectorAll("[data-fs]").forEach(b =>
        b.setAttribute("aria-pressed", parseFloat(b.dataset.fs) === state.fsMult));
      panel.querySelectorAll("[data-theme]").forEach(b =>
        b.setAttribute("aria-pressed", b.dataset.theme === state.theme));
      panel.querySelectorAll("[data-toggle]").forEach(b =>
        b.setAttribute("aria-pressed", state[b.dataset.toggle]));
    }

    fab.addEventListener("click", () => panel.classList.add("open"));
    panel.querySelector("#a11yClose").addEventListener("click", () => panel.classList.remove("open"));

    panel.querySelectorAll("[data-fs]").forEach(b => b.addEventListener("click", () => {
      state.fsMult = parseFloat(b.dataset.fs); save(state); applyState(state); refresh();
    }));
    panel.querySelectorAll("[data-theme]").forEach(b => b.addEventListener("click", () => {
      state.theme = b.dataset.theme; save(state); applyState(state); refresh();
    }));
    panel.querySelectorAll("[data-toggle]").forEach(b => b.addEventListener("click", () => {
      state[b.dataset.toggle] = !state[b.dataset.toggle]; save(state); applyState(state); refresh();
    }));
    panel.querySelector("#a11yReset").addEventListener("click", () => {
      state = { ...DEFAULTS }; save(state); applyState(state); refresh();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && panel.classList.contains("open")) panel.classList.remove("open");
    });

    refresh();
  }

  document.addEventListener("DOMContentLoaded", buildPanel);
})();
