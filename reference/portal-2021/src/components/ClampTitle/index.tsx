import React, { useRef, useState, useEffect } from 'react';
import { Box, Popover, Typography } from '@lumos/core';
import { CardTitleWrapper, SlimCardTitle } from './index.style';
import { MoreHoriz } from '@material-ui/icons';
import useDevice, { Device } from 'utils/useDevice';

/** Props for the ClampTitle component*/
export interface ClampTitleProps {
  /** id for the popover*/
  id?: string;
  /** Text to display*/
  text: string;
  /**
   * If true the text would be clamped on mobile screen sizes
   * @default false
   */
  clampOnMobile?: boolean;
}

/** Clamp the title for cards*/
const ClampTitle: React.FC<ClampTitleProps> = ({
  id,
  text,
  clampOnMobile = false,
}) => {
  const elm = useRef<HTMLParagraphElement>(null);
  const [isTextClamped, setIsTextClamped] = useState(false);

  // Recalculate the tooltip when the window resizes.
  useEffect(() => {
    const resizeHandler = () => {
      setIsTextClamped(() => {
        if (!elm.current) {
          return false;
        }
        return elm.current.scrollHeight > elm.current.clientHeight + 2;
      });
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const device = useDevice();
  const isMobile = device === Device.Mobile;

  const content = (
    <Box margin="16px">
      <Typography kind="body2" color="secondary.0">
        {text}
      </Typography>
    </Box>
  );

  return (
    <CardTitleWrapper>
      <SlimCardTitle ref={elm} clamped={!isMobile || clampOnMobile}>
        {text}
      </SlimCardTitle>
      {isTextClamped &&
        (isMobile ? (
          '...'
        ) : (
          <Popover
            content={content}
            placement="bottom"
            trigger="click"
            id={id || 'clamp-title-popover'}
          >
            <MoreHoriz />
          </Popover>
        ))}
    </CardTitleWrapper>
  );
};

export default ClampTitle;
