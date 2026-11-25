// @ts-nocheck
import { Box, Grid, Typography } from '@lumos/core';
import { Error } from '@material-ui/icons';
import { IoConfirmDevice, IoLoadingWithBackdrop } from '@i-o/design-system';
import MaintenanceImg from 'assets/images/branding/maintenance.png';
import PackageBox from 'assets/images/branding/package_box.png';
import DynamicFormComponent from 'components/DynamicForm';
import NotificationForm from 'components/NotificationForm';
import PageTitle from 'components/PageTitle';
import { PC_PROCESSING } from 'constants/index';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DeviceServices from 'services/devicesServices';
// import {getKBNumberStolen} from 'services/knowledgeServices';
import DynamicFormService from 'services/dynamicFormService';
import {
  dynamicFormDefaultData,
  lostAndStolenStep1,
  lostAndStolenStep2,
} from 'services/mockdata/PcLostAndStolenFormData';
import pcProcessingWorkFlow from 'services/pcProcessingWorkFlow';
import UserService from 'services/userServices';
import styled from 'styled-components';
import {
  NotificationManager,
} from 'react-notifications';
import { generateAddressStr } from 'utils/function';
import { HomePath } from 'utils/routes';
import TicketServices from 'services/ticketServices';

const ErrorIcon = styled(Error)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
    width: 90px !important;
    font-size: 90px !important;
  `}
`;
const CustomBoxParentForm = styled(Box)`

}`;

