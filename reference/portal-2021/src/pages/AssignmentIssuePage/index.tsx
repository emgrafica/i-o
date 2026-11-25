// @ts-nocheck
import React, { useState, useEffect } from 'react';
import PageTitle from 'components/PageTitle';
import { Grid, Typography, Box } from '@lumos/core';
import {
  dynamicFormData,
  dynamicFormDefaultData,
  pcAssignErrorMainKey,
} from 'services/mockdata/assignmentIssueFormData';
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
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import UserService from 'services/userServices';

const ErrorIcon = styled(Error)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
    width: 90px !important;
    font-size: 90px !important;
  `}
`;

const AssignmentIssuePage: React.FC = () => {
  const { deviceID } = useParams<{ deviceID: string }>();
  const [success, setSuccess] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({ deviceID });
  const [dynamicFormService, setDynamicFormService] = useState(null);
  const history = useHistory();
  let userData: any = UserService.getCurrentUser();
  const action = "I Don't Have This Device";
  useEffect(() => {
    setDynamicFormService(
      new DynamicFormService(
        dynamicFormData,
        dynamicFormDefaultData,
        'step_1.1',
      ),
    );
  }, []);
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

        return !!result && !!result.actions?.canReportOwnershipError
          ? result
          : null;
      case 'GET_ELIGIBLE_REFRESH_ASSETS':
        return await DeviceServices.getEligibleRefreshAssets(params);
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
        <PageTitle title={'Report Incorrect Details'} />
        {!isStarted && (
          <NotificationForm
            title={`${action}`}
            description={`Hi <b>${userData.first_name}</b>, we need your help to determine the status of this device.`}
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
              const optionSelected = dynamicFormService.getControlByKey(
                pcAssignErrorMainKey.CHOOSE_ISSUE,
              ).componentData.value;
              const commentData = dynamicFormService.getControlByKey(
                pcAssignErrorMainKey.TRACKING_DETAIL,
              ).componentData.value;
              const params = {
                request_type: WorkFlowType.PC_ASSIGNMENT_ERROR,
                user_sys_id: userData.uid,
                device_sys_id: deviceID,
                user_email: userData.email,
                reason_selected: optionSelected,
                comments: commentData,
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
            title="Thank you! You submitted information about this device."
            description={`Thank you for your response, which helps us in tracking the status of the device. You will receive a follow-up email closing this case.`}
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

export default AssignmentIssuePage;
