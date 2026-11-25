import React from 'react';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import { useTranslation } from 'react-i18next';
import WithoutOrder from './WithoutOrder';
import ReassignForm from './ReassignForm';
import { useQuery } from '@apollo/react-hooks';
import { ASSET_ACTION_VARIATION } from '../../queries';
import {
  AssetActionVariation,
  AssetActionVariationVariables,
} from '../../queries/gqlTypes/AssetActionVariation';
import { useTechnologyStateContext } from '../../index';
import { ClientRequestStatus } from '../../types';
import LoadingScreen from 'components/LoadingScreen';
import { Box } from '@lumos/core';
import SkeletonLoader from '../../SkeletonLoader';
import { AssetType } from 'gqlTypes/globalTypes';

const renderReassignVariation = (withoutOrder: boolean) => {
  return withoutOrder ? <WithoutOrder /> : <ReassignForm />;
};

const ReassignFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const { sideSheetActionStatus, assetData } = useTechnologyStateContext();

  const { data, loading } = useQuery<
    AssetActionVariation,
    AssetActionVariationVariables
  >(ASSET_ACTION_VARIATION, {
    variables: {
      assetId: assetData!.id,
      action: 'reassign',
      assetType: AssetType.Computers,
    },
  });

  let content;
  if (loading) {
    content = <SkeletonLoader />;
  } else if (sideSheetActionStatus.status === ClientRequestStatus.Loading) {
    content = (
      <Box marginTop="184px">
        <LoadingScreen loaderSize="lg" />
      </Box>
    );
  } else if (data) {
    const withoutOrder =
      data.assetActionVariation.variation === 'reassignMessageWithoutOrder';

    content = renderReassignVariation(withoutOrder);
  }

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t(`reassign.header`)}</StyledSideSheetTitle>
      <ComputerCard />
      {content}
    </StyledBox>
  );
};

export default ReassignFlow;
