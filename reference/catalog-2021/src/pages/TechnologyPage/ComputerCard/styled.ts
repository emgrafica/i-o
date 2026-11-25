import { Card, Grid, Typography } from '@lumos/core';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  display: flex;
  padding: ${props => props.theme.space[4]}px;
  margin: 0;
`;

export const StyledImage = styled.img`
  width: 90px;
`;

export const CardRightColumn = styled(Grid)`
  flex-direction: column;
  margin-left: ${props => props.theme.space[6]}px;
`;

export const DeviceTitle = styled(Typography).attrs({
  kind: 'body1',
})`
  margin-top: 0;
  margin-bottom: ${props => props.theme.space[1]}px;
`;

export const RowContainer = styled(Grid)`
  margin-top: ${props => props.theme.space[2]}px;
`;

export const RowLabel = styled(Typography).attrs({
  kind: 'subtitle2',
})`
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${props => props.theme.space[2]}px;
`;

export const RowValue = styled(Typography).attrs({
  kind: 'body3',
})`
  margin-top: 0;
  margin-bottom: 0;
`;
