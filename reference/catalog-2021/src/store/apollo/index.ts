import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { authLink, link, errorLink, languageLink } from './links';
import resolvers from './store/actions/resolvers';
import { typeDefs } from './store/typeDefs';
import { cache } from './cache';

const links = ApolloLink.from([errorLink, authLink(), languageLink(), link]);

// Instantiate Apollo Client with options
const client = new ApolloClient({
  link: links,
  typeDefs,
  cache,
  resolvers,
});

export default client;
