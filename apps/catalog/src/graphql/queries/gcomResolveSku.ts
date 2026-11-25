import { gql } from 'apollo-boost';

export const GCOM_RESOLVE_SKU = gql`
  query GComResolveSku(
    $productCode: String!
    $skuAnswers: [SkuAnswer!]
    $sku: String
    $assignedToId: String
    $site: String
  ) {
    gcomResolveSku(
      productCode: $productCode
      skuAnswers: $skuAnswers
      sku: $sku
      assignedToId: $assignedToId
      site: $site
    ) {
      components {
        id
        key
        label
        required
        maxLength
        tooltip
        componentType
        inputType
        inputValues {
          id
          value
        }
        isPersonal
      }
      sku {
        sku
        description
        image
        reasonForRequest
        hasShipping
      }
    }
  }
`;

export default GCOM_RESOLVE_SKU;
