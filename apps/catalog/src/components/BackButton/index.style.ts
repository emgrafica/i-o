import styled from 'styled-components';
import { Typography } from '@lumos/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';

/**
 * StyledBackIcon give style to Back icon
 */
export const StyledBackIcon = styled(ArrowBackIos).attrs(_ => ({
  fontSize: 'small',
}))`
  ${({ theme }) => `
    color: ${theme.colors.primary[1]};
    margin-top: 1px;
    margin-bottom: 0px;
  `}
`;

/**
 * StyledBackLabel give style to Back link label
 */
export const StyledBackLabel = styled(Typography).attrs(_ => ({
  kind: 'body1',
}))`
  color: ${props => props.theme.colors.primary[1]};
  font-size: ${props => props.theme.fontSizes[1]}px;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 0px;
`;

/**
 * StyledBackLink give style to Back link
 */
export const StyledBackLink = styled(Link)`
  margin-bottom: 34px;
  display: flex;
`;
