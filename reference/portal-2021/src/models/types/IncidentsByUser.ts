/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  IncidentStatusFilter,
  SortOrder,
  IncidentStatus,
  IncidentClosingStatus,
  IncidentStage,
} from './../globalTypes';

// ====================================================
// GraphQL query operation: IncidentsByUser
// ====================================================

export interface IncidentsByUser_incidentsSearch_items_requestedFor {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsByUser_incidentsSearch_items_submittedBy {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsByUser_incidentsSearch_items_closingDetails_closedBy {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsByUser_incidentsSearch_items_closingDetails {
  __typename: 'ClosingDetails';
  status: IncidentClosingStatus;
  reason: string;
  date: number;
  closedBy: IncidentsByUser_incidentsSearch_items_closingDetails_closedBy;
}

export interface IncidentsByUser_incidentsSearch_items_assignedTo {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentsByUser_incidentsSearch_items_progress {
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

export interface IncidentsByUser_incidentsSearch_items_actions {
  __typename: 'IncidentActions';
  cancellable: boolean;
  canBeReopened: boolean;
  canAddComment: boolean;
}

export interface IncidentsByUser_incidentsSearch_items {
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
  requestedFor: IncidentsByUser_incidentsSearch_items_requestedFor;
  status: IncidentStatus;
  submittedDate: number;
  submittedBy: IncidentsByUser_incidentsSearch_items_submittedBy;
  /**
   * Details for the resolution of the incident
   */
  closingDetails: IncidentsByUser_incidentsSearch_items_closingDetails | null;
  assignmentGroup: string | null;
  /**
   * This field is nullable because the incident is not initially assigned to someone.
   */
  assignedTo: IncidentsByUser_incidentsSearch_items_assignedTo | null;
  progress: IncidentsByUser_incidentsSearch_items_progress;
  actions: IncidentsByUser_incidentsSearch_items_actions;
}

export interface IncidentsByUser_incidentsSearch {
  __typename: 'IncidentSearchResponse';
  /**
   * Total number of items that matched the filters.
   */
  totalItems: number | null;
  items: IncidentsByUser_incidentsSearch_items[];
}

export interface IncidentsByUser {
  /**
   * Searches for the incidents of any user if the logged in user is allowed. Use
   * `myIncidents` query to search for the logged in user's incidents
   */
  incidentsSearch: IncidentsByUser_incidentsSearch;
}

export interface IncidentsByUserVariables {
  requestedForUserId: string;
  status?: IncidentStatusFilter[] | null;
  sortOrder?: SortOrder | null;
}
