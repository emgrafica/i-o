import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Stepper } from '@lumos/core';
import { MyRequests_myRequests_items } from 'graphql/queries/gqlTypes/MyRequests';

/**
 * Props for RequestStepper
 * @prop requestStage - the stage the request is in
 */
type StepperProps = Pick<MyRequests_myRequests_items, 'request'>;

/**
 * Stepper component for showing the current stage of a request
 * @param props
 */
const OrderStepper: React.FC<StepperProps> = ({ request }) => {
  const { t } = useTranslation('requests');
  const { progress } = request;
  const currentStep = progress.stages.indexOf(progress.currentStage);
  const isLastStep = currentStep === progress.stages.length - 1;

  return (
    <Stepper currentStep={currentStep} marginTop="8px" marginBottom="12px">
      {progress.stages.map((stage, idx) => (
        <Stepper.Step
          key={stage}
          completed={idx < currentStep || (isLastStep && idx === currentStep)}
        >
          <Stepper.StepLabel>{t(`order.stages.${stage}`)}</Stepper.StepLabel>
        </Stepper.Step>
      ))}
    </Stepper>
  );
};

export default OrderStepper;
