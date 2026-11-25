/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderOptions, OrderByOptions } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SearchUsers
// ====================================================

export interface SearchUsers_searchUsers_items {
  __typename: "MinifiedUser";
  /**
   * User ID (Tenant user id)
   */
  userId: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
}

export interface SearchUsers_searchUsers {
  __typename: "SearchUserResponse";
  /**
   * Total number of items that matched the search keywords
   */
  totalItems: number;
  /**
   * Collection of found users from the requested page number
   */
  items: SearchUsers_searchUsers_items[];
}

export interface SearchUsers {
  searchUsers: SearchUsers_searchUsers;
}

export interface SearchUsersVariables {
  keywords: string;
  includeSelf?: boolean | null;
  includeFunctionalUsers?: boolean | null;
  order?: OrderOptions | null;
  orderBy?: OrderByOptions | null;
  pageNumber?: number | null;
  pageSize?: number | null;
}
