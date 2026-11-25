import { ConfirmationNumber } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the business application cards for incident creation
 **/
export const IncidentIcon = styled(ConfirmationNumber).attrs(_ => ({
  fontSize: 'small',
}))`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin: 2px 5px;
  `}
`;
