import React, { useEffect, useState } from 'react';
import { Box } from '@lumos/core';
import { APP_MAX_WIDTH } from 'constants/index';

import { BottomBackgroundL, BottomBackgroundM, BottomBackgroundXL, BottomBackgroundXS } from 'assets/images';
import { Col, GridLayout, Row } from 'components/GridLayout';

import QuickLinksSection from './subSections/QuickLinksSection';
import ShareFeedbackSection from './subSections/ShareFeedbackSection';
import GetAssistanceSection from './subSections/GetAssistanceSection';
import { TenantConfig, TenantConfigQuickLink } from 'models/globalTypes';
import { AppService } from 'services';


const BottomSection: React.FC = () => {
  const empty: TenantConfigQuickLink[] = [];
  const [quickLinks, setQuickLinks] = useState(empty);
  const [tenantError, setTenantError] = useState(false);
  const [tenantLoading, settenantLoading] = useState(false);
  let helpdeskName: string = '';
  let called: boolean = false;

  useEffect(() => {
    settenantLoading(true);
    !called && !tenantLoading && AppService.getTenantConfig()
      .then((config: TenantConfig | null) => {
        if (config) {
          setQuickLinks(config.value.quickLinks || []);
        } else {
          setTenantError(true);
        }
      })
      .catch(() => setTenantError(true))
      .finally(() => {
        called = true;
        settenantLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

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
        xxs: `url(${BottomBackgroundXS})`,
        xs: `url(${BottomBackgroundXS})`,
        sm: `url(${BottomBackgroundM})`,
        md: `url(${BottomBackgroundM})`,
        lg: `url(${BottomBackgroundL})`,
        xl: `url(${BottomBackgroundL})`,
        xxl: `url(${BottomBackgroundXL})`,
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
            //refetch();
          }}
        />
      </Box>
    </Box>
  );
};

export default BottomSection;
