// @ts-nocheck
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import { Pagination, useToasts, Typography, Box, Grid } from '@lumos/core';
import {
  Action,
  ActionTypes,
  AssetAction,
  ClientRequestStatus,
  TechnologyActionsContext,
  TechnologyPageState,
  TechnologyStateContext,
} from './types';
import { useHistory, useLocation } from 'react-router-dom';
import { IoDevices } from '@i-o/design-system';
import { AUTH } from 'constants/authConstants';
import MyDeviceDetail from 'components/MyDeviceDetail';
import DevicesServices from 'services/devicesServices';
import { HomePath, PcReturnPath } from 'utils/routes';
import AcknowledgeDialog from 'components/AcknowledgeDialog';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import { WorkFlowType } from 'utils/dynamicForm';
import DeviceServices from 'services/devicesServices';
import TopSection from 'pages/GetSupportPage/TopSection';
import { GridLayout, Row } from 'components/GridLayout';
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

const TechnologyPage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation('technology');
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    pageCount,
    hasMultiplePages,
    pageNumber,
    sideSheetActionStatus,
  } = state;

  const updatePage = (page: number) => {
    dispatch({
      type: ActionTypes.UPDATE_CRITERIA,
      payload: {
        pageNumber: Math.min(page, pageCount),
      },
    });
  };

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

  //
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : null;
  const [listDevices, setListDevices] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState(null);
  const location = useLocation();
  const [openAcknowledgeDialog, setOpenAcknowledgeDialog] = useState(false);

  useEffect(() => {
    const getListDevices = async () => {
      let result = await DeviceServices.getPCResfreshStatus(currentUser.user_name);
      if (!result) return;
      const deviceListFilter = result.filter((item: any) => item.actions.canVisible);
      setListDevices(deviceListFilter);
    };
    getListDevices();
    // link device card to device detail
    if (location.state && location.state.isOpen && location.state.itemDetail) {
      setIsOpen(location.state.isOpen);
      setItemDetail(location.state.itemDetail);
      history.replace({});
    }
  }, [currentUser.user_name, currentUser.time_zone, location.state]);

  const onClickViewDetail = itemDetail => {
    setIsOpen(true);
    setItemDetail(itemDetail);
  };

  const handleAcknowledge = async itemDetail => {
    const params = {
      request_type: WorkFlowType.PC_ACKNOWLEDGE_DEVICE,
      user_sys_id: currentUser.uid,
      device_sys_id: itemDetail.uid,
      user_email: currentUser.email,
    };
    const canRegisterOwnership = itemDetail?.actions.canRegisterOwnership;
    if (params && canRegisterOwnership) {
      const response = await pcProcessingWorkFlow.PcProcessing(params);
      if (!!response.data) {
        setOpenAcknowledgeDialog(true);
      }
    } else {
      setOpenAcknowledgeDialog(false);
    }
    setOpenAcknowledgeDialog(true);
  };

  const HandleFinish = () => {
    history.push({ pathname: HomePath });
    setOpenAcknowledgeDialog(false);
  };

  const handleReturnActions = async params => {
    const { setSerialNumberValid, setIsSubmitted, serialNumber } = params;

    if (!serialNumber) {
      setSerialNumberValid(false);
    }

    const paramSerialNumber = {
      serial_number: params.serialNumber,
    };
    setIsSubmitted(true);
    const result = await DeviceServices.getDeviceBySerialNumber(
      paramSerialNumber,
    );
    setIsSubmitted(false);

    if (result && result.uid) {
      history.push(`${PcReturnPath}/${result.uid}`);
      setSerialNumberValid(true);
    } else {
      setSerialNumberValid(false);
    }
  };

  return (
    <>
    <Box
        backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
        backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
        minHeight={120}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundColor="#FFFFFF"
        justifyContent="center"
      >
        <Grid justifyContent="center" height="100%">
          <Grid flexDirection="column" width="100%"
            maxWidth={{
              xs: '340px',
              sm: '670px',
              lg: '1095px',
              xl: '1400px',
              xxl: '1400px',
            }}>
            <GridLayout columnGutters={0}>
              <Row marginBottom={6} justifyContent="center">
                <Box width={{ xs: 1, md: 0.8, lg: 1 / 2 }}>
                  <Box paddingTop="20px" display="flex" justifyContent="center">
                    <GetSupportSearchInput firstName={currentUser.first_name} />
                  </Box>
                </Box>
              </Row>
            </GridLayout>
          </Grid>
        </Grid>
      </Box>
      
        <TopSection>
          <Typography
            id="pageTitle"
            kind="h1"
            fontWeight="bold"
            fontSize={{ xxs: 3, md: 7 }}
            marginTop={{ xxs: '12px', md: '20px' }}
            marginBottom={2}
            color="grayScale.10"
          >
            My Technology
          </Typography>
        </TopSection>
      <ActionsContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <MyDeviceDetail
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            itemDetail={itemDetail}
            handleReloadDevice={() => { }}
          />
          <div
            className='wrapper-container'
          >
            <Box
              borderBottom=" 1px solid #cacaca;"
              marginBottom={2}
            />
          </div>
          <IoDevices
            history={history}
            devicesData={listDevices}
            handleMoreActions={onClickViewDetail}
            handleAcknowledge={handleAcknowledge}
            handleReportIssue={() => {}}
            handleReturnActions={handleReturnActions}
          />
        </StateContext.Provider>
      </ActionsContext.Provider>
      <AcknowledgeDialog
        open={openAcknowledgeDialog}
        handleClose={() => setOpenAcknowledgeDialog(false)}
        handleFinish={() => HandleFinish()}
      />
    </>
  );
};

export default TechnologyPage;
