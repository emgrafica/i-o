import { Email } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display next to i-o District Partner email
 **/
export const EmailIcon = styled(Email)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 5px;
    font-size: 18px !important;
  `}
`;
