import { QueryResult } from '@apollo/react-common';
import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import { DocumentNode, OperationVariables } from 'apollo-boost';
import { useEffect, useRef } from 'react';
import { useContentLanguage } from 'store';
import { usePrevious } from './usePrevious';

/**
 * Wrapper for useQuery that automatically re-fetches the query when the
 * content language changes. Use it for queries that return dynamically
 * translated content, i.e. content translated in the back end.
 */
export const useTranslatedQuery = <
  TData = any,
  TVariables = OperationVariables
>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> => {
  const queryResult = useQuery(query, options);

  const { loading, refetch } = queryResult;
  const [languageCode] = useContentLanguage();
  const previousLanguageCode = usePrevious(languageCode, 'en');
  const pendingRefetch = useRef(false);
  useEffect(() => {
    // if the language changes, we either refresh
    // now if the query is not loading or set
    // pendingRefetch to true
    if (languageCode !== previousLanguageCode) {
      if (!loading) {
        refetch();
      } else {
        pendingRefetch.current = true;
      }
    }

    // if the query stops loading and there is a pending refetch,
    // then we refetch
    if (!loading && pendingRefetch.current) {
      refetch();
      pendingRefetch.current = false;
    }
  }, [languageCode, loading, previousLanguageCode, refetch]);

  return queryResult;
};
