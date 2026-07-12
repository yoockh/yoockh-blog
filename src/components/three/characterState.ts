// Shared mutable state between DOM (hero hover zone) and the R3F frame loop.
// A plain singleton avoids React re-renders on every hover change.
export const characterState = {
  hovered: false,
}
