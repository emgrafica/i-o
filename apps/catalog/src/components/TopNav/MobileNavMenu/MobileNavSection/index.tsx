import React from 'react';
import { Box, Grid } from '@lumos/core';
import { MobileMenuDivider, MobileNavButton } from '../../TopNav.style';
import { NavSectionProps } from '../../types';

/**
 * MobileNavSection Props
 */
type MobileNavSectionProps = NavSectionProps;

/**
 * Renders collapsible navigation section for the mobile navigation menu sidesheet
 * @param props
 */
const MobileNavSection: React.FC<MobileNavSectionProps> = props => {
  const { title, items } = props;
  return (
    <>
      <MobileNavButton>{title}</MobileNavButton>

      <Grid flexDirection="column">
        {items.map((item, index) => (
          <Box key={index} height="40px">
            {item}
          </Box>
        ))}
      </Grid>
      <MobileMenuDivider />
    </>
  );
};

export default MobileNavSection;
