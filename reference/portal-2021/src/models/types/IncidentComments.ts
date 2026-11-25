/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IncidentComments
// ====================================================

export interface IncidentComments_incidentComments_items_createdBy {
  __typename: 'BaseUser';
  userId: string;
  name: string;
}

export interface IncidentComments_incidentComments_items {
  __typename: 'IncidentComment';
  comment: string;
  createdOn: number;
  createdBy: IncidentComments_incidentComments_items_createdBy;
  userImage: string;
}

export interface IncidentComments_incidentComments {
  __typename: 'IncidentCommentsResponse';
  items: IncidentComments_incidentComments_items[];
}

export interface IncidentComments {
  incidentComments: IncidentComments_incidentComments;
}

export interface IncidentCommentsVariables {
  incidentId: string;
}
