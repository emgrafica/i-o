/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  CatalogItemClass,
  RequestedForType,
  RequestShortStatusType,
  SortOrder,
  DateRange,
  RequestType,
  RequestStatusType,
  ReasonForRequest,
  ReasonForRequestLabel,
  ClosingStatus,
  RequestStageType,
  RequestServiceCategoryType,
  approverType,
  ApprovalType,
  ApprovalStatusType,
  ShippingCarrier,
} from './../globalTypes';

// ====================================================
// GraphQL query operation: MyRequests
// ====================================================

export interface MyRequests_myRequests_items_request_requestedForUser {
  __typename: 'RequestsUser';
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

export interface MyRequests_myRequests_items_request_reasonForRequest {
  __typename: 'ReasonForRequestValueLabel';
  /**
   * reason for request value
   */
  value: ReasonForRequest;
  /**
   * UI label ident for reason for request
   */
  label: ReasonForRequestLabel;
}

export interface MyRequests_myRequests_items_request_submittedBy {
  __typename: 'RequestsUser';
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

export interface MyRequests_myRequests_items_request_newAssignedTo {
  __typename: 'RequestsUser';
  /**
   * User's first name
   */
  firstName: string | null;
  /**
   * User's last name
   */
  lastName: string | null;
}

export interface MyRequests_myRequests_items_request_closingInformation {
  __typename: 'ClosingInformation';
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

export interface MyRequests_myRequests_items_request_actions {
  __typename: 'RequestActions';
  /**
   * Whether the request can be cancelled or not
   */
  cancelable: boolean;
}

export interface MyRequests_myRequests_items_request_progress {
  __typename: 'RequestProgress';
  /**
   * The current stage the request is in
   */
  currentStage: RequestStageType;
  /**
   * Ordered list of the stages relevant to this request
   */
  stages: RequestStageType[];
}

export interface MyRequests_myRequests_items_request {
  __typename: 'RequestDetails';
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
  requestedForUser: MyRequests_myRequests_items_request_requestedForUser;
  /**
   * Reason for the request
   */
  reasonForRequest: MyRequests_myRequests_items_request_reasonForRequest;
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
  submittedBy: MyRequests_myRequests_items_request_submittedBy;
  /**
   * The epoch time in milliseconds the request was submitted on
   */
  submittedDate: number;
  /**
   * The user the asset is being reassigned to.
   */
  newAssignedTo: MyRequests_myRequests_items_request_newAssignedTo | null;
  /**
   * Availabe if the request is in a closed state
   */
  closingInformation: MyRequests_myRequests_items_request_closingInformation | null;
  /**
   * Describes the actions that can be taken on the request
   */
  actions: MyRequests_myRequests_items_request_actions;
  /**
   * Information regarding the progress in processing the request
   */
  progress: MyRequests_myRequests_items_request_progress;
}

export interface MyRequests_myRequests_items_product_RequestComputer {
  __typename: 'RequestComputer';
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

export interface MyRequests_myRequests_items_product_RequestAccessory {
  __typename: 'RequestAccessory';
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

export interface MyRequests_myRequests_items_product_RequestGcom {
  __typename: 'RequestGcom';
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
}

export type MyRequests_myRequests_items_product =
  | MyRequests_myRequests_items_product_RequestComputer
  | MyRequests_myRequests_items_product_RequestAccessory
  | MyRequests_myRequests_items_product_RequestGcom;

export interface MyRequests_myRequests_items_existingProduct {
  __typename: 'ExistingComputerProduct';
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

export interface MyRequests_myRequests_items_approvals_approvers_user {
  __typename: 'RequestsUser';
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

export interface MyRequests_myRequests_items_approvals_approvers {
  __typename: 'RequestApproverDetails';
  type: approverType;
  /**
   * User details of the person in charge to approve the request
   */
  user: MyRequests_myRequests_items_approvals_approvers_user;
}

export interface MyRequests_myRequests_items_approvals {
  __typename: 'RequestApprovals';
  approvers: MyRequests_myRequests_items_approvals_approvers[];
  policy: ApprovalType;
  status: ApprovalStatusType;
}

export interface MyRequests_myRequests_items_shipping {
  __typename: 'ShippingDetails';
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

export interface MyRequests_myRequests_items_trackingDetails {
  __typename: 'TrackingDetails';
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

export interface MyRequests_myRequests_items {
  __typename: 'Request';
  /**
   * Request UUID
   */
  id: string;
  /**
   * Information pertaining to the request
   */
  request: MyRequests_myRequests_items_request;
  /**
   * Union of possible product types
   */
  product: MyRequests_myRequests_items_product | null;
  /**
   * Union of possible existing product types
   */
  existingProduct: MyRequests_myRequests_items_existingProduct | null;
  approvals: MyRequests_myRequests_items_approvals[] | null;
  shipping: MyRequests_myRequests_items_shipping;
  trackingDetails: MyRequests_myRequests_items_trackingDetails | null;
  _etag: string | null;
}

export interface MyRequests_myRequests {
  __typename: 'Requests';
  /**
   * List of requests
   */
  items: MyRequests_myRequests_items[];
  /**
   * Total number of items that matched the filters
   */
  totalHits: number;
}

export interface MyRequests {
  myRequests: MyRequests_myRequests;
}

export interface MyRequestsVariables {
  categories?: CatalogItemClass[] | null;
  requestedFor?: RequestedForType[] | null;
  requestStatus?: RequestShortStatusType[] | null;
  sortOrder?: SortOrder | null;
  dateRange?: DateRange | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  refine?: string | null;
}
