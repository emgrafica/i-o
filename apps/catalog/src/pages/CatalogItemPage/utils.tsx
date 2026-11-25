import {
  CatalogItemClass,
  CatalogPricingType,
  SkuAnswer,
} from 'gqlTypes/globalTypes';
import {
  CatalogItemDetails_catalogItem,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus,
  CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus,
  CatalogItemDetails_catalogOrderConfiguration,
  CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { CheckoutTypes } from '../CatalogPage/utils';
import {
  RequestComputersPath,
  RequestAccessoriesPath,
  RequestMobilityPath,
  RequestGComPath,
} from 'utils/routes';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components as MobilityComponent } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import { CartItem, RequestConfigOptions } from 'store/Cart';

export const CARRIER_ID = 'carrier';
export const STORAGE_ID = 'storage';
export const COLOR_ID = 'color';
export const PLAN_ID = 'plan';

/**
 * Field for selected configuration on ConfigurationState
 */
export const SELECTED_CONFIGURATION_FIELD = 'selectedConfiguration';
/**
 * Field for selected plug type on ConfigurationState
 */
export const SELECTED_PLUG_TYPE_FIELD = 'selectedElectricalPlugType';

export const getTitle = (componentId: string) => {
  switch (componentId) {
    case CARRIER_ID:
      return 'pages:request.mobility.mobilityDetails.carrier';

    case STORAGE_ID:
      return 'pages:request.mobility.mobilityDetails.storage';

    case COLOR_ID:
      return 'pages:request.mobility.mobilityDetails.color';

    case PLAN_ID:
      return 'pages:request.mobility.mobilityDetails.plans';

    default:
      return '';
  }
};

/**
 * Maps the value of the Catalog Item Class prop
 * to the i18n text to display on the Select Configuration
 */
export const selectConfigurationMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]:
    'pages:request.computers.computerDetails.selectConfiguration',
  [CatalogItemClass.accessory]:
    'pages:request.accessories.accessoryDetails.configuration.title',
  [CatalogItemClass.mobility]:
    'pages:request.mobility.mobilityDetails.configuration.title',
  [CatalogItemClass.gcom]: '',
};

/**
 * Maps the value of the Catalog Item Class prop
 * to the i18n text to display on the configuration Stock kMessage
 */
export const configurationStockMessageMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]:
    'pages:request.computers.computerDetails.configurationStockMessage',
  [CatalogItemClass.accessory]: '',
  [CatalogItemClass.mobility]:
    'pages:request.mobility.mobilityDetails.configurationStockMessage',
  [CatalogItemClass.gcom]: '',
};

/**
 * Maps the value of the Item Class prop
 * to the back button path
 */
export const backButtonPathMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]: RequestComputersPath,
  [CatalogItemClass.accessory]: RequestAccessoriesPath,
  [CatalogItemClass.mobility]: RequestMobilityPath,
  [CatalogItemClass.gcom]: RequestGComPath,
};

/**
 * Maps the value of the Item Class prop
 * to the Checkout Type
 */
export const checkoutTypeMap: {
  [key in CatalogItemClass]: CheckoutTypes;
} = {
  [CatalogItemClass.computer]: CheckoutTypes.Computers,
  [CatalogItemClass.accessory]: CheckoutTypes.Accessories,
  [CatalogItemClass.mobility]: CheckoutTypes.Mobility,
  [CatalogItemClass.gcom]: CheckoutTypes.GCom,
};

/**
 * Maps the value of the Catalog Item Class prop
 * to the i18n text to display on the Title
 */
export const titleMap: {
  [key in CatalogItemClass]: string;
} = {
  [CatalogItemClass.computer]: 'pages:request.computers.computerDetails.title',
  [CatalogItemClass.accessory]:
    'pages:request.accessories.accessoryDetails.title',
  [CatalogItemClass.mobility]: 'pages:request.mobility.mobilityDetails.title',
  [CatalogItemClass.gcom]: 'pages:request.mobility.header.title',
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
  [CatalogItemClass.gcom]: 'pages:request.mobility.header.subtitle',
};

/**
 * Configuration options for a catalog item
 */
export enum CatalogItemOptions {
  KeyboardLanguage = 'keyboardLanguage',
  ElectricalPlugType = 'electricalPlugType',
}

/**
 * Type for a catalog Accessory
 */
export enum AccessoryType {
  Keyboard = 'keyboard',
  PlugType = 'plugType',
  NotType = 'notType',
}

