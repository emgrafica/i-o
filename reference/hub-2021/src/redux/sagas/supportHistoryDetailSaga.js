import { AUTH } from "constants/authConstants";
import { SUPPORT_HISTORY } from "constants/supportHistoryConstants";
import { call, put, select, takeLatest } from "redux-saga/effects";
import SupportHistoryDetailAction, { SupportHistoryDetailTypes } from "redux/actions/supportHistoryDetailAction";
import { getTicketById, provideTicketFeedBack, updateIncidentTicket } from "services/supportHistoryServices";

const buttonText = {
  reopen: "Reopen",
  resolve: "Mark Resolved",
};

export function* getSupportHistoryDetail(action) {
  const { ticketNumber, currentUser, ticketINC } = action;

  
  try {

    yield put(SupportHistoryDetailAction.loadData());

    const queryParams = {
      ticket_number: ticketNumber,
      user_name: currentUser.user_name,
    };
    
    const SHDetailState = yield select((state) => state.supportHistoryDetail);
    const respone = yield call(getTicketById, queryParams, ticketINC);
    
    if (respone.status === 200) {
      const result = respone.data;
      const { state, priority } =  result;

      let settings = localStorage.getItem(AUTH.SETTINGS);
      settings = !!settings ? JSON.parse(settings) : {};

      const allowReopen = settings.hasOwnProperty('AllowReopenResolvedTicket') ? JSON.parse(settings.AllowReopenResolvedTicket) : false;
      const disallowReopenPriority = settings.hasOwnProperty('DISALLOW_RE_OPEN_INCIDENT_PRIORITY') ? JSON.parse(settings.DISALLOW_RE_OPEN_INCIDENT_PRIORITY) : [];
      const stateUpperCase = state.toUpperCase();

      /**
       * For Open Incident, show "Mark Resolved" button:
        -If Incident is in "Resolved" state (real state, in Service Now) and the database contains the setting "AllowReopenResolvedTicket = TRUE", show Reopen button
        -If Incident is in "Resolved" state (real state, in Service Now) and the database contains the setting "AllowReopenResolvedTicket = FALSE", do not show Reopen button
        -If Incident is in "Closed" (real state, "Cancelled", "Closed" in Service Now) state, do not show Reopen button
        -If ticket is a service request (RITM), Reopen/Resolve links do not appear
        */

      if (ticketINC) {
        if ([SUPPORT_HISTORY.STATE.OPEN, SUPPORT_HISTORY.STATE.ACTION_REQURED].includes(stateUpperCase)) {
          SHDetailState.buttonValue = buttonText.resolve;
          SHDetailState.disabledBtn = false;
          SHDetailState.disabledComment = false;
        } else if ([SUPPORT_HISTORY.STATE.RESOLVED].includes(stateUpperCase) && !!allowReopen) {
          SHDetailState.buttonValue = buttonText.reopen;

          // Prevent reopen and comment of P1 and P2 incidents ticket
          if (Array.isArray(disallowReopenPriority) && disallowReopenPriority.includes(priority)) {
            SHDetailState.disabledBtn = true;
            SHDetailState.disabledComment = true;
          }
        }
      } else {
        SHDetailState.buttonValue = "";
        SHDetailState.disabledBtn = false;
      }

      // disabled input comment
      if ([SUPPORT_HISTORY.STATE.CLOSED].includes(stateUpperCase)) {
        SHDetailState.disabledComment = true;
      }

      yield put(SupportHistoryDetailAction.getSupportHistoryDetailSuccess(result));

    } else {
      throw new Error(respone.error);
    }
  } catch (error) {
    yield put(SupportHistoryDetailAction.setErrorAction(error));
  }
}

export function* updateIncidentTicketDetail(action) {
  const { SHDetail, currentUser, target, ticketNumber, isIncidentTicket, comments } = action;
  try {
    let actionBtn;
    switch (target.innerText) {
      case buttonText.resolve:
        actionBtn = "resolve";
        break;
        case buttonText.reopen:
          actionBtn = "reopen";
          break;
        }
        
    const dataPost = {
      ticket_uid: SHDetail.uid,
      user_name: currentUser.user_name,
    };

    if (actionBtn) {
      yield put(SupportHistoryDetailAction.loadData());
      const respone = yield call(updateIncidentTicket, dataPost, actionBtn, comments);
      if (respone.status === 200) {
        yield put(SupportHistoryDetailAction.getSupportHistoryDetail(ticketNumber, currentUser, isIncidentTicket));
      } else {
        throw new Error(respone.error);
      }
    }
        
  } catch (error) {
    yield put(SupportHistoryDetailAction.setErrorAction(error));
  }
}

export function* submitCommentTicketDetail(action) {
  const { ticketNumber, isIncidentTicket, currentUser, value, SHDetail } = action;
  try {
    if (value.length && SHDetail.state.toUpperCase() !== SUPPORT_HISTORY.STATE.CLOSED) {
      yield put(SupportHistoryDetailAction.loadData());
      const param = {
        ticket_uid: SHDetail.uid,
        user_name: currentUser.user_name,
      };

      const respone = yield call(provideTicketFeedBack, param, value, isIncidentTicket);

      if (respone.status === 200) {
        yield put(SupportHistoryDetailAction.getSupportHistoryDetail(ticketNumber, currentUser, isIncidentTicket));
      } else {
        throw new Error(respone.error);
      }
    }
  } catch (error) {
    yield put(SupportHistoryDetailAction.setErrorAction(error));
  }
}

export const watchSupportHistoryDetail = [
  takeLatest(
    SupportHistoryDetailTypes.GET_SUPPORT_HISTORY_DETAIL,
    getSupportHistoryDetail
  ),
  takeLatest(
    SupportHistoryDetailTypes.UPDATE_INCIDENT_TICKET_DETAIL,
    updateIncidentTicketDetail
  ),
  takeLatest(
    SupportHistoryDetailTypes.SUBMIT_COMMENT_TICKET_DETAIL,
    submitCommentTicketDetail
  )
];
