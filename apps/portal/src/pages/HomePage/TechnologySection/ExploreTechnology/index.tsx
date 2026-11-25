import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Grid, Typography } from '@lumos/core';
import { ManagePersonalTechnologyPath } from 'utils/routes';
import { HomeTechnologyButton } from './general.style';
//import { ShareFeedbackSideSheet } from 'components';
import { useHistory } from 'react-router-dom';

import { LinkHover } from 'pages/HomePage/general.style';

/**
 * Comming Soon
 * Boolean to show coming soon section
 */
interface ComingSoonProps {
  isComingSoonVisible: boolean;
}

const ExploreTechnology: React.FC<ComingSoonProps> = ({
  isComingSoonVisible,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  //const [isOpen, setIsOpen] = React.useState(false);
  //const oboInfoLocalState = useOBOInfoLocalState();

  return (
    <Box
      width={{
        xxs: '343px',
        xs: '343px',
        sm: '530px',
        md: '530px',
        lg: '530px',
      }}
      display="inline-flex"
      textAlign="left"
    >
      {isComingSoonVisible ? (
        <Box
          alignItems="center"
          marginTop={{
            xxs: '33px',
            xs: '33px',
            sm: '36px',
            md: '36px',
            lg: '68px',
            xl: '68px',
            xxl: '68px',
          }}
        >
          <Typography
            color="secondary.0"
            kind="h4"
            fontWeight="normal"
            marginBottom={{
              xxs: '12px',
              xs: '12px',
              sm: '20px',
              md: '20px',
              lg: '20px',
              xl: '20px',
            }}
            fontSize={{
              xxs: 4,
              xs: 4,
              sm: '31px',
              md: '31px',
              lg: '31px',
              xl: '31px',
            }}
          >
            {t('home:explore.title')}
          </Typography>
          <Typography
            color="secondary.0"
            kind="body1"
            marginBottom={{
              xxs: '32px',
              xs: '32px',
              sm: '32px',
              md: '40px',
              lg: '40px',
              xl: '40px',
              xxl: '40px',
            }}
            fontSize={{
              xxs: '14px',
              xs: '14px',
              sm: '16px',
              md: '16px',
              lg: '16px',
              xl: '16px',
            }}
          >
            {t('home:explore.subtitle')}
          </Typography>
          <Grid width="100%">
            <HomeTechnologyButton
              fontWeight="bold"
              padding={1}
              marginY={1}
              onClick={() => {
                history.push(ManagePersonalTechnologyPath);
              }}
              disabled={true}
              id="viewTechnology"
            >
              {t('home:explore.action')}
            </HomeTechnologyButton>
          </Grid>
        </Box>
      ) : (
        <Box
          position="relative"
          right={{
            lg: '135px',
            xl: '135px',
            xxl: '135px',
          }}
          marginTop={{
            xxs: '2px',
            xs: '2px',
            sm: '20px',
            md: '40px',
            lg: '56px',
            xl: '56px',
            xxl: '56px',
          }}
        >
          <Typography
            kind="h4"
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
            marginBottom={{
              xxs: '12px',
              xs: '12px',
              sm: '12px',
              md: '12px',
              lg: '28px',
              xl: '28px',
              xxl: '32px',
            }}
          >
            {t('home:explore.titleComingSoon')}
          </Typography>
          <Typography kind="body1" fontSize="16px">
            <Trans
              data-testid="comingSoonMessage1"
              t={t}
              i18nKey="home:explore.comingSoonMessage1"
            >
              As we rebuild our platform, we will be incrementally releasing
              each component of the tool and we would
              {/* href is required for an a-tag. The e.preventDafult, prevents the onlcick from going to homepage */}
              <LinkHover>
                <a
                  href="."
                  onClick={e => {
                    e.preventDefault();
                    //setIsOpen(true);
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  love your early feedback on the new design
                </a>
              </LinkHover>
              .
            </Trans>
            {/* <ShareFeedbackSideSheet isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          </Typography>

          <Typography
            data-testid="comingSoonMessage2"
            kind="body1"
            fontSize="16px"
          >
            <Trans t={t} i18nKey="home:explore.comingSoonMessage2">
              In the meantime, you can continue to access all i-o
              functionality
              <LinkHover>
                <a
                  href="https://my.dxc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  in our existing site
                </a>
              </LinkHover>
              . We look forward to your feedback on the new experience to help
              us shape i-o to best meet your needs!
            </Trans>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ExploreTechnology;