/**
 * Maps the value of the Accessory type prop
 * to the i18n text to display on the Title
 */
export const accessoriesConfigurationMap: {
  [key in AccessoryType]: string;
} = {
  [AccessoryType.Keyboard]:
    'pages:request.accessories.accessoryDetails.configuration.keyboard',
  [AccessoryType.PlugType]:
    'pages:request.accessories.accessoryDetails.configuration.plugType',
  [AccessoryType.NotType]: '',
};

/**
 * Required shape of dropdown item for <FilterBox />
 */
export interface DropdownOption {
  /**
   * Label of dropdown item
   */
  label: string;
  /**
   * Value saved in state when this dropdown item is selected
   */
  value: string;
}

export interface Pricing {
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

/**
 * Selected Sku
 */
export interface SelectedSku {
  /**
   * Unique database ID of the SKU
   */
  skuId: string;
  /**
   * Pricing info for this SKU
   */
  pricing: Pricing | null;
}

export interface ConfigurationState {
  /**
   * Configuration option selected
   */
  selectedConfiguration:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs;

  /**
   * Selected Sku
   */
  selectedSku: SelectedSku | null;

  /**
   * Reason for requesting the device
   */
  requestReason: string;
  /**
   * How the device will be used
   */
  deviceUsage: string;
  /**
   * User's justification for requesting the device
   */
  businessJustification: string;
  /**
   * Handles whether the user has acknowledged the tenant's request messaging
   */
  isAcknowledged: boolean;
  /**
   * Electrical plug type the user selected for the device
   */
  selectedElectricalPlugType: string;
  /**
   * Keyboard language the user selected for the device
   */
  selectedKeyboardLanguage: string;
  // Define an index signature to allow us to access each index by a string
  [propName: string]: any;
}

/**
 * getConfigurationsByItemClass will return the configuration of each Catalog Item based on the type of item.
 *
 * @param catalogItemClass - Type of item Enum
 * @param catalogItem - Catalog item
 */
export const getConfigurationsByItemClass = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
) => {
  switch (catalogItemClass) {
    case CatalogItemClass.computer:
      return (
        catalogItem &&
        catalogItem.computerCatalogInfo &&
        catalogItem.computerCatalogInfo.configurations
      );

    case CatalogItemClass.accessory:
      return (
        catalogItem &&
        catalogItem.accessoryCatalogInfo &&
        catalogItem.accessoryCatalogInfo.informationalSpecs
      );

    default:
      return [];
  }
};

/**
 * Finds the sku that is associated to the configured item.
 *
 * @param catalogItemClass - Type of item Enum
 * @param catalogItem - Catalog item
 * @param keyboardLanguage - Selected keyboard language
 * @param electricalPlugType - Selected electrical plug type
 */
export const getSelectedSku = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
  keyboardLanguage: string,
  electricalPlugType: string,
) => {
  let selectedSku: SelectedSku | null = null;
  const configurations = getConfigurationsByItemClass(
    catalogItemClass,
    catalogItem,
  );
  if (configurations) {
    for (const configuration of configurations) {
      for (const sku of configuration.skus) {
        const { skuId, pricing } = sku;
        switch (catalogItemClass) {
          case CatalogItemClass.computer:
            if (
              (sku as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus)
                .keyboardLanguage === keyboardLanguage &&
              (sku as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus)
                .electricalPlugType === electricalPlugType
            ) {
              selectedSku = {
                skuId: skuId,
                pricing: pricing
                  ? {
                      enabled: pricing.enabled,
                      format: pricing.format,
                      value: pricing.value,
                    }
                  : null,
              };
            }
            break;

          case CatalogItemClass.accessory:
            let isEqualKeyboardLanguageMatching = true;
            if (
              (sku as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)
                .keyboardLanguage
            ) {
              isEqualKeyboardLanguageMatching =
                (sku as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)
                  .keyboardLanguage === keyboardLanguage;
            }

            let isEqualElectricalPlugTypeMatching = true;
            if (
              (sku as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)
                .electricalPlugType
            ) {
              isEqualElectricalPlugTypeMatching =
                (sku as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)
                  .electricalPlugType === electricalPlugType;
            }

            if (
              isEqualKeyboardLanguageMatching &&
              isEqualElectricalPlugTypeMatching
            ) {
              selectedSku = {
                skuId: skuId,
                pricing: pricing
                  ? {
                      enabled: pricing.enabled,
                      format: pricing.format,
                      value: pricing.value,
                    }
                  : null,
              };
            }
            break;

          case CatalogItemClass.mobility:
            //TODO: Mobility config selection is not defined by PMs yet, temporally Mobility will always select first until Configuration details get solved for Mobility.
            selectedSku = {
              skuId: skuId,
              pricing: pricing
                ? {
                    enabled: pricing.enabled,
                    format: pricing.format,
                    value: pricing.value,
                  }
                : null,
            };
            break;
        }

        if (selectedSku) {
          break;
        }
      }
    }
  }
  return selectedSku;
};

