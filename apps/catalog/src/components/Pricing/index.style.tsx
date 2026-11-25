import styled from 'styled-components';
import { AttachMoney } from '@material-ui/icons';

/**
 * Currency icon for pricing
 */
const StyledSymbol = styled(AttachMoney).attrs(props => ({
  fontSize: 'small',
}))<{ active: boolean } & any>`
  margin-right: -10px;
  ${({ theme, active }) => `
    color: ${active ? theme.colors.primary[0] : theme.colors.secondary[2]};
  `}
`;

export default StyledSymbol;
