import React from 'react';
import PageTitle from 'components/PageTitle';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Boxes from 'assets/images/pageNotFound/404Boxes.jpg';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { HomePath } from 'utils/routes';
import useDevice, { Device } from 'utils/useDevice';
import {
  PageNotFoundGrid,
  ContentGrid,
  Title404,
  Subtitle404,
  ButtonGrid,
  HomeButton,
} from './index.style';

/**
 * 404 Page props
 */
interface PageNotFoundProps {
  setShowFeedback: (showFeedback: boolean) => void;
}

/**
 * 404 page.
 */
const PageNotFoundPage: React.FC<PageNotFoundProps> = ({ setShowFeedback }) => {
  const { t } = useTranslation();
  const device = useDevice();
  const h = useHistory();
  const handleGoHome = () => {
    h.push({
      pathname: HomePath,
    });
  };

  React.useEffect(() => {
    setShowFeedback(false);
    return () => {
      setShowFeedback(true);
    };
  });

  return (
    <PageNotFoundGrid
      paddingTop={{ xxs: '70px', xs: '150px' }}
      backgroundImage={`url(${Boxes})`}
      backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
    >
      <PageTitle title={t('pageNotFound:title')} />
      <GridLayout columnGutters={0}>
        <Row>
          <Col
            colspan={{
              xxs: '0',
              xs: '0',
              sm: '1',
              md: '1',
              lg: '6',
              xl: '6',
              xxl: '6',
            }}
          />
          <Col
            display="column"
            colspan={{
              xxs: '12',
              xs: '12',
              sm: '10',
              md: '10',
              lg: '5',
              xl: '5',
              xxl: '5',
            }}
          >
            <ContentGrid
              height={{ xxs: '424px', xs: '598px' }}
              width={{ xxs: '90%', md: '547px' }}
              margin={{ xxs: 'auto', md: 'unset' }}
              justifyContent={{ xxs: 'center', md: 'start' }}
            >
              <Title404
                id="404Title"
                fontSize={{ xxs: '180px', sm: '250px' }}
                lineHeight={{ xxs: '0', md: '1.25' }}
                textAlign={{ xxs: 'center', md: 'center' }}
              >
                {t('pageNotFound:header')}
              </Title404>
              <Subtitle404
                id="404Subtitle"
                fontSize={{ xxs: '18px', xs: '31px' }}
                textAlign={{ xxs: 'center', md: 'start' }}
              >
                {t('pageNotFound:message')}
              </Subtitle404>
              <ButtonGrid
                paddingTop={{ xxs: '32px', xs: '75px', sm: '75px', md: '32px' }}
                justifyContent={{ xxs: 'center', md: 'start' }}
              >
                <HomeButton
                  kind="impact2"
                  backgroundColor="impact.0"
                  borderColor="impact.0"
                  color="grayScale.0"
                  onClick={handleGoHome}
                  minWidth={device <= Device.Mobile ? '145px' : '200px'}
                >
                  {device <= Device.Mobile
                    ? t('pageNotFound:goBack')
                    : t('pageNotFound:goHome')}
                </HomeButton>
              </ButtonGrid>
            </ContentGrid>
          </Col>
          <Col
            colspan={{
              xxs: '0',
              xs: '0',
              sm: '1',
              md: '1',
              lg: '1',
              xl: '1',
              xxl: '1',
            }}
          />
        </Row>
      </GridLayout>
    </PageNotFoundGrid>
  );
};

export default PageNotFoundPage;
