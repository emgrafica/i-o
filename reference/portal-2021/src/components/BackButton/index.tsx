import React from 'react';
import { useHistory } from 'react-router-dom';
import { StyledBackIcon, StyledBackLabel, StyledBackLink } from './index.style';
import { useTranslation } from 'react-i18next';

/**
 * Required props for BackButton.
 * Extends LinkProps from react-router-dom.
 * Docs: https://reacttraining.com/react-router/web/api/Link
 */
export interface BackButtonProps {
  /**
   * Text that describes where the browser is navigating to
   */
}



const BackButton: React.FC<BackButtonProps> = props => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <StyledBackLink onClick={() => {history.goBack()}}>
      <StyledBackIcon />
      <StyledBackLabel>{t('common:back')}</StyledBackLabel>
    </StyledBackLink>
  );
};

export default BackButton;
