import { Box, Button, Typography } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import {
  GetSupportTypography,
  StyledActionBox,
} from '../../../../general.style';
import { StyledActionButton } from './index.style';

// Constants to set height and width for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;
const TEXT_SKELETON_DEFAULT_WIDTH = 228;
const TEXT_SKELETON_TITLE_WIDTH = 456;
const TEXT_SKELETON_TITLE_MOBILE_WIDTH = '100%';
const TEXT_SKELETON_BUTTON_HEIGHT = 34;
const TEXT_SKELETON_BUTTON_WIDTH = 230;

export interface BottomActionProps {
  title: string;
  message: string;
  buttonLabel: string;
  onClick: () => void;
  actionDisable: boolean;
  displayButtonAsLink?: boolean;
  linkPath?: string;
  tenantLoading?: boolean;
  buttonId?: string;
}

const BottomAction: React.FC<BottomActionProps> = ({
  buttonId,
  title,
  message,
  buttonLabel,
  onClick,
  actionDisable,
  displayButtonAsLink,
  linkPath = '',
  tenantLoading,
}) => {
  const breakpoint = useBreakpoint();

  return (
    <>
      <Box
        width="100%"
        height="100%"
        justifyContent="center"
        paddingRight={{
          xxs: '15px',
          xs: '15px',
          sm: '15px',
          md: '35px',
          lg: '35px',
          xl: '45px',
          xxl: '45px',
        }}
        paddingLeft={{
          xxs: '15px',
          xs: '15px',
          sm: '36px',
          md: '36px',
          lg: '35px',
          xl: '45px',
          xxl: '45px',
        }}
        paddingTop={{
          xxs: '24px',
          xs: '24px',
          sm: '24px',
          md: '17px',
          lg: '17px',
          xl: '29px',
          xxl: '29px',
        }}
        paddingBottom={{
          xxs: '18px',
          xs: '18px',
          sm: '18px',
          md: '21px',
          lg: '21px',
          xl: '21px',
          xxl: '21px',
        }}
      >
        <Typography
          textAlign="justify"
          color="secondary.0"
          kind="h4"
          marginTop="0px"
          fontWeight="normal"
          fontSize={{
            xxs: 4,
            xs: 4,
            sm: tenantLoading ? '25px' : '31px',
            md: tenantLoading ? '25px' : '31px',
            lg: tenantLoading ? '25px' : '31px',
            xl: tenantLoading ? '25px' : '31px',
            xxl: tenantLoading ? '25px' : '31px',
          }}
          marginBottom={tenantLoading ? '0px' : '12px'}
        >
          {tenantLoading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={
                breakpoint <= Breakpoint.xs
                  ? TEXT_SKELETON_TITLE_MOBILE_WIDTH
                  : TEXT_SKELETON_TITLE_WIDTH
              }
            />
          ) : (
            title
          )}
        </Typography>
        <Typography
          textAlign="justify"
          color="secondary.1"
          kind="body1"
          marginBottom={{
            xxs: '50px',
            xs: '50px',
            sm: '65px',
            md: '65px',
            lg: '20px',
            xl: '20px',
            xxl: '20px',
          }}
          marginTop="0px"
          fontSize={{
            xxs: '14px',
            xs: '14px',
            sm: '14px',
            md: '14px',
            lg: '16px',
            xl: '16px',
            xxl: '16px',
          }}
          height={{ lg: '44px' }}
        >
          {tenantLoading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={TEXT_SKELETON_DEFAULT_WIDTH}
            />
          ) : (
            message
          )}
        </Typography>
        <StyledActionBox paddingTop={tenantLoading ? '18px' : '0px'}>
          {tenantLoading ? (
            <Skeleton
              height={TEXT_SKELETON_BUTTON_HEIGHT}
              width={TEXT_SKELETON_BUTTON_WIDTH}
            />
          ) : displayButtonAsLink ? (
            <Box paddingTop="10px">
              <Link to={linkPath}>
                <GetSupportTypography>{buttonLabel}</GetSupportTypography>
              </Link>
            </Box>
          ) : !displayButtonAsLink && linkPath ? (
            <Link to={linkPath}>
              {/* <Button
                id={buttonId}
                kind="primary"
                disabled={actionDisable}
                onClick={onClick}
                width={{ xxs: '156px', md: '220px', xl: '180px' }}
                paddingTop="11px"
                paddingBottom="11px"
                fontWeight={600}
                borderRadius="100px"
              >
                {buttonLabel}
              </Button> */}
              <StyledActionButton
                id={buttonId}
                kind="primary"
                width={{ xxs: '156px', md: '220px', xl: '180px' }}
                paddingTop="11px"
                fontWeight={600}
                onClick={onClick}
                showWipHomePageActionOptionCard={false}
                disabled={actionDisable}
              >
                {buttonLabel}
              </StyledActionButton>
            </Link>
          ) : (
            // <Button
            //   id={buttonId}
            //   kind="primary"
            //   disabled={actionDisable}
            //   onClick={onClick}
            //   width={{ xxs: '156px', md: '220px', xl: '180px' }}
            //   paddingTop="11px"
            //   paddingBottom="11px"
            //   fontWeight={600}
            //   borderRadius="100px"
            // >
            //   {buttonLabel}
            // </Button>
            <StyledActionButton
              id={buttonId}
              kind="primary"
              width={{ xxs: '156px', md: '220px', xl: '180px' }}
              paddingTop="11px"
              fontWeight={600}
              onClick={onClick}
              showWipHomePageActionOptionCard={false}
              disabled={actionDisable}
            >
              {buttonLabel}
            </StyledActionButton>
          )}
        </StyledActionBox>
      </Box>
    </>
  );
};

export default BottomAction;
