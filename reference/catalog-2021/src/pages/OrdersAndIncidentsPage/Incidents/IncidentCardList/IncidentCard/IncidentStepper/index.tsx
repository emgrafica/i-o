import React from 'react';
import { Stepper } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { IncidentsByUser_incidentsSearch_items } from 'graphql/queries/gqlTypes/IncidentsByUser';

type StepperProps = Pick<IncidentsByUser_incidentsSearch_items, 'progress'>;

const IncidentStepper: React.FC<StepperProps> = ({ progress }) => {
  const { t } = useTranslation('requests');
  const currentStep = progress.stages.indexOf(progress.currentStage);

  return (
    <Stepper currentStep={currentStep} marginTop="8px" marginBottom="12px">
      {progress.stages.map((stage, idx) => (
        <Stepper.Step key={stage} completed={idx < currentStep}>
          <Stepper.StepLabel>{t(`incident.status.${stage}`)}</Stepper.StepLabel>
        </Stepper.Step>
      ))}
    </Stepper>
  );
};

export default IncidentStepper;
