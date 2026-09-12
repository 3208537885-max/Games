/* All network features are opt-in. Load before src/*.js. */
window.FOUR_YEARS_CONFIG = Object.assign({
  gameId: 'unwritten-years',
  title: '未完的四年 · 上大',
  version: '3.0.0',
  rulesVersion: 'uy-shu-3.0.0',
  storagePrefix: 'unwritten-years:shu:v3',
  apiBaseUrl: '',
  apiToken: '', // Development only. Production: provide a short-lived token through the host adapter.
  requestTimeoutMs: 7000,
  parentOrigin: '', // Exact origin only; empty disables postMessage.
  autoSync: false,
  debug: false
}, window.FOUR_YEARS_CONFIG || {});
