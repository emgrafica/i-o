import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Box, Form } from '@lumos/core';
import { Paragraph } from '../../../index.style';
import { FormActionGroup, StyledSideSheetTitle } from '../../../index.style';
import styled from 'styled-components';

/**
 * Erase Hard Drive props
 */
interface EraseComputerDriveContentProps {
  toContinue: boolean;
  setToContinue: Function;
}

const CheckboxLabel = styled(Form.Item)`
  padding-left: 0;
  padding-right: 0;
  align-items: flex-start;
  margin-bottom: 60px;

  & > label {
    margin-top: 0;
    font-size: 16px;
  }
`;

// Create anchor <a> tag element, set href property and append <a> tag element for link download
const EraseDownloadLink = document.createElement('a');
EraseDownloadLink.href = `https://example.com`;

// Component for Computer Wipe, slider 2 Erase Hard Drive Content
const EraseComputerDriveContent: React.FC<EraseComputerDriveContentProps> = ({
  toContinue,
  setToContinue,
}) => {
  const { t } = useTranslation('technology');
  const [acknowledged, setAcknowledgement] = useState(false);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setAcknowledgement(e.currentTarget.checked);
  };

  return (
    <Box>
      <StyledSideSheetTitle marginTop={8}>
        {t(`wipeComputer.eraseContent.title`)}
      </StyledSideSheetTitle>
      <Paragraph>
        <Trans
          i18nKey="wipeComputer.eraseContent.eraseDriveContentBodyOne"
          t={t}
        >
          Next, you will install a software package that will securely erase
          data from your hard drive. After the software conducts a successful
          pre-check on opening, you will begin the process, which could take an
          hour or more. Please refer to
          <a
            href="https://i-o.systems/help-and-support?articleLocale=en&tab=articles"
            target="_blank"
            rel="noopener noreferrer"
          >
            this article
          </a>
          for step by step instructions on the data wiping process.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans
          i18nKey="wipeComputer.eraseContent.eraseDriveContentBodyTwo"
          t={t}
        >
          This process, once initiated from within the software package, cannot
          be reversed and your files cannot be recovered. Only click
          <strong>Initiate Process</strong>
          after opening the downloaded software package while on the computer
          listed above that needs to be erased. When the process is complete,
          your device will be ready for shipment.
        </Trans>
      </Paragraph>

      {/* Acknowledgement Statement. User have to select checbox to enable wipe download */}
      <CheckboxLabel
        label={t('wipeComputer.eraseContent.acknowledgementStatement')}
        htmlFor="wipeAcknowledgement"
        inlineLabel
        required
      >
        <Form.Checkbox
          data-testid="wipeAcknowledgement"
          id="wipeAcknowledgement"
          checked={acknowledged}
          onChange={handleChange}
        />
      </CheckboxLabel>

      <FormActionGroup marginTop="60px">
        <Button
          data-testid="back"
          onClick={() => setToContinue(false)}
          kind="secondary"
        >
          {t('common:back')}
        </Button>
        {/* Executes file download */}
        <Button
          data-testid="download"
          kind="primary"
          onClick={() => EraseDownloadLink.click()}
          disabled={!acknowledged}
        >
          {t('wipeComputer.eraseContent.initiate')}
        </Button>
      </FormActionGroup>
    </Box>
  );
};

export default EraseComputerDriveContent;
