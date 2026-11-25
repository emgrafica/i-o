import { gql } from 'apollo-boost';

// ====================================================
// Cart Mutations
// ====================================================

export const ADD_TO_CART_INFO = gql`
  mutation AddToCartInfo($cartItem: UserCartItem) {
    addToCartInfo(cartItem: $cartItem) @client {
      cartItems {
        checkoutType
      }
    }
  }
`;
