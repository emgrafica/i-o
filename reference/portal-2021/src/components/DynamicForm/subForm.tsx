//@ts-nocheck
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { MasterFormAction } from 'utils/dynamicForm';
import { Box, Typography } from '@lumos/core';
import DynamicComponent from './DynamicComponent';
import Skeleton from 'react-loading-skeleton';
import { useFormControls } from './dynamicFormControl';
export interface DynamicSubFormComponent {
  stepData: any;
  service: any;
  customeHandler: any;
  activeStep: string;
  activated: Boolean;
}

/** Clamp the title for cards*/
const DynamicSubFormComponent = React.forwardRef(
  (
    {
      stepData,
      service,
      customeHandler,
      activeStep,
      masterFormAction,
      isLoading,
      activated,
      updateHeight,
    },
    ref,
  ) => {
    const [stepItems, setStepItems] = useState([]);
    const { checkValidItem } = useFormControls();
    useEffect(() => {
      setStepItems([]);
      if (activated) {
        checkCustomeHandle();
      }
    }, [activeStep, activated]);
    useEffect(() => {
      if (activated && !isLoading) {
        updateHeight();
      }
    }, [isLoading, activated]);

    useEffect(() => {
      if (stepItems.length > 0) {
        masterFormAction(MasterFormAction.CheckValidationForm);
      }
    }, [stepItems]);

    useImperativeHandle(ref, () => ({
      async validForm(isUpdateFormValue = true) {
        let valid = true;

        let tempStep = [];
        for await (let e of stepItems) {
          let errorMsg = await checkValidItem(
            e,
            service.getControlByKey(e.key).componentData.value
          );
          let item = { ...e };
          valid = errorMsg.length === 0 && valid;
          item.componentProps = e.componentProps
            ? (e.componentProps = {
                ...e.componentProps,
                error: !valid,
                errorMsg,
              })
            : {
                error: !valid,
                errorMsg,
              };
          tempStep.push(item);
        }
        if(isUpdateFormValue) setStepItems(tempStep);
        return valid;
      },
      refreshFormItems() {
        updateStepData();
      },
    }));

    const checkCustomeHandle = async () => {
      if (
        activated &&
        stepData.customHandler &&
        stepData.customHandler.length >= 0
      ) {
        masterFormAction(MasterFormAction.SetIsLoading, true);
        await customeHandler(stepData);
        masterFormAction(MasterFormAction.SetIsLoading, false);
      }
      updateStepData();
    };
    const updateFormItem = itemName => {};

    const updateStepData = () => {
      const newStep = service.getFormDataByStep(activeStep);
      if (newStep && newStep.items) {
        setStepItems(newStep.items);
      } else {
        setStepItems([]);
      }
    };

    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Typography
          kind="h2"
          fontWeight="bold"
          textAlign="center"
          color="grayScale.10"
          marginX="24px"
        >
          {stepData.title}
        </Typography>
        {/* {isLoading && (
          <Box width="100%">
            <Skeleton height="8px" />
            <Skeleton height="8px" />
            <Skeleton height="8px" />
          </Box>
        )} */}
        <DynamicComponent
          items={stepItems}
          service={service}
          masterFormAction={masterFormAction}
          customeHandler={customeHandler}
          updateFormItem={updateFormItem}
        />
      </div>
    );
  },
);

export default DynamicSubFormComponent;
