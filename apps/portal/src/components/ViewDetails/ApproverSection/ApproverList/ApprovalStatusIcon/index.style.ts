import styled from 'styled-components';
import { ApproverIconStatusType } from '../constants';
/**
 * Props for ApprovalStatusIcon
 * @prop status - approval status for the approver
 */
export interface StyledApprovalStatusIconProps {
  status: ApproverIconStatusType;
}

// eslint-disable-next-line no-unexpected-multiline
export const StyledApprovalStatusIcon = styled.div<
  StyledApprovalStatusIconProps
>`
  display: flex;
  align-items: center;
  & > svg {
    height: 15.5px;
    width: 15.5px;
    ${({ theme, status }) =>
      (status === ApproverIconStatusType.Default &&
        `height: 12.92px;
        width: 12.92px;
        fill: ${theme.colors.grayScale[10]};
        `) ||
      (status === ApproverIconStatusType.NoApprovers &&
        `height: 12.92px;
        width: 12.92px;
        fill: ${theme.colors.secondary[1]};
        color: ${theme.colors.grayScale[0]};
      `) ||
      (status === ApproverIconStatusType.Declined &&
        `color: ${theme.colors.state.danger};`) ||
      (status === ApproverIconStatusType.Approved &&
        `color: ${theme.colors.state.success};`)}
    user-select: none;
    stroke-width: 2px;
  }
`;
