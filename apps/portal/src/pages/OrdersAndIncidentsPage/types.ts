import { Dispatch } from 'react';
import { SortOrder, DateRange } from '../../models/globalTypes';
import { MyRequests_myRequests_items } from '../../models/types/MyRequests';
import { FilterNode } from 'components/FiltersBox/types';
import { IncidentsByUser_incidentsSearch_items } from '../../models/types/IncidentsByUser';
//import { ApolloError } from 'apollo-boost';

/**
 * Internal state of RequestPage
 */
export type IRequestState = {
  sortOrder: SortOrder;
  dateRange: DateRange;
  pageNumber: number;
  totalItems: number;
  keywords: string;
  showCancelIncidentSuccess: boolean;
  showCancelOrderSuccess: boolean;
  showCancelOrderFailure: boolean;
  showReopenIncidentSuccess: boolean;
  isSideSheetOpen: boolean;
  orderData: MyRequests_myRequests_items | null;
  orderAction: OrderAction;
  filterState: {
    loading: boolean;
    error?: any;
    filters: FilterNode[];
  };
  incidentData: IncidentsByUser_incidentsSearch_items | null;
  incidentAction: IncidentAction;
  loading: boolean;
};

/**
 * RequestPage Context
 */
export interface IRequestContext {
  /**
   * useReducer dispatch
   */
  dispatch: Dispatch<Action>;
  /**
   * Internal state of RequestPage
   */
  state: IRequestState;
}

/**
 * Types of actions
 */
export enum ActionTypes {
  INCIDENT_REOPEN_SUCCESS,
  INCIDENT_CANCEL_SUCCESS,
  REQUEST_CANCEL_SUCCESS,
  REQUEST_CANCEL_FAILURE,
  SET_ORDER_DATA,
  SET_INCIDENT_DATA,
  CLOSE_SIDE_SHEET,
  TOAST_SHOWN,
  INIT_FILTERS,
  UPDATE_FILTER,
  UPDATE_CRITERIA,
  CLEAR_FILTERS,
  SET_SORT_ORDER,
  SET_DATE_RANGE,
  SET_PAGE_NUMBER,
  SET_TOTAL_ITEMS,
  SET_LOADING,
}

export enum OrderAction {
  None,
  ViewDetails,
  Cancel,
}

export enum IncidentAction {
  None,
  ViewDetails,
  Comment,
  Cancel,
  Reopen,
}

export type Action =
  | {
      type: ActionTypes.INCIDENT_REOPEN_SUCCESS;
    }
  | {
      type: ActionTypes.REQUEST_CANCEL_SUCCESS;
    }
  | { type: ActionTypes.REQUEST_CANCEL_FAILURE }
  | { type: ActionTypes.INCIDENT_CANCEL_SUCCESS }
  | {
      type: ActionTypes.SET_ORDER_DATA;
      payload: {
        orderData: MyRequests_myRequests_items | null;
        orderAction: OrderAction;
      };
    }
  | { type: ActionTypes.TOAST_SHOWN }
  | {
      type: ActionTypes.INIT_FILTERS;
      payload: { filters: FilterNode[]; loading: boolean; error?: any };
    }
  | {
      type: ActionTypes.UPDATE_FILTER;
      payload: {
        filter: FilterNode;
        filterParent: FilterNode | null;
      };
    }
  | {
      type: ActionTypes.UPDATE_CRITERIA;
      payload: {
        keywords?: string;
      };
    }
  | {
      type: ActionTypes.CLEAR_FILTERS;
    }
  | {
      type: ActionTypes.SET_INCIDENT_DATA;
      payload: {
        incidentData: IncidentsByUser_incidentsSearch_items | null;
        incidentAction: IncidentAction;
      };
    }
  | {
      type: ActionTypes.CLOSE_SIDE_SHEET;
    }
  | {
      type: ActionTypes.SET_SORT_ORDER;
      payload: SortOrder;
    }
  | {
      type: ActionTypes.SET_DATE_RANGE;
      payload: DateRange;
    }
  | {
      type: ActionTypes.SET_PAGE_NUMBER;
      payload: number;
    }
  | {
      type: ActionTypes.SET_TOTAL_ITEMS;
      payload: number;
    }
  | {
      type: ActionTypes.SET_LOADING;
      payload: boolean;
    };

export enum ResourceType {
  Orders = 'orders',
  Incidents = 'incidents',
  Requests = 'requests',
}

export interface QueryWrapperProps {
  keywords?: string;
  pageNumber?: number;
  sortBy?: SortOrder;
  dateRange?: DateRange;
}
