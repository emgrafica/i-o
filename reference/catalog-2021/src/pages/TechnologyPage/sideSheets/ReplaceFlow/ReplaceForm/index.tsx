import { useQuery } from '@apollo/react-hooks';
import { Button } from '@lumos/core';
import ErrorScreen from 'components/ErrorScreen';
import { ActionTypes, AssetAction } from 'pages/TechnologyPage/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSetReplacementInfo } from 'store/apollo/store/hooks';
import { RequestComputersPath } from 'utils/routes';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../..';
import { AlignCenter } from '../../../index.style';
import { RECOMMENDED_REPLACEMENT } from '../../../queries';
import { RecommendedReplacement } from '../../../queries/gqlTypes/RecommendedReplacement';
import SkeletonLoader from '../../../SkeletonLoader';
import {
  StyledContainer,
  StyledContent,
  StyledGrid,
  StyledHeader,
} from '../../WithoutOrderFlow/index.style';
import RecommendAsset from './RecommendAsset';

const ReplaceForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const setReplacementInfo = useSetReplacementInfo();
  const dispatch = useTechnologyActionsContext();

  const history = useHistory();
  const technologyState = useTechnologyStateContext();
  if (!technologyState.assetData || !technologyState.assetData.id) {
    throw new Error(`Failed to proceed: AssetId is undefined.`);
  }
  const { data, loading, error } = useQuery<RecommendedReplacement>(
    RECOMMENDED_REPLACEMENT,
    {
      variables: {
        assetId: technologyState.assetData.id,
      },
    },
  );

  /** Function for canceling sidesheet */
  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  /** Function for taking user to Computers PDP for recommended device when "Continue" button is clicked*/
  const handleContinueWithRecommended: React.FormEventHandler = e => {
    e.preventDefault();
    if (data && data.recommendedReplacement) {
      setReplacementInfo(technologyState.assetData);
      history.push({
        pathname: `${RequestComputersPath}/${data.recommendedReplacement.catalogItemName}`,
      });
    }
  };

  /** Function for taking user to the catalog when "Proceed to Catalog" button is clicked */
  const handleProceedToCatalog: React.FormEventHandler = e => {
    e.preventDefault();
    if (technologyState.assetData) {
      setReplacementInfo(technologyState.assetData);
      history.push({
        pathname: RequestComputersPath,
      });
    }
  };
  let content;
  if (loading) {
    content = <SkeletonLoader />;
  } else if (error) {
    content = (
      <AlignCenter>
        <ErrorScreen />
      </AlignCenter>
    );
  } else {
    content = (
      <>
        {data && data.recommendedReplacement ? (
          <>
            <StyledContainer>
              <StyledHeader>{t('replace.businessRecommended')}</StyledHeader>
              <RecommendAsset
                catalogItemImage={data.recommendedReplacement.catalogItemImage}
                model={data.recommendedReplacement.model}
                catalogItemName={data.recommendedReplacement.catalogItemName}
                data-testid="recommend-asset"
              />
              <StyledContent>
                {t('replace.messageWithRecommended')}
              </StyledContent>
            </StyledContainer>
            <StyledGrid>
              <Button
                data-testid="catalog"
                kind="text"
                marginRight="20px"
                onClick={handleProceedToCatalog}
              >
                {t('replace.toCatalog')}
              </Button>
              <Button
                data-testid="continue"
                onClick={handleContinueWithRecommended}
              >
                {t('common:continue')}
              </Button>
            </StyledGrid>
          </>
        ) : (
          <>
            <StyledContainer>
              <StyledContent>
                {t('replace.messageWithoutRecommended')}
              </StyledContent>
            </StyledContainer>
            <StyledGrid>
              <Button
                data-testid="cancel"
                onClick={handleCancel}
                marginRight="20px"
                kind="text"
              >
                {t('common:cancel')}
              </Button>
              <Button data-testid="catalog" onClick={handleProceedToCatalog}>
                {t('replace.toCatalog')}
              </Button>
            </StyledGrid>
          </>
        )}
      </>
    );
  }
  return content;
};

export default ReplaceForm;