/**
 * parseSelectedConfiguration will return a parsed Object to send to Checkout
 *
 * @param catalogItemClass - Type of item Enum
 * @param catalogItem catalog item configured.
 * @param selectedConfiguration configuration selected.
 */
export const parseSelectedConfiguration = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
  configurationState: ConfigurationState,
): RequestConfigOptions => {
  const { computerCatalogInfo } = catalogItem;
  const {
    selectedSku,
    selectedConfiguration,
    businessJustification,
    requestReason,
    deviceUsage,
    isAcknowledged,
    selectedElectricalPlugType,
    selectedKeyboardLanguage,
  } = configurationState;

  return {
    selectedConfiguration,
    ...(selectedSku &&
      selectedSku.skuId && { catalogItemId: selectedSku.skuId }),
    ...(computerCatalogInfo &&
      computerCatalogInfo.osType && { osType: computerCatalogInfo.osType }),
    businessJustification,
    requestReason,
    deviceUsage,
    isAcknowledged,
    keyboardLanguage: selectedKeyboardLanguage,
    plugType: selectedElectricalPlugType,
    catalogItemClass,
  };
};

/**
 * isElectricalPlugTypeValid verify if Electrical Plug Type selection is valid to be submitted
 *
 * @param skus - item skus
 * @param selectedElectricalPlugType plug type selected.
 */
export const isElectricalPlugTypeValid = (
  skus:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus[]
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus[],
  selectedElectricalPlugType: string,
) => {
  const electricalPlugTypeOptions = parseSkusToPlugTypeDropdownOptions(skus);
  const isElectricalPlugTypeRequired = electricalPlugTypeOptions.length > 0;
  return !isElectricalPlugTypeRequired || selectedElectricalPlugType;
};

/**
 * isKeyboardLanguageValid verify if Keyboard language selection is valid to be submitted
 *
 * @param skus - item skus
 * @param selectedElectricalPlugType plug type selected.
 * @param selectedKeyboardLanguage keyboard language selected.
 */
export const isKeyboardLanguageValid = (
  skus:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus[]
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus[],
  selectedElectricalPlugType: string,
  selectedKeyboardLanguage: string,
) => {
  const electricalPlugTypeOptions = parseSkusToPlugTypeDropdownOptions(skus);
  const keyboardLanguageOptions = parseSkusToKeyboardDropdownOptions(
    skus,
    selectedElectricalPlugType
      ? selectedElectricalPlugType
      : electricalPlugTypeOptions &&
        electricalPlugTypeOptions.length > 0 &&
        electricalPlugTypeOptions[0]
      ? electricalPlugTypeOptions[0].value
      : '',
  );
  const isKeyboardLanguageRequired = keyboardLanguageOptions.length > 0;
  return !isKeyboardLanguageRequired || selectedKeyboardLanguage;
};

/**
 * isSelectedConfigurationValid verify if all the selection is valid to be submitted
 *
 * @param catalogItemClass - Type of item Enum
 * @param catalogItem catalog item configured.
 * @param selectedConfiguration configuration selected.
 */
