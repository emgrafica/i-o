/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApproverState, CatalogItemClass, OrderApprovalsSearchSortBy, OrderApprovalsSearchSortDirection, CatalogPricingType } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: MyApprovals
// ====================================================

export interface MyApprovals_myOrderApprovals_items_approval {
  __typename: "ApprovalInfo";
  id: string;
  labelDescription: string | null;
}

export interface MyApprovals_myOrderApprovals_items_approver {
  __typename: "ApproverInfo";
  id: string;
  actionedOn: number | null;
  comment: string | null;
}

export interface MyApprovals_myOrderApprovals_items_lineItem_pricing {
  __typename: "Pricing";
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
}

export interface MyApprovals_myOrderApprovals_items_lineItem {
  __typename: "LineItemInfo";
  id: string;
  catalogItemImage: string | null;
  catalogItemName: string | null;
  reasonForRequest: string;
  pricing: MyApprovals_myOrderApprovals_items_lineItem_pricing;
}

export interface MyApprovals_myOrderApprovals_items_order {
  __typename: "OrderInfo";
  id: string;
  justification: string | null;
  createdOn: number;
  requestedForFirstName: string;
  requestedForLastName: string;
}

export interface MyApprovals_myOrderApprovals_items {
  __typename: "OrderApproval";
  /**
   * _etag
   */
  _etag: string;
  /**
   * approval information
   */
  approval: MyApprovals_myOrderApprovals_items_approval;
  /**
   * approver information
   */
  approver: MyApprovals_myOrderApprovals_items_approver;
  /**
   * lineItem information
   */
  lineItem: MyApprovals_myOrderApprovals_items_lineItem;
  order: MyApprovals_myOrderApprovals_items_order;
}

export interface MyApprovals_myOrderApprovals {
  __typename: "OrderApprovalsSearch";
  /**
   * total results matching criteria
   */
  totalItems: number;
  /**
   * Offset for results
   */
  pageNumber: number;
  /**
   * Results per page
   */
  pageSize: number;
  /**
   * total number of pages
   */
  totalPages: number;
  /**
   * ttt
   */
  items: MyApprovals_myOrderApprovals_items[];
}

export interface MyApprovals {
  myOrderApprovals: MyApprovals_myOrderApprovals;
}

export interface MyApprovalsVariables {
  approverState?: ApproverState | null;
  catalogItemClass?: CatalogItemClass[] | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  refine?: string | null;
  sortBy?: OrderApprovalsSearchSortBy | null;
  sortDirection?: OrderApprovalsSearchSortDirection | null;
}
