/**
 * Pings the GraphQL endpoint to generate schema definitions via Apollo codegen.
 *
 * Codegen docs: https://www.apollographql.com/docs/angular/features/developer-tooling/#usage
 */
const shell = require('shelljs');
const dotenv = require('dotenv');
const { env, variables } = require('../src/utils/env.js');

dotenv.config();

const { appApiSubscriptionKey, localGraphitiEndpoint } = variables;

// API endpoint to hit.
const endpoint = env(localGraphitiEndpoint);

// Subscription key header
const subscriptionKey = env(appApiSubscriptionKey);

// Name of folder to hold definitions.
const typeDir = 'gqlTypes';

/**
 * Generates GraphQL types for all GraphQL operations(queries and mutations).
 */
const generateApolloTypes = () => {
  try {
    shell.exec(
      `find . -type d -name '${typeDir}' -exec rm -r {} + && apollo codegen:generate --watch --endpoint ${endpoint} --target=typescript --header="initiator: ioui" --header="Ocp-Apim-Subscription-Key: ${subscriptionKey}" --tagName=gql --addTypename --globalTypesFile=src/${typeDir}/globalTypes.ts ${typeDir}`,
    );
  } catch (error) {
    throw new Error(`Error when generating GraphQL types: ${error}`);
  }
};

generateApolloTypes();
