import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import ReplaceForm from './ReplaceForm';
import WithoutOrder from './WithoutOrder';
import { useTechnologyStateContext } from '../../index';
import { ASSET_ACTION_VARIATION } from '../../queries';
import {
  AssetActionVariation,
  AssetActionVariationVariables,
} from '../../queries/gqlTypes/AssetActionVariation';
import SkeletonLoader from '../../SkeletonLoader';
import { AssetType } from 'gqlTypes/globalTypes';

const renderReturnVariation = (withoutOrder: boolean) => {
  return withoutOrder ? <WithoutOrder /> : <ReplaceForm />;
};

const ReplaceFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const { assetData } = useTechnologyStateContext();

  const { data, loading } = useQuery<
    AssetActionVariation,
    AssetActionVariationVariables
  >(ASSET_ACTION_VARIATION, {
    variables: {
      assetId: assetData!.id,
      action: 'replace',
      assetType: AssetType.Computers,
    },
  });

  let content;

  if (loading) {
    content = <SkeletonLoader />;
  } else if (data) {
    const withoutOrder =
      data.assetActionVariation.variation === 'replaceMessageWithoutOrder';

    content = renderReturnVariation(withoutOrder);
  }

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t(`replace.header`)}</StyledSideSheetTitle>
      <ComputerCard />
      {content}
    </StyledBox>
  );
};

export default ReplaceFlow;
