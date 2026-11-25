/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelCatalogRequest
// ====================================================

export interface CancelCatalogRequest {
  cancelCatalogRequest: string;
}

export interface CancelCatalogRequestVariables {
  requestId: string;
  workflowId: string;
  reason: string;
  etag: string;
}
