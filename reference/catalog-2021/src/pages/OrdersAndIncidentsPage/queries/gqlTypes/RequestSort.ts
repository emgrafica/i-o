/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: RequestSort
// ====================================================

export interface RequestSort_catalogRequestSortFilters {
  __typename: "CatalogRequestSortOptions";
  sortOption: SortOrder;
  sortValue: string;
}

export interface RequestSort {
  catalogRequestSortFilters: RequestSort_catalogRequestSortFilters[];
}
