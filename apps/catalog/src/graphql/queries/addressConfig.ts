import gql from 'graphql-tag';

export const ADDRESS_CONFIG = gql`
  query AddressConfig(
    $catalogClass: String!
    $requestType: CatalogRequestType!
    $userId: String!
  ) {
    addressConfig(
      catalogClass: $catalogClass
      requestType: $requestType
      userId: $userId
    ) {
      alert {
        text
      }
      addressEditable
      carrier
      addressOverrideEnabled
      shippingAddressData {
        name {
          text
          editable
        }
        business {
          text
          editable
        }
        address1 {
          text
          editable
        }
        address2 {
          text
          editable
        }
        state {
          text
          editable
        }
        city {
          text
          editable
        }
        zip {
          text
          editable
        }
        country {
          text
          editable
        }
        phoneNumber {
          text
          editable
        }
      }
      carrier
    }
  }
`;
