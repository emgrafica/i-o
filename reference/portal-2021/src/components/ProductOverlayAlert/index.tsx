import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from '@lumos/core';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import PopoverContent from './PopoverContent';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import {
  StyledOverlayAlertBox,
  StyledOverlayAlertGrid,
  StyledIconGrid,
  StyledWarningIcon,
  StyledTypography,
  StyledOverlayGrid,
  StyledPopoverGrid,
} from './index.style';

interface ProductOverlayAlertProps {
  /**
   * Type of product disabling
   */
  type: string | null;
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
 * Product Overlay Alert component
 */
const ProductOverlayAlert: React.FC<ProductOverlayAlertProps> = ({
  type,
  reason,
  availability,
}) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  return (
    <StyledOverlayAlertBox>
      <StyledOverlayAlertGrid paddingY={breakpoint <= Breakpoint.md ? 1 : 2}>
        <StyledIconGrid>
          <StyledWarningIcon />
        </StyledIconGrid>
        <StyledOverlayGrid
          flexDirection={breakpoint <= Breakpoint.md ? 'column' : 'row'}
          alignItems={breakpoint <= Breakpoint.md ? 'flex-start' : 'center'}
        >
          <StyledTypography kind="body3" id="overlayState">
            {type}
          </StyledTypography>
          {(reason || availability) && (
            <Popover
              id="overlayLearnMore"
              placement="bottom"
              content={
                <PopoverContent reason={reason} availability={availability} />
              }
            >
              <StyledPopoverGrid>
                <StyledTypography kind="body3">
                  {t('common:learnMore')}
                </StyledTypography>
                {breakpoint <= Breakpoint.md ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowDown />
                )}
              </StyledPopoverGrid>
            </Popover>
          )}
        </StyledOverlayGrid>
      </StyledOverlayAlertGrid>
    </StyledOverlayAlertBox>
  );
};

export default ProductOverlayAlert;
