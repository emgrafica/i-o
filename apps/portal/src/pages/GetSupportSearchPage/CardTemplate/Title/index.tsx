import styled from 'styled-components';
import { Typography } from '@lumos/core';

const Title = styled(Typography).attrs(_ => ({
  kind: 'h6',
  id: 'searchResult',
}))`
  ${({ theme }) => `
    cursor: pointer;
    color: ${theme.colors.primary[1]};
    :hover {
      text-decoration: underline;
    }
  `}
`;

export { Title };
