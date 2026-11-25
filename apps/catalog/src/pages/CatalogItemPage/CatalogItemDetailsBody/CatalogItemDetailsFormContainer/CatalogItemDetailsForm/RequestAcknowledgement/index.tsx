import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Typography, Box } from '@lumos/core';
import { HandleFunctionalFormStateUpdateArgs } from '../..';
import { InlineCheckboxItem } from './index.style';
import useDevice, { Device } from 'utils/useDevice';
import RichTextRenderer from 'components/RichTextRenderer';
import { DocumentNode } from 'components/RichTextRenderer/utils';
import { CatalogItemDetails_catalogOrderConfiguration_agreementMessaging } from 'graphql/queries/gqlTypes/CatalogItemDetails';

export interface RequestAcknowledgementProps extends RouteComponentProps {
  /**
   * Acknowledgment message to display
   */
  acknowledgmentMessage: CatalogItemDetails_catalogOrderConfiguration_agreementMessaging | null;
  /**
   * Updates ComputerDetailsForm form state
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
  /**
   * Whether acknowledged.
   */
  acknowledged: boolean;
}

/**
 * Groups user acknowledgement checkbox and proceed to checkout button
 * @param props
 */
const RequestAcknowledgement: React.FC<RequestAcknowledgementProps> = ({
  acknowledgmentMessage,
  handleFunctionalFormStateUpdate,
  acknowledged,
}) => {
  const { t } = useTranslation();
  const device = useDevice();
  const handleAcknowledgementOnClick = () => {
    handleFunctionalFormStateUpdate({
      newState: null,
      key: 'isAcknowledged',
    });
  };

  return (
    <Box>
      <Typography
        kind="body1"
        color="state.enabled"
        marginLeft={0}
        marginTop={7}
      >
        {t('common:acknowledgementHint')}
      </Typography>
      <Typography kind="body2" marginLeft={0}>
        {acknowledgmentMessage && (
          <RichTextRenderer document={acknowledgmentMessage as DocumentNode} />
        )}
      </Typography>
      <Box width="100%" textAlign="center">
        <InlineCheckboxItem
          justifyContent={device === Device.Mobile ? 'center' : 'left'}
          inlineLabel
          label={t(
            'pages:request.computers.computerDetails.businessJustification.acknowledgementLabel',
          )}
          htmlFor="acknowledgeCheckbox"
          paddingLeft={0}
          required
        >
          <Form.Checkbox
            id="acknowledgeCheckbox"
            checked={acknowledged}
            onChange={handleAcknowledgementOnClick}
          />
        </InlineCheckboxItem>
      </Box>
    </Box>
  );
};

export default withRouter(RequestAcknowledgement);
