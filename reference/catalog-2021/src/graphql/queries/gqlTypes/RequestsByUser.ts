/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass, RequestedForType, RequestShortStatusType, SortOrder, DateRange, RequestType, RequestStatusType, ReasonForRequest, ReasonForRequestLabel, ClosingStatus, RequestStageType, RequestServiceCategoryType, approverType, ApprovalType, ApprovalStatusType, ShippingCarrier } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: RequestsByUser
// ====================================================

export interface RequestsByUser_requestsByUser_items_request_requestedForUser {
  __typename: "RequestsUser";
  /**
   * User ID
   */
  id: string;
  /**
   * User's first name
   */
  firstName: string | null;
  /**
   * User's last name
   */
  lastName: string | null;
  /**
   * User's preferred name
   */
  nickName: string | null;
  /**
   * User's avatar image
   */
  image: string | null;
}

export interface RequestsByUser_requestsByUser_items_request_reasonForRequest {
  __typename: "ReasonForRequestValueLabel";
  /**
   * reason for request value
   */
  value: ReasonForRequest;
  /**
   * UI label ident for reason for request
   */
  label: ReasonForRequestLabel;
}

export interface RequestsByUser_requestsByUser_items_request_submittedBy {
  __typename: "RequestsUser";
  /**
   * User ID
   */
  id: string;
  /**
   * User's first name
   */
  firstName: string | null;
  /**
   * User's last name
   */
  lastName: string | null;
  /**
   * User's preferred name
   */
  nickName: string | null;
  /**
   * User's avatar image
   */
  image: string | null;
}

export interface RequestsByUser_requestsByUser_items_request_newAssignedTo {
  __typename: "RequestsUser";
  /**
   * User's first name
   */
  firstName: string | null;
  /**
   * User's last name
   */
  lastName: string | null;
}

export interface RequestsByUser_requestsByUser_items_request_closingInformation {
  __typename: "ClosingInformation";
  /**
   * The epoch time in milliseconds
   */
  date: number;
  /**
   * The reason the request was closed
   */
  reason: string | null;
  /**
   * The current state of the request
   */
  status: ClosingStatus;
}

export interface RequestsByUser_requestsByUser_items_request_actions {
  __typename: "RequestActions";
  /**
   * Whether the request can be cancelled or not
   */
  cancelable: boolean;
}

export interface RequestsByUser_requestsByUser_items_request_progress {
  __typename: "RequestProgress";
  /**
   * The current stage the request is in
   */
  currentStage: RequestStageType;
  /**
   * Ordered list of the stages relevant to this request
   */
  stages: RequestStageType[];
}

export interface RequestsByUser_requestsByUser_items_request {
  __typename: "RequestDetails";
  /**
   * Line item unique identifier
   */
  id: string;
  /**
   * Workflow unique identifier, same as 
   */
  workflowId: string;
  /**
   * The type of request
   */
  type: RequestType;
  /**
   * Request reference number
   */
  orderNumber: string;
  /**
   * Current state of the request
   */
  status: RequestStatusType;
  /**
   * Whether the request is for the current user or another.
   */
  requestedFor: RequestedForType;
  /**
   * The user the request is being processed for
   */
  requestedForUser: RequestsByUser_requestsByUser_items_request_requestedForUser;
  /**
   * Reason for the request
   */
  reasonForRequest: RequestsByUser_requestsByUser_items_request_reasonForRequest;
  /**
   * Additional details provided for the request reason
   */
  reasonDetails: string | null;
  /**
   * Business justification for the request
   */
  justification: string | null;
  /**
   * The user who submitted the request
   */
  submittedBy: RequestsByUser_requestsByUser_items_request_submittedBy;
  /**
   * The epoch time in milliseconds the request was submitted on
   */
  submittedDate: number;
  /**
   * The user the asset is being reassigned to.
   */
  newAssignedTo: RequestsByUser_requestsByUser_items_request_newAssignedTo | null;
  /**
   * Availabe if the request is in a closed state
   */
  closingInformation: RequestsByUser_requestsByUser_items_request_closingInformation | null;
  /**
   * Describes the actions that can be taken on the request
   */
  actions: RequestsByUser_requestsByUser_items_request_actions;
  /**
   * Information regarding the progress in processing the request
   */
  progress: RequestsByUser_requestsByUser_items_request_progress;
}

export interface RequestsByUser_requestsByUser_items_product_RequestGcom {
  __typename: "RequestGcom";
}

export interface RequestsByUser_requestsByUser_items_product_RequestComputer {
  __typename: "RequestComputer";
  /**
   * Product UUID
   */
  id: string | null;
  /**
   * The type of product, this is used to resolve the type in the RequestProductUnion
   */
  type: RequestServiceCategoryType;
  /**
   * The display name of the product
   */
  name: string;
  /**
   * The image associated with this computer
   */
  image: string | null;
  /**
   * The usage type assigned to this computer
   */
  deviceUsage: string | null;
  /**
   * The price of the computer
   */
  price: string | null;
  /**
   * The operating system of the computer
   */
  operatingSystem: string | null;
  /**
   * The keyboard configuration for this computer
   */
  keyboard: string | null;
}

