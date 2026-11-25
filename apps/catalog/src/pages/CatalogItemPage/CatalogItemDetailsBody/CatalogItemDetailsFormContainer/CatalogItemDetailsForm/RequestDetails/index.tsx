import React from 'react';
import { Box, Typography, Form } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import {
  CatalogItemDetails_catalogOrderConfiguration_deviceRequestReasons,
  CatalogItemDetails_catalogOrderConfiguration_deviceUsageReasons,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { HandleFunctionalFormStateUpdateArgs } from '../..';

interface RequestDetailsProps {
  /**
   * Selected Request Reason
   */
  selectedRequestReason: string;
  requestReasonDisabled: boolean;
  /**
   * List of tenant provided request reasons
   */
  catalogRequestReasons: CatalogItemDetails_catalogOrderConfiguration_deviceRequestReasons[];
  /**
   * Tenant-based configuration options that control whether business justification or acknoledgement messaging is rendered
   */
  catalogDeviceUsageReasons: CatalogItemDetails_catalogOrderConfiguration_deviceUsageReasons[];
  /**
   * Value of business justification
   */
  businessJustification: string;
  /**
   * Updates ComputerDetailsForm form state
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
  /**
   * Persisted state from Computers PDP form
   */
  previousState?: {
    requestReason: string;
    deviceUsage: string;
    businessJustification: string;
  };

  /**
   * Show Request Reason input
   */
  displayRequestReason: Boolean;
  /**
   * Show Business Justification input
   */
  displayBusinessJustification: Boolean;
  /**
   * Show Device Usage input
   */
  displayDeviceUsage: Boolean;

  /**
   * Mark Business Justification as required
   */
  requireBusinessJustification?: boolean;
}

/**
 * Groups of form items that are dynamically rendered based on requestReason
 * @param props
 */
const RequestDetails: React.FC<RequestDetailsProps> = ({
  displayRequestReason,
  displayDeviceUsage,
  displayBusinessJustification,
  catalogRequestReasons,
  catalogDeviceUsageReasons,
  handleFunctionalFormStateUpdate,
  previousState,
  businessJustification,
  selectedRequestReason,
  requestReasonDisabled,
  requireBusinessJustification,
}) => {
  const { t } = useTranslation();

  // Dropdown menu items consisting of valid reasons for device request
  const reasonForDeviceOptions = displayRequestReason
    ? catalogRequestReasons.map(
        ({
          requestReason,
        }: CatalogItemDetails_catalogOrderConfiguration_deviceRequestReasons) => {
          return { label: requestReason, value: requestReason };
        },
      )
    : [];

  // Manipulates deviceUsageReasons to match expected shape for a dropdown item
  const deviceUsageOptions = displayDeviceUsage
    ? catalogDeviceUsageReasons.map(
        ({
          usageReason,
        }: CatalogItemDetails_catalogOrderConfiguration_deviceUsageReasons) => {
          return { label: usageReason, value: usageReason };
        },
      )
    : [];

  /**
   * Handles onChange event for dropdown items
   * Takes a "key" string at call time that determines what state in FormState the dropdown is controlling
   * @param key- Name of property in FormState you want to update
   */
  const handleDropdownOnChange = (key: string) => (value: string) => {
    handleFunctionalFormStateUpdate({
      newState: { [key]: value },
    });
  };

  // Sets default form values if they exist
  let defaultReasonOption = {
    label: selectedRequestReason,
    value: selectedRequestReason,
  };
  let defaultUsageOption;
  let defaultBusinessJustification;
  if (previousState) {
    const { deviceUsage, businessJustification } = previousState;
    defaultUsageOption = { label: deviceUsage, value: deviceUsage };
    defaultBusinessJustification = businessJustification;
  }
  return (
    <Box marginTop={8}>
      <Typography kind="h5" color="primary.2">
        {t('pages:request.computers.computerDetails.requestDetails')}
      </Typography>
      {displayRequestReason ? (
        <Form.Item
          htmlFor="reason-dropdown"
          label={t('pages:request.computers.computerDetails.requestReason')}
          paddingLeft={0}
          required
          tooltip={
            requestReasonDisabled
              ? t(
                  'pages:request.computers.computerDetails.replaceFlowRequestReasonTooltip',
                )
              : t('common:availableOptionsReasonTooltip')
          }
        >
          <Form.Dropdown
            disabled={requestReasonDisabled}
            buttonLabel={t('common:selectOne')}
            placeholder={t('common:selectOne')}
            onChange={handleDropdownOnChange('requestReason')}
            defaultOption={defaultReasonOption}
            options={reasonForDeviceOptions}
            aria-label={t(
              'pages:request.computers.computerDetails.requestReason',
            )}
            selectedOption={defaultReasonOption}
          />
        </Form.Item>
      ) : null}

      {displayDeviceUsage ? (
        <Form.Item
          htmlFor="use-case-dropdown"
          label={t(
            'pages:request.computers.computerDetails.businessJustification.deviceUsage',
          )}
          paddingLeft={0}
          required
          tooltip={t('common:availableOptionsReasonTooltip')}
        >
          <Form.Dropdown
            buttonLabel={t('common:selectOne')}
            placeholder={t('common:selectOne')}
            onChange={handleDropdownOnChange('deviceUsage')}
            options={deviceUsageOptions}
            defaultOption={defaultUsageOption}
            aria-label={t(
              'pages:request.computers.computerDetails.businessJustification.deviceUsage',
            )}
          />
        </Form.Item>
      ) : null}

      {displayBusinessJustification ? (
        <Form.Item
          htmlFor="business-justification-text"
          label={t(
            'pages:request.computers.computerDetails.businessJustification.justificationHint',
          )}
          paddingLeft={0}
          required={requireBusinessJustification || false}
        >
          <Form.TextArea
            defaultValue={defaultBusinessJustification}
            value={businessJustification}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.persist();
              handleFunctionalFormStateUpdate({
                newState: {
                  businessJustification: e.target.value,
                },
              });
            }}
            maximum={250}
            maxLength={250}
          />
        </Form.Item>
      ) : null}
    </Box>
  );
};

export default RequestDetails;
