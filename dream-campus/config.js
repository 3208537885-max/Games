/* Host integration point. Set window.DREAM_CAMPUS_CONFIG before loading this file.
 * This file never overwrites host values. All paths in this package are relative.
 */
const DREAM_CAMPUS_PARENT_ORIGIN = (() => {
  if (window.parent === window || !document.referrer) return null;
  try { return new URL(document.referrer).origin; } catch (_error) { return null; }
})();

window.DREAM_CAMPUS_CONFIG = Object.assign({
  storagePrefix: 'dream-campus-v1',
  title: '水课梦魇',
  embedded: Boolean(DREAM_CAMPUS_PARENT_ORIGIN),
  parentOrigin: DREAM_CAMPUS_PARENT_ORIGIN, // Derived from the embedding page; always an exact origin.
  onEvent: null,     // function(name, payload) { ... }, local only unless the host sends it.
  debug: false
}, window.DREAM_CAMPUS_CONFIG || {});
