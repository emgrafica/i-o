import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import { env, variables } from '../../utils/env';
import { nodeEnv } from '../../constants';
import { getGlobalState } from 'utils/globalState';

import { getAccessToken } from 'utils/auth';

/**
 * Link middleware to attach auth token from api to every request
 */
export const authLink = () =>
  setContext(async (_, { headers }) => {
    console.debug('In authLink()');

    try {
      const accessToken = await getAccessToken();

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } catch (error) {
      // We don't want to log these errors in production
      if (env(variables.nodeEnv) !== nodeEnv.production) {
        console.error('Failed to get access token: ', error);
      }
    }
  });

/**
 * Link middleware to attach language to every request
 */
export const languageLink = () =>
  setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        'Accept-Language': getGlobalState('contentLanguage'),
      },
    };
  });

/**
 * Point to API
 */
export const link = new HttpLink({
  uri: process.env.REACT_APP_API_GRAPH_ENDPOINT,
  headers: {
    initiator: 'ioui',
    'Ocp-Apim-Subscription-Key': env(variables.appApiSubscriptionKey),
  },
});

/**
 * Link middleware to catch any graphql or network error that occurs on any request
 */
export const errorLink = onError(errors => {
  const { networkError } = errors;
  if (networkError && 'statusCode' in networkError) {
    switch (networkError.statusCode) {
      case 303:
        // This will redirect to any location coming as part of the response.
        // Currently used to redirect to Outage Page.
        if ('result' in networkError && networkError.result.location) {
          window.location.replace(networkError.result.location);
        }
        break;
    }
  }
});
