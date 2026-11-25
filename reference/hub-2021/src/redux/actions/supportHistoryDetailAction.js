import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loadData: [],
  getSupportHistoryDetail: ['ticketNumber', 'currentUser', 'ticketINC'],
  getSupportHistoryDetailSuccess: ['SHDetail'],
  updateIncidentTicketDetail: ['SHDetail', 'currentUser', 'target', 'ticketNumber', 'isIncidentTicket', 'comments'],
  submitCommentTicketDetail: ['ticketNumber', 'isIncidentTicket', 'currentUser', 'value', 'SHDetail'],

  setErrorAction: ['error'],
});

export const SupportHistoryDetailTypes = Types;
export default Creators;

