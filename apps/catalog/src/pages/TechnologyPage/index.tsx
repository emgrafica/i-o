import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination, SideSheet, useToasts } from '@lumos/core';
import PageTemplate from 'components/PageTemplate';
import ListPageLayout from 'components/ListPageTemplate/ListPageLayout';
import Refine from 'components/Refine';
import {
  Action,
  ActionTypes,
  AssetAction,
  ClientRequestStatus,
  TechnologyActionsContext,
  TechnologyPageState,
  TechnologyStateContext,
} from './types';
import AssetCardListQueryWrapper from './AssetCardListQueryWrapper';
import ReturnFlow from './sideSheets/ReturnFlow';
import ReportBrokenFlow from './sideSheets/ReportBrokenFlow';
import ReplaceFlow from './sideSheets/ReplaceFlow';
import ReassignFlow from './sideSheets/ReassignFlow';
import WipeComputerFlow from './sideSheets/WipeComputerFlow';
import EditUsageFlow from './sideSheets/EditUsageFlow';
import RegisterOwnershipFlow from './sideSheets/RegisterOwnershipFlow';
import ReportOwnershipErrorFlow from './sideSheets/ReportOwnershipErrorFlow';
import ReportMissingFlow from './sideSheets/ReportMissingFlow';

const StateContext = createContext<TechnologyStateContext | null>(null);
const ActionsContext = createContext<TechnologyActionsContext | null>(null);

export const useTechnologyStateContext = (): TechnologyStateContext => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('Must be used within the "TechnologyPage"');
  }
  return context;
};

export const useTechnologyActionsContext = (): TechnologyActionsContext => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error('Must be used within the "TechnologyPage"');
  }
  return context;
};

const initialState: TechnologyPageState = {
  pageCount: 0,
  hasMultiplePages: false,
  keywords: '',
  pageNumber: 1,
  assetData: null,
  assetAction: AssetAction.None,
  sideSheetActionStatus: {
    status: ClientRequestStatus.None,
  },
  reassignedAssetIds: [],
  reassignFailureMessage: '',
  loading: false,
  loadingAssetIds: new Set(),
};

const reducer = (
  state: TechnologyPageState,
  action: Action,
): TechnologyPageState => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.SET_ASSET_LOADING_STATE:
      const loadingAssetIds = new Set(state.loadingAssetIds);
      if (action.payload.loading) {
        loadingAssetIds.add(action.payload.assetDataId);
      } else loadingAssetIds.delete(action.payload.assetDataId);
      return {
        ...state,
        loadingAssetIds,
      };
    case ActionTypes.SET_ASSET_DATA:
      switch (action.payload.assetData) {
        case null:
          return {
            ...state,
            assetData: action.payload.assetData,
            assetAction: action.payload.assetAction,
            sideSheetActionStatus: {
              status: ClientRequestStatus.None,
            },
          };
        default:
          return {
            ...state,
            assetData: action.payload.assetData,
            assetAction: action.payload.assetAction,
          };
      }

    case ActionTypes.UPDATE_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.payload.count,
        hasMultiplePages: action.payload.multiple,
      };
    case ActionTypes.UPDATE_CRITERIA:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.ADD_REASSIGN_OVERLAY:
      return {
        ...state,
        reassignedAssetIds: [
          ...state.reassignedAssetIds,
          action.payload.assetDataId,
        ],
      };
    case ActionTypes.SET_SIDE_SHEET_ACTION_STATUS:
      switch (action.payload.status) {
        case ClientRequestStatus.Succeeded:
          return {
            ...state,
            sideSheetActionStatus: action.payload,
            assetData: null,
            assetAction: AssetAction.None,
          };
        default:
          return {
            ...state,
            sideSheetActionStatus: action.payload,
            reassignFailureMessage:
              action.payload &&
              action.payload.data &&
              action.payload.data.reassignFailureMessage,
          };
      }
    default:
      return state;
  }
};

const renderSideSheetContent = (assetAction: AssetAction) => {
  switch (assetAction) {
    case AssetAction.EditUsage:
      return <EditUsageFlow />;
    case AssetAction.Return:
      return <ReturnFlow />;
    case AssetAction.RegisterOwnership:
      return <RegisterOwnershipFlow />;
    case AssetAction.ReportBroken:
      return <ReportBrokenFlow />;
    case AssetAction.ReportOwnershipError:
      return <ReportOwnershipErrorFlow />;
    case AssetAction.Replace:
      return <ReplaceFlow />;
    case AssetAction.Reassign:
      return <ReassignFlow />;
    case AssetAction.WipeComputer:
      return <WipeComputerFlow />;
    case AssetAction.ReportMissing:
      return <ReportMissingFlow />;
    default:
      return null;
  }
};

const TechnologyPage: React.FC = () => {
  const { t } = useTranslation('technology');
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    pageCount,
    hasMultiplePages,
    keywords,
    pageNumber,
    assetAction,
    assetData,
    sideSheetActionStatus,
    loading,
  } = state;

  const handleSideSheetClose = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  const refine = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.UPDATE_CRITERIA,
      payload: {
        keywords: e.target.value,
        pageNumber: 1,
      },
    });
  };

  const updatePage = (page: number) => {
    dispatch({
      type: ActionTypes.UPDATE_CRITERIA,
      payload: {
        pageNumber: Math.min(page, pageCount),
      },
    });
  };

  const refineBar = (
    <Refine
      label={t('common:refine')}
      inputValue={keywords}
      onChange={refine}
    />
  );

  // show toast when the status changes to Succeeded
  const { addToast } = useToasts();
  useEffect(() => {
    if (sideSheetActionStatus.status === ClientRequestStatus.Succeeded) {
      addToast(t('submission.succeeded'), {
        // Lumos typing issue, will be removed when fixed there
        // @ts-ignore
        kind: 'success',
        autoDismiss: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideSheetActionStatus.status]);

  // Todo - Remove key
  //  Lumos Bug - Pagination component
  //  1. pageCount doesn't force Pagination update.
  //  This should be fixed in Lumos.
  //  Temp workaround is to add key for a forced render.
  const pagination = hasMultiplePages ? (
    <Pagination
      key={pageCount}
      pageCount={pageCount}
      currentPageNumber={pageNumber}
      onChange={updatePage}
    />
  ) : (
    undefined
  );

  return (
    <ActionsContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
          <ListPageLayout
            refine={refineBar}
            pagination={pagination}
            loading={loading}
          >
            <AssetCardListQueryWrapper
              keywords={keywords}
              pageNumber={pageNumber}
            />
          </ListPageLayout>

          <SideSheet
            isOpen={Boolean(assetData)}
            onRequestClose={handleSideSheetClose}
          >
            {renderSideSheetContent(assetAction)}
          </SideSheet>
        </PageTemplate>
      </StateContext.Provider>
    </ActionsContext.Provider>
  );
};

export default TechnologyPage;
