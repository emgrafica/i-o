import { Typography } from '@lumos/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/** Styling for subcategory links */
export const SubcategoryLabel = styled(Link)`
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  white-space: nowrap;
`;
/**
 * Styled punctuation
 */
export const Punctuation = styled(Typography).attrs(_ => ({
  kind: 'body3',
}))`
  color: ${props => props.theme.colors.secondary[0]};
  margin: 0px;
`;
