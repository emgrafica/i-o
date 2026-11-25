import React from 'react';
import { Box, Grid, Popover } from '@lumos/core';
import { CheckCircle } from '@material-ui/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import noimageComputer from 'assets/images/noimage_computer.png';
import useLocaleDate from 'utils/useLocaleDate';
import { ClampTitle } from 'components';
import {
  TechnologyAssets_myTechnologyAssets_computers_actions,
  TechnologyAssets_myTechnologyAssets_computers,
} from '../../types/TechnologyAssets';
import { ComputerAsset } from '../../types';
import { ActionButton } from '../../index.style';
import { ActionsButton } from './index.style';
import useDevice from 'utils/useDevice';
import { WideCard } from 'components/WideCard';
import { Placement } from '@lumos/core/lib/components/Popover/Popover.style';

/**
 * Props for the AssetCard component
 */
interface AssetCardProps {
  data: TechnologyAssets_myTechnologyAssets_computers;
  onReassign: (asset: ComputerAsset) => void;
  onReturn: (asset: ComputerAsset) => void;
  onReportBroken: (asset: ComputerAsset) => void;
  onReplace: (asset: ComputerAsset) => void;
  onReportMissing: (asset: ComputerAsset) => void;
  onRegisterOwnership: (asset: ComputerAsset) => void;
  onReportOwnershipError: (asset: ComputerAsset) => void;
  onEditUsage: (asset: ComputerAsset) => void;
  onWipeComputer: (asset: ComputerAsset) => void;
  /** Set to true when the card is the last in the page, used to set the position of the actions popover*/
  isLastCard: boolean;
  /** Set to true when the computer has been reassigned, used to apply reassigned overlay on card */
  isReassigned: boolean;
  /** Set to true when a mutation being done on the asset has successfully completed
   * Set back to false after a 2 second timeout */
  isAssetLoading: boolean;
}

const getActionClickHandler = (cb: () => void) => {
  return () => {
    document.body.click();
    cb();
  };
};

export type ActionsPopoverProps = Omit<
  AssetCardProps,
  'isLastCard' | 'isReassigned' | 'isAssetLoading'
>;
const ActionsPopover: React.FC<ActionsPopoverProps> = ({
  data,
  onReassign,
  onReturn,
  onReportBroken,
  onReplace,
  onEditUsage,
  onRegisterOwnership,
  onReportMissing,
  onReportOwnershipError,
  onWipeComputer,
}) => {
  const { t } = useTranslation('technology');
  const {
    showEditUsage,
    showReplaceable,
    showReportBroken,
    showReturn,
    canReassign,
    canRegisterOwnership,
    canReportMissing,
    canReportOwnershipError,
    canWipe,
  } = data.actions as TechnologyAssets_myTechnologyAssets_computers_actions;
  const handleReturn = getActionClickHandler(() => onReturn(data));
  const handleReplace = getActionClickHandler(() => onReplace(data));
  const handleReportBroken = getActionClickHandler(() => onReportBroken(data));
  const handleReportMissing = getActionClickHandler(() =>
    onReportMissing(data),
  );
  const handleReassign = getActionClickHandler(() => onReassign(data));
  const handleWipeComputer = getActionClickHandler(() => onWipeComputer(data));
  const handleEditUsage = getActionClickHandler(() => onEditUsage(data));
  const handleRegisterOwnership = getActionClickHandler(() =>
    onRegisterOwnership(data),
  );
  const handleReportOwnershipError = getActionClickHandler(() =>
    onReportOwnershipError(data),
  );

  return (
    <Grid flexDirection="column">
      {canReassign && (
        <ActionButton
          kind="text"
          onClick={handleReassign}
          data-testid="reassign"
        >
          {t('card.reassign')}
        </ActionButton>
      )}
      {canRegisterOwnership && (
        <ActionButton
          kind="text"
          onClick={handleRegisterOwnership}
          data-testid="registerOwnership"
        >
          {t('card.registerOwnership')}
        </ActionButton>
      )}
      {/* Due to DXC needs we have changed the title to refresh
        This is a short term fix for launch. */}
      {showReplaceable && (
        <ActionButton kind="text" onClick={handleReplace} data-testid="replace">
          {t('card.refresh')}
        </ActionButton>
      )}
      {showReportBroken && (
        <ActionButton
          kind="text"
          onClick={handleReportBroken}
          data-testid="reportBroken"
        >
          {t('card.reportBroken')}
        </ActionButton>
      )}
      {canReportMissing && (
        <ActionButton
          kind="text"
          onClick={handleReportMissing}
          data-testid="reportMissing"
        >
          {t('card.reportMissing')}
        </ActionButton>
      )}
      {canReportOwnershipError && (
        <ActionButton
          kind="text"
          onClick={handleReportOwnershipError}
          data-testid="reportOwnershipError"
        >
          {t('card.reportOwnershipError')}
        </ActionButton>
      )}
      {canWipe && (
        <ActionButton
          kind="text"
          onClick={handleWipeComputer}
          data-testid="wipeComputer"
        >
          {t('card.wipeComputer')}
        </ActionButton>
      )}
      {showReturn && (
        <ActionButton kind="text" onClick={handleReturn} data-testid="return">
          {t('card.return')}
        </ActionButton>
      )}
      {showEditUsage && (
        <ActionButton
          kind="text"
          data-testid="editUsage"
          onClick={handleEditUsage}
        >
          {t('card.editUsage')}
        </ActionButton>
      )}
    </Grid>
  );
};

