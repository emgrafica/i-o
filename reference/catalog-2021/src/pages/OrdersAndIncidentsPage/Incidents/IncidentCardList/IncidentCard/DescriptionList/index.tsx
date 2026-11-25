import React from 'react';
import { useTranslation } from 'react-i18next';
import { IncidentStatus } from 'gqlTypes/globalTypes';
import { IncidentsByUser_incidentsSearch_items } from 'graphql/queries/gqlTypes/IncidentsByUser';
import { WideCard } from 'components/WideCard';
import ShowFor from 'components/ShowFor';
import HorizontalLine from 'components/HorizontalLine';

type DescriptionListProps = Pick<
  IncidentsByUser_incidentsSearch_items,
  | 'incidentNumber'
  | 'assignmentGroup'
  | 'assignedTo'
  | 'status'
  | 'closingDetails'
>;

const DescriptionList: React.FC<DescriptionListProps> = ({
  incidentNumber,
  assignmentGroup,
  assignedTo,
  status,
  closingDetails,
}) => {
  const { t } = useTranslation('requests');

  const reason = closingDetails ? closingDetails.reason : '';
  const showCancelReason = status === IncidentStatus.cancelled && reason;

  return (
    <>
      <WideCard.Field
        label={t('incident.incidentNumber')}
        value={incidentNumber}
      />
      <WideCard.Field
        label={t('incident.assignmentGroup')}
        value={assignmentGroup || t('common:unknown')}
      />
      <WideCard.Field
        label={t('incident.assignedTo')}
        value={assignedTo ? assignedTo.name : t('incident.pending')}
      />
      {showCancelReason && (
        <>
          <ShowFor mobile>
            <HorizontalLine />
          </ShowFor>
          <WideCard.Field
            label={t('incident.cancelReason')}
            value={reason}
            newLineOnMobile
          />
        </>
      )}
    </>
  );
};

export default DescriptionList;
