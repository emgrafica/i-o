import { Box, Grid } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useDevice, { Device } from 'utils/useDevice';

const SkeletonShippingForm: React.FC = () => {
  const device = useDevice();
  return (
    <Box>
      <Box>
        {/* Shipping Form for Desktop and Tablet */}
        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
          paddingBottom={{
            xxs: '10px',
            xs: '10px',
            sm: '10px',
            md: '0px',
            lg: '0px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>

        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>

        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>

        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>

        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>

        {device === Device.Mobile ? (
          <Box>
            <Box paddingTop="27px">
              <Skeleton width="100%" height="39px" />
            </Box>
            <Box paddingTop="27px">
              <Skeleton width="100%" height="39px" />
            </Box>
          </Box>
        ) : (
          <Grid flexDirection="row">
            <Box
              paddingTop="12px"
              paddingRight={{
                xxs: '0px',
                xs: '0px',
                sm: '0px',
                md: '23px',
                lg: '35px',
                xl: '35px',
                xxl: '35px',
              }}
              width="88%"
            >
              <Skeleton width="100%" height="39px" />
            </Box>
            <Box paddingTop="12px" width="55%">
              <Skeleton width="100%" height="39px" />
            </Box>
          </Grid>
        )}
        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>
        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
          width="100%"
        >
          <Skeleton width="100%" height="39px" />
        </Box>
        <Box
          paddingTop={{
            xxs: '27px',
            xs: '27px',
            sm: '27px',
            md: '12px',
            lg: '12px',
          }}
          paddingBottom={{
            xxs: '18px',
            md: '0px',
            lg: '0px',
          }}
        >
          <Skeleton width="100%" height="39px" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonShippingForm;
