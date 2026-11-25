import styled from 'styled-components';
import { Typography } from '@lumos/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Link from '@material-ui/core/Link';


/**
 * StyledBackIcon give style to Back icon
 */
export const StyledBackIcon = styled(PlayArrowIcon).attrs(_ => ({
  fontSize: 'small',
}))`
  ${({ theme }) => `
    color: ${theme.colors.primary[1]};
    margin-top: 1px;
    margin-bottom: 0px;
    transform: rotateX(45deg) rotateZ(180deg);
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
  margin-top: 0px;
  margin-bottom: 0px;
`;

/**
 * StyledBackLink give style to Back link
 */
export const StyledBackLink = styled(Link)`
  display: flex;
`;
