import React from 'react';
import { Box, Grid } from '@lumos/core';
import { Title } from './Title';

/**
 * Props type for the BusinessApplicationCard component
 **/
interface CardTemplateProps {
  icon: JSX.Element;
  title: string;
  minHeight: string;
  minWidth: string;
  onTitleClick: () => void;
}

/**
 * Business application card
 **/
const CardTemplate: React.FC<CardTemplateProps> = ({
  icon,
  title,
  minHeight,
  minWidth,
  onTitleClick,
  children,
}) => {
  return (
    <Grid
      minHeight={minHeight}
      minWidth={minWidth}
      borderBottom="1px solid"
      borderBottomColor="secondary.3"
      flexDirection="row"
      padding="16px 8px"
    >
      {icon}
      <Box>
        <Title padding="0" margin="0" onClick={onTitleClick}>
          {title}
        </Title>
        {children}
      </Box>
    </Grid>
  );
};

export default CardTemplate;
