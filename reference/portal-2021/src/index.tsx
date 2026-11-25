// if IE 11 only
// @ts-ignore
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
if (msie > 0) {
  // IE < 11
  window.location.replace('ie.html');
} else {
  const polyfills: any[] = [];
  // @ts-ignore
  // IE 11
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    console.debug('Adding polyfills');
    // @ts-ignore
    polyfills.push(import('react-app-polyfill/ie11'));
    // @ts-ignore
    polyfills.push(import('react-app-polyfill/stable'));
  }
  // All browsers
  Promise.all(polyfills)
    // @ts-ignore
    .then(() => import('./main'))
    // @ts-ignore
    .catch(error => {
      console.error('Failed to fetch polyfills', error);
    });
}
