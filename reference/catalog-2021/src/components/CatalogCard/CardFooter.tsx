import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@lumos/core';
import { Link } from 'react-router-dom';
import ProductOverlayAlert from 'components/ProductOverlayAlert';
import Pricing from 'components/Pricing';
import ShowFor from 'components/ShowFor';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { CatalogModel } from '.';

/**
 * Props for <CardFooter />
 */
interface CardFooterProps {
  /**
   * Selected catalog item.
   */
  item: CatalogModel;
  /**
   * Path to navigate to the product's details page
   */
  path: string;
  onClick?: () => void;
}

/**
 * Sends user to <AccessoriesDetails /> pages
 * @param props
 */
const CardFooter: React.FC<CardFooterProps> = ({
  item: { catalogItemName, tenantId, pricing, productOverlay },
  path,
  onClick,
}) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  if (productOverlay) {
    const { type, reason, availability } = productOverlay;
    return (
      <Grid
        width="100%"
        justifyContent="flex-end"
        marginTop={breakpoint >= Breakpoint.md ? '0px' : '-25px'}
      >
        <Box
          width="100%"
          marginLeft={breakpoint >= Breakpoint.md ? '0px' : '105px'}
        >
          <ProductOverlayAlert
            type={type}
            reason={reason}
            availability={availability}
          />
        </Box>
      </Grid>
    );
  }

  return (
    <Grid width="100%" justifyContent="flex-end">
      <Grid
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="auto"
        width="100%"
        marginLeft={breakpoint >= Breakpoint.md ? '0px' : '105px'}
        marginTop={0}
      >
        <Pricing pricing={pricing} />
        <ShowFor tabletAndLarger>
          <Link
            to={{
              pathname: `${path}/${encodeURIComponent(catalogItemName)}`,
              state: {
                tenantId,
              },
            }}
          >
            <Button
              id="viewButton"
              kind="primary"
              paddingLeft={3}
              paddingRight={3}
              paddingTop="6px"
              paddingBottom="6px"
              fontSize={0}
              style={{
                width: 68,
                height: 34,
              }}
              onClick={onClick}
            >
              {t('common:view')}
            </Button>
          </Link>
        </ShowFor>
      </Grid>
    </Grid>
  );
};

export default CardFooter;
