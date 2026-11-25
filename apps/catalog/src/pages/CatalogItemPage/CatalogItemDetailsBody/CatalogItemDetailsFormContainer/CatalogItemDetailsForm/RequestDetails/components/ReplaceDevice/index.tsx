import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
/**
 * Props for ReplaceDevice
 */
export interface ReplaceDeviceProps {
  /**
   * Reason for the user's request
   */
  requestReason: string;
  /**
   * Setter for requestReason
   */
  setDeviceToReplace: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Setter for replaceDeviceReason
   */
  setReplaceDeviceReason: React.Dispatch<React.SetStateAction<string>>;
  /**
   * List of user's assets
   */
  userDeviceOptions: any;
  /**
   * Valid options for a user to replace an asset
   */
  replacementOptions: { label: string; value: string }[];
}

/**
 * Renders form items that allow a user to replace a device
 * @param props
 */
const ReplaceDevice: React.FC<ReplaceDeviceProps> = props => {
  const { t } = useTranslation();
  if (props.requestReason === 'Replace Existing Device')
    return (
      <>
        <Form.Item
          htmlFor="replace-device"
          label={t(
            'pages:request.computers.computerDetails.replaceDevice.replaceLabel',
          )}
          required
        >
          <Form.Dropdown
            buttonLabel={t('common:selectOne')}
            placeholder={t('common:selectOne')}
            onChange={value => props.setDeviceToReplace(value)}
            options={props.userDeviceOptions}
            aria-label={t(
              'pages:request.computers.computerDetails.replaceDevice.replaceLabel',
            )}
          />
        </Form.Item>
        <Form.Item
          htmlFor="replace-need"
          label={t(
            'pages:request.computers.computerDetails.replaceDevice.replaceReason',
          )}
          required
        >
          <Form.Dropdown
            buttonLabel={t('common:selectOne')}
            placeholder={t('common:selectOne')}
            onChange={value => props.setReplaceDeviceReason(value)}
            options={props.replacementOptions}
            aria-label={t(
              'pages:request.computers.computerDetails.replaceDevice.replaceReason',
            )}
          />
        </Form.Item>
      </>
    );
  return null;
};

export default ReplaceDevice;
