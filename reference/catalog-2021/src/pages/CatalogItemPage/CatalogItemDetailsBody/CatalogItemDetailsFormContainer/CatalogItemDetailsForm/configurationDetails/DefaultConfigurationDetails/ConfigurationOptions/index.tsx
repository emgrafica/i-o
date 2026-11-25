import React from 'react';
import { Form, Grid, Typography } from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { Error } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { CatalogItemDetails_catalogItem_computerCatalogInfo_configurations as Configurations } from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { HandleFunctionalFormStateUpdateArgs } from '../../../..';
import {
  SELECTED_CONFIGURATION_FIELD,
  ConfigurationState,
  selectConfigurationMap,
  configurationStockMessageMap,
} from '../../../../../../utils';
interface ConfigurationOptionsProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
  /**
   * Available configurations for catalog item
   */
  configurations: Configurations[];
  /**
   * Configuration State from computer details
   */
  configurationState: ConfigurationState;
  /**
   * Updates formState for ComputerDetailsFormContainer
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
}
/**
 * Radio group of all configuration options for selected model
 */
const ConfigurationOptions: React.FC<ConfigurationOptionsProps> = ({
  catalogItemClass,
  configurations,
  handleFunctionalFormStateUpdate,
  configurationState,
}) => {
  const { t } = useTranslation();

  /**
   * Returns the selected configuration index (i).
   * Compares configuration and selected configuration to located where
   * the options are the same, in order to maintain the selected configuration.
   */
  const getSelectedConfigurationIndex: any = () => {
    let selectedIndex = -1;
    for (let i = 0; i < configurations.length; i++) {
      if (configurations[i] === configurationState.selectedConfiguration) {
        selectedIndex = i;
        break;
      }
    }
    return selectedIndex;
  };
  return (
    <>
      {catalogItemClass !== CatalogItemClass.accessory && (
        <Typography
          kind="h5"
          color="primary.2"
          marginTop="6.4px"
          paddingTop={0}
          marginBottom={2}
          paddingBottom={0}
        >
          {t(selectConfigurationMap[catalogItemClass])}
        </Typography>
      )}
      <Form.RadioGroup name="RegionOptions" headingLabel="">
        <Grid flexDirection="column">
          {configurations.length === 0 && !CatalogItemClass.accessory && (
            <Grid color="state.enabled">
              <span>
                <Error color="inherit" />
              </span>
              <Typography kind="body1" marginTop={0} marginLeft="11px">
                {t(configurationStockMessageMap[catalogItemClass])}
              </Typography>
            </Grid>
          )}
          {configurations.length > 0 &&
            configurations.map(({ configurationText }, i: number) => {
              const hasSingleConfiguration = Boolean(
                configurations && configurations.length === 1,
              );
              return (
                <Form.Item
                  key={`item:${i}`}
                  htmlFor={`option:${i}`}
                  label={configurationText || ''}
                  inlineLabel
                  disabled={hasSingleConfiguration}
                  paddingLeft={0}
                >
                  <Form.Radiobox
                    defaultChecked={i === getSelectedConfigurationIndex()}
                    value={configurationText || ''}
                    id={`option:${i}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFunctionalFormStateUpdate({
                        newState: {
                          selectedConfiguration: configurations[i],
                        },
                        key: SELECTED_CONFIGURATION_FIELD,
                      });
                    }}
                  />
                </Form.Item>
              );
            })}
        </Grid>
      </Form.RadioGroup>
    </>
  );
};

export default ConfigurationOptions;
