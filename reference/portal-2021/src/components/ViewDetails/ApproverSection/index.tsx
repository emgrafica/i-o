import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import ApprovalStatusIcon from './ApproverList/ApprovalStatusIcon';
import {
  ApproverIconStatusType,
  approverStatusToIconType,
} from './ApproverList/constants';
import { DefinitionList, IconCenterAligned, IconLabel } from '../index.style';
import { labelValuePair } from '../utils';
import { ApprovalStatusType } from 'models/globalTypes';

interface ApprovalSection {
  status: ApprovalStatusType;
  approvers: {
    user: {
      nickName?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    };
  }[];
}

interface ApproverSectionProps {
  approvalSection?: ApprovalSection[] | null;
}

const ApproverSection: React.FC<ApproverSectionProps> = ({
  approvalSection,
}) => {
  const { t } = useTranslation();

  if (!approvalSection) return null;

  const list = (
    <Box>
      {approvalSection.length > 0 ? (
        approvalSection.map(({ status, approvers }, idx) => {
          return approvers.length > 0 ? (
            /**
             * FIXME: `approval.id` was used previously but there is an issue where
             * id is being returned as `Unknown`. Change to id once issue is fixed.
             */
            <IconLabel key={idx}>
              <IconCenterAligned>
                <ApprovalStatusIcon
                  status={approverStatusToIconType[status]}
                  stepNumber={idx + 1}
                />
              </IconCenterAligned>
              {`${approvers[0].user.nickName || approvers[0].user.firstName} ${
                approvers[0].user.lastName
              }`}
            </IconLabel>
          ) : (
            <IconLabel key={idx}>
              <IconCenterAligned>
                <ApprovalStatusIcon
                  status={ApproverIconStatusType.NoApprovers}
                />
              </IconCenterAligned>
              {t('requests:noApprovers')}
            </IconLabel>
          );
        })
      ) : (
        <IconLabel>
          <IconCenterAligned>
            <ApprovalStatusIcon status={ApproverIconStatusType.NoApprovers} />
          </IconCenterAligned>
          {t('requests:noApprovers')}
        </IconLabel>
      )}
    </Box>
  );

  return (
    <DefinitionList>
      {labelValuePair(t('requests:approvers'), list)}
    </DefinitionList>
  );
};

export default ApproverSection;
