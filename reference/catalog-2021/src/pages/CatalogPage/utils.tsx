import { CatalogItemClass } from 'gqlTypes/globalTypes';
import {
  RequestComputersPath,
  RequestAccessoriesPath,
  RequestMobilityPath,
  RequestGComPath,
} from 'utils/routes';

// Constants
export const MAX_ITEMS_PER_PAGE = 24;
export const SORT_PRICE_LOW_TO_HIGH = 'Price Low to High';

/**
 * Maps the value of the Catalog Item Class prop
 * to the i18n text to display on the Title
 */
export const titleMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]: 'pages:request.computers.header.title',
  [CatalogItemClass.accessory]: 'pages:request.accessories.header.title',
  [CatalogItemClass.mobility]: 'pages:request.mobility.header.title',
  [CatalogItemClass.gcom]: 'pages:request.gcom.header.title',
};

/**
 * Maps the value of the Catalog Item Class prop
 * to the i18n text to display on the SubTitle
 */
export const subTitleMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]: 'pages:request.computers.header.subtitle',
  [CatalogItemClass.accessory]: 'pages:request.accessories.header.subtitle',
  [CatalogItemClass.mobility]: 'pages:request.mobility.header.subtitle',
  [CatalogItemClass.gcom]: 'pages:request.gcom.header.subtitle',
};

/**
 * Maps the value of the Catalog Item Class prop
 * to the path to go to details view
 */
export const pathMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]: RequestComputersPath,
  [CatalogItemClass.accessory]: RequestAccessoriesPath,
  [CatalogItemClass.mobility]: RequestMobilityPath,
  [CatalogItemClass.gcom]: RequestGComPath,
};

/**
 * Filter constants
 */
export enum Filters {
  Category = 'Category',
  Manufacturer = 'Manufacturer',
  Memory = 'Memory',
  Storage = 'Storage',
  OperatingSystem = 'Operating System',
  Processor = 'Processor',
}

/**
 * Filter selected fields constants
 */
export enum FilterSelectedField {
  Categories = 'categories',
  Manufacturers = 'manufacturers',
  Memory = 'memory',
  Storage = 'storage',
  OsType = 'osType',
  Processor = 'processor',
}

/**
 * Checkout Types constants
 */
export enum CheckoutTypes {
  Accessories = 'accessories',
  Computers = 'computers',
  Mobility = 'mobility',
  GCom = 'gcom',
}
