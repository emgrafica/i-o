/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  CatalogItemClass,
  CatalogPricingType,
  RequestReasonType,
} from './../globalTypes';

// ====================================================
// GraphQL query operation: CatalogItemDetails
// ====================================================

export interface CatalogItemDetails_catalogItem_configurationOptions {
  __typename: 'ItemConfigurationOptions';
  keyboardLanguages: string[];
  electricalPlugTypes: string[];
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_displaySkuSpecs {
  __typename: 'ComputerDisplaySkuSpecs';
  /**
   * Label of the custom display field
   */
  label: string;
  /**
   * Value of the custom display field
   */
  value: string;
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skuLowestPricing {
  __typename: 'Pricing';
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus_pricing {
  __typename: 'Pricing';
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus {
  __typename: 'ComputerSkuDetails';
  /**
   * Unique database ID of the SKU
   */
  skuId: string;
  keyboardLanguage: string | null;
  electricalPlugType: string | null;
  /**
   * Pricing info for this SKU
   */
  pricing: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus_pricing | null;
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo_configurations {
  __typename: 'ComputerConfigurations';
  memory: string | null;
  storage: string | null;
  processor: string | null;
  color: string | null;
  configurationText: string | null;
  displaySkuSpecs:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_displaySkuSpecs[]
    | null;
  /**
   * Lowest SKU pricing under this config
   */
  skuLowestPricing: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skuLowestPricing | null;
  skus: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus[];
}

export interface CatalogItemDetails_catalogItem_computerCatalogInfo {
  __typename: 'ComputerCatalogInfo';
  osType: string | null;
  configurations: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations[];
}

export interface CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus_pricing {
  __typename: 'Pricing';
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
}

export interface CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus {
  __typename: 'AccessorySkuDetails';
  /**
   * Unique database ID of the SKU
   */
  skuId: string;
  keyboardLanguage: string | null;
  electricalPlugType: string | null;
  /**
   * Pricing info for this SKU
   */
  pricing: CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus_pricing | null;
}

export interface CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs {
  __typename: 'AccessoriesInformationalSpecs';
  skus: CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus[];
}

export interface CatalogItemDetails_catalogItem_accessoryCatalogInfo {
  __typename: 'AccessoriesCatalogInfo';
  informationalSpecs: CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs[];
}

export interface CatalogItemDetails_catalogItem {
  __typename: 'CatalogItemFull';
  catalogItemName: string;
  catalogItemImage: string | null;
  modelId: string | null;
  description: string | null;
  /**
   * Lists the keyboardLanguages and/or electricalPlugTypes for the specified catalog item.
   */
  configurationOptions: CatalogItemDetails_catalogItem_configurationOptions;
  computerCatalogInfo: CatalogItemDetails_catalogItem_computerCatalogInfo | null;
  accessoryCatalogInfo: CatalogItemDetails_catalogItem_accessoryCatalogInfo | null;
}

export interface CatalogItemDetails_catalogOrderConfiguration_agreementMessaging_content_data {
  __typename: 'LinkNode';
  /**
   * url to navigate to
   */
  target: string;
  /**
   * open link on new window or not
   */
  openOnNewWindow: boolean;
}

export interface CatalogItemDetails_catalogOrderConfiguration_agreementMessaging_content {
  __typename: 'DocumentNode';
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  /**
   * Value to display. Only Text and Link nodes contains value to display
   */
  value: string | null;
  /**
   * Used to pass required extra data to render an specific node type
   */
  data: CatalogItemDetails_catalogOrderConfiguration_agreementMessaging_content_data | null;
}

export interface CatalogItemDetails_catalogOrderConfiguration_agreementMessaging {
  __typename: 'DocumentNode';
  /**
   * Defines the type of node. Options are document, paragraph, text and link
   */
  nodeType: string;
  content:
    | CatalogItemDetails_catalogOrderConfiguration_agreementMessaging_content[]
    | null;
}

export interface CatalogItemDetails_catalogOrderConfiguration_deviceRequestReasons {
  __typename: 'DeviceRequestReason';
  /**
   * The usage reason
   */
  requestReason: string;
  /**
   * The type of request the reason represents
   */
  type: RequestReasonType;
}

export interface CatalogItemDetails_catalogOrderConfiguration_deviceUsageReasons {
  __typename: 'DeviceUsageReason';
  /**
   * Unique ID of the usage entry
   */
  usageId: string;
  /**
   * The usage reason
   */
  usageReason: string;
}

export interface CatalogItemDetails_catalogOrderConfiguration {
  __typename: 'OrderConfiguration';
  /**
   * Whether or not the Tenant has configured the business justification to be required when ordering catalog items
   */
  requireBusinessJustification: boolean;
  /**
   * Agreement messaging - if null then the Tenant has not enabled agreement messaging for this catalog
   */
  agreementMessaging: CatalogItemDetails_catalogOrderConfiguration_agreementMessaging | null;
  /**
   * Device request reasons
   */
  deviceRequestReasons: CatalogItemDetails_catalogOrderConfiguration_deviceRequestReasons[];
  /**
   * Device usage reasons
   */
  deviceUsageReasons: CatalogItemDetails_catalogOrderConfiguration_deviceUsageReasons[];
}

export interface CatalogItemDetails {
  catalogItem: CatalogItemDetails_catalogItem;
  catalogOrderConfiguration: CatalogItemDetails_catalogOrderConfiguration;
}

export interface CatalogItemDetailsVariables {
  userId: string;
  catalogClass: CatalogItemClass;
  catalogItemName?: string | null;
  isComputer: boolean;
  isAccessory: boolean;
  assignedToId?: string | null;
  isReplacement?: boolean | null;
  assetUsage?: string | null;
}
