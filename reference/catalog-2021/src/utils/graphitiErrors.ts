import { ApolloError, isApolloError } from 'apollo-client';

export const isGraphQLError = (error: any): boolean => {
  return isApolloError(error);
};

/**
 * Extracts error code from GraphQL error response
 */
export const getCodeFromGraphQLError = (
  error: ApolloError,
): string | undefined => {
  if (!isGraphQLError(error) || error.graphQLErrors.length !== 1) {
    return undefined;
  }

  const [gqlError] = error.graphQLErrors;

  return (
    gqlError &&
    gqlError.extensions &&
    gqlError.extensions.response &&
    gqlError.extensions.response.body &&
    gqlError.extensions.response.body.code
  );
};

export const ERROR_CODES = {
  REASSIGN_INVALID_TARGET_USER: 'INVALID_TARGET_USER',
};
