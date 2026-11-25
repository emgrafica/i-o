import {
  BrowserCacheLocation,
  Configuration,
  IPublicClientApplication,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser';
import { env, variables } from '../utils/env';
import { isProxied, proxyPrefix } from '../utils/proxy';

// TODO: change redirectUri: isProxied()
// ? window.location.origin + proxyPrefix
// : window.location.origin,
// to redirectUri: window.location.origin,
// when proxying from (dev.|qa.|stage.)i-o.systems/portal is no longer needed

export const configuration: Configuration = {
  auth: {
    redirectUri: isProxied()
      ? window.location.origin + proxyPrefix
      : window.location.origin,
    authority: env(variables.authEndpoint),
    clientId: env(variables.clientId),
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    // TODO: only store auth state in cookie if there are compatibility issues
    // with IE
    storeAuthStateInCookie: false,
  },
};

export const loginRequestConfig: RedirectRequest = {
  scopes: [env(variables.apiScope)],
};

// TODO: Expose the instance as a function that creates an instance (or returns the initialized instance if already created)
const authInstance: IPublicClientApplication = new PublicClientApplication(
  configuration,
);

// Helpful Azure AD authentication references
/*
- MSAL Browser docs (helpful for understanding various components exposed by the library) - https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser/docs
- Auth workflow                                                                           - https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
- Basic auth tutorial                                                                     - https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-auth-code
- Setting up a new App Registration                                                       - https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
- Reply URL info                                                                          - https://docs.microsoft.com/en-us/azure/active-directory/develop/reply-url
*/

export default authInstance;
