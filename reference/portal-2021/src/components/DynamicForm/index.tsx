// @ts-nocheck
import React, { useEffect } from 'react';
import { Box } from '@lumos/core';
import {
  StepLabel,
  Stepper,
  Step,
  Fab,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
} from '@material-ui/core';
import DynamicSubFormComponent from './subForm';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Cancel,
  CheckCircle,
  ChatBubble,
} from '@material-ui/icons';
import styled from 'styled-components';
import { MasterFormAction } from 'utils/dynamicForm';
import SwipeableViews from 'react-swipeable-views';
import { ButtonComponent, IoLoadingWithBackdrop } from '@i-o/design-system';
import {
  NotificationManager,
} from 'react-notifications';
import { useHistory } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import PubSub from 'pubsub-js';
import { CHAT_WIDGE } from 'constants/chatWidgeConstants';
import { HlxButton } from '@i-o/design-system';

const CustomBoxParentForm = styled(Box)`
  box-shadow: 0 1px 2px 2px rgb(0 0 0 / 10%), 0 2px 3px 0 rgb(0 0 0 / 20%);
  border-radius: 12px;
}`;

const CustomBoxDynamicForm = styled(Box)`
  position: relative;
}`;

const CloseButton = styled.div`
  button{
    position: absolute;
    z-index: 1;
    top: -20px;
    right: -20px;
    border-radius: 50px;
    background: white;
    &:hover{
      background: white;
      transition: transform 0.4s;
      transform: scale(1.3);
    }
  }
}`;

const CustomBoxForStepper = styled(Box)`
  margin: 0 5px 5px 5px;
}`;

const WrapperButtonBox = styled.div`
  margin: 0 8px;
}`;

export interface DynamicFormComponent {
  onSuccess: any;
  service: any;
  customeHandler: any;
}

const DynamicFormComponent: React.FC<DynamicFormComponent> = ({
  service,
  onSuccess,
  onSubmit,
  customeHandler,
  isReportBroken,
  submitText,
  loadingMessage='Submitting your request',
  loadingPercentage=''
}) => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const [swipeableActions, setSwipeableActions] = React.useState(null);
  const [disabledSubmitButton, setDisabledSubmitButton] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const history = useHistory();
  useEffect(() => {
    setSteps(service.getSteps());
  }, []);
  const child = React.createRef();
  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await child.current.validForm();

    setIsLoading(false);
    if (isValid) {
      if (activeStep === steps.length - 1) {
        if (onSubmit) {
          setIsLoading(true);
          setIsSubmitting(true);
          const res = await onSubmit();
          if (res) onSuccess();
          else {
            NotificationManager.error('Something went wrong.', '', 5000);
            setDisabledSubmitButton(true);
          }

          setIsLoading(false);
          setIsSubmitting(false);
        } else {
          onSuccess();
        }
      } else {
        setActiveStep(prevActiveStep => {
          return prevActiveStep + 1;
        });
      }
    }
  };

  const masterFormAction = async (action, configData, value) => {
    switch (action) {
      case MasterFormAction.SetIsLoading:
        setIsLoading(configData);
        break;
      case MasterFormAction.JumpToStep:
        const index = steps.findIndex(e => e.stepKey === configData.value);
        setActiveStep(index);
        break;
      case MasterFormAction.RefreshStepper:
        service.updateChildStep();
        setSteps(service.getSteps());
        break;
      case MasterFormAction.UpdateHeight:
        updateHeight();
        break;
      case MasterFormAction.RefreshFormItems:
        child.current.refreshFormItems();
        updateHeight();
        break;
      case MasterFormAction.CheckValidationForm:
        if(child.current?.validForm){
          setIsFormValid(await child.current.validForm(false));
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const createStep = () => {
    return steps.map((e: any) => e.title);
  };
  const updateHeight = () => {
    if (swipeableActions) {
      setTimeout(() => {
        swipeableActions.updateHeight();
      }, 100);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickChat = () => {
    PubSub.publish(CHAT_WIDGE.OPEN_CHAT, CHAT_WIDGE.CONNECTED);
  };

  return (
    <CustomBoxParentForm
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background:"#fff"
      }}
    >
      <IoLoadingWithBackdrop isOpen={isSubmitting} percentage={loadingPercentage} loadingText={loadingMessage} />
      <Dialog onClose={handleClose} fullWidth={true} open={open}>
        <DialogTitle id="simple-dialog-title">
          Do you want to exit this workflow?
        </DialogTitle>
        <DialogActions>
          <HlxButton
            onClick={handleClose}
            label="CANCEL"
          ></HlxButton>
          <HlxButton
            onClick={() => history.goBack()}
            loading={isLoading}
            label="OK"
          ></HlxButton>
        </DialogActions>
      </Dialog>
      <CustomBoxDynamicForm flex="1">
        <Box display="flex" justifyContent="flex-end">
          <CloseButton>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Close />
            </Fab>
          </CloseButton>
        </Box>

        <SwipeableViews
          index={activeStep}
          animateHeight
          disabled={true}
          action={actions => {
            setSwipeableActions(actions);
          }}
        >
          {steps.map((step, index) => {
            return (
              <DynamicSubFormComponent
                key={index}
                activated={index === activeStep}
                {...(index === activeStep ? { ref: child } : {})}
                activeStep={step.stepKey}
                stepData={
                  index === activeStep
                    ? service.getFormDataByStep([step.stepKey])
                    : []
                }
                service={service}
                customeHandler={customeHandler}
                isLoading={isLoading}
                masterFormAction={masterFormAction}
                updateHeight={updateHeight}
              />
            );
          })}
        </SwipeableViews>
      </CustomBoxDynamicForm>

      {isReportBroken ? (
        <div
          style={{
            width: '214px',
            margin: '0 auto',
            position: 'relative',
            marginBottom: '20px',
            //   top: '-110px',
          }}
        >
          <HlxButton
            onClick={handleClickChat}
            label="CHAT WITH AN AGENT"
            loading={isLoading}
            startIcon={<ChatBubble />}
            style={{ width: 220 }}
          ></HlxButton>
        </div>
      ) : (
        <CustomBoxForStepper>
          <Box justifyContent="center" display="flex">
            <WrapperButtonBox>
              <HlxButton
                onClick={handleBack}
                label="BACK"
                disabled={activeStep === 0 || isLoading}
                startIcon={<ArrowBackIos />}
              ></HlxButton>
            </WrapperButtonBox>
            <WrapperButtonBox>
              <HlxButton
                onClick={handleNext}
                disabled={!isFormValid}
                label={
                  activeStep === steps.length - 1
                    ? submitText
                      ? submitText
                      : 'SUBMIT'
                    : 'NEXT'
                }
                loading={isLoading}
                endIcon={<ArrowForwardIos />}
              ></HlxButton>
            </WrapperButtonBox>
          </Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {createStep().map((label: any) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CustomBoxForStepper>
      )}
    </CustomBoxParentForm>
  );
};

export default DynamicFormComponent;
