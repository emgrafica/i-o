/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApprovalType, ApprovalStatusType } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: Approvals
// ====================================================

export interface Approvals_approvers_approver {
  __typename: "User";
  /**
   * User first name
   */
  firstName: string | null;
  /**
   * User last name
   */
  lastName: string | null;
}

export interface Approvals_approvers {
  __typename: "ApproverDetails";
  /**
   * User details of the person in charge to approve the request
   */
  approver: Approvals_approvers_approver;
}

export interface Approvals {
  __typename: "Approvals";
  /**
   * Approval record ID, this attribute needs to be used to mutate the status of the record (approve, decline)
   */
  approvalId: string;
  /**
   * Reason of why this approval was applied to the request
   */
  approvalReason: string;
  approvalPolicy: ApprovalType;
  approvalStatus: ApprovalStatusType;
  approvers: Approvals_approvers[];
}