const PcLostAndStolenPage: React.FC = () => {
  const { deviceID } = useParams<{ deviceID: string }>();
  const [successStep1, setSuccessStep1] = useState(false);
  const [successStep2, setSuccessStep2] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({ deviceID });
  const [dynamicFormService, setDynamicFormService] = useState(null);
  const [dataFirstFlow, setDataFirstFlow] = useState(null);
  const [isFinishFirstFlow, setIsFinishFirstFlow] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Submitting your request');
  const [loadingPercentage, setLoadingPercentage] = useState('0');

  const action = 'Report Missing Device';
  const history = useHistory();
  let userData: any = UserService.getCurrentUser();

  useEffect(() => {
    setDynamicFormService(
      new DynamicFormService(
        lostAndStolenStep1,
        dynamicFormDefaultData,
        'step_1.1',
      ),
    );
  }, []);

  useEffect(() => {
    if (dynamicFormService && userData && !isFinishFirstFlow) {
      dynamicFormService.updateItemValueByKey('RequestedFor', userData.name);
      dynamicFormService.updateItemValueByKey('Email', userData.email);
    }
    if (isFinishFirstFlow) {
      dynamicFormService.updateItemValueByKey(
        'ReturnAddress1',
        dataFirstFlow.lostAddress,
        'value',
      );

      dynamicFormService.updateItemValueByKey(
        'detail',
        {
          issue: dataFirstFlow.selectedIssue,
        },
        'data',
      );

      dynamicFormService.updateItemValueByKey(
        'attachmentFilesRef',
        !!dataFirstFlow.attactments ? dataFirstFlow.attactments : [],
        'value',
      );

      dynamicFormService.updateItemValueByKey(
        'RadioSelected',
        dataFirstFlow.selectedIssue,
        'value',
      );
      const contact = dynamicFormService.getControlByKey('ShippingContact').componentData?.value;
      if(!contact){
        dynamicFormService.updateItemValueByKey(
          'ShippingContact',
          {
            firstName: userData.first_name,
            lastName: userData.last_name,
            phoneType: 'Home',
          },
          'value',
        );
      }
      
    }
  }, [dynamicFormService, userData]);

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
          user_id: userData.uid,
        });
        const result = res && res.length >= 0 ? res[0] : res;
        if (result && storeValueBykeys.length >= 0) {
          updateDataToStateByKey(result, storeValueBykeys);
        }
        return result;
      case 'GET_ELIGIBLE_REFRESH_ASSETS':
        const addressObj = dynamicFormService.getControlByKey('ShippingAddress')
          .componentData.value;
        let resEligible = await DeviceServices.getEligibleRefreshAssets({
            ...params,
            user: userData.uid,
            country: addressObj ? addressObj.country : '',
            requestType: PC_PROCESSING.PC_LOST_STOLEN,
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

  const [isLoading, setIsLoading] = useState(false);
  const onClickNo = async () => {
    setIsLoading(true);
    const res = await prepareDataForSubmit(false);
    setIsLoading(false);
    if (res) {
      const res_kb = await UserService.getConfig('KB_PC_STOLEN');
      if (res_kb) {
        history.push({
          pathname: `/knowledges/detail/${res_kb.data.value}`,
        });
      } else {
        history.push({
          pathname: HomePath,
        });
      }
    } else {
      NotificationManager.error('Something went wrong.', '', 5000);
    }
  };

  const onClickYes = async () => {
    setIsFinishFirstFlow(true);
    setDynamicFormService(
      new DynamicFormService(
        lostAndStolenStep2,
        dynamicFormDefaultData,
        'step_1.1',
      ),
    );
  };

  const submitAttachments = async (files, res) => {
    const filesError = [];
    await Promise.all(files.map(async (element) => {
      try {
        const result = await TicketServices.postAttachmentsRequest(
          {
            id: res.Ritm_SysId,
            name: element.name,
            type: element.type,
          },
          element,
        );
        if (result.status !== 200) {
          filesError.push(element.name);
        }
      } catch (error) {
        filesError.push(element.name);
        return;
      }
    }));
    return filesError;
  };

  const prepareDataForSubmit = async (replacementRequired: boolean) => {
    let params = {
      request_type: PC_PROCESSING.PC_LOST_STOLEN,
      user_sys_id: userData.uid,
      device_sys_id: dataFirstFlow.device.uid,
      user_email: userData.email,
      replacement_required: replacementRequired ? 'yes' : 'no',
      lost_stolen: dataFirstFlow.selectedIssue,
      attachment: 'test',
      user_address: ' ',
      new_model_sys_id: '',
      stockroom_sys_id: '',
      stockroom_assignment_group_sys_id: '',
    };
    if(params.lost_stolen !== 'stolen' || !dataFirstFlow?.attactments || dataFirstFlow?.attactments?.length==0){
      setLoadingPercentage('');
    }
    if (replacementRequired) {
      const userAddress = dynamicFormService.getControlByKey('ShippingAddress')
        .componentData.value;

      const userContact = dynamicFormService.getControlByKey('ShippingContact')
        .componentData.value;

      const newDevice = dynamicFormService.getControlByKey(
        'SelectPCRefreshDevice',
      ).componentData.value;
      params = {
        ...params,
        user_address: generateAddressStr(userAddress, userContact),
        new_model_sys_id: newDevice.uid,
        stockroom_sys_id: newDevice.stockroom_uid,
        stockroom_assignment_group_sys_id: newDevice.assignment_group_uid,
      };
    }


    const res = await pcProcessingWorkFlow.PcProcessing(params);
    if (res && params.lost_stolen === 'stolen' && !!dataFirstFlow?.attactments?.length>0) {
      setLoadingPercentage('50');
      setLoadingMessage('Submitting your attachment(s)');
      const submitAttRes = await submitAttachments(dataFirstFlow.attactments, res);
      if (submitAttRes.length > 0)
        NotificationManager.error(
          'Please recheck your attachment(s) in the ticket ' + res.Ritm_number,
          'Submit your attachment(s) failed.',
          10000
        );
      setLoadingPercentage('100');
    }
    return !!res;
  };

  return (
    <CustomBoxParentForm
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
      <IoLoadingWithBackdrop isOpen={isLoading} percentage={loadingPercentage} loadingText={loadingMessage} />

      <Grid height="100%" flexDirection="column" backgroundColor="secondary.4">
        <PageTitle title={'PC Return Page'} />
        {!isStarted && (
          <NotificationForm
            title={`${action}`}
            description={`Hi <b> ${userData.first_name}</b>, we're sorry to hear your device is missing.<br/>Click <b>Start</b> to complete your report and explore options.`}
            image={MaintenanceImg}
            btnLbl="Start"
            btnAction={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && !successStep1 && !error && dynamicFormService && (
          <DynamicFormComponent
            key={1}
            service={dynamicFormService}
            submitText="NEXT"
            customeHandler={async stepData => {
              let result = null;
              if (
                stepData.customHandler &&
                stepData.customHandler.length >= 0
              ) {
                for (const element of stepData.customHandler) {
                  if (element.type === 'CALL_SERVICE') {
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
            onSuccess={() => {
              setSuccessStep1(true);
              const device = dynamicFormService.getControlByKey('MissingDevice')
                .componentData.data;
              const selectedIssue = dynamicFormService.getControlByKey(
                'RadioGroupChooseIssue',
              ).componentData.value;
              const lostAddress = '';
              const deviceMissingTime = '';
              const additionalDetails = '';
              const attactments = dynamicFormService.getControlByKey(
                'PoliceReport',
              ).componentData.value;

              setDataFirstFlow({
                device,
                lostAddress,
                deviceMissingTime,
                additionalDetails,
                selectedIssue,
                attactments,
              });
            }}
          />
        )}

        {isFinishFirstFlow && !successStep2 && !error && dynamicFormService && (
          <DynamicFormComponent
            key={2}
            service={dynamicFormService}
            loadingPercentage={loadingPercentage}
            loadingMessage={loadingMessage}
            customeHandler={async stepData => {
              let result = null;
              if (
                stepData.customHandler &&
                stepData.customHandler.length >= 0
              ) {
                for (const element of stepData.customHandler) {
                  if (element.type === 'CALL_SERVICE') {
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
            onSubmit={async () => prepareDataForSubmit(true)}
            onSuccess={() => {
              setSuccessStep2(true);
            }}
          />
        )}

        {successStep1 && !isFinishFirstFlow && (
          <IoConfirmDevice
            onClickNo={onClickNo}
            onClickYes={onClickYes}
            isLoading={isLoading}
          />
        )}

        {successStep2 && (
          <NotificationForm
            title="Great work! You submitted your request."
            description={`We are processing your request. You will receive a follow-up email with more information.`}
            image={PackageBox}
            btnLbl="i-o Home"
            btnAction={async () => {
              const res_kb = await UserService.getConfig('KB_PC_STOLEN');
              if (res_kb) {
                history.push({
                  pathname: `/knowledges/detail/${res_kb.data.value}`,
                });
              } else {
                history.push({
                  pathname: HomePath,
                });
              }
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
    </CustomBoxParentForm>
  );
};

export default PcLostAndStolenPage;
