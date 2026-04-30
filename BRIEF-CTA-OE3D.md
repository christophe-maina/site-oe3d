# Brief — remplacer le CTA "ENTRER" par un logo OE3D en cours d'impression 3D

## Contexte
Christophe trouve le bouton CTA actuel ("ENTRER →") affreux sur le rideau d'entrée
(`index.html`, sur la photo Fleuve Maroni). Il veut le remplacer par une représentation
du logo **OE3D** comme s'il était en train d'être imprimé en 3D.

## Concept visuel

Une zone interactive centrée à la place du bouton actuel, contenant :
- Les lettres **O E 3 D** en grand, en doré (`#d4a847`), font Playfair Display
- Un **plateau d'imprimante 3D** subtil sous les lettres : ligne horizontale en turquoise
  (`#5fb3c4`) avec marquage discret des bords
- Des **strates d'impression** : lignes horizontales fines turquoise (opacity 0.4) qui
  traversent les lettres sur la moitié inférieure, comme si le bas était imprimé
  et le haut pas encore solidifié
- Au-dessous, le mot **ENTRER** en serif/letter-spaced doré, plus petit

## Comportements

### Au repos
- Le logo flotte légèrement (translateY 0 → -4px → 0 sur 4s, courbe ease-in-out)
- Glow doré subtil autour (filter: drop-shadow(0 0 12px rgba(212,168,71,0.25)))

### Au survol (hover/focus)
- Une **ligne dorée fine** (la "tête d'imprimante") descend lentement de haut en bas
  des lettres en 1.5s, puis remonte (animation infinite tant que hover)
- Glow doré s'intensifie (drop-shadow 0 0 24px rgba(212,168,71,0.5))
- Tilt 3D léger : `transform: perspective(800px) rotateX(calc(varY * 6deg)) rotateY(calc(varX * 6deg))`
  où varX/Y suivent la position souris (déjà implémenté pour la carte Guyane → réutiliser
  la même mécanique)
- Curseur : pointer

### Au clic
- Déclenche **exactement** la même action que le bouton actuel : split de la photo
  + transition vers le splash de choix de langue
- Pas de double-handler, on remplace juste l'élément cliquable

### Accessibilité
- `role="button"` + `aria-label="Entrer sur le site Ortho Espace 3D"`
- Focus visible : outline doré 2px à 4px de distance
- Si `prefers-reduced-motion: reduce` → désactiver flottement, ligne d'impression
  et tilt 3D ; conserver uniquement le glow statique

## SVG de référence (à raffiner si besoin)

```html
<button type="button" class="curtain-cta" aria-label="Entrer sur le site Ortho Espace 3D">
  <svg viewBox="0 0 220 140" width="200" height="128" aria-hidden="true">
    <defs>
      <linearGradient id="goldFade" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#d4a847" stop-opacity="0.4"/>
        <stop offset="55%" stop-color="#d4a847" stop-opacity="1"/>
        <stop offset="100%" stop-color="#e9c46a" stop-opacity="1"/>
      </linearGradient>
      <clipPath id="lettersClip">
        <text x="110" y="78" text-anchor="middle"
              font-family="'Playfair Display', serif"
              font-size="56" font-weight="500"
              letter-spacing="6">OE3D</text>
      </clipPath>
    </defs>

    <!-- Lettres OE3D (remplissage doré dégradé) -->
    <text x="110" y="78" text-anchor="middle"
          font-family="'Playfair Display', serif"
          font-size="56" font-weight="500"
          letter-spacing="6"
          fill="url(#goldFade)">OE3D</text>

    <!-- Strates d'impression (visibles seulement dans la moitié basse des lettres) -->
    <g clip-path="url(#lettersClip)" stroke="#5fb3c4" stroke-width="0.8" opacity="0.55">
      <line x1="50"  y1="60" x2="170" y2="60"/>
      <line x1="50"  y1="64" x2="170" y2="64"/>
      <line x1="50"  y1="68" x2="170" y2="68"/>
      <line x1="50"  y1="72" x2="170" y2="72"/>
      <line x1="50"  y1="76" x2="170" y2="76"/>
    </g>

    <!-- Plateau imprimante 3D -->
    <g stroke="#5fb3c4" stroke-width="1.2" fill="none" opacity="0.7">
      <line x1="40" y1="98" x2="180" y2="98"/>
      <line x1="40" y1="98" x2="36" y2="104"/>
      <line x1="180" y1="98" x2="184" y2="104"/>
    </g>

    <!-- Tête d'impression (animée au survol via JS, masquée au repos) -->
    <line class="cta-printhead" x1="50" y1="42" x2="170" y2="42"
          stroke="#d4a847" stroke-width="1.5" opacity="0"/>

    <!-- Mot "ENTRER" -->
    <text x="110" y="124" text-anchor="middle"
          font-family="'Playfair Display', serif"
          font-size="11" font-weight="500"
          letter-spacing="6"
          fill="#d4a847">ENTRER</text>
  </svg>
</button>
```

