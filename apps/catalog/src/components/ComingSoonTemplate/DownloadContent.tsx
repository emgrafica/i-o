import React from 'react';
import { Col, Row } from 'components/GridLayout';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Grid, Box, Typography } from '@lumos/core';
import { ArrowRightAlt } from '@material-ui/icons';
import { openInWindow } from 'utils/openInWindow';
import CollaborationLink from './index.style';

interface DownloadContentProps {
  title: string;
  description: string;
  downloadContentImage: any;
  windowsPath?: string;
  macPath?: string;
}

/**
 * "Coming Soon" content with downloadable links
 */
const DownloadContent: React.FC<DownloadContentProps> = ({
  title,
  description,
  downloadContentImage,
  windowsPath = 'https://example.com',
  macPath = 'https://example.com',
}) => {
  const { t } = useTranslation('temporaryText');
  return (
    <Row>
      <Col colspan={{ xxs: '12', lg: '5' }}>
        <Box
          paddingTop={{ xxs: '20px', sm: '32px' }}
          paddingBottom={{ xxs: '20px' }}
          paddingLeft={{ xxs: '15px', sm: '32px' }}
          paddingRight={{ xxs: '15px', sm: '32px' }}
          marginTop={{ xxs: 0, sm: '38px', lg: '54px' }}
          backgroundColor="#F9F9F9"
          opacity="90%"
        >
          <Typography
            kind="h1"
            fontSize={{ xxs: 5, sm: '61px' }}
            textAlign={{ xxs: 'center' }}
            marginBottom={{ xxs: '12px' }}
            marginTop={{ xxs: 0 }}
            fontWeight="normal"
          >
            {title}
          </Typography>
          <Typography
            kind="body1"
            fontSize={{ xxs: 1 }}
            textAlign={{ xxs: 'left' }}
            marginTop={0}
            marginBottom={{ xxs: '20px', sm: '32px' }}
          >
            {description}
          </Typography>
          <Grid
            flexDirection={{ xxs: 'column', md: 'row' }}
            marginBottom={{ sm: '47px' }}
          >
            <Box
              backgroundImage={`url(${downloadContentImage})`}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              height={{ xxs: '70px', sm: '144px' }}
              width={{ xxs: '133px', sm: '274px' }}
              marginRight={{ sm: '44px' }}
              marginBottom={{ xxs: '12px' }}
            />
            <Box>
              <Typography
                kind="body1"
                fontSize={{ xxs: 1 }}
                marginBottom="12px"
                marginTop={0}
              >
                {t('showWipCollaboration.downloadTitle')}:
              </Typography>
              <Box marginBottom="12px">
                <Button
                  kind="primary"
                  paddingY="7px"
                  paddingX="15px"
                  onClick={() => openInWindow(windowsPath)}
                >
                  {t('showWipCollaboration.forWindows')}
                </Button>
              </Box>
              <Box marginBottom={{ xxs: '12px' }}>
                <Button
                  kind="primary"
                  paddingY="7px"
                  paddingX="15px"
                  onClick={() => openInWindow(macPath)}
                >
                  {t('showWipCollaboration.forMac')}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid justifyContent="flex-start" marginBottom={{ xxs: '12px' }}>
            <CollaborationLink
              kind="text"
              onClick={() =>
                openInWindow(
                  'https://example.com',
                )
              }
            >
              <Grid alignItems="center" height="100%" color="primary.1">
                <Trans t={t} i18nKey="showWipCollaboration.content1">
                  {' '}
                  Learn more about Teams.
                </Trans>
                <ArrowRightAlt />
              </Grid>
            </CollaborationLink>
          </Grid>
          <Grid justifyContent="flex-start">
            <CollaborationLink
              kind="text"
              onClick={() =>
                openInWindow(
                  'https://example.com',
                )
              }
            >
              <Grid alignItems="center" height="100%" color="primary.1">
                <Trans t={t} i18nKey="showWipCollaboration.content2">
                  {' '}
                  Sign up for a Teams training session.
                </Trans>
                <ArrowRightAlt />
              </Grid>
            </CollaborationLink>
          </Grid>
        </Box>
      </Col>
    </Row>
  );
};

export default DownloadContent;
