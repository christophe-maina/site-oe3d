/* OE3D — Interactions principales (nav, FAQ, smooth scroll) */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // Hamburger mobile
    const burger = document.getElementById("hamburgerBtn");
    const navList = document.getElementById("navList");
    if (burger && navList) {
      burger.addEventListener("click", () => {
        const open = navList.classList.toggle("open");
        burger.setAttribute("aria-expanded", open);
      });
      navList.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        navList.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }));
    }

    // FAQ accordéon
    document.querySelectorAll(".faq-item").forEach(item => {
      const q = item.querySelector(".faq-q");
      if (!q) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", () => {
        const open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open);
      });
    });

    // Active nav link based on scroll
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link[href^='#']");
    if (sections.length && links.length && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id;
            links.forEach(l => l.removeAttribute("aria-current"));
            const active = document.querySelector(`.nav-link[href="#${id}"]`);
            if (active) active.setAttribute("aria-current", "page");
          }
        });
      }, { rootMargin: "-40% 0px -50% 0px" });
      sections.forEach(s => obs.observe(s));
    }
  });
})();
