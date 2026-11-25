import { Button } from '@lumos/core';
import styled from 'styled-components';

export const DropDownButton = styled(Button)`
  padding-left: 5px;
  :hover {
    background-color: unset;
  }
  :focus {
    background-color: unset;
    outline: none;
  }
`;
