import React from 'react';
import { Box } from '@lumos/core';
import { APP_MAX_WIDTH } from 'constants/index';
import BottomBackgorundXL from 'assets/images/homePage/BottomBackgroundXL.png';
import BottomBackgorundXS from 'assets/images/homePage/BottomBackgroundXS.png';
import BottomBackgorundM from 'assets/images/homePage/BottomBackgroundM.png';
import BottomBackgorundLG from 'assets/images/homePage/BottomBackgroundL.png';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { TenantConfig } from '../queries/gqlTypes/TenantConfig';
import QuickLinksSection from './subSections/QuickLinksSection';
import ShareFeedbackSection from './subSections/ShareFeedbackSection';
import GetAssistanceSection from './subSections/GetAssistanceSection';
import { useQuery } from '@apollo/react-hooks';
import { TENANT_CONFIG } from 'pages/HomePage/queries';

const BottomSection: React.FC = () => {
  const {
    loading: tenantLoading,
    data: tenantData,
    error: tenantError,
    refetch,
  } = useQuery<TenantConfig>(TENANT_CONFIG);

  const quickLinks = tenantData
    ? tenantData.retrieveTenantConfig.quickLinks
    : null;

  const helpdeskName =
    tenantData && tenantData.retrieveTenantConfig.getAssistance
      ? tenantData.retrieveTenantConfig.getAssistance.helpdeskName
      : null;
  return (
    <Box
      display="flex"
      padding={{
        xxs: '42px 17px 113px 17px',
        xs: '42px 17px 113px 17px',
        sm: '38px 24px 114px 24px',
        md: '38px 24px 114px 24px',
        lg: '40px 152px 152px 152px',
        xl: '40px 152px 152px 152px',
        xxl: '40px 152px 152px 152px',
      }}
      background={{
        xxs: `url(${BottomBackgorundXS})`,
        xs: `url(${BottomBackgorundXS})`,
        sm: `url(${BottomBackgorundM})`,
        md: `url(${BottomBackgorundM})`,
        lg: `url(${BottomBackgorundLG})`,
        xl: `url(${BottomBackgorundLG})`,
        xxl: `url(${BottomBackgorundXL})`,
      }}
      backgroundSize={{
        xxs: 'cover',
        xs: 'cover',
        sm: 'cover',
        md: 'cover',
        lg: 'cover',
        xl: 'cover',
        xxl: 'cover',
      }}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundColor="#FFFFFF"
      justifyContent="center"
      width="100%"
    >
      <Box
        height="100%"
        width="100%"
        maxWidth={`${APP_MAX_WIDTH}px`}
        justifyContent="center"
      >
        {/* ----------------------------------------------------- */}
        {/* Quick links Section  */}
        {/* ----------------------------------------------------- */}
        <QuickLinksSection
          quickLinks={quickLinks}
          quickLinksLoading={tenantLoading}
          quickLinksError={Boolean(tenantError)}
          refetchQuickLinks={() => {
            refetch();
          }}
        />

        <GridLayout columnGutters={0}>
          <Row>
            <Col
              marginTop="12px"
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '6',
                xl: '6',
                xxl: '6',
              }}
            >
              {/* ----------------------------------------------------- */}
              {/* Share Feedback Section */}
              {/* ----------------------------------------------------- */}
              <Box marginRight={{ lg: '15px' }}>
                <ShareFeedbackSection tenantLoading={tenantLoading} />
              </Box>
            </Col>
            <Col
              marginTop="12px"
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '6',
                xl: '6',
                xxl: '6',
              }}
            >
              {/* ----------------------------------------------------- */}
              {/* Get Assistance Section */}
              {/* ----------------------------------------------------- */}
              {!tenantError && (
                <GetAssistanceSection
                  helpdeskName={helpdeskName}
                  tenantLoading={tenantLoading}
                />
              )}
            </Col>
          </Row>
        </GridLayout>
      </Box>
    </Box>
  );
};

export default BottomSection;
