import React from 'react';
import { Typography } from '@lumos/core';

interface QuickLinkProps {
  url: string;
  displayName: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ url, displayName }) => {
  return (
    <a rel="noopener noreferrer" target="_blank" href={url}>
      <Typography
        kind="body1"
        fontSize="16px"
        color="primary.3"
        textTransform="capitalize"
        marginTop={0}
        marginBottom={0}
      >
        {displayName}
      </Typography>
    </a>
  );
};

export default QuickLink;