export interface RequestsByUser_requestsByUser_items_product_RequestAccessory {
  __typename: "RequestAccessory";
  /**
   * Product UUID
   */
  id: string | null;
  /**
   * The type of product, this is used to resolve the type in the RequestProductUnion
   */
  type: RequestServiceCategoryType;
  /**
   * The display name of the product
   */
  name: string;
  /**
   * The image associated with this accessory
   */
  image: string | null;
  /**
   * The price of the accessory
   */
  price: string | null;
  /**
   * The plug type configuration for this accessory
   */
  plugType: string | null;
  /**
   * The keyboard configuration for this accessory
   */
  keyboard: string | null;
}

export type RequestsByUser_requestsByUser_items_product = RequestsByUser_requestsByUser_items_product_RequestGcom | RequestsByUser_requestsByUser_items_product_RequestComputer | RequestsByUser_requestsByUser_items_product_RequestAccessory;

export interface RequestsByUser_requestsByUser_items_existingProduct {
  __typename: "ExistingComputerProduct";
  /**
   * Product UUID
   */
  id: string;
  /**
   * The display name of the product
   */
  name: string;
  /**
   * The image associated with this computer
   */
  image: string | null;
}

export interface RequestsByUser_requestsByUser_items_approvals_approvers_user {
  __typename: "RequestsUser";
  /**
   * User ID
   */
  id: string;
  /**
   * User's first name
   */
  firstName: string | null;
  /**
   * User's last name
   */
  lastName: string | null;
  /**
   * User's avatar image
   */
  image: string | null;
}

export interface RequestsByUser_requestsByUser_items_approvals_approvers {
  __typename: "RequestApproverDetails";
  type: approverType;
  /**
   * User details of the person in charge to approve the request
   */
  user: RequestsByUser_requestsByUser_items_approvals_approvers_user;
}

export interface RequestsByUser_requestsByUser_items_approvals {
  __typename: "RequestApprovals";
  /**
   * Approval record ID, this attribute needs to be used to mutate the status of the record (approve, decline)
   */
  id: string;
  approvers: RequestsByUser_requestsByUser_items_approvals_approvers[];
  /**
   * EPOCH Date in which the approval was actioned by the user
   */
  approvedOn: number | null;
  /**
   * Approval record creation date EPOCH
   */
  createdOn: number | null;
  /**
   * Label associated with approval level
   */
  label: string | null;
  policy: ApprovalType;
  status: ApprovalStatusType;
}

export interface RequestsByUser_requestsByUser_items_shipping {
  __typename: "ShippingDetails";
  /**
   * Name of the recipient
   */
  contactName: string;
  contactPhoneNumber: string;
  /**
   * Name of the company the user belongs to
   */
  company: string | null;
  /**
   * Street name and number 
   */
  address1: string;
  /**
   * Suite or interior number
   */
  address2: string | null;
  country: string;
  city: string;
  state: string;
  zip: string;
  additionalDeliveryInfo: string | null;
}

export interface RequestsByUser_requestsByUser_items_trackingDetails {
  __typename: "TrackingDetails";
  /**
   * Carrier name
   */
  carrierName: ShippingCarrier | null;
  /**
   * Tracking number reference
   */
  number: string;
  /**
   * Tracking info URL
   */
  url: string | null;
}

export interface RequestsByUser_requestsByUser_items {
  __typename: "Request";
  /**
   * Request UUID
   */
  id: string;
  /**
   * Information pertaining to the request
   */
  request: RequestsByUser_requestsByUser_items_request;
  /**
   * Union of possible product types
   */
  product: RequestsByUser_requestsByUser_items_product | null;
  /**
   * Union of possible existing product types
   */
  existingProduct: RequestsByUser_requestsByUser_items_existingProduct | null;
  approvals: RequestsByUser_requestsByUser_items_approvals[] | null;
  shipping: RequestsByUser_requestsByUser_items_shipping;
  trackingDetails: RequestsByUser_requestsByUser_items_trackingDetails | null;
  _etag: string | null;
}

export interface RequestsByUser_requestsByUser {
  __typename: "Requests";
  /**
   * List of requests
   */
  items: RequestsByUser_requestsByUser_items[];
  /**
   * Total number of items that matched the filters
   */
  totalHits: number;
}

export interface RequestsByUser {
  requestsByUser: RequestsByUser_requestsByUser;
}

export interface RequestsByUserVariables {
  requestedForUserId: string;
  categories?: CatalogItemClass[] | null;
  requestedFor?: RequestedForType[] | null;
  requestStatus?: RequestShortStatusType[] | null;
  sortOrder?: SortOrder | null;
  dateRange?: DateRange | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  refine?: string | null;
}
