import { Chat } from '@material-ui/icons';
import styled from 'styled-components';

/** Chat icon for the Chat Now action label */
export const ChatIcon = styled(Chat)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