export const isSelectedConfigurationValid = (
  catalogItemClass: CatalogItemClass,
  selectedConfiguration: ConfigurationState,
  catalogOrderConfiguration: CatalogItemDetails_catalogOrderConfiguration | null = null,
) => {
  const {
    requestReason,
    deviceUsage,
    businessJustification,
    isAcknowledged,
    selectedElectricalPlugType,
    selectedKeyboardLanguage,
  } = selectedConfiguration;
  let isValid;
  switch (catalogItemClass) {
    case CatalogItemClass.computer:
      const isComputerPlugTypeValid = isElectricalPlugTypeValid(
        (selectedConfiguration.selectedConfiguration as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations)
          .skus,
        selectedElectricalPlugType,
      );
      const isComputerKeyboardLanguageValid = isKeyboardLanguageValid(
        (selectedConfiguration.selectedConfiguration as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations)
          .skus,
        selectedElectricalPlugType,
        selectedKeyboardLanguage,
      );
      const isComputerBusinessJustificationRequired =
        catalogOrderConfiguration &&
        catalogOrderConfiguration.requireBusinessJustification;

      // Checks state for the required fields to determine form validity.
      // Fieds are valid if they are not required or if there is a value in their corresponding state variable.
      const isComputerBusinessJustificationValid = Boolean(
        !isComputerBusinessJustificationRequired || businessJustification,
      );

      isValid =
        requestReason &&
        deviceUsage &&
        isComputerBusinessJustificationValid &&
        isAcknowledged &&
        isComputerPlugTypeValid &&
        isComputerKeyboardLanguageValid;
      break;

    case CatalogItemClass.accessory:
      const isAccessoriesPlugTypeValid = isElectricalPlugTypeValid(
        (selectedConfiguration.selectedConfiguration as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs)
          .skus,
        selectedElectricalPlugType,
      );
      const isAccessoriesKeyboardLanguageValid = isKeyboardLanguageValid(
        (selectedConfiguration.selectedConfiguration as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs)
          .skus,
        selectedElectricalPlugType,
        selectedKeyboardLanguage,
      );
      const isAccessoriesBusinessJustificationRequired =
        catalogOrderConfiguration &&
        catalogOrderConfiguration.requireBusinessJustification;

      const isAcknowledgmentMessagingRequired =
        catalogOrderConfiguration &&
        catalogOrderConfiguration.agreementMessaging;

      // Checks state for the required fields to determine form validity.
      // Fieds are valid if they are not required or if there is a value in their corresponding state variable.
      const isAccessoriesBusinessJustificationValid = Boolean(
        !isAccessoriesBusinessJustificationRequired || businessJustification,
      );
      const isAcknowledgedValid =
        !isAcknowledgmentMessagingRequired || isAcknowledged;

      isValid =
        isAccessoriesBusinessJustificationValid &&
        isAcknowledgedValid &&
        isAccessoriesPlugTypeValid &&
        isAccessoriesKeyboardLanguageValid;
      break;
    case CatalogItemClass.mobility:
      isValid =
        requestReason && deviceUsage && businessJustification && isAcknowledged;
      break;
  }
  return isValid;
};

/**
 * parseDataForCheckout parse data to format Checkout Page is expecting
 *
 * @param catalogItemClass - Type of item Enum
 * @param checkoutType will define the group of the item (computer or an accesory).
 * @param catalogItem catalog item configured.
 * @param selectedConfiguration configuration selected.
 * @returns CartItem
 */
export const parseDataForCheckout = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
  selectedConfiguration: ConfigurationState,
): CartItem => {
  if (catalogItemClass === CatalogItemClass.mobility) {
    const {
      selectedSku,
      hardwareConfiguration,
      selectedPlanSku,
      planConfiguration,
    } = selectedConfiguration;

    const {
      components: hardwareComponents,
      skuAnswers: hardwareSkuAnswers,
    } = hardwareConfiguration;
    const {
      components: planComponents,
      skuAnswers: planSkuAnswers,
      selectedFeatures,
    } = planConfiguration;

    const hardwareAnswerMap = createQuestionAnswerMap(
      hardwareComponents,
      hardwareSkuAnswers,
    );
    const planAnswerMap = createQuestionAnswerMap(
      planComponents,
      planSkuAnswers,
    );

    return {
      checkoutType: CheckoutTypes.Mobility,
      data: {
        modelId: catalogItem.modelId!,
        name: catalogItem.catalogItemName,
        hardwareSku: selectedSku ? selectedSku.skuId : '',
        planSku: selectedPlanSku,
        carrier: hardwareAnswerMap.carrier,
        plan: planAnswerMap.plan,
        features: selectedFeatures || [],
        image: catalogItem.catalogItemImage,
        description: catalogItem.description,
        reasonForRequest: selectedConfiguration.requestReason,
        deviceUsage: selectedConfiguration.deviceUsage,
        businessJustification: selectedConfiguration.businessJustification,
      },
    };
  }
  return {
    checkoutType: checkoutTypeMap[catalogItemClass],
    data: {
      requestConfigOptions: parseSelectedConfiguration(
        catalogItemClass,
        catalogItem,
        selectedConfiguration,
      ),
      catalogItem,
    },
  };
};

/**
 * Generates list of options for Form.Dropdown
 * @param skus - List of the SKU's of a configuration of a specific catalog model
 * @param field - Value to render within the dropdown
 */
