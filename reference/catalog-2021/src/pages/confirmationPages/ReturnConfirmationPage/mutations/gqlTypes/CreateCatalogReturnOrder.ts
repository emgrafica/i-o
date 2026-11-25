/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCatalogReturnOrderInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCatalogReturnOrder
// ====================================================

export interface CreateCatalogReturnOrder_createCatalogReturnOrder {
  __typename: "OrderConfirmation";
  requestId: string | null;
}

export interface CreateCatalogReturnOrder {
  createCatalogReturnOrder: CreateCatalogReturnOrder_createCatalogReturnOrder;
}

export interface CreateCatalogReturnOrderVariables {
  data: CreateCatalogReturnOrderInput;
}
