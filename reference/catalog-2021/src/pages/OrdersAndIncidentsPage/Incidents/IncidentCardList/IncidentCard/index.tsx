import React from 'react';

import { IncidentsByUser_incidentsSearch_items } from 'graphql/queries/gqlTypes/IncidentsByUser';
import { useTranslation } from 'react-i18next';
import { ClampTitle, DateLabelSlim } from 'components';
import { IncidentIcon, SlimCardHeader } from '../../../index.style';
import { IncidentStatus } from 'gqlTypes/globalTypes';
import IncidentStepper from './IncidentStepper';
import DescriptionList from './DescriptionList';
import Actions from './Actions';
import { WideCard } from 'components/WideCard';

export interface IncidentCardProps {
  data: IncidentsByUser_incidentsSearch_items;
  isLoading?: boolean;
  onViewDetails: (incident: IncidentsByUser_incidentsSearch_items) => void;
  onComment: (incident: IncidentsByUser_incidentsSearch_items) => void;
  onCancel: (incident: IncidentsByUser_incidentsSearch_items) => void;
  onReopen: (incident: IncidentsByUser_incidentsSearch_items) => void;
  /** Set to true when the card is the last in the page, used to set the position of the actions popover*/
  isLastCard: boolean;
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  data,
  isLoading,
  isLastCard,
  ...rest
}) => {
  const { t } = useTranslation('requests');

  const {
    incidentId,
    incidentNumber,
    assignmentGroup,
    assignedTo,
    shortDescription,
    submittedDate,
    closingDetails,
    progress,
    status,
  } = data;

  // show "submitted date" if closing date is not available.
  const date = closingDetails ? closingDetails.date : submittedDate;

  // show "Submitted" if it is not closed/cancelled/resolved
  const label = () => {
    switch (status) {
      case IncidentStatus.closed:
      case IncidentStatus.resolved:
      case IncidentStatus.cancelled:
        return t(`incident.status.${status}`);
      default:
        return t('incident.status.submitted');
    }
  };

  // show red for "cancelled", green for "closed" and "resolved", otherwise default.
  const color = () => {
    switch (status) {
      case IncidentStatus.cancelled:
        return 'state.danger';
      case IncidentStatus.closed:
      case IncidentStatus.resolved:
        return 'state.success';
      default:
        return 'secondary.0';
    }
  };

  // show stepper when not closed, resolved, or cancelled
  const showStepper = ![
    IncidentStatus.closed,
    IncidentStatus.resolved,
    IncidentStatus.cancelled,
  ].includes(status);

  return (
    <WideCard.Template
      data-testid="incident-card"
      loading={isLoading}
      thumbnail={<IncidentIcon />}
      header={
        <SlimCardHeader>
          <ClampTitle text={shortDescription} id={incidentId} />
          <DateLabelSlim color={color()} label={label()} date={date} />
        </SlimCardHeader>
      }
      body={
        <>
          {showStepper && <IncidentStepper progress={progress} />}
          <DescriptionList
            incidentNumber={incidentNumber}
            status={status}
            closingDetails={closingDetails}
            assignmentGroup={assignmentGroup}
            assignedTo={assignedTo}
          />
        </>
      }
      buttons={<Actions isLastCard={isLastCard} data={data} {...rest} />}
    />
  );
};

export default IncidentCard;
