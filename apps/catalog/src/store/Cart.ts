import { CheckoutTypes } from 'pages/CatalogPage/utils';
import {
  CatalogItemDetails_catalogItem,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
  CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { GComResolveSku_gcomResolveSku_components as GComComponent } from 'graphql/queries/gqlTypes/GComResolveSku';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  checkoutType: CheckoutTypes;
  data: CartCatalogData | CartGcomData | CartMobilityData;
}

export interface CartCatalogData {
  requestConfigOptions: RequestConfigOptions;
  catalogItem?: CatalogItemDetails_catalogItem;
}

export interface RequestConfigOptions {
  selectedConfiguration?:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs;
  catalogItemClass?: CatalogItemClass;
  catalogItemId?: string;
  osType?: string;
  businessJustification?: string;
  requestReason: string;
  deviceUsage?: string | null;
  isAcknowledged?: boolean;
  keyboardLanguage?: string;
  plugType?: string;
  incidentNumber?: string;
  situationDetails?: string;
  hasShipping?: boolean;
}

export interface CartGcomData {
  /**
   * User to bill to
   */
  billedToUser: UserProfileRequest_userProfile;

  /**
   * Selected location
   */
  location: CartGcomLocation;

  /**
   * Selected SKU id
   */
  sku: string;

  /**
   * Selected product
   */
  selectedProduct: CartGcomProduct;

  /**
   * The SKU image
   */
  image: string | null;

  /**
   * The Description of the SKU
   */
  description: string;

  /**
   * The reason for the request
   */
  reasonForRequest: string;

  /**
   * The business justification
   */
  businessJustification: string | null;

  /**
   * Whether the SKU has shipping or not
   */
  hasShipping: boolean;

  /**
   * Hash to map questions ids to answers
   */
  answers: IHash | null;

  /**
   * Array of sku follow up components and fields
   */
  skuComponents: GComComponent[] | null;
}

export interface CartGcomLocation {
  /**
   * Selected state
   */
  state: string;

  /**
   * Selected city
   */
  city: string;

  /**
   * Selected site
   */
  site: string;
}

export interface CartGcomProduct {
  value: string;
  label: string;
}

export interface CartMobilityData {
  /**
   * Model id
   */
  modelId: string;

  /**
   * The mobility item name
   */
  name: string;

  /**
   * Hardware SKU id
   */
  hardwareSku: string;

  /**
   * Plan SKU id
   */
  planSku: string;

  /**
   * The mobility item carrier
   */
  carrier: string;

  /**
   * The mobility item plan
   */
  plan: string;

  /**
   * The mobility item plan features
   */
  features: CartMobilityFeature[];

  /**
   * The SKU image
   */
  image: string | null;

  /**
   * The Description of the SKU
   */
  description: string | null;

  /**
   * The reason for the request
   */
  reasonForRequest: string;

  /**
   * The device usage
   */
  deviceUsage: string;

  /**
   * The business justification
   */
  businessJustification: string | null;
}

export interface CartMobilityFeature {
  id: string;
  value: string;
}

/**
 * Generic Hash Map that accepts any value
 */
export interface IHash {
  [key: string]: any;
}
