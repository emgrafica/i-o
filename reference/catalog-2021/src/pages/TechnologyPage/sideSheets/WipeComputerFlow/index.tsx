import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSideSheetTitle, StyledBox } from '../../index.style';
import ComputerCard from '../../ComputerCard';
import { Box } from '@lumos/core';
import EraseDriveContent from './EraseDriveContent';
import SavedRequiredContent from './SavedRequiredContent';

// Component for computer wipe technology asset action
const WipeComputerFlow: React.FC = () => {
  const { t } = useTranslation('technology');
  const [toContinue, setToContinue] = React.useState(false);

  let content;
  content = <ComputerCard />;

  return (
    <Box>
      <StyledBox>
        <StyledSideSheetTitle>{t('wipeComputer.header')}</StyledSideSheetTitle>
        {content}

        {!toContinue ? (
          <SavedRequiredContent setToContinue={setToContinue} />
        ) : (
          <EraseDriveContent
            toContinue={toContinue}
            setToContinue={setToContinue}
          />
        )}
      </StyledBox>
    </Box>
  );
};

export default WipeComputerFlow;
