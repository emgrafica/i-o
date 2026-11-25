import React from 'react';
import { Box } from '@lumos/core';

const GenericError: React.FC = props => {
  return (
    // Holds all content
    <Box
      width="100%"
      height="320px"
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.3)"
      backgroundColor="grayScale.0"
    >
      {props.children}
    </Box>
  );
};

export default GenericError;
