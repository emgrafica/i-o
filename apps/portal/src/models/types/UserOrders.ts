/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestShortStatusType } from './../globalTypes';

// ====================================================
// GraphQL query operation: UserOrders
// ====================================================

export interface UserOrders_catalogRequestsByUser {
  __typename: 'CatalogRequestSearchResponse';
  /**
   * Total number of items that matched the filters
   */
  totalHits: number;
}

export interface UserOrders {
  catalogRequestsByUser: UserOrders_catalogRequestsByUser;
}

export interface UserOrdersVariables {
  requestedForUserId: string;
  requestStatus?: RequestShortStatusType[] | null;
}
