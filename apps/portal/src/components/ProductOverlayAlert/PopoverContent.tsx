import React from 'react';
import { Box } from '@lumos/core';
import { StyledTypography } from './index.style';

interface PopoverContentProps {
  /**
   * Reason for product disabling
   */
  reason: string | null;
  /**
   * Availability date with label
   */
  availability: string | null;
}

/**
 *
 * Popover Content component
 */
const PopoverContent: React.FC<PopoverContentProps> = ({
  reason,
  availability,
}) => {
  let displayContent = '';
  if (reason) {
    displayContent = reason + ' ';
  }
  if (availability) {
    displayContent = displayContent + availability;
  }
  return (
    <Box margin="16px">
      <StyledTypography kind="body3">{displayContent}</StyledTypography>
    </Box>
  );
};

export default PopoverContent;
