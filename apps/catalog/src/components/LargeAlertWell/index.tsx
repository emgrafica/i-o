import React from 'react';
import {
  AlertWellGrid,
  AlertWellIcon,
  AlertWellMessageBox,
  IconWrapper,
} from './index.style';
import { AlertTypes } from '@lumos/core/lib/components/Alert/Alert.styles';
import RichTextRenderer from 'components/RichTextRenderer';
import { DocumentNode } from 'components/RichTextRenderer/utils';

export interface LargeAlertWellProps {
  /**
   * Possible types of Alert components
   * @default - 'warning'
   */
  kind?: AlertTypes;
  /**
   * Whether or not the alert well is enabled
   */
  enabled: boolean | undefined;
  /**
   * The message to display in the alert well
   */
  message: DocumentNode;
}

/**
 * Large alert well meant to render across full width of a page.
 */
const LargeAlertWell: React.FC<LargeAlertWellProps> = ({
  enabled,
  message,
}) => {
  if (!enabled) return null;

  return (
    <AlertWellGrid>
      <IconWrapper>
        <AlertWellIcon fontSize="inherit" />
      </IconWrapper>
      <AlertWellMessageBox>
        <RichTextRenderer document={message} />
      </AlertWellMessageBox>
    </AlertWellGrid>
  );
};

export default LargeAlertWell;