## CSS suggéré (à intégrer dans `css/style.css`)

```css
.curtain-cta {
  background: transparent;
  border: 0;
  padding: 12px 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 12px rgba(212, 168, 71, 0.25));
  transition: filter 0.4s ease, transform 0.4s ease;
  animation: cta-float 4s ease-in-out infinite;
  transform-style: preserve-3d;
}

.curtain-cta:hover,
.curtain-cta:focus-visible {
  filter: drop-shadow(0 0 24px rgba(212, 168, 71, 0.55));
  outline: none;
}

.curtain-cta:focus-visible {
  outline: 2px solid #d4a847;
  outline-offset: 6px;
  border-radius: 8px;
}

.curtain-cta:hover .cta-printhead,
.curtain-cta:focus-visible .cta-printhead {
  animation: cta-print 1.5s ease-in-out infinite;
}

@keyframes cta-float {
  0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
  50%      { transform: translateY(-4px) rotateX(0) rotateY(0); }
}

@keyframes cta-print {
  0%   { opacity: 0; transform: translateY(-12px); }
  20%  { opacity: 0.9; }
  80%  { opacity: 0.9; }
  100% { opacity: 0; transform: translateY(60px); }
}

@media (prefers-reduced-motion: reduce) {
  .curtain-cta { animation: none; }
  .curtain-cta:hover .cta-printhead,
  .curtain-cta:focus-visible .cta-printhead { animation: none; }
}
```

## Tilt 3D (réutilise la mécanique de la carte Guyane)

Si tu as déjà une fonction qui fait le rotateX/rotateY sur mousemove pour la carte
SVG, branche-la aussi sur `.curtain-cta`. Sinon, ajouter dans le JS du splash :

```js
const cta = document.querySelector('.curtain-cta');
if (cta && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  cta.addEventListener('mousemove', (e) => {
    const r = cta.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    cta.style.transform =
      `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(0)`;
  });
  cta.addEventListener('mouseleave', () => { cta.style.transform = ''; });
}
```

## Garder

- Le clic doit garder son comportement actuel (split de la photo + passage au splash).
  Réutiliser le handler existant, le bouton change mais l'événement reste le même.
- Le `sessionStorage` qui mémorise l'entrée doit continuer de fonctionner.
- L'ESC = passage immédiat doit continuer de fonctionner.

## À ne pas faire

- Pas d'image bitmap : tout en SVG inline pour rester net en zoom.
- Pas de polyfill 3D lourd : `transform: perspective()` natif suffit.
- Pas de changement de la photo Fleuve Maroni ni de la carte Guyane.

## Commit suggéré

```
splash: remplace le CTA texte par un logo OE3D en impression 3D animée

- SVG inline avec lettres dorées Playfair, strates turquoise, plateau d'imprimante
- Animation au survol : tête d'impression qui descend en boucle (1.5s)
- Tilt 3D suivant la souris + glow doré qui s'intensifie
- Conserve le clic = split + sessionStorage + Échap
- Respect prefers-reduced-motion (anim désactivée)
```
