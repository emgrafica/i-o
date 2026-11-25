const axios = require('axios');
const queryString = require('query-string');
const { env, variables } = require('../src/utils/env.js');
require('dotenv').config();
const {
  grantType,
  authClientId,
  msftClientSecret,
  apiScope,
  tokenEndpoint,
} = variables;

/**
 * Serializes the POST data into a URL query string
 */
const postBody = queryString.stringify({
  grant_type: env(grantType),
  client_id: env(authClientId),
  client_secret: env(msftClientSecret),
  scope: env(apiScope),
});

/**
 * Pings the Microsoft OAuth endpoint to generate a valid JWT token.
 * This token is passed as the Authorization header value when inspecting the
 * GraphQL schema at the remote graphiti endpoint.
 */
const getAccessToken = () => axios.post(env(tokenEndpoint), postBody);

module.exports = getAccessToken;
