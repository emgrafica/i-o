/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortBy } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: CatalogSortOptions
// ====================================================

export interface CatalogSortOptions_dropdownOptions {
  __typename: "DropdownOption";
  /**
   * Label of dropdown menu item
   */
  label: string;
  /**
   * Value of dropdown menu item
   */
  value: string;
}

export interface CatalogSortOptions_sortOptions {
  __typename: "SortOption";
  /**
   * The sort display value
   */
  sortValue: string;
  /**
   * The sort type
   */
  sortOption: SortBy;
  /**
   * The Unique ID of the sorting entry
   */
  sortOptionId: string;
}

export interface CatalogSortOptions {
  __typename: "CatalogSortOptions";
  /**
   * List of sort options in dropdown form
   */
  dropdownOptions: CatalogSortOptions_dropdownOptions[];
  /**
   * Catalog sorting options
   */
  sortOptions: CatalogSortOptions_sortOptions[];
}
