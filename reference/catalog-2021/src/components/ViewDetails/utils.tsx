import React from 'react';
import { DefinitionDescription, DefinitionTerm } from './index.style';
import { Typography } from '@lumos/core';

/**
 * Renders a label and value pair to display information on ViewDetails sideSheet
 * @param label: label to display
 * @param value: value to display
 */
export const labelValuePair = (label: string, value: string | JSX.Element) => (
  <>
    <DefinitionTerm>
      <Typography kind="body2">{label}</Typography>
    </DefinitionTerm>
    <DefinitionDescription>
      <Typography kind="subtitle2">{value}</Typography>
    </DefinitionDescription>
  </>
);
