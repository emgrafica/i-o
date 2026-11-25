/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass, SortBy } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CatalogSortOptions
// ====================================================

export interface CatalogSortOptions_catalogSortOptions_dropdownOptions {
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

export interface CatalogSortOptions_catalogSortOptions_sortOptions {
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

export interface CatalogSortOptions_catalogSortOptions {
  __typename: "CatalogSortOptions";
  /**
   * List of sort options in dropdown form
   */
  dropdownOptions: CatalogSortOptions_catalogSortOptions_dropdownOptions[];
  /**
   * Catalog sorting options
   */
  sortOptions: CatalogSortOptions_catalogSortOptions_sortOptions[];
}

export interface CatalogSortOptions {
  catalogSortOptions: CatalogSortOptions_catalogSortOptions;
}

export interface CatalogSortOptionsVariables {
  catalogClass: CatalogItemClass;
}
