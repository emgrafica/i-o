import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Grid } from '@lumos/core';
import { getValidString } from 'utils/string';
import useLocaleDate from 'utils/useLocaleDate';
import { StyledBoxColor } from 'pages/confirmationPages/ReturnConfirmationPage/styles';
import {
  DefinitionList,
  DefinitionListCenterAligned,
  InlineAvatar,
} from 'components/ViewDetails/index.style';
import { labelValuePair } from 'components/ViewDetails/utils';
import { IncidentsByUser_incidentsSearch_items } from 'graphql/queries/gqlTypes/IncidentsByUser';
import { USER_AVATAR } from 'pages/OrdersAndIncidentsPage/queries';
import { IncidentClosingStatus } from 'gqlTypes/globalTypes';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import {
  UserAvatar,
  UserAvatarVariables,
} from 'pages/OrdersAndIncidentsPage/queries/gqlTypes/UserAvatar';

interface IncidentCardProps {
  incident: IncidentsByUser_incidentsSearch_items;
}

const RequestSectionIncident: React.FC<IncidentCardProps> = ({ incident }) => {
  const userId = useUserId();
  const { t } = useTranslation('requests');
  const PENDING = t('incident.pending');
  const { data } = useQuery<UserAvatar, UserAvatarVariables>(USER_AVATAR, {
    variables: {
      userId,
    },
  });

  const showCompletedOn =
    incident.closingDetails &&
    incident.closingDetails.status === IncidentClosingStatus.resolved;

  const showCancelledOn =
    incident.closingDetails &&
    incident.closingDetails.status === IncidentClosingStatus.cancelled;

  const showResolvedOn =
    incident.closingDetails &&
    incident.closingDetails.status === IncidentClosingStatus.resolved;

  const submittedDate = useLocaleDate(
    incident.submittedDate ? incident.submittedDate : null,
  );

  const closingDate = useLocaleDate(
    incident.closingDetails ? incident.closingDetails.date : null,
  );

  if (!data) {
    return null;
  }

  const requestedFor = (
    <Grid>
      <InlineAvatar
        imagePath={data.userProfile.avatar as string}
        alt={t('requests:incident.altImage')}
      />
      {`${getValidString(incident.requestedFor.name)}
      `}
    </Grid>
  );

  return (
    <>
      <StyledBoxColor data-testid="incident-details-section-one">
        <DefinitionListCenterAligned>
          {labelValuePair(t('incident.requestedFor'), requestedFor)}
        </DefinitionListCenterAligned>
        <DefinitionList>
          {labelValuePair(
            t('incident.incidentNumber'),
            incident.incidentNumber,
          )}
          {labelValuePair(
            t('incident.statusName'),
            t(`incident.status.${incident.status}`),
          )}

          {labelValuePair(t('incident.submittedBy'), incident.submittedBy.name)}
          {labelValuePair(t('incident.submittedOn'), submittedDate)}

          {labelValuePair(
            t('incident.assignmentGroup'),
            incident.assignmentGroup || PENDING,
          )}

          {labelValuePair(
            t('incident.assignedTo'),
            incident.assignedTo ? incident.assignedTo.name : PENDING,
          )}

          {showCancelledOn &&
            labelValuePair(t('incident.cancelledOn'), closingDate)}

          {showCompletedOn &&
            labelValuePair(t('incident.resolvedOn'), closingDate)}

          {showResolvedOn &&
            labelValuePair(
              t('incident.resolvedBy'),
              incident.closingDetails
                ? incident.closingDetails.closedBy.name
                : PENDING,
            )}

          {showCompletedOn &&
            labelValuePair(t('incident.closedOn'), closingDate)}
        </DefinitionList>
      </StyledBoxColor>

      <StyledBoxColor data-testid="incident-details-section-two">
        <DefinitionList>
          {labelValuePair(
            t('incident.shortDescription'),
            incident.shortDescription,
          )}
          {labelValuePair(t('incident.description'), incident.description)}
          {showCompletedOn &&
            labelValuePair(
              t('incident.closeNotes'),
              incident.closingDetails
                ? incident.closingDetails.reason
                : PENDING,
            )}
          {incident.holdReason &&
            labelValuePair(t('incident.onHoldReason'), incident.holdReason)}
        </DefinitionList>
      </StyledBoxColor>
    </>
  );
};

export default RequestSectionIncident;
