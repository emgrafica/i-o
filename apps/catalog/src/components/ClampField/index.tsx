import styled from 'styled-components';
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Box, Popover, Typography } from '@lumos/core';
import { MoreHoriz } from '@material-ui/icons';
import useDevice, { Device } from 'utils/useDevice';

export interface ClampFieldProps {
  /** The text of the paragraph */
  text: string;
  /** The unique id, this is required for tooltip. */
  id: string;
  /** The placement of the tooltip */
  placement?: 'top' | 'bottom';
  /** Callback to handle whether the field needs the clamping button */
  onNeedsClampButton?: (needsClamping: boolean) => void;
  /**
   * If true the text would be clamped on mobile screen sizes
   * @default false
   */
  clampOnMobile?: boolean;
}

interface AdditionalClampFieldProps {
  /** Rows to display for paragraph */
  maxLineCount?: number;
}

type AutoParagraphProps = ClampFieldProps & AdditionalClampFieldProps;

type ParagraphProps = HTMLAttributes<HTMLParagraphElement> &
  AdditionalClampFieldProps;

const Container = styled.div`
  position: relative;
`;

const EllipsisPositioner = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 1.1rem;
  display: flex;
  align-items: center;
  background-color: white;
  padding-left: 0.5rem;
`;

const ParagraphRef = styled.p<ParagraphProps>`
  color: ${({ theme }) => theme.colors.secondary[0]};
  font-size: 0.8125rem;
  letter-spacing: 0.25px;
  margin: 0px;
  overflow-y: hidden;
  line-height: 1.1rem;
  max-height: ${({ maxLineCount = 1 }) =>
    maxLineCount >= 0 ? `${maxLineCount * 1.1}rem` : 'initial'};
`;

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    return <ParagraphRef {...props} ref={ref} />;
  },
);

/**
 * Use this component to show a paragraph that may be shortened with
 * ellipsis icon and hovered with a tooltip.
 */
const ClampField: React.FC<AutoParagraphProps> = ({
  text,
  id,
  placement = 'top',
  onNeedsClampButton,
  clampOnMobile = false,
  maxLineCount,
}) => {
  const elm = useRef<HTMLParagraphElement>(null);
  const [isTextClamped, setIsTextClamped] = useState(false);

  const tooltipContent = (
    <Box margin="16px">
      <Typography kind="body2" color="secondary.0">
        {text}
      </Typography>
    </Box>
  );

  const resizeHandler = () => {
    setIsTextClamped(() => {
      if (!elm.current) {
        return false;
      }
      // offset client height by 2 to encounter any extra whitespace from line height
      return elm.current.scrollHeight > elm.current.clientHeight + 2;
    });
  };

  // Recalculate the tooltip when the clampOnMobile prop changes
  useEffect(() => {
    resizeHandler();
  }, [clampOnMobile]);

  // Recalculate the tooltip when the window resizes
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // Determine if collapsible show more/less is needed based on whether text was clamped
  useEffect(() => {
    if (onNeedsClampButton) onNeedsClampButton(isTextClamped || !clampOnMobile);
  }, [onNeedsClampButton, isTextClamped, clampOnMobile]);

  const device = useDevice();
  const isMobile = device === Device.Mobile;
  return (
    <Container>
      <Paragraph
        ref={elm}
        maxLineCount={isMobile && !clampOnMobile ? -1 : maxLineCount}
      >
        {text}
      </Paragraph>
      {isTextClamped && (
        <EllipsisPositioner>
          {isMobile ? (
            '...'
          ) : (
            <Popover
              width="350px"
              content={tooltipContent}
              placement={placement}
              trigger="click"
              id={id}
            >
              <MoreHoriz />
            </Popover>
          )}
        </EllipsisPositioner>
      )}
    </Container>
  );
};

export default ClampField;
