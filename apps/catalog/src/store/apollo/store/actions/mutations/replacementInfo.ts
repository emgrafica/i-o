import { gql } from 'apollo-boost';

export const SET_REPLACEMENT_INFO = gql`
  mutation SetReplacementInfo($productInfo: ProductInfo) {
    setReplacementInfo(productInfo: $productInfo) @client {
      id
    }
  }
`;
