import { gql } from 'apollo-boost';

export const REGISTER_ASSET_OWNERSHIP = gql`
  mutation registerAssetOwnership($data: RegisterAssetOwnershipArgs!) {
    registerAssetOwnership(data: $data) {
      ticketId
    }
  }
`;
