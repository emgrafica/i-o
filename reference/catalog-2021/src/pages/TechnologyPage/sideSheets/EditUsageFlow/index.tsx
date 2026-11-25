import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import EditUsageForm from './EditUsageForm';

const EditUsageFlow: React.FC = () => {
  const { t } = useTranslation('technology');

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t('editUsage.header')}</StyledSideSheetTitle>
      <ComputerCard />
      <EditUsageForm />
    </StyledBox>
  );
};

export default EditUsageFlow;
