import React from 'react';
import { LinkProps } from 'react-router-dom';
import { StyledBackIcon, StyledBackLabel, StyledBackLink } from './index.style';

/**
 * Required props for BackButton.
 * Extends LinkProps from react-router-dom.
 * Docs: https://reacttraining.com/react-router/web/api/Link
 */
export interface BackButtonProps extends LinkProps {
  /**
   * Text that describes where the browser is navigating to
   */
  text: string;
}

const BackButton: React.FC<BackButtonProps> = props => {
  return (
    <StyledBackLink {...props}>
      <StyledBackIcon />
      <StyledBackLabel>{props.text}</StyledBackLabel>
    </StyledBackLink>
  );
};

export default BackButton;
