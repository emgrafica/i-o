import { Button, Typography } from '@lumos/core';
import { Search, Event, Chat, ConfirmationNumber } from '@material-ui/icons';
import styled from 'styled-components';

/** Search icon for searching option */
export const SearchIcon = styled(Search)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
/** Ticket icon for redirecting to requests page option */
export const TicketIcon = styled(ConfirmationNumber)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
/** Chat icon for the chat with agent option */
export const ChatIcon = styled(Chat)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
/** Calendar event icon for booking i-o lounge appointment option*/
export const EventIcon = styled(Event)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
/** Text label for options */
export const OptionText = styled(Typography).attrs(_ => ({
  kind: 'body3',
}))`
  color: ${props => props.theme.colors.primary[1]};
  margin: 0;
`;
/** Styling to make button look similar to Link */
export const TextButton = styled(Button).attrs(_ => ({
  kind: 'text',
}))`
  padding: 0px;
  margin: 0px;
  text-align: left;
  > span {
    text-transform: capitalize;
    font-weight: normal;
    font-size: 13px;
  }
  &:focus {
    background: transparent;
  }
  &:hover {
    background: transparent;
  }
`;
