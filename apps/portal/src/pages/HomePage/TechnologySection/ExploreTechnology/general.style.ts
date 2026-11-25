import styled from 'styled-components';
import { Button } from '@lumos/core';

// Rotates button vertically
export const HomeTechnologyButton = styled(Button).attrs(_ => ({
  kind: 'secondary',
}))`
  height: 34px;
  width: 200px;
  font-size: 13px;
  text-transform: lowercase;
  letter-spacing: 0.46px;
  background-color: ${props => props.theme.colors.impact[0]};
  border: 1px solid;
  border-color: ${props => props.theme.colors.impact[0]};
  color: ${props => props.theme.colors.grayScale[0]};
  text-align: center;
`;
