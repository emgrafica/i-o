import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@lumos/core';
import {
  StyledContainer,
  StyledContent,
  StyledGrid,
  StyledHeader,
} from './index.style';
import { useTechnologyActionsContext } from '../../index';
import { ActionTypes, AssetAction } from '../../types';

interface WithoutOrderFlow {
  header: string;
  /**
   * Allow some customization done to the body. e.g. add custom links.
   */
  body: string | React.ReactElement;
}

/**
 * The template for workflow without order
 */
const WithoutOrderFlow: React.FC<WithoutOrderFlow> = ({ header, body }) => {
  const { t } = useTranslation();
  const dispatch = useTechnologyActionsContext();

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>{header}</StyledHeader>
        <StyledContent>{body}</StyledContent>
      </StyledContainer>
      <StyledGrid>
        <Button kind="secondary" onClick={handleCancel}>
          {t('common:close')}
        </Button>
      </StyledGrid>
    </>
  );
};

export default WithoutOrderFlow;
