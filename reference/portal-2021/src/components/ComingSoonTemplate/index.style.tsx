import { Button } from '@lumos/core';
import styled from 'styled-components';

const CollaborationLink = styled(Button).attrs(_ => ({
  kind: 'text',
}))`
  ${({ theme }) => `
     font-size: ${theme.fontSizes[1]}px;
  `}
  padding-left: 0;
  font-weight: normal;
  :hover {
    background-color: transparent;
  }
  :active {
    background: none;
  }
  :focus {
    background: none;
    outline: none;
  }
`;

export default CollaborationLink;
