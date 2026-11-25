/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  IncidentStatusFilter,
  SortOrder,
  DateRange,
  IncidentStatus,
  IncidentClosingStatus,
  IncidentStage,
} from './../globalTypes';

// ====================================================
// GraphQL query operation: IncidentsForLoggedInUser
// ====================================================

export interface IncidentsForLoggedInUser_incidentsSearch_items_requestedFor {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_submittedBy {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_closingDetails_closedBy {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_closingDetails {
  __typename: 'ClosingDetails';
  status: IncidentClosingStatus;
  reason: string;
  date: number;
  closedBy: IncidentsForLoggedInUser_incidentsSearch_items_closingDetails_closedBy;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_assignedTo {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_progress {
  __typename: 'IncidentProgress';
  /**
   * The current stage the request is in
   */
  currentStage: IncidentStage;
  /**
   * Ordered list of the stages relevant to this incident
   */
  stages: IncidentStage[];
}

export interface IncidentsForLoggedInUser_incidentsSearch_items_actions {
  __typename: 'IncidentActions';
  cancellable: boolean;
  canBeReopened: boolean;
  canAddComment: boolean;
}

export interface IncidentsForLoggedInUser_incidentsSearch_items {
  __typename: 'Incident';
  /**
   * ID used by the backend. Should not be displayed to the user
   */
  incidentId: string;
  /**
   * User-facing identifier for an incident
   */
  incidentNumber: string;
  shortDescription: string;
  description: string;
  /**
   * Usually only available when incident status is 'on hold'.
   */
  holdReason: string | null;
  requestedFor: IncidentsForLoggedInUser_incidentsSearch_items_requestedFor;
  status: IncidentStatus;
  submittedDate: number;
  submittedBy: IncidentsForLoggedInUser_incidentsSearch_items_submittedBy;
  /**
   * Details for the resolution of the incident
   */
  closingDetails: IncidentsForLoggedInUser_incidentsSearch_items_closingDetails | null;
  assignmentGroup: string | null;
  /**
   * This field is nullable because the incident is not initially assigned to someone.
   */
  assignedTo: IncidentsForLoggedInUser_incidentsSearch_items_assignedTo | null;
  progress: IncidentsForLoggedInUser_incidentsSearch_items_progress;
  actions: IncidentsForLoggedInUser_incidentsSearch_items_actions;
}

export interface IncidentsForLoggedInUser_incidentsSearch {
  __typename: 'IncidentSearchResponse';
  /**
   * Total number of items that matched the filters.
   */
  totalItems: number | null;
  items: IncidentsForLoggedInUser_incidentsSearch_items[];
}

export interface IncidentsForLoggedInUser {
  /**
   * Searches for the incidents of the logged in user
   */
  incidentsSearch: IncidentsForLoggedInUser_incidentsSearch;
}

export interface IncidentsForLoggedInUserVariables {
  status?: IncidentStatusFilter[] | null;
  sortOrder?: SortOrder | null;
  dateRange?: DateRange | null;
  refine?: string | null;
}
