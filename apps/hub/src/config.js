require('dotenv').config()
export const config = {
    appId: process.env.REACT_APP_AZURE_REG,
    scopes: [
      'user.read',
    ],
    OcpApimUrl: process.env.REACT_APP_OCP_APIM_URL,
    OcpApimSubscriptionKey: process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY,
    APPINSIGHTS_INSTRUMENTATIONKEY : process.env.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY
  };
  
const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit Flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  //issuer: process.env.REACT_APP_OKTA_BASE_URL + '/oauth2/default',
  issuer: process.env.REACT_APP_OKTA_BASE_URL,
  clientId: process.env.REACT_APP_OKTA_CLIENTID,
  redirectUri: window.location.origin + '/login/callback',   
};
  
const oktaSignInConfig = {
  baseUrl: process.env.REACT_APP_OKTA_BASE_URL,
  clientId: process.env.REACT_APP_OKTA_CLIENTID,
  redirectUri: window.location.origin + '/login/callback',
  logo: process.env.REACT_APP_OKTA_LOGO,
  authParams: {
    // If your app is configured to use the Implicit Flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
    issuer: process.env.REACT_APP_OKTA_BASE_URL,
    scopes: [
      "openid",
      "profile",
      "email",
      "address",
      "phone"
    ],
    responseType:  ['id_token','token']
  }
};
  
  export { oktaAuthConfig, oktaSignInConfig };
