import { ApprovalStatusType } from 'models/globalTypes';
/**
 * ApproverList constants
 */

enum ApproverStatusValues {
  Default = 'Default',
  NoApprovers = 'NoApprovers',
}

export enum ApproverIconStatusType {
  Approved = ApprovalStatusType.Approved,
  Declined = ApprovalStatusType.Declined,
  Default = ApproverStatusValues.Default,
  NoApprovers = ApproverStatusValues.NoApprovers,
}

export const approverStatusToIconType: Record<
  ApprovalStatusType,
  ApproverIconStatusType
> = {
  [ApprovalStatusType.Approved]: ApproverIconStatusType.Approved,
  [ApprovalStatusType.Declined]: ApproverIconStatusType.Declined,
  [ApprovalStatusType.Pending]: ApproverIconStatusType.Default,
  [ApprovalStatusType.Cancelled]: ApproverIconStatusType.Declined,
  [ApprovalStatusType.OnHold]: ApproverIconStatusType.Default,
};
