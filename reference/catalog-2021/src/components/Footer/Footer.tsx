import React from 'react';
import getYear from 'date-fns/getYear';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { env, variables } from '../../utils/env';
import { FooterEnums } from './constants';
import footerTagline from 'assets/images/branding/GE_footer_tagline.png';
import { APP_MAX_WIDTH } from 'constants/index';
import { LumosFooter, Copyright } from './Footer.style';
import { Container, Typography, Grid } from '@lumos/core';
import { TermsPath } from 'utils/routes';

const getPrefix = () => {
  if (env(variables.environment) !== FooterEnums.prod) {
    return `${env(variables.environment)}_`;
  }
  return '';
};

/**
 * Application footer.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LumosFooter>
      <Container
        backgroundColor="secondary.1"
        width="100%"
        maxWidth={`${APP_MAX_WIDTH}px`}
        paddingX="36px"
        paddingY={{ xxs: '12px', md: '0px' }}
        flexDirection={{ default: 'column', md: 'row' }}
        alignItems="center"
      >
        <Grid
          marginBottom={{ xxs: '13px', md: '0px' }}
          marginRight={{ md: 'auto' }}
        >
          <img
            alt="GE logo and tagline: building a world that works"
            src={footerTagline}
          />
        </Grid>
        <Typography
          kind="caption"
          marginX="10px"
          fontSize="11px"
          textAlign="center"
        >
          © {getYear(new Date())} {t('footer:copyright')}
        </Typography>
        <Copyright>
          <ul>
            {env(variables.environment) && env(variables.buildNumber) && (
              <li>
                <Typography kind="caption" fontSize="11px">{`${getPrefix()}${t(
                  'footer:versionLabel',
                )}${env(variables.buildNumber)}`}</Typography>
              </li>
            )}
            <li>
              <Link to={TermsPath}>
                <Typography kind="caption" fontSize="11px">
                  {t('footer:termsOfUse')}
                </Typography>
              </Link>
            </li>
          </ul>
        </Copyright>
      </Container>
    </LumosFooter>
  );
};

export default Footer;
