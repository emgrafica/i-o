import { gql } from 'apollo-boost';

export const REASSIGN_ASSET_REQUEST = gql`
  mutation reassignAsset($data: ReassignAssetInput!) {
    reassignAsset(data: $data) {
      ticketId
    }
  }
`;
