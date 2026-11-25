import { gql } from 'apollo-boost';

export const CREATE_GCOM_CATALOG_ORDER = gql`
  mutation CreateGComCatalogOrder($data: CreateGComCatalogOrderInput!) {
    createGComCatalogOrder(data: $data) {
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
