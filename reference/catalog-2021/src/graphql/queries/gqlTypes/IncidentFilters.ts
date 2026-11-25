/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IncidentFilters
// ====================================================

export interface IncidentFilters_incidentFilters_children {
  __typename: "IncidentFilters";
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
}

export interface IncidentFilters_incidentFilters {
  __typename: "IncidentFilters";
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Child filters that this filter has
   */
  children: IncidentFilters_incidentFilters_children[] | null;
}

export interface IncidentFilters {
  /**
   * Retrieves the incident filters
   */
  incidentFilters: IncidentFilters_incidentFilters[];
}
