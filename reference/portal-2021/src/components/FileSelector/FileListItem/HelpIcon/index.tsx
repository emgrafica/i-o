import styled from 'styled-components';
import { Help } from '@material-ui/icons';

/**
 * Icon to display on the FileSelector to hover for help
 **/
export const HelpIcon = styled(Help)`
  ${({ theme }) => `
    color: ${theme.colors.state.warning};
    transform: scale(0.7);
    margin-left: 3px;
  `}
`;
