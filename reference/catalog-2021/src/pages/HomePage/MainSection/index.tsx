import React from 'react';
import { Box } from '@lumos/core';
import { useQuery } from '@apollo/react-hooks';
import { useSetOBOInfoLocalState } from 'store/apollo/store/hooks';
import { APP_MAX_WIDTH } from 'constants/index';
import HomeHero from 'assets/images/homePage/HomeHero.jpg';
import { Col, GridLayout, Row } from 'components/GridLayout';
import InfoSection from './subSections/InfoSection';
import UserSection from './subSections/UserSection';
import OBOSection from './subSections/OBOSection';
import SearchSection from './subSections/SearchSection';
import { HomeEntitlement } from '../queries/gqlTypes/HomeEntitlement';
import { HOME_ENTITLEMENT } from '../queries';

const MainSection: React.FC = () => {
  const setOBOInfoLocalState = useSetOBOInfoLocalState();
  //-------------------------------------------------
  // Get Home Page entitlements
  //-------------------------------------------------
  const { data, error } = useQuery<HomeEntitlement>(HOME_ENTITLEMENT);

  let canAccessOBOFeature;
  let canAccessSearchUserFeature;
  if (error) {
    // If there is an Error, turn off OBO mode
    setOBOInfoLocalState(null, null);
  } else if (data) {
    const {
      entitlement: { obo, search },
    } = data;
    // Set entitlement per feature
    canAccessOBOFeature = Boolean(obo && obo.enabled);
    canAccessSearchUserFeature = Boolean(search && search.enabled);
  }
  //-------------------------------------------------

  return (
    <Box
      display="flex"
      paddingTop={{
        xxs: '54px',
        xs: '54px',
        sm: '54px',
        md: '54px',
        lg: '107px',
        xl: '107px',
        xxl: '107px',
      }}
      backgroundImage={{
        xxs: `url(${HomeHero})`,
        xs: `url(${HomeHero})`,
        sm: `url(${HomeHero})`,
        md: `url(${HomeHero})`,
        lg: `url(${HomeHero})`,
        xl: `url(${HomeHero})`,
        xxl: `url(${HomeHero})`,
      }}
      backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundColor="#FFFFFF"
      justifyContent="center"
      height={{
        xxs: '596px',
        xs: '596px',
        sm: '596px',
        md: '596px',
        lg: '742px',
        xl: '827px',
        xxl: '827px',
      }}
      width="100%"
    >
      <Box
        height="100%"
        width="100%"
        maxWidth={`${APP_MAX_WIDTH}px`}
        display="flex"
        justifyContent="flex-end"
      >
        <GridLayout columnGutters={0}>
          <Row>
            <Col
              colspan={{
                xxs: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '6',
                xl: '6',
                xxl: '6',
              }}
            />

            {/* ----------------------------------------------------- */}
            {/* Content */}
            {/* ----------------------------------------------------- */}
            <Col
              display="column"
              colspan={{
                xxs: '10',
                xs: '10',
                sm: '10',
                md: '10',
                lg: '5',
                xl: '6',
                xxl: '6',
              }}
            >
              <Box>
                <GridLayout columnGutters={0}>
                  <Row>
                    <Col
                      marginY={{
                        xxs: 3,
                        xs: 3,
                        sm: 0,
                        md: 0,
                        lg: 0,
                        xl: 0,
                        xxl: 0,
                      }}
                      colspan={{
                        xxs: '12',
                        xs: '12',
                        sm: '6',
                        md: '6',
                        lg: '6',
                        xl: '6',
                        xxl: '6',
                      }}
                    >
                      {/* ----------------------------------------------------- */}
                      {/* User Section */}
                      {/* ----------------------------------------------------- */}
                      <UserSection />
                    </Col>
                    <Col
                      colspan={{
                        xxs: '12',
                        xs: '12',
                        sm: '6',
                        md: '6',
                        lg: '6',
                        xl: '6',
                        xxl: '6',
                      }}
                    >
                      {/* ----------------------------------------------------- */}
                      {/* Info List */}
                      {/* ----------------------------------------------------- */}
                      <InfoSection />
                    </Col>
                  </Row>
                </GridLayout>

                {/* ----------------------------------------------------- */}
                {/* OBO Section */}
                {/* ----------------------------------------------------- */}
                <Box
                  id="oboSection"
                  paddingTop={{
                    xxs: '16px',
                    xs: '6px',
                  }}
                  paddingBottom="12px"
                >
                  {canAccessOBOFeature && <OBOSection />}
                </Box>

                {/* ----------------------------------------------------- */}
                {/* Search Section */}
                {/* ----------------------------------------------------- */}
                {canAccessSearchUserFeature && <SearchSection />}
              </Box>
            </Col>
            {/* ----------------------------------------------------- */}

            <Col
              colspan={{
                xxs: '1',
                xs: '1',
                sm: '1',
                md: '1',
                lg: '6',
                xl: '0',
                xxl: '0',
              }}
            />
          </Row>
        </GridLayout>
      </Box>
    </Box>
  );
};

export default MainSection;
