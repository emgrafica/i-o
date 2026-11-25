import React from 'react';
import { Box, Typography } from '@lumos/core';
import { Col, Row } from 'components/GridLayout';
import { ComingSoonTemplateProps } from './index';

export type StaticContentProps = Omit<
  ComingSoonTemplateProps,
  | 'backgroundImage'
  | 'backgroundPosition'
  | 'showDownloadableContent'
  | 'downloadContentImage'
  | ''
>;

/**
 * Static version of the "Coming Soon" page
 */
const StaticContent: React.FC<StaticContentProps> = ({
  title,
  subtitle,
  featureDescriptionText,
  redirectActionComponent,
  moreInfoComponent,
}) => {
  return (
    <Row>
      <Col colspan={{ xxs: '12', md: '12', lg: '7' }}>
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
            textAlign={{ xxs: 'center' }}
            marginTop={0}
            marginBottom={{ xxs: '20px', sm: '32px' }}
          >
            {subtitle}
          </Typography>
          {featureDescriptionText}
          {redirectActionComponent}
          {moreInfoComponent}
        </Box>
      </Col>
    </Row>
  );
};

export default StaticContent;
