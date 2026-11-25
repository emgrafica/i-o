import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Typography, Grid, Button } from '@lumos/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import PageTemplate from 'components/PageTemplate';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import TopSection from 'pages/GetSupportPage/TopSection';

/**
 Terms of Use page.
 */

/**
 TermsBulletList returns the mampping of the array of contentListItems for transaltion.
 Rendered in the Content section 'Content List'.
*/
const TermsBulletList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ul>
      {(t('termsOfUse:contentListItems', {
        returnObjects: true,
      }) as Array<string>).map((listItem: string) => {
        return (
          <ListItem>
            <Typography kind="body1">{listItem}</Typography>
          </ListItem>
        );
      })}
    </ul>
  );
};

/**
 * ListItem display content list items with bullets.
 */
const ListItem: React.FC = props => (
  <li style={{ marginBottom: 12 }}>{props.children}</li>
);

const TermsOfUsePage: React.FC<RouteComponentProps> = props => {
  const { t } = useTranslation();
  return (
    <>
    <TopSection>
    </TopSection>
    <PageTemplate
      hasBanner
      title={t('termsOfUse:title')}
      subtitle={t('termsOfUse:subtitle')}
    >
      <Grid>
        {/* Body */}
        <Box>
          {/* Content */}
          <Box width="auto" height="auto" marginTop="0px">
            {/* Content Title */}
            <Typography
              kind="h4"
              color="secondary.0"
              textAlign="left"
              marginBottom="26px"
            >
              {t('termsOfUse:contentTitle')}
            </Typography>

            <Trans i18nKey="termsOfUse:acceptableUsePolicyContent" t={t}>
              This Acceptable Use Policy (the "Policy") applies to the i-o
              platform located at
              <a
                href="https://dxc.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                 <Typography
                    kind="body2"
                    color="primary.2"
                    margin="0px"
                    style={{ textDecoration: 'underline' }}>
                      dxc.com
                  </Typography>
              </a>
              (the "Platform"). The Site is the property of DXC Company ("DXC").
              BY USING THE PLATFORM, YOU AGREE TO THIS ACCEPTABLE USE POLICY; IF
              YOU DO NOT AGREE, DO NOT USE THE SITE.
            </Trans>
            {/* Subtitles */}
            {(t('termsOfUse:contentSubtitles', {
              returnObjects: true,
            }) as Array<string>).map((subtitle: string) => {
              return (
                <Typography
                  kind="body1"
                  color="secondary.0"
                  textAlign="left"
                  marginBottom="19px"
                >
                  {subtitle}
                </Typography>
              );
            })}

            {/* Content list */}
            <Box color="secondary.0" marginBottom="41px" marginLeft="50px">
              <TermsBulletList />
            </Box>

            {/* Closing Message */}
            <Typography
              kind="body1"
              color="secondary.0"
              textAlign="left"
              marginBottom={5}
            >
              {t('termsOfUse:closing')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </PageTemplate>
    </>
  );
};

export default withRouter(TermsOfUsePage);
