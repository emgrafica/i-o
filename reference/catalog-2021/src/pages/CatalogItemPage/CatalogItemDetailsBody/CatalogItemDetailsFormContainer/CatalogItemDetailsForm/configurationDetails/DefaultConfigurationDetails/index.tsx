import React from 'react';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import ConfigurationOptions from './ConfigurationOptions';
import ConfigurationInputs from './ConfigurationInputs';
import {
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { HandleFunctionalFormStateUpdateArgs } from '../../..';
import { ConfigurationState } from '../../../../../utils';
import RequestDetailsNoConfigMessage from '../../RequestDetailsNoConfigMessage';

interface DefaultConfigurationDetailsProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
  /**
   * Available configurations for catalog item
   */
  configurations: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations[];
  /**
   * List of the SKU's of a configuration of a specific catalog model
   */
  skus: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus[];
  /**
   * Updates ComputerDetailsForm form state
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
  /**
   * Keyboard language the user selected for the device
   */
  selectedKeyboardLanguage: string;
  /**
   * Electrical plug type the user selected for the device
   */
  selectedElectricalPlugType: string;

  configurationState: ConfigurationState;
}

/**
 * Allows user to configure catalog item details prior to checkout
 * @param props
 */
const DefaultConfigurationDetails: React.FC<DefaultConfigurationDetailsProps> = ({
  catalogItemClass,
  configurations,
  skus,
  handleFunctionalFormStateUpdate,
  selectedElectricalPlugType,
  selectedKeyboardLanguage,
  configurationState,
}) => {
  //TODO: This component needs refactoring to improve the way it handles inputs rendering based on CatalogItemClass.
  //When introducing Mobility Config details could be a good opportunity to do it, considering we will have a better understanding of what is needed per each type.
  // TODO: We should probably allow graphiti to handle this logic
  const displayConfigurationOptions =
    catalogItemClass === CatalogItemClass.computer &&
    configurations.length > 0 &&
    configurations[0].processor === null &&
    configurations[0].color === null &&
    configurations[0].memory === null &&
    configurations[0].storage === null;

  const displayConfigurationInputs =
    catalogItemClass === CatalogItemClass.computer ||
    catalogItemClass === CatalogItemClass.accessory;
  return (
    <>
      {!displayConfigurationOptions ? (
        <ConfigurationOptions
          catalogItemClass={catalogItemClass}
          configurations={configurations}
          handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
          configurationState={configurationState}
        />
      ) : (
        <RequestDetailsNoConfigMessage />
      )}
      {displayConfigurationInputs ? (
        <ConfigurationInputs
          skus={skus}
          selectedKeyboardLanguage={selectedKeyboardLanguage}
          selectedElectricalPlugType={selectedElectricalPlugType}
          handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
        />
      ) : null}
    </>
  );
};

export default DefaultConfigurationDetails;
