import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import PickupForm from './PickupForm';
import WithoutOrder from './WithoutOrder';
import { useTranslation } from 'react-i18next';
import { ASSET_ACTION_VARIATION } from '../../queries';
import {
  AssetActionVariation,
  AssetActionVariationVariables,
} from '../../queries/gqlTypes/AssetActionVariation';
import SkeletonLoader from '../../SkeletonLoader';
import { useTechnologyStateContext } from '../../index';
import { AssetType } from 'gqlTypes/globalTypes';

const renderReturnVariation = (variation: string) => {
  switch (variation) {
    case 'returnPickup':
    case 'returnLabelDownload':
      return <PickupForm {...{ variation }} />;
    case 'returnWithoutOrder':
      return <WithoutOrder />;
    default:
      throw new Error(`Unsupported variation - ${variation}`);
  }
};

const ReturnFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const { assetData } = useTechnologyStateContext();

  const { data, loading } = useQuery<
    AssetActionVariation,
    AssetActionVariationVariables
  >(ASSET_ACTION_VARIATION, {
    variables: {
      assetId: assetData!.id,
      action: 'return',
      assetType: AssetType.Computers,
    },
  });

  let content;

  if (loading) {
    content = <SkeletonLoader />;
  } else if (data) {
    content = renderReturnVariation(data.assetActionVariation.variation);
  }

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t(`return.header`)}</StyledSideSheetTitle>
      <ComputerCard />
      {content}
    </StyledBox>
  );
};

export default ReturnFlow;