/**
 * AssetCard the container for all the information and actions about a single asset
 */
const AssetCard: React.FC<AssetCardProps> = ({
  data,
  isReassigned,
  isLastCard,
  isAssetLoading,
  ...props
}) => {
  const { t } = useTranslation('technology');
  const {
    serialNumber,
    refreshEligible,
    refreshEligibleDate,
    usage,
    image,
    productName,
  } = data;
  const device = useDevice();
  const popoverPlacement: Placement = WideCard.getPopoverPlacement(
    device,
    isLastCard,
  );
  const unknownText = t(`common:unknown`);
  const hasActions = Object.values(data.actions || {}).some(
    val => typeof val === 'boolean' && val,
  );

  const buttons = hasActions && (
    <Popover
      id={`asset-actions-${serialNumber}`}
      placement={popoverPlacement}
      content={<ActionsPopover data={data} {...props} />}
      maxHeight="345px"
    >
      <ActionsButton data-testid="actions">{t('common:actions')}</ActionsButton>
    </Popover>
  );

  const SuccessCheck = styled(CheckCircle)`
    ${({ theme }) => `
    color: ${theme.colors.state.success};
    margin-bottom: 6px; 
    `}
  `;

  const reassignedIcon = (
    <Box display="flex" alignItems="center" flexDirection="column">
      <SuccessCheck fontSize="large" />
      <div>{t('requests:order.stages.Reassigned')}</div>
    </Box>
  );

  return (
    <WideCard.Template
      data-testid="asset-card"
      minHeightMobile="150px"
      thumbnail={<img src={image || noimageComputer} alt="asset record" />}
      badgeText={refreshEligible ? t('card.refreshEligibleBadge') : ''}
      showOverlay={isReassigned}
      loading={isAssetLoading}
      header={
        productName && (
          <Box maxWidth="80%">
            <ClampTitle text={productName} id={serialNumber} />
          </Box>
        )
      }
      body={
        <>
          <WideCard.Field
            label={t('common:serialNumber')}
            value={serialNumber || unknownText}
          />
          <WideCard.Field
            label={t('card.usage')}
            value={usage || unknownText}
          />
          <WideCard.Field
            label={t('card.refreshEligibleLabel')}
            value={useLocaleDate(refreshEligibleDate) || unknownText}
          />
        </>
      }
      buttons={isReassigned ? reassignedIcon : buttons}
    />
  );
};

export default AssetCard;
