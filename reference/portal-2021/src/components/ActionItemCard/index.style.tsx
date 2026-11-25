import styled from 'styled-components';
import { space, typography, color } from 'styled-system';
import { ErrorOutline } from '@material-ui/icons';
import { Box, Typography } from '@lumos/core';

const StyledActionButton = styled(Typography).attrs(_ => ({
  kind: 'button',
}))`
  color: ${props => props.theme.colors.grayScale[0]};
  font-size: 0.8125rem;
  font-weight: bold;
  cursor: pointer;
`;

const StyledActionLink = styled(Typography).attrs(_ => ({
  kind: 'body3',
}))`
  color: ${props => props.theme.colors.primary[2]};
  font-size: ${props => props.theme.fontSizes[1]}px;
  margin: 0;
  line-height: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
  text-transform: lowercase;
  :before {
    content: '';
    margin-right: 2rem;
    position: absolute;
    right: 15px;
    top: 11px;
    background-color: #5f249f;
    width: 1.25rem;
    height: 1px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  :after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    margin-right: 2rem;
    position: absolute;
    right: 15px;
    top: 2px;
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    opacity: 0;
  }
  ${color} :hover {
    cursor: pointer;
    color: ${props => props.theme.colors.primary[1]};
  }
  :hover {
    &:after {
      opacity: 1;
    }
  }
`;

const StyledActionLinkDisabled = styled(Typography).attrs(_ => ({
  kind: 'body3',
}))`
  color: ${props => props.theme.colors.grayScale[5]};
  font-size: ${props => props.theme.fontSizes[1]}px;
  margin: 0;
  line-height: 24px;
  ${color} :hover {
    cursor: not-allowed;
  }
`;

interface StyledTitleType {
  device: number;
}

const StyledTitle = styled(Typography).attrs(({ device }: StyledTitleType) => ({
  kind: device < 2 ? 'body2' : 'h5',
}))<StyledTitleType>`
  color: ${props => props.theme.colors.secondary[0]};
  text-transform: capitalize;
  line-height: 31px;
  ${space}
`;

const StyledStats = styled(Typography).attrs(_ => ({
  kind: 'h3',
}))`
  color: ${props => props.theme.colors.secondary[0]};
  line-height: 49px;
  font-weight: 700;
  margin-bottom: 3px;
  ${space}
`;

const StyledStatus = styled(Typography).attrs(_ => ({
  kind: 'body1',
}))`
  color: ${props => props.theme.colors.secondary[0]};
  font-size: 16px;
  margin: 0;
  line-height: 24px;
  ${typography}
`;

const StyledSubTitle = styled(Typography).attrs(_ => ({
  kind: 'body1',
}))`
  color: ${props => props.theme.colors.grayScale[0]};
  margin-top: ${props => props.theme.space[2]}px;
  margin-bottom: 0;
`;

const StyledContainer = styled(Box)`
  background: ${props => props.theme.colors.grayScale[1]};
  padding: 20px;
  margin-bottom: 14px;
  opacity: 90%;
`;
interface StyledLoadingError {
  breakpoint: number;
}
const StyledLoadingError = styled(Typography).attrs(
  ({ breakpoint }: StyledLoadingError) => ({
    kind: breakpoint < 2 ? 'body3' : 'body1',
    marginTop: breakpoint < 2 ? '0px' : '12px',
    marginBottom: breakpoint < 2 ? '0px' : '12px',
  }),
)<StyledLoadingError>`
  color: ${props => props.theme.colors.state.danger};
  line-height: 24px;
  margin-left: 4px;
  margin-right: 4px;
`;

const ErrorIcon = styled(ErrorOutline)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
  `}
`;

export {
  StyledActionButton,
  StyledActionLink,
  StyledActionLinkDisabled,
  StyledTitle,
  StyledStats,
  StyledStatus,
  StyledSubTitle,
  StyledContainer,
  StyledLoadingError,
  ErrorIcon,
};
