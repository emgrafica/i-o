/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserCartItem } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AddToCartInfo
// ====================================================

export interface AddToCartInfo_addToCartInfo_cartItems {
  __typename: "CartItem";
  checkoutType: string | null;
}

export interface AddToCartInfo_addToCartInfo {
  __typename: "CartInfo";
  cartItems: (AddToCartInfo_addToCartInfo_cartItems | null)[] | null;
}

export interface AddToCartInfo {
  addToCartInfo: AddToCartInfo_addToCartInfo | null;
}

export interface AddToCartInfoVariables {
  cartItem?: UserCartItem | null;
}
