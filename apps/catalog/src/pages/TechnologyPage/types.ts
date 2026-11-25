import { Dispatch } from 'react';
import { ReasonForReturn } from 'gqlTypes/globalTypes';
import { TechnologyAssets_myTechnologyAssets_computers } from './queries/gqlTypes/TechnologyAssets';
export type TechnologyStateContext = TechnologyPageState;
export type TechnologyActionsContext = Dispatch<Action>;

export enum ActionTypes {
  SET_ASSET_DATA,
  SET_LOADING,
  UPDATE_PAGE_COUNT,
  UPDATE_CRITERIA,
  SET_SIDE_SHEET_ACTION_STATUS,
  ADD_REASSIGN_OVERLAY,
  SET_ASSET_LOADING_STATE,
}

type SetAssetDataAction = {
  type: ActionTypes.SET_ASSET_DATA;
  payload: {
    assetData: ComputerAsset | null;
    assetAction: AssetAction;
  };
};

type SetLoading = {
  type: ActionTypes.SET_LOADING;
  payload: boolean;
};

type SetAssetLoadingState = {
  type: ActionTypes.SET_ASSET_LOADING_STATE;
  payload: {
    assetDataId: string;
    loading: boolean;
  };
};

type UpdatePageCountAction = {
  type: ActionTypes.UPDATE_PAGE_COUNT;
  payload: Page;
};

type UpdateCriteriaAction = {
  type: ActionTypes.UPDATE_CRITERIA;
  payload: Criteria;
};

type SetSideSheetActionStatus = {
  type: ActionTypes.SET_SIDE_SHEET_ACTION_STATUS;
  payload: SideSheetActionStatus;
};

type AddReassignOverlay = {
  type: ActionTypes.ADD_REASSIGN_OVERLAY;
  payload: {
    assetDataId: string;
  };
};

type Page = {
  count: number;
  multiple: boolean;
};

type Criteria = {
  keywords?: string;
  pageNumber?: number;
};

export enum ClientRequestStatus {
  None,
  Loading,
  Succeeded,
  Failed,
}

type SideSheetActionStatus = {
  status: ClientRequestStatus;
  data?: any;
};

export type ComputerAsset = TechnologyAssets_myTechnologyAssets_computers;

export type ReturnCheckoutLocationState = {
  reason: {
    value: ReasonForReturn;
    details: string;
  };
  asset: ComputerAsset;
};

export enum AssetAction {
  None,
  EditUsage,
  Reassign,
  Return,
  Replace,
  ReportBroken,
  ReportOwnershipError,
  WipeComputer,
  ReportMissing,
  RegisterOwnership,
}

export type TechnologyPageState = {
  pageCount: number;
  hasMultiplePages: boolean;
  keywords: string;
  pageNumber: number;
  assetAction: AssetAction;
  assetData: ComputerAsset | null;
  sideSheetActionStatus: SideSheetActionStatus;
  reassignedAssetIds: string[];
  reassignFailureMessage?: string;
  loading: boolean;
  loadingAssetIds: Set<{}>;
};

export type Action =
  | SetAssetDataAction
  | SetLoading
  | SetAssetLoadingState
  | UpdatePageCountAction
  | UpdateCriteriaAction
  | AddReassignOverlay
  | SetSideSheetActionStatus;
