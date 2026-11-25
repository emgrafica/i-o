import { useContext, Context } from 'react';
import { ApolloError } from 'apollo-client';

/**
 * Loading and error state for Apollo useQuery.
 */
export interface CatalogPageContextType {
  loading: boolean;
  error: ApolloError | undefined;
  handleSetCatalogInfo: () => void;
}

/**
 * Exposes loading and error state context values.
 * This allows us to create a Context object that we can colocate with a query.
 * Exposing this will allow child components to consume loading and error and conditionally render accordingly.
 */
export const useQueryLifecycles = (
  context: Context<CatalogPageContextType>,
) => {
  const { loading, error } = useContext(context);
  return { loading, error };
};