export const parseSkusToDropdownOptions = (
  skus: (
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
  )[],
  field: CatalogItemOptions,
) => {
  return skus.reduce((result: any, sku) => {
    if (
      sku[field] &&
      result.findIndex((resultItem: any) => resultItem.value === sku[field]) < 0
    ) {
      result.push({
        label: sku[field] as string,
        value: sku[field] as string,
      });
    }
    return result;
  }, []);
};

/**
 * parseSkusToPlugTypeDropdownOptions list of Plug Type options for Form.Dropdown
 * @param skus - List of the SKU's of a configuration of a specific catalog model
 */
export const parseSkusToPlugTypeDropdownOptions = (
  skus: (
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
  )[],
) => {
  const skusToParse = skus.reduce(
    (
      skusGrouped: (
        | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
        | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
      )[],
      sku:
        | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
        | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus,
    ) => {
      const exist = skusGrouped.find(
        (
          skuGrouped:
            | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
            | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus,
        ) => skuGrouped.electricalPlugType === sku.electricalPlugType,
      );
      if (!exist) {
        skusGrouped.push(sku);
      }
      return skusGrouped;
    },
    [],
  );
  return parseSkusToDropdownOptions(
    skusToParse,
    CatalogItemOptions.ElectricalPlugType,
  );
};

/**
 * filterKeyboardByPlugType filter list of Keyboard options by plug type
 * @param skus - List of the SKU's of a configuration of a specific catalog model
 * @param selectedPlugType - Selected plug type
 */
export const filterKeyboardSkusByPlugType = (
  skus: (
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
  )[],
  selectedPlugType: string = '',
) => {
  return skus.filter(sku => sku.electricalPlugType === selectedPlugType);
};

/**
 * parseSkusToKeyboardDropdownOptions list of Keyboard options for Form.Dropdown
 * @param skus - List of the SKU's of a configuration of a specific catalog model
 * @param selectedPlugType - Selected plug type
 */
export const parseSkusToKeyboardDropdownOptions = (
  skus: (
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
  )[],
  selectedPlugType: string = '',
) => {
  const skusToParse = filterKeyboardSkusByPlugType(skus, selectedPlugType);
  return parseSkusToDropdownOptions(
    skusToParse,
    CatalogItemOptions.KeyboardLanguage,
  );
};

/**
 * getLowestPriceSku return sku with lowest price
 * @param skus - List of the SKU's of a configuration of a specific catalog model
 */
export const getLowestPriceSku = (
  skus: (
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
  )[],
) => {
  let lowestPriceSku = null;
  if (skus && skus.length > 0) {
    lowestPriceSku = skus.reduce((previousValue, currentValue) => {
      const previousValuePricingValue =
        previousValue.pricing && previousValue.pricing.value;
      const currentValuePricingValue =
        currentValue.pricing && currentValue.pricing.value;
      return previousValuePricingValue && currentValuePricingValue
        ? previousValuePricingValue < currentValuePricingValue
          ? previousValue
          : currentValue
        : currentValue;
    }, skus[0]);
  }
  return lowestPriceSku;
};

/**
 * getDefaultSelectedConfiguration return PDP initial configuration selected.
 * If there is a configuration to load, it will return that one, if not, it will return the one with lower price.
 *
 * @param catalogItemClass - Type of item Enum
 * @param selectedConfigurationToLoad catalog item configured.
 * @param catalogItem catalog item configured.
 */
export const getDefaultSelectedConfiguration = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
  selectedConfigurationToLoad?: {
    selectedConfiguration:
      | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
      | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs;
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
    plugType: string;
    keyboardLanguage: string;
  },
):
  | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
  | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs => {
  let defaultSelection:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs = {
    __typename: 'ComputerConfigurations',
    memory: null,
    storage: null,
    processor: null,
    color: null,
    configurationText: '',
    skus: [],
    skuLowestPricing: null,
    displaySkuSpecs: [],
  };
  if (
    selectedConfigurationToLoad &&
    selectedConfigurationToLoad.selectedConfiguration
  ) {
    defaultSelection = selectedConfigurationToLoad.selectedConfiguration;
  } else {
    switch (catalogItemClass) {
      case CatalogItemClass.computer:
        defaultSelection = catalogItem.computerCatalogInfo
          ? catalogItem.computerCatalogInfo.configurations[0]
          : {
              __typename: 'ComputerConfigurations',
              memory: null,
              storage: null,
              processor: null,
              color: null,
              configurationText: '',
              skus: [],
              skuLowestPricing: null,
              displaySkuSpecs: [],
            };
        break;

      case CatalogItemClass.accessory:
        defaultSelection = catalogItem.accessoryCatalogInfo
          ? catalogItem.accessoryCatalogInfo.informationalSpecs[0]
          : {
              __typename: 'AccessoriesInformationalSpecs',
              skus: [],
            };
        break;
    }
  }

  return defaultSelection;
};

