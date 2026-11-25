import React from 'react';
import { Form } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus } from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { Col, GridLayout, Row } from 'components/GridLayout';
import {
  DropdownOption,
  parseSkusToPlugTypeDropdownOptions,
  parseSkusToKeyboardDropdownOptions,
  SELECTED_PLUG_TYPE_FIELD,
} from '../../../../../../utils';
import { HandleFunctionalFormStateUpdateArgs } from '../../../..';
interface ConfigurationInputsProps {
  /**
   * List of the SKU's of a configuration of a specific catalog model
   */
  skus: CatalogItemDetails_catalogItem_computerCatalogInfo_configurations_skus[];
  /**
   * Keyboard language the user selected for the device
   */
  selectedKeyboardLanguage: string;
  /**
   * Electrical plug type the user selected for the device
   */
  selectedElectricalPlugType: string;
  /**
   * Updates formState for ComputerDetailsFormContainer
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
}

/**
 * Returns boolean that determines whether an input or dropdown should be rendered to the form
 * @param configurationData - Single string configuration option or a list of configuration options in DropdownOption[] shape
 */
const shouldRenderDisabled = (options: DropdownOption[]) => {
  return options.length === 1;
};

/**
 * Dropdowns or inputs for configurable keyboard language/electrical plug type options
 * @param props
 */
const ConfigurationInputs: React.FC<ConfigurationInputsProps> = ({
  skus,
  selectedKeyboardLanguage,
  selectedElectricalPlugType,
  handleFunctionalFormStateUpdate,
}) => {
  const { t } = useTranslation();
  const electricalPlugTypeOptions = parseSkusToPlugTypeDropdownOptions(skus);
  //----------------------------------------------------------------------------
  // Keyboard options will be loaded based on selected Electrical Plug Type.
  // In case there is not selected Electrical Plug Type, it will use by default the first electrical Plug Type Option.
  //----------------------------------------------------------------------------
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
  return (
    <GridLayout columnGutters={0}>
      <Row>
        {electricalPlugTypeOptions.length > 0 ? (
          <Col
            colspan={{
              xxs: '12',
              xs: '12',
              sm: '12',
              md: '6',
              lg: '6',
              xl: '6',
              xxl: '6',
            }}
          >
            <Form.Item
              htmlFor="plug-dropdown"
              required
              label={t('pages:request.computers.computerDetails.plugType')}
              disabled={false}
              marginLeft={0}
              paddingLeft={0}
            >
              <Form.Dropdown
                buttonLabel={t('common:selectPlugType')}
                placeholder={t('common:selectPlugType')}
                onChange={value => {
                  const newState = {
                    selectedElectricalPlugType: value,
                  };
                  handleFunctionalFormStateUpdate({
                    newState,
                    key: SELECTED_PLUG_TYPE_FIELD,
                  });
                }}
                options={
                  electricalPlugTypeOptions ? electricalPlugTypeOptions : []
                }
                defaultOption={{
                  value: selectedElectricalPlugType,
                  label: selectedElectricalPlugType,
                }}
                selectedOption={{
                  value: selectedElectricalPlugType,
                  label: selectedElectricalPlugType,
                }}
                aria-label={t(
                  'pages:request.computers.computerDetails.plugLabel',
                )}
                disabled={shouldRenderDisabled(electricalPlugTypeOptions)}
              />
            </Form.Item>
          </Col>
        ) : null}
        {keyboardLanguageOptions.length > 0 ? (
          <Col
            colspan={{
              xxs: '12',
              xs: '12',
              sm: '12',
              md: '6',
              lg: '6',
              xl: '6',
              xxl: '6',
            }}
          >
            <Form.Item
              htmlFor="keyboard-dropdown"
              required
              label={t('pages:request.computers.computerDetails.keyboard')}
              disabled={false}
              marginLeft={0}
              paddingLeft={0}
            >
              <Form.Dropdown
                buttonLabel={t('common:selectKeyboardLanguage')}
                placeholder={t('common:selectKeyboardLanguage')}
                onChange={value => {
                  const newState = {
                    selectedKeyboardLanguage: value,
                  };
                  handleFunctionalFormStateUpdate({
                    newState,
                  });
                }}
                options={keyboardLanguageOptions}
                defaultOption={{
                  value: selectedKeyboardLanguage,
                  label: selectedKeyboardLanguage,
                }}
                selectedOption={{
                  value: selectedKeyboardLanguage,
                  label: selectedKeyboardLanguage,
                }}
                aria-label={t(
                  'pages:request.computers.computerDetails.keyboardLabel',
                )}
                disabled={shouldRenderDisabled(keyboardLanguageOptions)}
              />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </GridLayout>
  );
};

export default ConfigurationInputs;
