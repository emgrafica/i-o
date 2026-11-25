import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledBox, StyledSideSheetTitle } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import GlobalVariation from './GlobalVariation';
import { useTechnologyStateContext } from '../..';
import { ClientRequestStatus } from '../../types';
import { Box } from '@lumos/core';
import LoadingScreen from 'components/LoadingScreen';

const RegisterOwnershipFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const { sideSheetActionStatus } = useTechnologyStateContext();

  return (
    <StyledBox>
      <StyledSideSheetTitle>
        {t(`registerOwnership.header`)}
      </StyledSideSheetTitle>
      <ComputerCard />
      {sideSheetActionStatus.status === ClientRequestStatus.Loading ? (
        <Box marginTop="184px">
          <LoadingScreen loaderSize="md" />
        </Box>
      ) : (
        <GlobalVariation />
      )}
    </StyledBox>
  );
};

export default RegisterOwnershipFlow;