/**
 * getDefaultFieldSelection return default selection per configuration field.
 * @param initialSelectedConfiguration configuration selected.
 * @param catalogItemOption catalog item configured.
 */
export const getDefaultFieldSelection = (
  catalogItemClass: CatalogItemClass,
  initialSelectedConfiguration:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs,
  catalogItemOption: CatalogItemOptions,
) => {
  let initialSelection: string = '';

  //If is just 1 Sku, will preselect that sku by default for each field
  if (initialSelectedConfiguration.skus.length === 1) {
    switch (catalogItemClass) {
      case CatalogItemClass.computer:
        initialSelection = (initialSelectedConfiguration
          .skus[0] as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus)[
          catalogItemOption
        ] as string;
        break;
      case CatalogItemClass.accessory:
        initialSelection = (initialSelectedConfiguration
          .skus[0] as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)[
          catalogItemOption
        ] as string;
        break;
      case CatalogItemClass.mobility:
        //TODO: Once Configuration details are defined, we have to use the right catalogItemOption
        initialSelection = '';
        break;
    }
  } else if (initialSelectedConfiguration.skus.length > 1) {
    // If are more than 1 skus, it will preselect the fields of
    const lowestPriceSku = getLowestPriceSku(initialSelectedConfiguration.skus);
    if (lowestPriceSku) {
      let catalogWithLowestPriceSku;
      switch (catalogItemClass) {
        case CatalogItemClass.computer:
          catalogWithLowestPriceSku = (lowestPriceSku as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus)[
            catalogItemOption
          ];
          break;

        case CatalogItemClass.accessory:
          catalogWithLowestPriceSku = (lowestPriceSku as CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus)[
            catalogItemOption
          ];
          break;

        case CatalogItemClass.mobility:
          //TODO: Once Configuration details are defined, we have to use the right catalogItemOption
          catalogWithLowestPriceSku = '';
          break;
      }

      initialSelection = catalogWithLowestPriceSku
        ? catalogWithLowestPriceSku
        : '';
    }
  }
  return initialSelection;
};

/**
 * getFieldSelection return selection for a field
 *
 * @param catalogItemClass - Type of item Enum
 * @param catalogItem catalog item configured.
 * @param catalogItemOption catalog item configured.
 * @param selectedConfigurationToLoad catalog item configured.
 */
export const getFieldSelection = (
  catalogItemClass: CatalogItemClass,
  catalogItem: CatalogItemDetails_catalogItem,
  catalogItemOption: CatalogItemOptions,
  selectedConfigurationToLoad?: {
    selectedConfiguration:
      | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
      | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs;
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
    plugType: string;
    keyboardLanguage: string;
  },
) => {
  let initialSelection: string = '';

  //If there is a selected configuration to render, will render that selection
  if (selectedConfigurationToLoad) {
    switch (catalogItemOption) {
      case CatalogItemOptions.ElectricalPlugType:
        initialSelection = selectedConfigurationToLoad.plugType;
        break;
      case CatalogItemOptions.KeyboardLanguage:
        initialSelection = selectedConfigurationToLoad.keyboardLanguage;
        break;
      default:
        initialSelection = '';
        break;
    }
  } else {
    //If there is not selected configuration to render, will render default initial selection
    // initialSelectedConfiguration will return configuration with lowest price
    const initialSelectedConfiguration:
      | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
      | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs = getDefaultSelectedConfiguration(
      catalogItemClass,
      catalogItem,
      selectedConfigurationToLoad,
    );
    initialSelection = getDefaultFieldSelection(
      catalogItemClass,
      initialSelectedConfiguration,
      catalogItemOption,
    );
  }
  return initialSelection;
};

/**
 * Return hash map between questions and answers
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 */
export const createQuestionAnswerMap = (
  components: MobilityComponent[],
  skuAnswers: SkuAnswer[],
) => {
  return skuAnswers.reduce((result: any, skuAnswer, currentIndex) => {
    return {
      ...result,
      [components[currentIndex] &&
      components[currentIndex].id]: skuAnswer.input,
    };
  }, {});
};
