/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IncidentStatusFilter } from './../globalTypes';

// ====================================================
// GraphQL query operation: UserIncidents
// ====================================================

export interface UserIncidents_incidentsSearch {
  __typename: 'IncidentSearchResponse';
  /**
   * Total number of items that matched the filters.
   */
  totalItems: number | null;
}

export interface UserIncidents {
  /**
   * Searches for the incidents of any user if the logged in user is allowed. Use
   * `myIncidents` query to search for the logged in user's incidents
   */
  incidentsSearch: UserIncidents_incidentsSearch;
}

export interface UserIncidentsVariables {
  userId: string;
  status?: IncidentStatusFilter[] | null;
}
