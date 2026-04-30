# Brief V2 — Refonte du rideau d'entrée

## Demande de Christophe (30 avril, soir)
1. **Supprimer la carte de la Guyane** du rideau d'accueil (`index.html`)
2. **Centrer le logo OE3D 3D** à sa place, en plus gros et plus visible
3. **Renforcer les effets 3D** sur le logo : extrusion (épaisseur visible), tilt plus prononcé,
   particules dorées au survol, animation d'entrée

Le but est que le logo OE3D devienne le **seul** point d'attraction visuel et le seul élément
cliquable au centre de la page, à la place de la carte.

---

## Action 1 — Suppression de la carte

Dans `index.html`, supprimer le bloc complet de la carte SVG Guyane :
- Le `<svg id="guyaneMap"...>` ou conteneur équivalent
- Tout le JS qui s'y rattache : event listeners, animations, étiquette de survol,
  marqueur pulsant sur Remire-Montjoly
- Tout CSS dédié (`#guyaneMap`, `.map-marker`, `.map-label`, etc.)

Dans le texte d'instruction en bas du rideau (« Survolez la carte · cliquez pour entrer »),
remplacer par :
```
Cliquez pour entrer
```
(plus court, plus direct, puisqu'il n'y a plus qu'une zone cliquable)

Le clic sur le **logo OE3D** doit conserver l'action de split + passage au splash,
exactement comme le clic sur la carte le faisait auparavant.

---

## Action 2 — Logo OE3D agrandi et centré

Dimensions cibles :
- viewBox SVG `0 0 320 200` (au lieu de `0 0 220 140`)
- Affiché à environ **240px de large sur desktop**, **180px sur mobile**
- Centré horizontalement et verticalement dans la zone qui contenait la carte
- Marge top de ~24px sous le titre « OE3D · Ortho Espace 3D »

---

## Action 3 — SVG avec extrusion 3D (effet de profondeur)

L'idée : empiler plusieurs copies des lettres `OE3D` avec un décalage progressif et
des teintes dorées qui s'éclaircissent vers la surface — illusion de relief épais
comme un objet réellement imprimé en 3D.

```html
<button type="button" class="curtain-cta" aria-label="Entrer sur le site Ortho Espace 3D">
  <svg viewBox="0 0 320 200" width="240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <!-- Dégradé doré pour la face avant -->
      <linearGradient id="goldFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#fff2c5"/>
        <stop offset="35%"  stop-color="#f4d976"/>
        <stop offset="100%" stop-color="#c9962f"/>
      </linearGradient>
      <!-- Strates d'impression -->
      <clipPath id="lettersClip">
        <text x="160" y="118" text-anchor="middle"
              font-family="'Playfair Display', serif"
              font-size="80" font-weight="500"
              letter-spacing="8">OE3D</text>
      </clipPath>
      <!-- Motif grille subtile pour le plateau -->
      <pattern id="bedGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 0 L0 14 M0 0 L14 0" stroke="#5fb3c4" stroke-width="0.4" opacity="0.4"/>
      </pattern>
    </defs>

    <!-- Plateau d'impression avec grille -->
    <g opacity="0.55">
      <rect x="40" y="146" width="240" height="22" fill="url(#bedGrid)"/>
      <line x1="40"  y1="146" x2="280" y2="146" stroke="#5fb3c4" stroke-width="1.4"/>
      <line x1="40"  y1="146" x2="32"  y2="156" stroke="#5fb3c4" stroke-width="1.4"/>
      <line x1="280" y1="146" x2="288" y2="156" stroke="#5fb3c4" stroke-width="1.4"/>
    </g>

    <!-- Extrusion 3D : 7 couches empilées avec offset, du sombre au clair -->
    <g class="cta-extrude">
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#5a3f0c" opacity="0.85"
            transform="translate(7,7)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#7a5717"
            transform="translate(6,6)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#956c1f"
            transform="translate(5,5)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#b08526"
            transform="translate(4,4)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#c9962f"
            transform="translate(3,3)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#dba93a"
            transform="translate(2,2)">OE3D</text>
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="#e9bd47"
            transform="translate(1,1)">OE3D</text>
      <!-- Face avant brillante avec dégradé -->
      <text x="160" y="118" text-anchor="middle" font-family="'Playfair Display', serif"
            font-size="80" font-weight="500" letter-spacing="8" fill="url(#goldFront)">OE3D</text>
    </g>

    <!-- Strates d'impression turquoise sur la moitié basse -->
    <g clip-path="url(#lettersClip)" stroke="#5fb3c4" stroke-width="1" opacity="0.55">
      <line x1="60" y1="92"  x2="260" y2="92"/>
      <line x1="60" y1="98"  x2="260" y2="98"/>
      <line x1="60" y1="104" x2="260" y2="104"/>
      <line x1="60" y1="110" x2="260" y2="110"/>
      <line x1="60" y1="116" x2="260" y2="116"/>
    </g>

    <!-- Tête d'impression : barre + buse (animée au survol via CSS) -->
    <g class="cta-printhead-group">
      <line class="cta-printhead-bar" x1="60" y1="50" x2="260" y2="50"
            stroke="#f4d976" stroke-width="1.5" opacity="0"/>
      <circle class="cta-printhead-nozzle" cx="160" cy="50" r="3"
              fill="#fff2c5" opacity="0"/>
    </g>

    <!-- Particules dorées (animées au survol) -->
    <g class="cta-particles">
      <circle cx="80"  cy="160" r="1.4" fill="#f4d976"/>
      <circle cx="120" cy="160" r="1.2" fill="#dba93a"/>
      <circle cx="160" cy="160" r="1.6" fill="#fff2c5"/>
      <circle cx="200" cy="160" r="1.2" fill="#dba93a"/>
      <circle cx="240" cy="160" r="1.4" fill="#f4d976"/>
    </g>

    <!-- Mot ENTRER -->
    <text x="160" y="190" text-anchor="middle"
          font-family="'Playfair Display', serif"
          font-size="13" font-weight="500"
          letter-spacing="8"
          fill="#f4d976">ENTRER</text>
  </svg>
</button>
```

---

## Action 4 — CSS renforcé

```css
.curtain-cta {
  background: transparent;
  border: 0;
  padding: 16px 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.45))
          drop-shadow(0 0 18px rgba(244, 217, 118, 0.25));
  transition: filter 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: cta-float 5s ease-in-out infinite;
  /* Animation d'entrée à l'apparition du rideau */
  opacity: 0;
  transform: translateY(20px) scale(0.92);
  animation: cta-enter 1s 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) forwards,
             cta-float 5s 1.4s ease-in-out infinite;
}

.curtain-cta svg { display: block; }

.curtain-cta:hover,
.curtain-cta:focus-visible {
  outline: none;
  filter: drop-shadow(0 10px 28px rgba(0, 0, 0, 0.55))
          drop-shadow(0 0 36px rgba(244, 217, 118, 0.65));
}

.curtain-cta:focus-visible {
  outline: 2px solid #f4d976;
  outline-offset: 8px;
  border-radius: 12px;
}

/* Tête d'impression : descend en boucle au survol */
.curtain-cta:hover .cta-printhead-bar,
.curtain-cta:focus-visible .cta-printhead-bar,
.curtain-cta:hover .cta-printhead-nozzle,
.curtain-cta:focus-visible .cta-printhead-nozzle {
  animation: cta-print 1.6s ease-in-out infinite;
}

/* Particules : montent au survol */
.curtain-cta:hover .cta-particles circle,
.curtain-cta:focus-visible .cta-particles circle {
  animation: cta-spark 1.8s ease-out infinite;
}
.curtain-cta:hover .cta-particles circle:nth-child(1) { animation-delay: 0s; }
.curtain-cta:hover .cta-particles circle:nth-child(2) { animation-delay: 0.3s; }
.curtain-cta:hover .cta-particles circle:nth-child(3) { animation-delay: 0.6s; }
.curtain-cta:hover .cta-particles circle:nth-child(4) { animation-delay: 0.9s; }
.curtain-cta:hover .cta-particles circle:nth-child(5) { animation-delay: 1.2s; }

@keyframes cta-enter {
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes cta-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@keyframes cta-print {
  0%   { opacity: 0; transform: translateY(-8px); }
  20%  { opacity: 0.95; }
  80%  { opacity: 0.95; }
  100% { opacity: 0; transform: translateY(120px); }
}

@keyframes cta-spark {
  0%   { opacity: 0; transform: translateY(0) scale(0.5); }
  20%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-80px) scale(1.2); }
}

@media (prefers-reduced-motion: reduce) {
  .curtain-cta {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .curtain-cta:hover .cta-printhead-bar,
  .curtain-cta:focus-visible .cta-printhead-bar,
  .curtain-cta:hover .cta-printhead-nozzle,
  .curtain-cta:focus-visible .cta-printhead-nozzle,
  .curtain-cta:hover .cta-particles circle,
  .curtain-cta:focus-visible .cta-particles circle {
    animation: none;
  }
}
```

---

## Action 5 — Tilt 3D plus prononcé

Dans le JS du rideau (récupère le code existant qui faisait le tilt sur la carte
et applique-le maintenant au CTA, avec une intensité plus forte) :

```js
const cta = document.querySelector('.curtain-cta');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cta && !reducedMotion) {
  cta.addEventListener('mousemove', (e) => {
    const r = cta.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;  // -0.5 .. +0.5
    const py = (e.clientY - r.top)  / r.height - 0.5;
    cta.style.transform =
      `perspective(900px) rotateY(${px * 16}deg) rotateX(${-py * 14}deg) translateZ(20px)`;
  });
  cta.addEventListener('mouseleave', () => {
    cta.style.transform = '';  // retour à la position de l'animation float
  });
}
```

Note : l'intensité passe de `8deg` à `16deg/14deg` + ajout d'un `translateZ(20px)`
qui fait que le logo "avance" vers le visiteur au survol. Ne pas dépasser ces
valeurs sinon ça devient désorientant.

---

## Action 6 — Le clic doit déclencher le split

Le `<button class="curtain-cta">` est maintenant le seul élément cliquable du
rideau. Brancher le handler du split (qui était sur la carte) sur ce bouton :

```js
cta.addEventListener('click', () => {
  triggerCurtainSplit();  // ou la fonction existante
});
```

Garder aussi : Échap = passage immédiat, sessionStorage pour ne pas rejouer
dans la même session.

---

## À ne pas faire

- Pas d'image bitmap : tout en SVG inline
- Pas de filter SVG (feGaussianBlur, etc.) — utiliser uniquement les CSS drop-shadow
- Ne pas toucher à la photo Fleuve Maroni ni au titre OE3D
- Ne pas toucher à `patients/`, `pro/`, ni aux modals PDF/vidéo

---

## Commit suggéré

```
splash: retire la carte Guyane, CTA OE3D au centre avec extrusion 3D

- Suppression complète du SVG carte + JS associé (marqueur, étiquette, hover)
- CTA logo OE3D agrandi (viewBox 320x200, 240px desktop) et centré
- Effet d'extrusion : 8 couches empilées du brun au doré clair (relief épais)
- Tilt 3D renforcé (16°/14° + translateZ 20px au survol)
- Animation d'entrée (fade-in + scale) à l'apparition du rideau
- Particules dorées qui montent au survol
- Tête d'impression avec buse + barre, animation 1.6s
- Glow doré renforcé en hover
- Texte d'instruction : « Cliquez pour entrer »
- Le clic sur le CTA déclenche le split (transféré depuis la carte)
- Respect prefers-reduced-motion (toutes anims désactivées)
```
