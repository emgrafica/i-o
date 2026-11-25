import { Typography } from '@lumos/core';
import styled from 'styled-components';

export const ShadowBox = styled.div`
  filter: drop-shadow(0 1px 1px rgba(136, 136, 136, 0.3));
`;
export const Background = styled.div`
  background-color: ${props => props.theme.colors.primary[2]};
  clip-path: polygon(0 0, 100% 0, 92% 100%, 0% 100%);
  width: fit-content;
  padding: 3px 20px 3px 12px;
`;
export const Label = styled(Typography).attrs(_ => ({
  kind: 'button',
}))`
  font-size: ${props => props.theme.fontSizes[0]}px;
  color: ${props => props.theme.colors.grayScale[0]};
`;
