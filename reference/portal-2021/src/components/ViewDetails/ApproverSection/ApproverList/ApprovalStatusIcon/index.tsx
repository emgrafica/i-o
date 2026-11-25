import * as React from 'react';
import {
  StyledApprovalStatusIcon,
  StyledApprovalStatusIconProps,
} from './index.style';
import { CancelOutlined, CheckCircle, MoreHoriz } from '@material-ui/icons';
import { ApproverIconStatusType } from '../constants';
/**
 * Props for ApprovalStatusIcon
 * @prop stepNumber - identifies the approval level for an approver
 */
export interface ApprovalStatusIconProps extends StyledApprovalStatusIconProps {
  stepNumber?: number;
}
const TEXT_FILL = '#FFF';
const TEXT_FONT_SIZE = '0.875rem';

/**
 * Renders the approver icon to determine status of approver
 */
const ApprovalStatusIcon: React.FC<ApprovalStatusIconProps> = props => {
  return (
    <StyledApprovalStatusIcon status={props.status}>
      <svg
        viewBox="0 0 26 26"
        fontSize="inherit"
        focusable="false"
        role="presentation"
        aria-hidden="true"
      >
        {props.status === ApproverIconStatusType.Approved && <CheckCircle />}
        {props.status === ApproverIconStatusType.Declined && <CancelOutlined />}
        {props.status === ApproverIconStatusType.NoApprovers && (
          <>
            <circle cx="13" cy="13" r="13" />
            <MoreHoriz />
          </>
        )}
        {props.status === ApproverIconStatusType.Default && (
          <>
            <circle cx="13" cy="13" r="13" />
            <text
              x="13"
              y="18"
              textAnchor="middle"
              fill={TEXT_FILL}
              fontSize={TEXT_FONT_SIZE}
            >
              {props.stepNumber}
            </text>
          </>
        )}
      </svg>
    </StyledApprovalStatusIcon>
  );
};

export default ApprovalStatusIcon;
