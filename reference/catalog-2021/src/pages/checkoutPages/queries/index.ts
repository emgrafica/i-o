import gql from 'graphql-tag';

export const CREATE_CATALOG_ORDER = gql`
  mutation CreateCatalogOrder($data: CreateCatalogOrderInput!) {
    createCatalogOrder(data: $data) {
      requestId
      ticketId
      shippingForm {
        isAddressValid
        shippingAddressErrors {
          address1 {
            code
            text
            inLine
          }
          address2 {
            code
            text
            inLine
          }
          city {
            code
            text
            inLine
          }
          state {
            code
            text
            inLine
          }
          zip {
            code
            text
            inLine
          }
          country {
            code
            text
            inLine
          }
        }
      }
    }
  }
`;
