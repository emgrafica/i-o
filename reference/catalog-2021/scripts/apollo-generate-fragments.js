const axios = require('axios').default;
const fs = require('fs');
const dotenv = require('dotenv');

const { env, variables } = require('../src/utils/env.js');

dotenv.config();

const { localGraphitiEndpoint } = variables;

// API endpoint to hit.
const endpoint = env(localGraphitiEndpoint);

/**
 * Get fragment information for Union and Interface type support for Apollo
 * https://www.apollographql.com/docs/react/v2.6/data/fragments/#fragments-on-unions-and-interfaces
 */
function extractFragments() {
  axios
    .post(`${endpoint}`, {
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
      `,
    })
    .then(res => {
      const filteredData = res.data.data.__schema.types.filter(
        type => type.possibleTypes !== null,
      );
      res.data.data.__schema.types = filteredData;
      fs.writeFile(
        'src/store/apollo/store/states/fragmentMatcher/fragmentTypes.json',
        JSON.stringify(res.data.data),
        err => {
          if (err) {
            console.error('Error writing fragmentTypes file', err);
            process.exit(1);
          } else {
            console.log('Fragment types successfully extracted!');
            process.exit(0);
          }
        },
      );
    })
    .catch(err => {
      console.error('Error fetching GraphQL schema: ', err);
      process.exit(1);
    });
}

extractFragments();
