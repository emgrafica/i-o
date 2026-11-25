import React from 'react';
import { Box, Typography } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

const SkeletonModelSpecifications: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box
        paddingTop={{
          xxs: '66px',
          xs: '66px',
          sm: '166px',
          md: '78px',
          lg: '104px',
          xl: '104px',
          xxl: '104px',
        }}
      >
        <Typography kind="h5" color="primary.2">
          {t('pages:request.computers.computerDetails.modelSpecifications')}
        </Typography>
        <Box
          paddingTop={{
            xxs: '21px',
            xs: '21px',
            sm: '21px',
            md: '21px',
            lg: '25px',
            xl: '25px',
            xxl: '25px',
          }}
        >
          <Box width={{ xxs: '91%', md: '45%', lg: '51%' }}>
            <Skeleton width="100%" height="15px" />
          </Box>
        </Box>
        <Box paddingTop="8px" width={{ xxs: '46%', md: '23%', lg: '26%' }}>
          <Skeleton width="100%" height="15px" />
        </Box>
        <Box paddingTop="8px" width={{ xxs: '91%', md: '45%', lg: '51%' }}>
          <Skeleton width="100%" height="15px" />
        </Box>
        <Box
          paddingTop="8px"
          marginBottom={{
            xxs: '8px',
            xs: '8px',
            sm: '8px',
            md: '-6px',
            lg: '0px',
            xl: '0px',
            xxl: '0px',
          }}
        >
          <Box width={{ xxs: '46%', md: '23%', lg: '26%' }}>
            <Skeleton width="100%" height="15px" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonModelSpecifications;
