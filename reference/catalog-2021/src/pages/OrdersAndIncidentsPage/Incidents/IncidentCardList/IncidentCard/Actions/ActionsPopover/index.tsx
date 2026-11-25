import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@lumos/core';
import { ActionButton } from 'pages/TechnologyPage/index.style';
import { IncidentCardProps } from '../../index';
import { IncidentStatus } from '../../../../../../../gqlTypes/globalTypes';

export const getActionClickHandler = (cb: () => void) => {
  return () => {
    document.body.click();
    cb();
  };
};
export type ActionsPopoverProps = Omit<IncidentCardProps, 'isLastCard'>;

// todo - add accessibility - currently doesn't support keyboards
const ActionsPopover: React.FC<ActionsPopoverProps> = ({
  data,
  onViewDetails,
  onComment,
  onCancel,
  onReopen,
}) => {
  const { t } = useTranslation('requests');
  const { cancellable } = data.actions;
  // todo - this logic should come from graphiti
  const canCancel =
    cancellable &&
    (data.status === IncidentStatus.new ||
      data.status === IncidentStatus.inProgress ||
      data.status === IncidentStatus.onHold);
  // todo - this field should come from graphiti
  const canReopen = data.status === IncidentStatus.resolved;

  const handleViewDetails = getActionClickHandler(() => onViewDetails(data));
  const handleComments = getActionClickHandler(() => onComment(data));
  const handleCancel = getActionClickHandler(() => onCancel(data));
  const handleReopen = getActionClickHandler(() => onReopen(data));

  return (
    <Grid flexDirection="column" margin="16px">
      <ActionButton
        kind="text"
        onClick={handleViewDetails}
        data-testid="incident-view-details"
      >
        {t('common:viewDetails')}
      </ActionButton>
      <ActionButton
        kind="text"
        onClick={handleComments}
        data-testid="incident-comments"
      >
        {t('viewAddComment')}
      </ActionButton>
      {canCancel && (
        <ActionButton
          kind="text"
          onClick={handleCancel}
          data-testid="incident-cancel"
        >
          {t('common:cancel')}
        </ActionButton>
      )}
      {canReopen && (
        <ActionButton
          kind="text"
          onClick={handleReopen}
          data-testid="incident-reopen"
        >
          {t('reopen')}
        </ActionButton>
      )}
    </Grid>
  );
};

export default ActionsPopover;
