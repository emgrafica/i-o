import React from 'react';
import { Form } from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import RequestDetails from './RequestDetails';
import RequestAcknowledgement from './RequestAcknowledgement';
import {
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus,
  CatalogItemDetails_catalogOrderConfiguration,
  CatalogItemDetails_catalogItem,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { HandleFunctionalFormStateUpdateArgs } from '..';
import { ConfigurationState } from '../../../utils';
import { useReplacementInfo } from 'store/apollo/store/hooks';
import DefaultConfigurationDetailsProps from './configurationDetails/DefaultConfigurationDetails';
import MobilityConfigurationDetails from './configurationDetails/MobilityConfigurationDetails';

interface CatalogItemDetailsFormProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
  /**
   * catalogItem to be loaded
   */
  catalogItem: CatalogItemDetails_catalogItem;
  /**
   * Tenant-based configuration options that control whether business justification or acknowledgement messaging is rendered
   */
  catalogOrderConfiguration: CatalogItemDetails_catalogOrderConfiguration;
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

  /**
   * Value of business justification
   */
  businessJustification: string;
  /**
   * Persisted state from Computers PDP form
   */
  previousState?: {
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
  };
  /**
   * The acknowledgement section
   */
  acknowledged: boolean;
  configurationState: ConfigurationState;
}

/**
 * Allows user to configure catalog item details prior to checkout
 * @param props
 */
const CatalogItemDetailsForm: React.FC<CatalogItemDetailsFormProps> = ({
  catalogItemClass,
  catalogItem,
  skus,
  catalogOrderConfiguration,
  handleFunctionalFormStateUpdate,
  selectedElectricalPlugType,
  selectedKeyboardLanguage,
  businessJustification,
  previousState,
  acknowledged,
  configurationState,
}) => {
  const replacementInfo = useReplacementInfo();
  //TODO: This component needs refactoring to improve the way it handles inputs rendering based on CatalogItemClass.
  //When introducing Mobility Config details could be a good opportunity to do it, considering we will have a better understanding of what is needed per each type.
  // TODO: We should probably allow graphiti to handle this logic
  const isRequestAcknowledgementVisible =
    catalogItemClass === CatalogItemClass.computer ||
    (catalogItemClass === CatalogItemClass.accessory &&
      catalogOrderConfiguration.agreementMessaging) ||
    catalogItemClass === CatalogItemClass.mobility;
  const acknowledgmentMessage = catalogOrderConfiguration.agreementMessaging
    ? catalogOrderConfiguration.agreementMessaging
    : null;

  const { requestReason } = configurationState;
  return (
    <Form name="Configuration" padding="0px">
      <Form.Section paddingLeft={0}>
        {/* Request Details Section */}
        {catalogItemClass === CatalogItemClass.mobility ? (
          <MobilityConfigurationDetails
            catalogItemClass={catalogItemClass}
            handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
            modelId={catalogItem.modelId}
            configurationState={configurationState}
          />
        ) : (
          <DefaultConfigurationDetailsProps
            catalogItemClass={catalogItemClass}
            configurations={
              catalogItem.computerCatalogInfo
                ? catalogItem.computerCatalogInfo.configurations
                : []
            }
            skus={skus}
            handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
            selectedElectricalPlugType={selectedElectricalPlugType}
            selectedKeyboardLanguage={selectedKeyboardLanguage}
            configurationState={configurationState}
          />
        )}
      </Form.Section>

      {/* Business Justification section */}
      <Form.Section paddingLeft={0}>
        <RequestDetails
          displayRequestReason={
            catalogItemClass === CatalogItemClass.computer ||
            catalogItemClass === CatalogItemClass.mobility
          }
          displayDeviceUsage={
            catalogItemClass === CatalogItemClass.computer ||
            catalogItemClass === CatalogItemClass.mobility
          }
          displayBusinessJustification={
            catalogItemClass === CatalogItemClass.computer ||
            catalogItemClass === CatalogItemClass.accessory ||
            catalogItemClass === CatalogItemClass.mobility
          }
          requireBusinessJustification={
            catalogOrderConfiguration.requireBusinessJustification
          }
          catalogRequestReasons={catalogOrderConfiguration.deviceRequestReasons}
          catalogDeviceUsageReasons={
            catalogOrderConfiguration.deviceUsageReasons
          }
          handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
          businessJustification={businessJustification}
          previousState={previousState}
          selectedRequestReason={requestReason}
          requestReasonDisabled={!!replacementInfo}
        />
        {isRequestAcknowledgementVisible ? (
          <RequestAcknowledgement
            acknowledgmentMessage={acknowledgmentMessage}
            handleFunctionalFormStateUpdate={handleFunctionalFormStateUpdate}
            acknowledged={acknowledged}
          />
        ) : null}
      </Form.Section>
    </Form>
  );
};

export default CatalogItemDetailsForm;
