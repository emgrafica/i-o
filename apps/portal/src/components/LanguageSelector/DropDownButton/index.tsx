import { Button, DefaultLumosTheme } from '@lumos/core';
import styled from 'styled-components';

export const DropDownButton = styled(Button)<{
  theme: typeof DefaultLumosTheme;
}>`
  padding-left: 5px;
  border-bottom-width: 4px;
  :hover {
    ${({ theme }) => `
      background-color: unset;
      border-bottom-color: ${theme.colors.impact[1]};
      color: ${theme.colors.impact[1]};
    `}
  }
  :focus {
    ${({ theme }) => `
      background-color: unset;  
      border-bottom-color: ${theme.colors.impact[1]};
      color: ${theme.colors.impact[1]};
      outline: none;
    `}
  }
`;
