import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@lumos/core';
import CatalogItemDetailsFormContainer from './CatalogItemDetailsFormContainer';
import CatalogItemDetailsComponent from 'components/CatalogItemDetails';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import {
  CatalogItemDetails,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import ProceedToCheckoutButton from 'components/ProceedToCheckoutButton';
import {
  ConfigurationState,
  isSelectedConfigurationValid,
  parseDataForCheckout,
  getDefaultSelectedConfiguration,
  getFieldSelection,
  CatalogItemOptions,
  getSelectedSku,
  backButtonPathMap,
} from '../utils';
import ReplacementBanner from 'components/ReplacementBanner';
import { useReplacementInfo } from 'store/apollo/store/hooks';
import { Col, GridLayout, Row } from 'components/GridLayout';
import SkeletonConfigurationRequestDetails from './SkeletonCatalogItemDetails/SkeletonConfigurationRequestDetails';

export interface CatalogItemDetailsBodyProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;

  /**
   * catalogItemDetails to be loaded
   */
  catalogItemDetails: CatalogItemDetails | null | undefined;

  /**
   * Persisted state from Computers PDP form
   */
  selectedConfigurationToLoad?: {
    selectedConfiguration: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations;
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
    plugType: string;
    keyboardLanguage: string;
  };
  /**
   * Function to submit data to Checkout Page
   */
  submitSelectedConfiguration: Function;
  loading: boolean;
}

/**
 * Provides detailed information on selected catalog item and allows user to configure device prior to checkout
 */
const CatalogItemDetailsBody: React.FC<CatalogItemDetailsBodyProps> = ({
  catalogItemClass,
  catalogItemDetails,
  selectedConfigurationToLoad,
  submitSelectedConfiguration,
  loading,
}) => {
  const catalogItem = catalogItemDetails && catalogItemDetails.catalogItem;
  const catalogOrderConfiguration =
    catalogItemDetails && catalogItemDetails.catalogOrderConfiguration;
  const replacementInfo = useReplacementInfo();

  // Set selectedConfiguration state
  const [selectedConfiguration, setSelectedConfiguration] = useState<
    ConfigurationState
  >();

  useEffect(() => {
    if (catalogItemDetails) {
      setSelectedConfiguration({
        // If not selected Configuration, will select first Configuration by default
        selectedConfiguration: getDefaultSelectedConfiguration(
          catalogItemClass,
          catalogItemDetails.catalogItem,
          selectedConfigurationToLoad,
        ),
        selectedSku: getSelectedSku(
          catalogItemClass,
          catalogItemDetails.catalogItem,
          getFieldSelection(
            catalogItemClass,
            catalogItemDetails.catalogItem,
            CatalogItemOptions.KeyboardLanguage,
            selectedConfigurationToLoad,
          ),
          getFieldSelection(
            catalogItemClass,
            catalogItemDetails.catalogItem,
            CatalogItemOptions.ElectricalPlugType,
            selectedConfigurationToLoad,
          ),
        ),
        requestReason: selectedConfigurationToLoad
          ? selectedConfigurationToLoad.requestReason
          : replacementInfo
          ? catalogItemDetails.catalogOrderConfiguration.deviceRequestReasons[0]
              .requestReason
          : '',

        deviceUsage: selectedConfigurationToLoad
          ? selectedConfigurationToLoad.deviceUsage
          : '',
        businessJustification: selectedConfigurationToLoad
          ? selectedConfigurationToLoad.businessJustification
          : '',
        isAcknowledged: false,
        selectedElectricalPlugType: getFieldSelection(
          catalogItemClass,
          catalogItemDetails.catalogItem,
          CatalogItemOptions.ElectricalPlugType,
          selectedConfigurationToLoad,
        ),
        selectedKeyboardLanguage: getFieldSelection(
          catalogItemClass,
          catalogItemDetails.catalogItem,
          CatalogItemOptions.KeyboardLanguage,
          selectedConfigurationToLoad,
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogItemDetails, replacementInfo]);

  /**
   * Execute submit to the checkout page
   */
  const handleProceedToCheckout = () => {
    if (selectedConfiguration && catalogItem) {
      if (
        isSelectedConfigurationValid(
          catalogItemClass,
          selectedConfiguration,
          catalogOrderConfiguration,
        )
      ) {
        submitSelectedConfiguration(
          parseDataForCheckout(
            catalogItemClass,
            catalogItem,
            selectedConfiguration,
          ),
        );
      }
    }
  };

  const selectedSku =
    selectedConfiguration && selectedConfiguration.selectedSku;

  return (
    <Box
      paddingLeft={{
        xxs: '0px',
        sm: '0px',
        md: '20px',
        lg: '0px',
      }}
    >
      {replacementInfo ? <ReplacementBanner {...replacementInfo} /> : null}
      <GridLayout columnGutters={0}>
        <Row>
          <Col
            colspan={{
              xxs: '12',
              xs: '12',
              sm: '12',
              md: '12',
              lg: '6',
              xl: '6',
              xxl: '6',
            }}
          >
            <CatalogItemDetailsComponent
              catalogItemClass={catalogItemClass}
              loading={loading}
              backButtonPath={backButtonPathMap[catalogItemClass]}
              catalogItem={catalogItem}
              pricing={
                selectedSku && selectedSku.pricing ? selectedSku.pricing : null
              }
              selectedConfiguration={
                selectedConfiguration &&
                selectedConfiguration.selectedConfiguration
              }
            />
          </Col>
          <Col
            colspan={{
              xxs: '12',
              xs: '12',
              sm: '12',
              md: '12',
              lg: '6',
              xl: '6',
              xxl: '6',
            }}
          >
            {/* Form to set configuration options prior to checkout */}
            <Grid marginTop="53px" flexDirection="column">
              {loading ? (
                <SkeletonConfigurationRequestDetails />
              ) : catalogItemDetails && selectedConfiguration ? (
                <CatalogItemDetailsFormContainer
                  catalogItemClass={catalogItemClass}
                  catalogItemDetails={catalogItemDetails}
                  previousState={selectedConfigurationToLoad}
                  formState={selectedConfiguration}
                  setFormState={setSelectedConfiguration}
                />
              ) : null}
              <ProceedToCheckoutButton
                onClick={handleProceedToCheckout}
                isDisabled={
                  selectedConfiguration
                    ? !isSelectedConfigurationValid(
                        catalogItemClass,
                        selectedConfiguration,
                        catalogOrderConfiguration,
                      )
                    : true
                }
              />
            </Grid>
          </Col>
        </Row>
      </GridLayout>
    </Box>
  );
};

export default CatalogItemDetailsBody;
