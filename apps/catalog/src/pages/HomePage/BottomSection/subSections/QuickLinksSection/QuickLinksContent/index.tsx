import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';
import QuickLink from 'pages/HomePage/QuickLink';
import { TenantConfig_retrieveTenantConfig_quickLinks } from 'pages/HomePage/queries/gqlTypes/TenantConfig';
import { Col, GridLayout, Row } from 'components/GridLayout';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import LoadingError from 'pages/HomePage/components/LoadingError';

// Constants to set height and width for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;
const TEXT_SKELETON_DEFAULT_WIDTH = 234;
const TEXT_SKELETON_TITLE_WIDTH = 266;
const TEXT_SKELETON_LINK_HEIGHT = 24;
const TEXT_SKELETON_LINK_WIDTH = 200;
const TEXT_SKELETON_LINK_SMALL_WIDTH = 155;

export interface QuickLinksContentProps {
  quickLinks: TenantConfig_retrieveTenantConfig_quickLinks[] | null;
  quickLinksLoading?: boolean;
  quickLinksError?: boolean;
  refetchQuickLinks?: () => void;
}

const displayLinkLoaders = (breakpoint: number) => {
  const n = 4;
  return [...Array(n)].map((value: number, index: number) => (
    <Col
      key={index}
      marginTop="12px"
      colspan={{
        xxs: '12',
        xs: '12',
        sm: '6',
        md: '3',
        lg: '3',
        xl: '3',
        xxl: '3',
      }}
    >
      <Skeleton
        height={TEXT_SKELETON_LINK_HEIGHT}
        width={
          breakpoint <= Breakpoint.md
            ? TEXT_SKELETON_LINK_SMALL_WIDTH
            : TEXT_SKELETON_LINK_WIDTH
        }
      />
    </Col>
  ));
};

const QuickLinksContent: React.FC<QuickLinksContentProps> = ({
  quickLinks,
  quickLinksLoading,
  quickLinksError,
  refetchQuickLinks,
}) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  return (
    <>
      <Box
        width="100%"
        height="100%"
        justifyContent="center"
        paddingRight={{
          xxs: '18px',
          xs: '18px',
          sm: '18px',
          md: '46px',
          lg: '46px',
          xl: '46px',
          xxl: '46px',
        }}
        paddingLeft={{
          xxs: '18px',
          xs: '18px',
          sm: '36px',
          md: '36px',
          lg: '46x',
          xl: '46px',
          xxl: '46px',
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
          xxs: '29px',
          xs: '29px',
          sm: '29px',
          md: '21px',
          lg: '21px',
          xl: '29px',
          xxl: '29px',
        }}
      >
        <Typography
          textAlign="justify"
          color="secondary.0"
          kind="h4"
          marginTop={quickLinksLoading ? '0px' : 'inherit'}
          marginBottom={quickLinksLoading ? '0px' : '12px'}
          fontWeight="normal"
          fontSize={{
            xxs: 4,
            xs: 4,
            sm: '31px',
            md: '31px',
            lg: '31px',
            xl: '31px',
            xxl: '31px',
          }}
        >
          {quickLinksLoading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={TEXT_SKELETON_TITLE_WIDTH}
            />
          ) : (
            t('home:quickLinks.title')
          )}
        </Typography>
        <Typography
          textAlign="justify"
          color="secondary.0"
          kind="body1"
          marginTop={quickLinksLoading ? '0px' : 'inherit'}
          marginBottom={quickLinksLoading ? '23px' : '10px'}
        >
          {quickLinksLoading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={TEXT_SKELETON_DEFAULT_WIDTH}
            />
          ) : (
            t('home:quickLinks.subtitle')
          )}
        </Typography>

        <GridLayout columnGutters={0}>
          <Row>
            {quickLinksError ? (
              <LoadingError
                errorMessage={t('home:error.quickLinksLoadingError')}
                retryFunction={refetchQuickLinks}
              />
            ) : quickLinksLoading ? (
              displayLinkLoaders(breakpoint)
            ) : (
              quickLinks &&
              quickLinks
                .filter(({ active }) => active)
                .sort((a, b) => a.order - b.order)
                .map(({ order, url, displayName }) => (
                  <Col
                    key={order}
                    marginTop="12px"
                    colspan={{
                      xxs: '12',
                      xs: '12',
                      sm: '6',
                      md: '3',
                      lg: '3',
                      xl: '3',
                      xxl: '3',
                    }}
                  >
                    <QuickLink url={url} displayName={displayName} />
                  </Col>
                ))
            )}
          </Row>
        </GridLayout>
      </Box>
    </>
  );
};

export default QuickLinksContent;
