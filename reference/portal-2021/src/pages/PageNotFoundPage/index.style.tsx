import styled from 'styled-components';
import { Button, Grid, Typography } from '@lumos/core';

export const PageNotFoundGrid = styled(Grid)`
  min-height: 100%;
  flex-direction: column
  background-color: ${props => props.theme.colors.secondary[4]};
  background-repeat: no-repeat;
  background-position: center;
`;

export const ContentGrid = styled(Grid)`
  background-color: ${props => props.theme.colors.grayScale[0]};
  opacity: 90%;
  padding: 25px 0px;
  flex-direction: column;
`;

export const Title404 = styled(Typography).attrs(_ => ({
  kind: 'h1',
}))`
  color: ${props => props.theme.colors.grayScale[12]};
  margin-bottom: ${props => props.theme.space[0]}px;
  font-weight: 700;
`;

export const Subtitle404 = styled(Typography).attrs(_ => ({
  kind: 'h1',
}))`
  color: ${props => props.theme.colors.secondary[1]};
  margin: ${props => props.theme.space[1]}px 0px;
  padding: 0px 59px;
`;

export const ButtonGrid = styled(Grid).attrs(_ => ({
  kind: 'h1',
}))`
  padding: 0px 59px;
  padding-bottom: 60px;
  padding-top: 20px;
`;

export const HomeButton = styled(Button)`
  border-radius: 3px;
  padding: 9px 18px;
  font-size: 0.8125rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  background-image: none;
`;
