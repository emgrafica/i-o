import React from 'react';
import useDevice from 'utils/useDevice';
import ActionsPopover, { getActionClickHandler } from './ActionsPopover';
import { Button, Popover } from '@lumos/core';
import { IncidentCardProps } from '../index';
import { useTranslation } from 'react-i18next';
import { IncidentStatus } from 'gqlTypes/globalTypes';
import { Placement } from '@lumos/core/lib/components/Popover/Popover.style';
import { WideCard } from 'components/WideCard';

/** Actions for the incident cards */
const Actions: React.FC<IncidentCardProps> = ({
  data,
  isLastCard,
  ...rest
}) => {
  const device = useDevice();
  const { t } = useTranslation('requests');
  const { incidentId, status } = data;
  const popoverPlacement: Placement = WideCard.getPopoverPlacement(
    device,
    isLastCard,
  );

  if (status === IncidentStatus.cancelled || status === IncidentStatus.closed) {
    const handleViewDetails = getActionClickHandler(() =>
      rest.onViewDetails(data),
    );

    return (
      <Button
        kind="secondary"
        onClick={handleViewDetails}
        data-testid="incident-view-details"
      >
        {t('common:viewDetails')}
      </Button>
    );
  }
  return (
    <Popover
      id={`incident-actions-${incidentId}`}
      placement={popoverPlacement}
      content={<ActionsPopover data={data} {...rest} />}
      maxHeight="345px"
    >
      <Button width="100%" data-testid="actions">
        {t('actions')}
      </Button>
    </Popover>
  );
};
export default Actions;
