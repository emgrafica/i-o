/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CartInfo
// ====================================================

export interface CartInfo_cartInfo_cartItems {
  __typename: "CartItem";
  checkoutType: string | null;
}

export interface CartInfo_cartInfo {
  __typename: "CartInfo";
  cartItems: (CartInfo_cartInfo_cartItems | null)[] | null;
}

export interface CartInfo {
  cartInfo: CartInfo_cartInfo | null;
}
