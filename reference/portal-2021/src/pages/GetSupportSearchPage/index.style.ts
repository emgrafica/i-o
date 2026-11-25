import styled from 'styled-components';
import { Box, Typography } from '@lumos/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { color } from 'styled-system';
import Button from '@material-ui/core/Button';

export const BorderBox = styled(Box)`
  ${({ theme }) => `
    border: 1px solid;
    background-color: unset;
    margin-right: 15px;
    border-color: ${theme.colors.grayScale[6]};
    border-radius: 10px;
  `}
`;
export const StyledCircularProgress = styled(CircularProgress)`
  color: #4b30b5 !important;
`;

export const StyledViewMoreLink = styled(Typography).attrs(_ => ({
  kind: 'body2',
}))`
  font-size: ${props => props.theme.fontSizes[1]}px;
  line-height: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
  width: fit-content
  ${color} :hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${props => props.theme.colors.primary[1]};
  }
  :hover {
    &:after {
      opacity: 1;
    }
  }
`;

export const StyledButton = styled(Button)`
  margin: auto !important;
  justify-content: flex-start !important;
  text-transform: none !important;
`;

export const StyledAttachmentTitle = styled(Box)`
  font-size: 13px;
  color: #000000;
  margin-bottom: 14px;
  font-weight: 700;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;
