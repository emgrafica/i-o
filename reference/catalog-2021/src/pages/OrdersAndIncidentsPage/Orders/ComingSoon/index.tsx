import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography, Box } from '@lumos/core';

//TODO: Remove this component when Coming Soon treatment for orders is not needed anymore
/**
 * ComingSoon displays Coming Soon message on Orders tab until the feature ios fully finish
 */
const ComingSoon: React.FC = () => {
  const { t } = useTranslation('requests');
  return (
    <Box
      margin="auto"
      marginTop={{
        xxs: '20px',
        xs: '20px',
        sm: '60px',
        md: '60px',
        lg: '60px',
        xl: '60px',
        xxl: '60px',
      }}
      marginBottom="152px"
      padding={{
        xxs: '5px 15px 32px 15px',
        xs: '5px 15px 32px 15px',
        sm: '5px 32px 32px 32px',
        md: '5px 32px 32px 32px',
        lg: '5px 32px 32px 32px',
        xl: '5px 32px 32px 32px',
        xxl: '5px 32px 32px 32px',
      }}
      width={{
        xxs: '100%',
        xs: '100%',
        sm: '581px',
        md: '581px',
        lg: '581px',
        xl: '581px',
        xxl: '581px',
      }}
      backgroundColor="grayScale.1"
      textAlign="center"
    >
      <Typography
        kind="h1"
        color="secondary.0"
        fontSize={{
          xxs: '5',
          xs: '5',
          sm: '61px',
          md: '61px',
          lg: '61px',
          xl: '61px',
          xxl: '61px',
        }}
        marginBottom="12px"
      >
        {t('order.comingSoon.title')}
      </Typography>
      <Typography
        kind="h5"
        color="grayScale.10"
        marginBottom="32px"
        fontSize="2"
      >
        {t('order.comingSoon.subtitle')}
      </Typography>
      <Typography
        kind="body1"
        fontSize="1"
        textAlign="left"
        color="grayScale.11"
      >
        {t('order.comingSoon.content1')}
      </Typography>

      <Typography
        kind="body1"
        fontSize="1"
        textAlign="left"
        color="grayScale.11"
      >
        <Trans t={t} i18nKey="order.comingSoon.content2">
          Need to manage an open order now?
          <a
            href=" https://example.com/tickets"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Visit existing i-o My Tickets.
          </a>
        </Trans>
      </Typography>
    </Box>
  );
};

export default ComingSoon;
