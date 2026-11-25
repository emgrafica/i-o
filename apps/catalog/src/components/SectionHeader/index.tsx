import React from 'react';
import { Typography, Grid } from '@lumos/core';

/** Section Header Props */
interface SectionHeaderProps {
  /** Title of the header */
  title: string;

  /** Subtitle of the header */
  subtitle?: string;

  /** Info text to display on the header */
  info?: string;

  /**
   * Boolean to determine if this is the main title of the form.
   * Used for styling purposes
   */
  isMainTitle?: boolean;
}

/** Section Header Component */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isMainTitle,
  subtitle,
  info,
}) => {
  return (
    <Grid marginBottom={`${isMainTitle ? 40 : 20}px`} alignItems="baseline">
      <Typography
        kind={isMainTitle ? 'h4' : 'h5'}
        color="primary.0"
        fontWeight="bold"
        display="inline"
      >
        {title}
      </Typography>

      <Typography
        kind="body1"
        margin="0 10px"
        color="primary.0"
        display="inline"
      >
        {subtitle}
      </Typography>

      <Typography kind="subtitle3" color="grayScale.9" marginLeft="auto">
        {info}
      </Typography>
    </Grid>
  );
};

export default SectionHeader;
