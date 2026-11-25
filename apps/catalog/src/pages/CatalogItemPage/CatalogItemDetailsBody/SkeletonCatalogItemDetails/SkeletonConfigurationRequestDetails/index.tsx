import React from 'react';
import { Box, Typography } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

const SkeletonConfigurationRequestDetailsComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box>
        {/* Configuartion Details */}
        <Box>
          <Box
            paddingTop={{
              xxs: '4px',
              xs: '4px',
              sm: '4px',
              md: '12px',
              lg: '2px',
              xl: '2px',
              xxl: '2px',
            }}
          >
            <Typography kind="h5" color="primary.2">
              {t('pages:request.computers.computerDetails.selectConfiguration')}
            </Typography>
            <Box
              paddingTop={{
                xxs: '21px',
                xs: '21px',
                sm: '21px',
                md: '21px',
                lg: '45px',
                xl: '45px',
                xxl: '45px',
              }}
              width={{ xxs: '100%', md: '76%', lg: '59%' }}
            >
              <Skeleton width="100%" height="24px" />
            </Box>
            <Box paddingTop="17px" width={{ xxs: '80%', md: '61%', lg: '47%' }}>
              <Skeleton width="100%" height="24px" />
            </Box>
            <Box
              paddingTop="17px"
              paddingBottom={{
                xxs: '0px',
                sm: '0px',
                md: '0px',
                lg: '41px',
                xl: '41px',
                xxl: '41px',
              }}
              width={{ xxs: '100%', md: '76%', lg: '59%' }}
            >
              <Skeleton width="100%" height="24px" />
            </Box>
          </Box>
        </Box>
        {/* Request Details */}
        <Box
          paddingTop={{
            xxs: '60px',
            xs: '60px',
            sm: '60px',
            md: '60px',
            lg: '150px',
            xl: '150px',
            xxl: '150px',
          }}
        >
          <Typography kind="h5" color="primary.2">
            {t('pages:request.computers.computerDetails.requestDetails')}
          </Typography>
          <Box
            paddingTop={{
              xxs: '21px',
              sm: '21px',
              md: '21px',
              lg: '45px',
              xl: '45px',
              xxl: '45px',
            }}
            width={{ xxs: '100%', md: '76%', lg: '59%' }}
          >
            <Skeleton width="100%" height="31px" />
          </Box>
          <Box paddingTop="10px" width={{ xxs: '80%', md: '61%', lg: '47%' }}>
            <Skeleton width="100%" height="31px" />
          </Box>
          <Box paddingTop="10px" width={{ xxs: '100%', md: '76%', lg: '59%' }}>
            <Skeleton width="100%" height="31px" />
          </Box>
        </Box>
      </Box>
      {/* Acknowledgement / Acceptance Statement */}
      <Box
        paddingTop={{
          xxs: '76px',
          sm: '76px',
          md: '51px',
          lg: '51px',
          xl: '51px',
          xxl: '51px',
        }}
        paddingBottom={{
          xxs: '100px',
          xs: '100px',
          sm: '100px',
          md: '56px',
          lg: '300px',
          xl: '300px',
          xxl: '300px',
        }}
      >
        <Box width={{ xxs: '84%', md: '41%', lg: '47%' }}>
          <Skeleton width="100%" height="16px" />
        </Box>
        <Box paddingTop="12px" width={{ xxs: '100%', md: '57%', lg: '64%' }}>
          <Skeleton width="100%" height="8px" />
        </Box>
        <Box marginTop="-2px" width={{ xxs: '61%', md: '27%', lg: '34%' }}>
          <Skeleton width="100%" height="8px" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonConfigurationRequestDetailsComponent;
