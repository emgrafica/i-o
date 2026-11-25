import styled from 'styled-components';
import { Box, Button } from '@lumos/core';

// Rotates button vertically
export const VerticalBox = styled(Box)`
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE */
  padding: 'none';
  margin: 'none';
  text-transform: 'capitalize';
`;

export const FeedBackButton = styled(Button)`
  font-size: ${props => props.theme.fontSizes[2]};
  background-color: ${props => props.theme.colors.primary[0]};
  border: 1px solid;
  border-color: ${props => props.theme.colors.primary[0]};
  border-radius: ${props => props.theme.radii[1]};
`;
