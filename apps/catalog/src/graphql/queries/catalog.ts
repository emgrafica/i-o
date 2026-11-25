import { gql } from 'apollo-boost';
import {
  CatalogSortOptionsFragment,
  CatalogCardDetailsFragment,
  DocumentNodeFragment,
} from 'graphql/fragments';

/**
 * Queries all catalog items.
 */
export const CATALOG_DATA = gql`
  query CatalogData(
    $userId: String!
    $catalogClass: CatalogItemClass!
    $categories: [String!]
    $manufacturers: [String!]
    $sortBy: String
    $refine: String
    $pageNumber: Int
    $pageSize: Int
    $memory: [String!]
    $storage: [String!]
    $osType: [String!]
    $processor: [String!]
  ) {
    catalogModels(
      userId: $userId
      catalogClass: $catalogClass
      categories: $categories
      manufacturers: $manufacturers
      sortBy: $sortBy
      refine: $refine
      pageNumber: $pageNumber
      pageSize: $pageSize
      memory: $memory
      storage: $storage
      osType: $osType
      processor: $processor
    ) {
      totalHits
      totalPages
      ...CatalogCardDetails
    }
  }
  ${CatalogCardDetailsFragment}
`;

/**
 * Fetch the alert well for the catalog
 */
export const CATALOG_ALERT_WELL = gql`
  query CatalogAlertWell($userId: String!, $catalogClass: CatalogItemClass!) {
    catalogAlertWell(userId: $userId, catalogClass: $catalogClass) {
      enabled
      catalogClass
      message {
        ...DocumentNode
      }
    }
  }
  ${DocumentNodeFragment}
`;

/**
 * Fetch computer/accessory catalog item data and tenant-configurable options
 */
export const CATALOG_ITEM_DETAILS = gql`
  query CatalogItemDetails(
    $userId: String!
    $catalogClass: CatalogItemClass!
    $catalogItemName: String
    $isComputer: Boolean!
    $isAccessory: Boolean!
    $assignedToId: String
    $isReplacement: Boolean
    $assetUsage: String
  ) {
    catalogItem: catalogItemByName(
      userId: $userId
      catalogClass: $catalogClass
      catalogItemName: $catalogItemName
    ) {
      catalogItemName
      catalogItemImage
      modelId
      description

      configurationOptions @include(if: $isComputer) {
        keyboardLanguages
        electricalPlugTypes
      }
      computerCatalogInfo @include(if: $isComputer) {
        osType
        configurations {
          memory
          storage
          processor
          color
          configurationText
          displaySkuSpecs {
            label
            value
          }
          skuLowestPricing {
            value
            format
            enabled
          }
          skus {
            skuId
            keyboardLanguage
            electricalPlugType
            pricing {
              enabled
              format
              value
            }
          }
        }
      }
      accessoryCatalogInfo @include(if: $isAccessory) {
        informationalSpecs {
          skus {
            skuId
            keyboardLanguage
            electricalPlugType
            pricing {
              enabled
              format
              value
            }
          }
        }
      }
    }

    catalogOrderConfiguration(
      catalogClass: $catalogClass
      assignedToId: $assignedToId
      isReplacement: $isReplacement
      assetUsage: $assetUsage
    ) {
      requireBusinessJustification
      agreementMessaging {
        nodeType
        content {
          nodeType
          value
          data {
            target
            openOnNewWindow
          }
        }
      }
      deviceRequestReasons {
        requestReason
        type
      }
      deviceUsageReasons {
        usageId
        usageReason
      }
    }
  }
`;

export const USER_ASSETS = gql`
  query UserAssets($assignedToId: String) {
    assets(assignedToId: $assignedToId) {
      catalogItem {
        name
      }
    }
  }
`;

export const CATALOG_SORT_OPTIONS = gql`
  query CatalogSortOptions($catalogClass: CatalogItemClass!) {
    catalogSortOptions(class: $catalogClass) {
      ...CatalogSortOptions
    }
  }
  ${CatalogSortOptionsFragment}
`;

export const CATALOG_ENTITLEMENT = gql`
  query CatalogEntitlement($catalogClass: CatalogItemClass!, $userId: String!) {
    catalogEntitlement(catalogClass: $catalogClass, userId: $userId) {
      entitled
    }
  }
`;

export const CATALOG_GCOM_ITEMS = gql`
  query GcomItems($site: String!, $userId: String!) {
    gcomItems(site: $site, userId: $userId) {
      code
      name
      default
    }
  }
`;

export const MOBILITY_HARDWARE_RESOLVE_SKU = gql`
  query MobilityResolveHardwareSku(
    $modelId: String!
    $skuAnswers: [SkuAnswer!]
    $userId: String!
  ) {
    mobilityResolveHardwareSku(
      modelId: $modelId
      skuAnswers: $skuAnswers
      userId: $userId
    ) {
      components {
        id
        key
        componentType
        inputValues {
          id
          value
          image
          default
        }
      }
      sku {
        sku
        price {
          value
          format
          enabled
        }
      }
    }
  }
`;

export const MOBILITY_PLANS_RESOLVE_SKU = gql`
  query MobilityResolvePlanSku(
    $modelId: String!
    $skuId: String!
    $skuAnswers: [SkuAnswer!]
    $userId: String!
  ) {
    mobilityResolvePlanSku(
      modelId: $modelId
      skuId: $skuId
      skuAnswers: $skuAnswers
      userId: $userId
    ) {
      components {
        id
        key
        componentType
        inputValues {
          id
          value
          image
          default
        }
      }
      sku {
        sku
        features {
          id
          name
          recurringPrice
          recurringPriceCurrency
          recurringPriceFrequency
        }
      }
    }
  }
`;
