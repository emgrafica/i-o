import { gql } from 'apollo-boost';

export const CREATE_MISSING_COMPUTER_REPLACEMENT_ORDER = gql`
  mutation CreateMissingComputerReplacementOrder(
    $requestedFor: String!
    $shippingInfo: AddressInfoInput!
    $deviceUsage: String
    $validateAddress: Boolean
    $quantity: Int
    $assetId: String!
    $requestedForId: String!
    $description: String!
    $caseNumber: String!
    $serialNumber: String
  ) {
    createReplaceMissingComputerOrder(
      requestedFor: $requestedFor
      shippingInfo: $shippingInfo
      deviceUsage: $deviceUsage
      validateAddress: $validateAddress
      quantity: $quantity
      assetId: $assetId
      requestedForId: $requestedForId
      description: $description
      caseNumber: $caseNumber
      serialNumber: $serialNumber
    ) {
      requestId
      ticketId
      error {
        message
        field
        inLine
        code
      }
      shippingForm {
        isAddressValid
      }
      assetTicket {
        ticketId
      }
    }
  }
`;
