// @ts-nocheck
import { Box, Grid, Typography } from '@lumos/core';
import { Error } from '@material-ui/icons';
import DynamicFormComponent from 'components/DynamicForm';
import PageTitle from 'components/PageTitle';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeviceServices from 'services/devicesServices';
import DynamicFormService from 'services/dynamicFormService';
import {
  dynamicFormData,
  dynamicFormDefaultData,
} from 'services/mockdata/PcReportBrokenFormData';
import UserService from 'services/userServices';
import styled from 'styled-components';

const ErrorIcon = styled(Error)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
    width: 90px !important;
    font-size: 90px !important;
  `}
`;

const PcReportBroken: React.FC = () => {
  const { deviceID } = useParams<{ deviceID: string }>();
  const [formState, setFormState] = useState({ deviceID });
  const [dynamicFormService, setDynamicFormService] = useState(null);
  const [error, setError] = useState(false);
  let userData: any = UserService.getCurrentUser();

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
          user_id: userData.uid,
        });
        const result = res && res.length >= 0 ? res[0] : res;
        if (result && storeValueBykeys.length >= 0) {
          updateDataToStateByKey(result, storeValueBykeys);
        }
        return !!result && !!result.actions?.canReportBroken ? result : null;
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
        <PageTitle title={'Device Return Page'} />
        {dynamicFormService && (
          <DynamicFormComponent
            isReportBroken={true}
            service={dynamicFormService}
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
                    }
                  }
                }
              }
              return result;
            }}
          />
        )}
      </Grid>
    </Box>
  );
};

export default PcReportBroken;
