import { gql } from 'apollo-boost';

// ====================================================
// Cart Queries
// ====================================================

export const CART_INFO = gql`
  query CartInfo {
    cartInfo @client {
      cartItems {
        checkoutType
      }
    }
  }
`;
