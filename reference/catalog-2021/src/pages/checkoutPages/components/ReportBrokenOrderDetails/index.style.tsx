import styled from 'styled-components';
import { Typography } from '@lumos/core';

export const Label = styled(Typography).attrs({
  kind: 'body2',
})`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary[0]};
`;

export const Value = styled(Typography).attrs({
  kind: 'body2',
})`
  color: ${({ theme }) => theme.colors.primary[0]};
`;
