/**
 * Get the page offset of the element with floored integer
 */
export function getOffset(el: Element) {
  const rect = el
    ? el.getBoundingClientRect()
    : {
        left: 0,
        top: 0,
      };
  return {
    left: Math.floor(
      rect.left + (window.scrollX || document.body.scrollLeft || 0),
    ),
    top: Math.floor(
      rect.top + (window.scrollY || document.body.scrollTop || 0),
    ),
  };
}
