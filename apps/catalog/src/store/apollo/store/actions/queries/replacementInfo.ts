import { gql } from 'apollo-boost';

export const REPLACEMENT_INFO = gql`
  query ReplacementInfo {
    replacementInfo @client {
      id
      image
      productName
      serialNumber
      usage
      expires
      catalogItemId
      _etag
    }
  }
`;
