import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import {
  CatalogItemDetails,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus,
  CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import CatalogItemDetailsForm from './CatalogItemDetailsForm';
import {
  ConfigurationState,
  getDefaultFieldSelection,
  SELECTED_CONFIGURATION_FIELD,
  SELECTED_PLUG_TYPE_FIELD,
  CatalogItemOptions,
  filterKeyboardSkusByPlugType,
  getSelectedSku,
} from '../../utils';

export interface HandleFunctionalFormStateUpdateArgs {
  /**
   * Partial copy of ConfigurationState to be updated
   */
  newState: Partial<ConfigurationState> | null;
  /**
   * Key in ConfigurationState object that should be updated
   */
  key?: string;
}
export interface ConfigurationOptions {
  /**
   * Electrical plug type of catalog item
   */
  electricalPlugType: string | null;
  /**
   * Language option for keyboard
   */
  keyboardLanguage: string | null;
}

interface CatalogItemDetailsFormContainerProps extends RouteComponentProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
  /**
   * catalogItemDetails to be loaded
   */
  catalogItemDetails: CatalogItemDetails;
  /**
   * Persisted state from Computers PDP form
   */
  previousState?: {
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
    plugType: string;
    keyboardLanguage: string;
  };

  formState: ConfigurationState;

  setFormState: Function;
}

/**
 * Container for ComputerDetailsForm
 * - Holds state and methods for ComputerDetailsForm
 * @param props
 */
const CatalogItemDetailsFormContainer: React.FC<CatalogItemDetailsFormContainerProps> = ({
  catalogItemClass,
  previousState,
  formState,
  setFormState,
  catalogItemDetails,
}) => {
  const { catalogItem, catalogOrderConfiguration } = catalogItemDetails;

  /**
   * Updates formState using the functional update approach.
   * Useful for when the new state is derived from previous state or when you are updating a nested object
   * @param updatedStateValue - Value to update formState
   * @param key - Key of property to update. Useful for accessing specific state values
   */
  const handleFunctionalFormStateUpdate = (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => {
    setFormState((state: ConfigurationState) => {
      const { key, newState } = args;
      let newSelection: Partial<ConfigurationState> = {
        ...newState,
      };
      if (key) {
        if (typeof state[key] === 'boolean') {
          // Toggle state value if boolean is stored at specified key value
          return {
            ...state,
            [key]: !state[key],
          };
        }

        // If selectedConfiguration change, then we need to reload sku dropdowns
        if (key === SELECTED_CONFIGURATION_FIELD) {
          //---------------------------------------------------------
          // On Selected Configuration change
          //---------------------------------------------------------
          switch (catalogItemClass) {
            case CatalogItemClass.mobility:
              //TODO: Once Config details get defined, we have to add here configuration fields
              newSelection = {
                ...newSelection,
              };
              break;
            default:
              const selectedElectricalPlugType = newSelection.selectedConfiguration
                ? getDefaultFieldSelection(
                    catalogItemClass,
                    newSelection.selectedConfiguration,
                    CatalogItemOptions.ElectricalPlugType,
                  )
                : '';
              const selectedKeyboardLanguage = newSelection.selectedConfiguration
                ? getDefaultFieldSelection(
                    catalogItemClass,
                    newSelection.selectedConfiguration,
                    CatalogItemOptions.KeyboardLanguage,
                  )
                : '';
              newSelection = {
                ...newSelection,
                selectedSku: getSelectedSku(
                  catalogItemClass,
                  catalogItem,
                  selectedKeyboardLanguage,
                  selectedElectricalPlugType,
                ),
                selectedElectricalPlugType: selectedElectricalPlugType,
                selectedKeyboardLanguage: selectedKeyboardLanguage,
              };
              break;
          }
        } else if (key === SELECTED_PLUG_TYPE_FIELD) {
          //---------------------------------------------------------
          // On Selected Plug Type change
          //---------------------------------------------------------
          const selectedElectricalPlugType =
            newSelection[SELECTED_PLUG_TYPE_FIELD] || '';

          // Get Keyboards for new selected plug type
          const skusForSelectedPlugType = filterKeyboardSkusByPlugType(
            state.selectedConfiguration.skus as (
              | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus
              | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs_skus
            )[],
            selectedElectricalPlugType,
          );

          const selectedKeyboardLanguage =
            skusForSelectedPlugType &&
            skusForSelectedPlugType.length > 0 &&
            skusForSelectedPlugType[0].keyboardLanguage
              ? skusForSelectedPlugType[0].keyboardLanguage
              : '';

          // Will set new selected Plug type and will select first Keyboard from filtered by plug type skus
          newSelection = {
            ...newSelection,
            selectedSku: getSelectedSku(
              catalogItemClass,
              catalogItem,
              selectedKeyboardLanguage,
              selectedElectricalPlugType,
            ),
            selectedKeyboardLanguage: selectedKeyboardLanguage,
          };
        }
      }

      // Merge new state as the default case
      return {
        ...state,
        ...newSelection,
      };
    });
  };

  const {
    selectedConfiguration,
    selectedElectricalPlugType,
    selectedKeyboardLanguage,
    businessJustification,
    isAcknowledged,
  } = formState;

  return (
    <CatalogItemDetailsForm
      catalogItemClass={catalogItemClass}
      catalogOrderConfiguration={catalogOrderConfiguration}
      configurationState={formState}
      catalogItem={catalogItem}
      skus={
        (selectedConfiguration as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations)
          .skus
      }
      selectedElectricalPlugType={selectedElectricalPlugType}
      selectedKeyboardLanguage={selectedKeyboardLanguage}
      handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
      businessJustification={businessJustification}
      previousState={previousState}
      acknowledged={isAcknowledged}
    />
  );
};

export default withRouter(CatalogItemDetailsFormContainer);
