import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Box } from '@lumos/core';
import {
  StyledSideSheetTitle,
  Paragraph,
  FormActionGroup,
} from '../../../index.style';
import { ActionTypes, AssetAction } from '../../../types';
import { useTechnologyActionsContext } from '../../..';
import { DataTransferArticle } from 'utils/routes';

/**
 * Saved Required Content props
 */
interface SavedRequiredContentProps {
  setToContinue: Function;
}

// Component for Computer Wipe slider 1 Saved Required Information Content
const SavedRequiredContent: React.FC<SavedRequiredContentProps> = ({
  setToContinue,
}) => {
  const { t } = useTranslation('technology');

  // Close side sheet for cancel button
  const dispatch = useTechnologyActionsContext();
  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  return (
    <Box>
      <StyledSideSheetTitle marginTop={8}>
        {t('wipeComputer.title')}
      </StyledSideSheetTitle>
      <Paragraph>
        <Trans i18nKey="wipeComputer.saveRequiredContent" t={t}>
          To protect business information, your hard drive needs to be securely
          erased prior to shipment. A self-help utility
          <a
            href={DataTransferArticle}
            target="_blank"
            rel="noopener noreferrer"
          >
            DATA TRANSFER GUIDE
          </a>
          is available to assist you with removing any required files off the
          hard drive before erasing it.
        </Trans>
      </Paragraph>
      <FormActionGroup marginTop="60px">
        <Button data-testid="cancel" kind="secondary" onClick={handleCancel}>
          {t('common:cancel')}
        </Button>
        <Button
          data-testid="continue"
          onClick={() => setToContinue(true)}
          kind="primary"
        >
          {t('common:continue')}
        </Button>
      </FormActionGroup>
    </Box>
  );
};

export default SavedRequiredContent;
