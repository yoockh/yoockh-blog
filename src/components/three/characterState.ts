// Shared mutable state between DOM event handlers and the R3F frame loop.
// A plain singleton avoids React re-renders on every mouse move.
export const characterState = {
  // True while the cursor is over the hero character zone
  heroHover: false,
  // Bounded rotation target (±0.5 rad) from cursor X within the hero zone;
  // reset to 0 on mouse leave so the character returns to facing forward
  heroRot: 0,
  // Bounded rotation target (±0.5 rad) from cursor X across the viewport,
  // used for the gentle cursor-follow in the education section
  pointerRot: 0,
}
