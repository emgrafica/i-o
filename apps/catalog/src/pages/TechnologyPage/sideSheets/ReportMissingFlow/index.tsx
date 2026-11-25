import React from 'react';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import { useTechnologyStateContext } from '../..';
import { ClientRequestStatus } from '../../types';
import LoadingScreen from 'components/LoadingScreen';
import ReportMissingForm from './ReportMissingForm';

const ReportMissingFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const { sideSheetActionStatus } = useTechnologyStateContext();

  return (
    <StyledBox>
      <StyledSideSheetTitle>{t(`reportMissing.header`)}</StyledSideSheetTitle>
      <ComputerCard />
      {sideSheetActionStatus.status === ClientRequestStatus.Loading ? (
        <Box marginTop="184px">
          <LoadingScreen loaderSize="lg" />
        </Box>
      ) : (
        <ReportMissingForm />
      )}
    </StyledBox>
  );
};

export default ReportMissingFlow;
