import React from 'react';
import { Grid } from '@lumos/core';
import { useHistory } from 'react-router-dom';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { CatalogData_catalogModels_catalogModels } from 'graphql/queries/gqlTypes/CatalogData';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { StyledCard } from './index.style';

export type CatalogModel = CatalogData_catalogModels_catalogModels;

interface CatalogCardProps {
  /**
   * Selected catalog item.
   */
  item: CatalogModel;
  /**
   * Path to navigate to the product's details page
   */
  path: string;
  /**
   * Click handler for Card's button
   */
  onClick?: () => void;
}
const CatalogCard: React.FC<CatalogCardProps> = ({ item, path, onClick }) => {
  const breakpoint = useBreakpoint();
  const history = useHistory();

  const cardClick = () => {
    if (breakpoint <= Breakpoint.sm && onClick) {
      onClick();
      history.push({
        pathname: `${path}/${encodeURIComponent(item.catalogItemName)}`,
        state: {
          tenantId: item.tenantId,
        },
      });
    }
  };

  return (
    <Grid key={`${item.catalogItemName}`} justifyContent="center">
      {/* Catalog card view  */}
      <StyledCard
        id="catalogCard"
        key={`${item.catalogItemName}`}
        flexDirection="column"
        justifyContent="space-between"
        flexBasis="auto"
        height={{ xxs: '151px', md: '321px', lg: '371px' }}
        width={{ xxs: '100%', md: '227px', lg: '323px' }}
        margin="0px"
        smBreakpoint={breakpoint <= Breakpoint.sm}
        onClick={cardClick}
      >
        {/* Catalog item image and details */}
        <CardBody item={item} />
        <CardFooter item={item} path={path} onClick={onClick} />
      </StyledCard>
    </Grid>
  );
};

export default CatalogCard;
