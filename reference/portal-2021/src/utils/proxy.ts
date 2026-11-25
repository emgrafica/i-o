// TODO: Remove this file when proxying from (dev.|qa.|stage.)i-o.systems/portal is no longer needed
/**
 * Temporary prefix needed for stage.i-o.systems/portal to serve stage app
 * and i-o.systems/portal to serve production app.
 * stage.i-o.systems/portal will proxy http://example.com
 * i-o.systems/portal will proxy http://example.com
 */
// TODO: move proxyHostNames to env vars
const proxyHostNames = [
  'https://dev.example.com',
  'https://qa.example.com',
  'https://stage.example.com',
  'https://example.com',
];

export const proxyPrefix = '/portal';
export const isProxied = () => {
  return proxyHostNames.indexOf(window.location.origin) !== -1;
};
