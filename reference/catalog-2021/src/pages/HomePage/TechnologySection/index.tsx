import React from 'react';
import { Box } from '@lumos/core';
import useDevice, { Device } from 'utils/useDevice';
import { APP_MAX_WIDTH } from 'constants/index';
import TechnologyBackgorundXL from 'assets/images/homePage/TechnologyBackgorundXL.png';
import TechnologyBackgorundXS from 'assets/images/homePage/TechnologyBackgorundXS.png';
import TechnologyBackgorundM from 'assets/images/homePage/TechnologyBackgorundM.png';
import TechnologyBackgorundLG from 'assets/images/homePage/TechnologyBackgorundLG.png';
import { Col, GridLayout, Row } from 'components/GridLayout';
import ComputerImage from '../../../assets/images/homePage/computer.png';
import CratesImage from '../../../assets/images/homePage/CratesImage.png';
import ExploreTechnology from './ExploreTechnology';
import { showWipHomePageTechSection } from 'utils/showWorkInProgress';

const TechnologySection: React.FC = () => {
  const device = useDevice();

  return (
    <Box
      display="flex"
      paddingTop={{
        xxs: '57px',
        xs: '57px',
        sm: '57px',
        md: '57px',
        lg: '30px',
        xl: '105px',
        xxl: '105px',
      }}
      backgroundImage={{
        xxs: `url(${TechnologyBackgorundXS})`,
        xs: `url(${TechnologyBackgorundXS})`,
        sm: `url(${TechnologyBackgorundM})`,
        md: `url(${TechnologyBackgorundM})`,
        lg: `url(${TechnologyBackgorundLG})`,
        xl: `url(${TechnologyBackgorundLG})`,
        xxl: `url(${TechnologyBackgorundXL})`,
      }}
      backgroundSize={{
        xxs: showWipHomePageTechSection ? '269px' : '295px',
        xs: showWipHomePageTechSection ? '269px' : '295px',
        sm: showWipHomePageTechSection ? '474px' : '490px',
        md: showWipHomePageTechSection ? '474px' : '490px',
        lg: '474px',
        xl: '474px',
        xxl: '34% 592px',
      }}
      backgroundRepeat="no-repeat"
      backgroundPosition="left"
      backgroundColor="#FFFFFF"
      justifyContent="center"
      width="100%"
      height={{
        xxs: showWipHomePageTechSection ? '602px' : '667px',
        xs: showWipHomePageTechSection ? '602px' : '667px',
        sm: showWipHomePageTechSection ? '755px' : '778px',
        md: showWipHomePageTechSection ? '755px' : '778px',
        lg: showWipHomePageTechSection ? '615px' : '590px',
        xl: showWipHomePageTechSection ? '615px' : '590px',
        xxl: '592px',
      }}
    >
      <Box
        height="100%"
        width="100%"
        maxWidth={`${APP_MAX_WIDTH}px`}
        display="flex"
        justifyContent="center"
      >
        <GridLayout columnGutters={0}>
          <Row>
            <Col
              marginBottom={device <= Device.Tablet ? '12px' : '0px'}
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '6',
                xl: '6',
              }}
            >
              <Box
                width={{
                  xxs: '343px',
                  xs: '343px',
                  sm: '532px',
                  md: '532px',
                  lg: '532px',
                  xl: '532px',
                  xxl: '532px',
                }}
                display="block"
                marginLeft="auto"
                marginRight="auto"
              >
                {showWipHomePageTechSection ? (
                  <img src={ComputerImage} alt="Computer" width="100%" />
                ) : (
                  <img src={CratesImage} alt="Crates" width="100%" />
                )}
              </Box>
            </Col>
            <Col
              textAlign="center"
              width="100%"
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '6',
                xl: '6',
              }}
            >
              <ExploreTechnology
                isComingSoonVisible={showWipHomePageTechSection}
              />
            </Col>
          </Row>
        </GridLayout>
      </Box>
    </Box>
  );
};

export default TechnologySection;
