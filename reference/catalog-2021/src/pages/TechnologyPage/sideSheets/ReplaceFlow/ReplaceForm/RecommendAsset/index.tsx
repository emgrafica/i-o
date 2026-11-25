import React from 'react';
import { useTranslation } from 'react-i18next';
import noimageComputer from 'assets/images/noimage_computer.png';
import { Box } from '@lumos/core';
import {
  StyledCard,
  StyledImage,
  CardRightColumn,
  StyledHeader,
  StyledContent,
} from './styles';
import { RecommendedReplacement_recommendedReplacement } from 'pages/TechnologyPage/queries/gqlTypes/RecommendedReplacement';

interface RecommendAssetProps
  extends Pick<
    RecommendedReplacement_recommendedReplacement,
    'model' | 'catalogItemName' | 'catalogItemImage'
  > {}

const RecommendAsset: React.FC<RecommendAssetProps> = props => {
  const { t } = useTranslation('technology');
  const unknownText = t(`common:unknown`);
  return (
    <StyledCard data-testid="recommend-asset">
      <Box>
        <StyledImage
          src={props.catalogItemImage || noimageComputer}
          alt={t('recommendAsset.altImage')}
        />
      </Box>
      <CardRightColumn>
        <StyledHeader>{props.model || unknownText}</StyledHeader>
        <StyledContent>{props.catalogItemName || unknownText}</StyledContent>
      </CardRightColumn>
    </StyledCard>
  );
};

export default RecommendAsset;
