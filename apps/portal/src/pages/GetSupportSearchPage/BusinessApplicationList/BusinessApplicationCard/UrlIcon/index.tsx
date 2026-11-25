import { Link } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the business application cards with external urls
 **/
export const UrlIcon = styled(Link).attrs(_ => ({
  fontSize: 'small',
}))`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin: 2px 5px;
  `}
`;
