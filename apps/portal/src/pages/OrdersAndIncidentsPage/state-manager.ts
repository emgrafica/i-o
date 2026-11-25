import {
  Action,
  ActionTypes,
  IncidentAction,
  IRequestState,
  OrderAction,
} from './types';
import { SortOrder, DateRange } from 'models/globalTypes';

export const initialState: IRequestState = {
  sortOrder: SortOrder.Newest,
  dateRange: DateRange.lastMonth,
  pageNumber: 1,
  totalItems: 0,
  keywords: '',
  showCancelIncidentSuccess: false,
  showCancelOrderSuccess: false,
  showCancelOrderFailure: false,
  showReopenIncidentSuccess: false,
  isSideSheetOpen: false,
  orderData: null,
  orderAction: OrderAction.None,
  filterState: {
    loading: false,
    filters: [],
  },
  incidentData: null,
  incidentAction: IncidentAction.None,
  loading: false,
};

export const reducer = (
  state: IRequestState,
  action: Action,
): IRequestState => {
  switch (action.type) {
    case ActionTypes.INCIDENT_CANCEL_SUCCESS:
      return {
        ...state,
        showCancelIncidentSuccess: true,
      };
    case ActionTypes.INCIDENT_REOPEN_SUCCESS:
      return {
        ...state,
        showReopenIncidentSuccess: true,
      };
    case ActionTypes.INIT_FILTERS:
      return {
        ...state,
        filterState: {
          ...state.filterState,
          ...action.payload,
        },
      };
    case ActionTypes.UPDATE_CRITERIA:
      return {
        ...state,
        ...action.payload,
        pageNumber: 1,
      };
    case ActionTypes.CLEAR_FILTERS: {
      return {
        ...state,
        pageNumber: 1,
        filterState: {
          ...state.filterState,
          filters: state.filterState.filters.map(f => {
            if (f.children) {
              return {
                ...f,
                children: f.children.map(c => ({ ...c, isChecked: false })),
              };
            }
            return f;
          }),
        },
      };
    }
    case ActionTypes.UPDATE_FILTER: {
      if (action.payload.filterParent) {
        const parentIndex = state.filterState.filters.indexOf(
          action.payload.filterParent,
        );
        const children = state.filterState.filters[parentIndex].children;
        if (children) {
          const childIndex = children.indexOf(action.payload.filter);

          return {
            ...state,
            pageNumber: 1,
            filterState: {
              ...state.filterState,
              filters: [
                ...state.filterState.filters.slice(0, parentIndex),
                {
                  ...state.filterState.filters[parentIndex],
                  children: [
                    ...children.slice(0, childIndex),
                    {
                      ...children[childIndex],
                      isChecked: !children[childIndex].isChecked,
                    },
                    ...children.slice(childIndex + 1),
                  ],
                },
                ...state.filterState.filters.slice(parentIndex + 1),
              ],
            },
          };
        }
      }
      return state;
    }
    case ActionTypes.REQUEST_CANCEL_FAILURE:
      return {
        ...state,
        showCancelOrderFailure: true,
        showCancelOrderSuccess: false,
        isSideSheetOpen: false,
      };
    case ActionTypes.REQUEST_CANCEL_SUCCESS:
      return {
        ...state,
        showCancelOrderSuccess: true,
        showCancelOrderFailure: false,
        isSideSheetOpen: false,
      };
    case ActionTypes.SET_ORDER_DATA:
      switch (action.payload.orderAction) {
        case OrderAction.ViewDetails:
          return {
            ...state,
            ...action.payload,
            isSideSheetOpen: true,
          };
        case OrderAction.None:
        case OrderAction.Cancel:
          return {
            ...state,
            ...action.payload,
            isSideSheetOpen: false,
          };
        default:
          return {
            ...state,
            ...action.payload,
          };
      }
    case ActionTypes.TOAST_SHOWN:
      return {
        ...state,
        showCancelIncidentSuccess: false,
        showCancelOrderSuccess: false,
        showCancelOrderFailure: false,
        showReopenIncidentSuccess: false,
        orderData: null,
        orderAction: OrderAction.None,
        incidentData: null,
        incidentAction: IncidentAction.None,
      };
    case ActionTypes.SET_INCIDENT_DATA:
      switch (action.payload.incidentAction) {
        case IncidentAction.ViewDetails:
        case IncidentAction.Comment:
          return {
            ...state,
            ...action.payload,
            isSideSheetOpen: true,
          };
        case IncidentAction.None:
        case IncidentAction.Cancel:
          return {
            ...state,
            ...action.payload,
            isSideSheetOpen: false,
          };
        default:
          return {
            ...state,
            ...action.payload,
          };
      }
    case ActionTypes.CLOSE_SIDE_SHEET:
      return {
        ...state,
        isSideSheetOpen: false,
        orderData: null,
        orderAction: OrderAction.None,
        incidentData: null,
        incidentAction: IncidentAction.None,
      };
    case ActionTypes.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
        pageNumber: 1,
      };
    case ActionTypes.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload,
        pageNumber: 1,
      };
    case ActionTypes.SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload,
      };
    case ActionTypes.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
