/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddIncidentComment
// ====================================================

export interface AddIncidentComment_addComment_createdBy {
  __typename: "BaseUser";
  name: string;
  userId: string;
}

export interface AddIncidentComment_addComment {
  __typename: "IncidentComment";
  comment: string;
  createdOn: number;
  createdBy: AddIncidentComment_addComment_createdBy;
  userImage: string;
}

export interface AddIncidentComment {
  addComment: AddIncidentComment_addComment;
}

export interface AddIncidentCommentVariables {
  incidentId: string;
  incidentNumber: string;
  comment: string;
}
