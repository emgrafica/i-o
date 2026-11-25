import { Typography } from '@lumos/core';
import React from 'react';
import { LinkHover } from '../general.style';

interface QuickLinkProps {
  url: string;
  displayName: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ url, displayName }) => {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={url}
      style={{ textDecoration: 'none', display: 'inline-block' }}
    >
      <Typography
        kind="body1"
        fontSize="14px"
        color="primary.0"
        textTransform="capitalize"
        marginTop={0}
        marginBottom={0}
        fontWeight={600}
      >
        <LinkHover>{displayName}</LinkHover>
      </Typography>
    </a>
  );
};

export default QuickLink;
