import { Box } from '@lumos/core';
import noimageComputer from 'assets/images/noimage_computer.png';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocaleDate from 'utils/useLocaleDate';
import {
  CardRightColumn,
  DeviceTitle,
  RowContainer,
  RowLabel,
  RowValue,
  StyledCard,
  StyledImage,
} from './styled';
import { useTechnologyStateContext } from '..';

/**
 * ComputerCardRow Props
 */
type ComputerCardRowProps = {
  /**
   * Text that determines what information is being displayed
   */
  label: string;
  /**
   * Content of the information being displayed
   */
  value: string;
};
/**
 * Renders a row of information regarding the asset to be returned
 * @param props
 */
const ComputerCardRow: React.FC<ComputerCardRowProps> = ({ label, value }) => (
  <Box display="flex" flexWrap="wrap" flexDirection="column">
    <RowContainer>
      <RowLabel>{label}</RowLabel>
    </RowContainer>
    <RowContainer>
      <RowValue>{value}</RowValue>
    </RowContainer>
  </Box>
);

/**
 * Renders the Card in the Sidesheet that appears when a user clicks the Return button on the AssetCard
 */
const ComputerCard: React.FC = () => {
  const { t } = useTranslation('technology');
  const { assetData } = useTechnologyStateContext();

  const {
    image,
    refreshEligibleDate,
    serialNumber,
    usage,
    productName,
  } = assetData!;

  const unknownText = t(`common:unknown`);
  const formattedRefreshDate = useLocaleDate(refreshEligibleDate);

  return (
    <StyledCard data-testid="computer-card">
      <Box>
        <StyledImage src={image || noimageComputer} alt="asset record" />
      </Box>

      <CardRightColumn>
        <DeviceTitle>{productName}</DeviceTitle>
        <ComputerCardRow
          label={t('common:serialNumber')}
          value={serialNumber || unknownText}
        />
        <ComputerCardRow label={t('card.usage')} value={usage || unknownText} />
        <ComputerCardRow
          label={t('card.refreshEligibleLabel')}
          value={formattedRefreshDate || unknownText}
        />
      </CardRightColumn>
    </StyledCard>
  );
};

export default ComputerCard;
