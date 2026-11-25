import React from 'react';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import { useTranslation } from 'react-i18next';
import GetSupport from './GetSupport';

const ReportBrokenFlow: React.FC = () => {
  const { t } = useTranslation('technology');

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t(`reportBroken.header`)}</StyledSideSheetTitle>
      <ComputerCard />
      <GetSupport />
    </StyledBox>
  );
};

export default ReportBrokenFlow;
