import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Computer } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import WideCardListSkeleton from 'components/WideCardListSkeleton';
import RetryQuery from 'components/RetryQuery';
import NoResultsMessage from 'components/NoResultsMessage';
import AssetCardList from '../AssetCardList';
import { TECHNOLOGY_ASSETS } from '../queries';
import { TechnologyAssets } from '../queries/gqlTypes/TechnologyAssets';
import { useTechnologyActionsContext } from '../index';
import { ActionTypes } from '../types';

export const MAX_PAGE_SIZE = 20;

interface QueryWrapperProps {
  keywords: string;
  pageNumber: number;
}
const AssetCardListQueryWrapper: React.FC<QueryWrapperProps> = ({
  keywords = '',
  pageNumber,
}) => {
  const { t } = useTranslation('technology');
  const dispatch = useTechnologyActionsContext();
  const queryVariables = {
    keywords,
    pageNumber,
    pageSize: MAX_PAGE_SIZE,
  };
  const { data, error, loading, refetch } = useQuery<TechnologyAssets>(
    TECHNOLOGY_ASSETS,
    {
      variables: queryVariables,
      fetchPolicy: 'network-only',
      onError: () => {
        dispatch({
          type: ActionTypes.SET_LOADING,
          payload: false,
        });
      },
      onCompleted: () => {
        dispatch({
          type: ActionTypes.SET_LOADING,
          payload: false,
        });
      },
    },
  );

  useEffect(() => {
    if (data) {
      dispatch({
        type: ActionTypes.UPDATE_PAGE_COUNT,
        payload: {
          count: Math.ceil(
            (data.myTechnologyAssets.totalItems || 0) / MAX_PAGE_SIZE,
          ),
          multiple: (data.myTechnologyAssets.totalItems || 0) > MAX_PAGE_SIZE,
        },
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, dispatch]);

  if (loading) {
    return <WideCardListSkeleton />;
  }
  if (error) {
    return <RetryQuery onRetry={() => refetch(queryVariables)} />;
  }
  // Only show the list when there is any match.
  if (data && (data.myTechnologyAssets.totalItems || 0) > 0) {
    return <AssetCardList {...data.myTechnologyAssets} />;
  }
  //  Show fallback message when there is no match.
  return <NoResultsMessage message={t('noAssets')} icon={<Computer />} />;
};

export default AssetCardListQueryWrapper;
