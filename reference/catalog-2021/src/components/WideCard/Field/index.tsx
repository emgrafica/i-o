import React from 'react';
import { Grid, Typography, Box } from '@lumos/core';
import { ClampField } from 'components';
import useDevice, { Device } from 'utils/useDevice';

/** Field Props */
interface FieldProps {
  /** Field label to display */
  label: string;
  /** Field value to display */
  value: string;
  /** If set, this will show the value on a new line
   * underneath the label for mobile screens */
  newLineOnMobile?: boolean;
  /** Determines whether or not to clamp on mobile screen size */
  clampOnMobile?: boolean;
  /** Callback to handle whether the field needs the clamping button */
  onNeedsClampButton?: (needsClamping: boolean) => void;
  /** URL link for value  */
  url?: string;
}

/** Renders a label and value to display as a field in WideCard body */
const Field: React.FC<FieldProps> = ({
  label,
  value,
  newLineOnMobile,
  clampOnMobile,
  onNeedsClampButton,
  url,
}) => {
  const device = useDevice();
  const isMobile = device === Device.Mobile;
  return (
    <Grid
      flexDirection={isMobile && newLineOnMobile ? 'column' : 'row'}
      marginY="4px"
      alignItems="baseline"
    >
      <Typography
        kind="body3"
        minWidth={isMobile && newLineOnMobile ? '100%' : '40%'}
        fontWeight="bold"
        color="secondary.0"
        marginY="0px"
        marginRight="8px"
      >
        {label}
      </Typography>
      <Box
        width={isMobile ? 'unset' : '60%'}
        textAlign={isMobile && !newLineOnMobile ? 'right' : 'left'}
        marginLeft={isMobile && newLineOnMobile ? 'none' : 'auto'}
      >
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Typography
              kind="body2"
              color="primary.2"
              margin="0px"
              style={{ textDecoration: 'underline' }}
            >
              {value}
            </Typography>
          </a>
        ) : (
          <ClampField
            text={value}
            id={label}
            maxLineCount={isMobile ? 2 : 3}
            clampOnMobile={clampOnMobile}
            onNeedsClampButton={onNeedsClampButton}
          />
        )}
      </Box>
    </Grid>
  );
};
export default Field;
