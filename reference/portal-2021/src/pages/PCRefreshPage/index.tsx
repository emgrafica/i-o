// @ts-nocheck
import React, { useState, useEffect } from 'react';
import PageTitle from 'components/PageTitle';
import { Grid, Typography, Box } from '@lumos/core';
import {
  dynamicFormData,
  pcRefreshMainKey,
  dynamicFormDefaultData,
} from 'services/mockdata/pcRefreshMockFormData';
import DynamicFormComponent from 'components/DynamicForm';
import DynamicFormService from 'services/dynamicFormService';
import styled from 'styled-components';
import { Error } from '@material-ui/icons';
import NotificationForm from 'components/NotificationForm';
import DeviceServices from 'services/devicesServices';
import { useParams, useHistory } from 'react-router-dom';
import PackageBox from 'assets/images/branding/package_box.png';
import MaintenanceImg from 'assets/images/branding/maintenance.png';
import { HomePath } from 'utils/routes';
import { WorkFlowType } from 'utils/dynamicForm';
import { generateAddressStr } from 'utils/function';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import UserService from 'services/userServices';

const ErrorIcon = styled(Error)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
    width: 90px !important;
    font-size: 90px !important;
  `}
`;

const PCRefreshPage: React.FC = () => {
  const { deviceID } = useParams<{ deviceID: string }>();
  const [success, setSuccess] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({ deviceID });
  const [dynamicFormService, setDynamicFormService] = useState(null);
  const history = useHistory();
  let userData: any = UserService.getCurrentUser();
  const action = 'Device Refresh';
  useEffect(() => {
    setDynamicFormService(
      new DynamicFormService(
        dynamicFormData,
        dynamicFormDefaultData,
        'step_1.1',
      ),
    );
  }, []);
  useEffect(() => {
    if (dynamicFormService) {
      dynamicFormService.updateItemValueByKey(
        pcRefreshMainKey.RETURN_CONTACT,
        {
          firstName: userData.first_name,
          lastName: userData.last_name,
          phoneType: 'Home',
        },
        'value',
      );
    }
  }, [dynamicFormService]);
  const getServiceData = async (
    serviceKey,
    storeValueBykeys = [],
    paramsBykeys = [],
  ) => {
    let params = {};
    if (paramsBykeys.length >= 0) {
      params = getDataFromStateByKey(paramsBykeys);
    }
    switch (serviceKey) {
      case 'GET_DEVICE_BY_ID':
        const res = await DeviceServices.getAssetStatusById({
          ...params,
          // user_id: userData.uid,
        });
        const result = res && res.length >= 0 ? res[0] : res;
        if (result && storeValueBykeys.length >= 0) {
          updateDataToStateByKey(result, storeValueBykeys);
        }
        return !!result && !!result.actions?.canRefresh ? result : null;
      case 'GET_ELIGIBLE_REFRESH_ASSETS':
        const collectionAddress = dynamicFormService.getControlByKey(
          pcRefreshMainKey.RETURN_ADDRESS,
        ).componentData.value;
        let resEligible = await DeviceServices.getEligibleRefreshAssets({
            ...params,
            user: userData.uid,
            country: collectionAddress ? collectionAddress.country : '',
            requestType: WorkFlowType.PC_REFRESH,
          }),
          resultEligible = [];
        if (resEligible) {
          resultEligible = resEligible.map((e: any) => {
            return {
              ...e,
              model_number: e.number,
              model_picture: e.picture,
              model_type: e.type,
              model: e.name,
              model_description: e.description,
            };
          });
        }
        return resultEligible;
      // return await DeviceServices.getEligibleRefreshAssets(params);
      default:
        break;
    }
  };
  const getDataFromStateByKey = keys => {
    let result = {};
    for (const element of keys) {
      if (formState[element.fromKey]) {
        result[element.toKey] = formState[element.fromKey];
      }
    }
    return result;
  };
  const updateDataToStateByKey = (obj, keys) => {
    let result = {};
    for (const element of keys) {
      if (obj[element.fromKey]) {
        result[element.toKey] = obj[element.fromKey];
      }
    }
    setFormState({
      ...formState,
      ...result,
    });
  };
  return (
    <Box
      height="100%"
      padding={{
        xxs: '42px 17px 20px 17px',
        xs: '42px 17px 20px 17px',
        sm: '38px 24px 20px 24px',
        md: '38px 24px 20px 24px',
        lg: '40px 152px 20px 152px',
        xl: '40px 152px 20px 152px',
        xxl: '40px 152px 20px 152px',
      }}
    >
      <Grid height="100%" flexDirection="column" backgroundColor="secondary.4">
        <PageTitle title={'Device Refresh Page'} />
        {!isStarted && (
          <NotificationForm
            title={`${action}`}
            description={`Hi <b>${userData.first_name}</b>, your device is eligible for a refresh.<br/>Click <b>Start</b> below to provide your shipping address and select your new device.`}
            image={MaintenanceImg}
            btnLbl="Start"
            btnAction={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && !success && !error && dynamicFormService && (
          <DynamicFormComponent
            service={dynamicFormService}
            customeHandler={async stepData => {
              let result = null;
              if (
                stepData.customHandler &&
                stepData.customHandler.length >= 0
              ) {
                for (const element of stepData.customHandler) {
                  if (element.type == 'CALL_SERVICE') {
                    result = await getServiceData(
                      element.serviceKey,
                      element.storeValueBykeys,
                      element.paramsBykeys,
                    );
                    if (result) {
                      dynamicFormService.updateItemValueByKey(
                        element.impactTo,
                        result,
                        'data',
                      );
                    } else {
                      setError(true);
                    }
                  }
                }
              }
              return result;
            }}
            onSubmit={async () => {
              const deviceSelected = dynamicFormService.getControlByKey(
                pcRefreshMainKey.SELECTED_DEVICE,
              ).componentData.value;
              const userAddress = dynamicFormService.getControlByKey(
                pcRefreshMainKey.RETURN_ADDRESS,
              ).componentData.value;
              const userContact = dynamicFormService.getControlByKey(
                pcRefreshMainKey.RETURN_CONTACT,
              ).componentData.value;
              const addresValue = generateAddressStr(userAddress, userContact);
              const params = {
                request_type: WorkFlowType.PC_REFRESH,
                user_sys_id: userData.uid,
                device_sys_id: deviceID,
                user_email: userData.email,
                user_address: addresValue,
                new_model_sys_id: deviceSelected.uid,
                stockroom_sys_id: deviceSelected.stockroom_uid,
                stockroom_assignment_group_sys_id:
                  deviceSelected.assignment_group_uid,
              };
              const res = await pcProcessingWorkFlow.PcProcessing(params);
              return !!res;
            }}
            onSuccess={() => {
              setSuccess(true);
            }}
          />
        )}
        {success && (
          <NotificationForm
            title="Great work! You submitted your request."
            description={`We are processing your request. You will receive a follow-up email with more information.`}
            image={PackageBox}
            btnLbl="i-o Home"
            btnAction={() => {
              history.push(HomePath);
            }}
          />
        )}
        {error && (
          <Box>
            <ErrorIcon />
            <Typography kind="body1" width="100%">
              Something went wrong!!!
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default PCRefreshPage;
