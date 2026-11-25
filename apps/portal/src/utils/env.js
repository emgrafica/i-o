/**
 * Returns value stored in environment variable with the given `name`.
 * Throws Error if no such variable or if variable undefined; thus ensuring type-safety.
 * @param name - name of variable to fetch from this process's environment.
 */
const env = function(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

// [JoseM] We will deprecate this object to favor readability
// and organization
const variables = {
  apiScope: 'REACT_APP_API_SCOPE',
  defaultRedirectUri: 'REACT_APP_DEFAULT_REDIRECT_URI',
  clientId: 'REACT_APP_CLIENT_ID',
  baseApiUrl: 'REACT_APP_BASE_API_URL',
  appApiSubscriptionKey: 'REACT_APP_API_SUBSCRIPTION_KEY',
  apiEndpoint: 'REACT_APP_API_GRAPH_ENDPOINT',
  authEndpoint: 'REACT_APP_AUTH_ENDPOINT',
  secret: 'REACT_APP_CLIENT_SECRET',
  nodeEnv: 'NODE_ENV',
  grantType: 'REACT_APP_GRANT_TYPE',
  authClientId: 'REACT_APP_AUTH_CLIENT_ID',
  tokenEndpoint: 'REACT_APP_TOKEN_ENDPOINT',
  msftClientSecret: 'MSFT_CLIENT_SECRET',
  localGraphitiEndpoint: 'LOCAL_GRAPHITI_ENDPOINT',
  buildNumber: 'REACT_APP_BUILD_NUMBER',
  environment: 'REACT_APP_ENV',
  boldAccountId: 'REACT_APP_BOLD_ACCOUNT_ID',
  boldWebsiteId: 'REACT_APP_BOLD_WEBSITE_ID',
  boldInvitationId: 'REACT_APP_BOLD_INVITATION_ID',
  boldChatButtonId: 'REACT_APP_BOLD_CHAT_BUTTON_ID',
  loungeUrl: 'REACT_APP_LOUNGE_URL',
  fileUploaderUrl: 'REACT_APP_FILE_UPLOADER_URL',
  showWorkInProgress: 'REACT_APP_SHOW_WORK_IN_PROGRESS',
  serviceNowChatUrl: 'REACT_APP_SERVICE_NOW_CHAT_URL',
  showWelcomeModalTimestamp: 'REACT_APP_SHOW_WELCOME_MODAL_TIMESTAMP',
};

const appEnv = 'NODE_ENV';
const appName = 'REACT_APP_APP_NAME' || 'PORTAL';
const gtmId = 'REACT_APP_GTM_ID';

const auth = {
  baseUrl: 'REACT_APP_AUTH_BASE_URL',
  clientid: 'REACT_APP_CLIENT_ID',
  issuer: 'REACT_APP_ISSUER',
  defaultScope: 'REACT_APP_AUTH_DEFAULT_SCOPE',
  defaultRedirectUri: 'REACT_APP_DEFAULT_REDIRECT_URI',
  frameLoadTimeout: 'REACT_APP_LOGIN_FRAME_TIMEOUT',
};

const api = {
  apiEndpoint: 'REACT_APP_API_GRAPH_ENDPOINT',
  appApiSubscriptionKey: 'REACT_APP_API_SUBSCRIPTION_KEY',
  baseApiUrl: 'REACT_APP_BASE_API_URL',
  tokenEndpoint: 'REACT_APP_TOKEN_ENDPOINT',
  localGraphitiEndpoint: 'LOCAL_GRAPHITI_ENDPOINT',
};

const awsChat ={
  awsStartChatURL:'REACT_APP_AWS_START_CHAT_URL',
  awsParticipantURL:'REACT_APP_AWS_PARTICIPANT_URL',
  awsContactFlowId:'REACT_APP_AWS_CONTACT_FLOW_ID',
  awsInstanceId: 'REACT_APP_AWS_INSTANCE_ID',
  localStorageKey: 'AWS-CHAT-AUTHEN',
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
const OcpApi = {
  OcpApimUrl: 'REACT_APP_OCP_APIM_URL',
  OcpApimSubscriptionKey: 'REACT_APP_OCP_APIM_SUBSCRIPTION_KEY',
};

const Boomi = {
  BoomiUrl: 'REACT_APP_BOOMI_URL'
};

const chatWidget = {
  chatEnvironment: 'REACT_APP_CONNECT_CHAT_WIDGET_ENVIRONMENT',
  secretKey: 'REACT_APP_CONNECT_CHAT_WIDGET_SECRET_KEY',
}

module.exports = {
  env,
  appEnv,
  auth,
  api,
  appName,
  variables,
  gtmId,
  awsChat,
  oktaAuthConfig,
  oktaSignInConfig,
  OcpApi,
  Boomi,
  chatWidget
};
