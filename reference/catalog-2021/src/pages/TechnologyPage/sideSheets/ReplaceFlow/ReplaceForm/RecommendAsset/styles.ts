import { Card, Grid, Typography } from '@lumos/core';
import styled from 'styled-components';

export const StyledHeader = styled(Typography).attrs({
  kind: 'body3',
})`
  color: ${props => props.theme.colors.primary[1]};
`;

export const StyledContent = styled(Typography).attrs({
  kind: 'body3',
})`
  color: ${props => props.theme.colors.grayScale[12]};
`;

export const CardRightColumn = styled(Grid)`
  flex-direction: column;
  margin-left: ${props => props.theme.space[6]}px;
`;

export const StyledCard = styled(Card)`
  display: flex;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const StyledImage = styled.img`
  width: 90px;
`;
