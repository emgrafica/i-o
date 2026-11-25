import React from 'react';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import { Typography, Box, Container } from '@lumos/core';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { useTranslation } from 'react-i18next';
import heroImage from 'assets/images/getSupport/heroImage.png';

const TopSection: React.FC = () => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation('getSupport');

  return (
    <Box
      width="100%"
      background={`url(${heroImage})`}
      backgroundPosition="center"
      backgroundSize="cover"
      minHeight={{ xxs: '281px', md: '381px' }}
    >
      <Container
        flexDirection="column"
        alignItems="center"
        width="100%"
        paddingTop={{ xxs: '88px', md: '140px' }}
        paddingX={{ xxs: '16px', md: '115px' }}
      >
        <Box width="100%" maxWidth="900px">
          <Typography
            kind={breakpoint <= Breakpoint.sm ? 'h5' : 'h3'}
            fontWeight="300"
            marginBottom="20px"
          >
            {t('topSectionHeader')}
          </Typography>
          <GetSupportSearchInput />
        </Box>
      </Container>
    </Box>
  );
};

export default TopSection;
