import React from 'react';
import { Grid, Box, Typography } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import {
  StyledTitle,
  StyledActionLink,
} from 'components/ActionItemCard/index.style';
import useDevice from 'utils/useDevice';

interface ComingSoonQuickViewProps {
  /**
   * Title of order type
   */
  title: string;
  /**
   * Text that describes available action
   */
  actionText: string;
}

/**
 * Temporary "Coming Soon" component for Orders and Approvals
 */
const ComingSoonQuickView: React.FC<ComingSoonQuickViewProps> = ({
  title,
  actionText,
}) => {
  const device = useDevice();
  const shouldShowLink = window.innerWidth >= 768;
  const { t } = useTranslation('home');
  return (
    <>
      <Grid
        flexDirection={{ xxs: 'column', sm: 'row' }}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ sm: 'center' }}
        paddingTop={{ xxs: 0, sm: '22.5px' }}
        paddingBottom={{ xxs: 0, sm: '13.5px' }}
        paddingLeft={{ xxs: 0 }}
        paddingRight={{ sm: '15px' }}
      >
        <Grid
          flexDirection="column"
          marginLeft={{ xxs: 0, sm: '23px' }}
          marginTop={{ xxs: '22.5px', sm: 0 }}
        >
          <StyledTitle
            device={device}
            marginBottom={0}
            marginTop={0}
            marginLeft={{ xs: 0 }}
            fontSize={{ xs: 2, sm: 7 }}
          >
            {title}
          </StyledTitle>
          <Typography
            kind="body3"
            fontSize={{ xxs: '12px', sm: 1 }}
            marginBottom={0}
            marginTop={{ xxs: '8px' }}
            color="grayScale.5"
          >
            {t('comingSoon')}
          </Typography>
        </Grid>
        {shouldShowLink && (
          <Box flexBasis="33%" textAlign="right" marginLeft={{ xxs: '36px' }}>
            <StyledActionLink
              id="coming-soon-link"
              color="grayScale.5"
              disabled
            >
              {actionText}
            </StyledActionLink>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ComingSoonQuickView;
