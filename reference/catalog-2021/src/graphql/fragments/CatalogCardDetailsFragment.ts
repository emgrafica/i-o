import gql from 'graphql-tag';

const CATALOG_CARD_DETAILS_FRAGMENT = gql`
  fragment CatalogCardDetails on CatalogModels {
    catalogModels {
      description
      tenantId
      class
      category
      catalogItemImage
      catalogItemName
      pricing {
        format
        enabled
        value
      }
      productOverlay {
        type
        reason
        availability
      }
    }
  }
`;

export default CATALOG_CARD_DETAILS_FRAGMENT;
