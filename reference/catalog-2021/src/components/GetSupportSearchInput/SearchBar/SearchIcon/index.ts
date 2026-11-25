import styled from 'styled-components';
import { Search } from '@material-ui/icons';

export const SearchIcon = styled(Search).attrs(() => ({
  role: 'button',
  id: 'searchIcon',
}))`
  cursor: pointer;
`;
