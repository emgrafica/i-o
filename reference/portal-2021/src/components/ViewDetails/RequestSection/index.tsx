import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@lumos/core';
import {
  DefinitionList,
  DefinitionListCenterAligned,
  InlineAvatar,
} from '../index.style';
import { getValidString } from 'utils/string';
import { labelValuePair } from '../utils';
import { getRequestStatusI18nKey } from 'pages/OrdersAndIncidentsPage/utils';
import useLocaleDate from 'utils/useLocaleDate';
import { RequestStatusType, ClosingStatus } from 'models/globalTypes';

interface User {
  nickName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}

export interface RequestSectionProps {
  requestedForUser: User;
  newAssignedTo?: User | null;
  orderNumber?: string | null;
  status?: RequestStatusType | null;
  submittedBy?: User | null;
  submittedDate?: number | null;
  closingInformation?: {
    status: ClosingStatus;
    date: number;
  } | null;
}

const RequestSection: React.FC<RequestSectionProps> = ({
  requestedForUser,
  newAssignedTo,
  orderNumber,
  status,
  submittedBy,
  submittedDate: submittedDateProp,
  closingInformation,
}) => {
  const { t } = useTranslation();

  const closingDate = useLocaleDate(
    closingInformation ? closingInformation.date : null,
  );

  const submittedDate = useLocaleDate(submittedDateProp);
  let requestStatusI18nKey = status && getRequestStatusI18nKey(status);

  const showCancelledOn =
    closingInformation && closingInformation.status === ClosingStatus.Cancelled;
  const showDeclinedOn =
    closingInformation && closingInformation.status === ClosingStatus.Declined;

  const UNKNOWN = t('common:unknown');

  const requestedFor = (
    <Grid>
      <InlineAvatar
        imagePath={requestedForUser.image ? requestedForUser.image : undefined}
        alt="Avatar Image"
      />

      {`${getValidString(
        requestedForUser.nickName || requestedForUser.firstName || '',
      )} ${getValidString(requestedForUser.lastName || '')}`}
    </Grid>
  );

  return (
    <>
      {!newAssignedTo && (
        <DefinitionListCenterAligned>
          {labelValuePair(t('requests:order.requestedFor'), requestedFor)}
        </DefinitionListCenterAligned>
      )}
      <DefinitionList>
        {newAssignedTo && (
          <>
            {labelValuePair(
              t('requests:order.reassignedTo'),
              `${getValidString(
                newAssignedTo.firstName || '',
              )} ${getValidString(newAssignedTo.lastName || '')}`,
            )}
            {labelValuePair(
              t('requests:order.reassignedFrom'),
              `${getValidString(
                requestedForUser.firstName || '',
              )} ${getValidString(requestedForUser.lastName || '')}`,
            )}
          </>
        )}
        {orderNumber &&
          labelValuePair(t('requests:order.orderNumber'), orderNumber)}
        {requestStatusI18nKey &&
          labelValuePair(t('requests:order.status'), t(requestStatusI18nKey))}
        {submittedBy &&
          labelValuePair(
            t('requests:order.submittedBy'),
            `${getValidString(
              submittedBy.nickName || submittedBy.firstName || '',
            )} ${getValidString(submittedBy.lastName || '')}`,
          )}
        {submittedDate &&
          labelValuePair(t('requests:order.submittedOn'), submittedDate)}
        {showCancelledOn &&
          labelValuePair(
            t('requests:order.cancelledOn'),
            closingDate || UNKNOWN,
          )}
        {showDeclinedOn &&
          labelValuePair(
            t('requests:order.declinedOn'),
            closingDate || UNKNOWN,
          )}
      </DefinitionList>
    </>
  );
};

export default RequestSection;
