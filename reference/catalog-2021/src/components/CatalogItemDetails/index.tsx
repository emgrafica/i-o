import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, Box } from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import BackButton from '../BackButton';
import Pricing from '../Pricing';
import { Pricing as SelectedPricing } from 'pages/CatalogItemPage/utils';
import {
  CatalogItemDetails_catalogItem,
  CatalogItemDetails_catalogItem_computerCatalogInfo_configurations,
  CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import noImage from 'assets/images/noimage_computer.png';
import ImageLoader from 'components/ImageLoader';
import Skeleton from 'react-loading-skeleton';
import SkeletonItemPriceDetails from './SkeletonCatalogItemDetails/SkeletonItemPriceDetails';
import SkeletonItemDescription from './SkeletonCatalogItemDetails/SkeletonItemDescription';
import ModelSpecifications from './ModelSpecifications';
import SkeletonModelSpecification from './SkeletonModelSpecification';

interface CatalogItemDetailsProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;

  /**
   * path when Back is clicked
   */
  backButtonPath: string;

  /**
   * Selected catalog item
   */
  catalogItem: CatalogItemDetails_catalogItem | null | undefined;

  /**
   * Item Pricing
   */
  pricing: SelectedPricing | null;
  loading: boolean;

  selectedConfiguration:
    | CatalogItemDetails_catalogItem_computerCatalogInfo_configurations
    | CatalogItemDetails_catalogItem_accessoryCatalogInfo_informationalSpecs
    | undefined;
}

/**
 * Detailed view of selected catalog item
 * Provides the name, image, and brief description of the catalog item
 * @param props
 */
const CatalogItemDetails: React.FC<CatalogItemDetailsProps> = ({
  backButtonPath,
  catalogItem,
  pricing,
  selectedConfiguration,
  loading,
  catalogItemClass,
}) => {
  const { t } = useTranslation();
  const catalogItemName = catalogItem ? catalogItem.catalogItemName : '';
  const catalogItemImage = catalogItem ? catalogItem.catalogItemImage : '';
  const description = catalogItem ? catalogItem.description : '';

  //-----------------------------------------------------------
  // Set Model Specification data to be displayed for Computer.
  //-----------------------------------------------------------
  const isComputer = catalogItemClass === CatalogItemClass.computer;
  let areSpecificationsVisible = false;
  let specifications: {
    label: string;
    value: string | null;
  }[] = [];
  if (isComputer) {
    const { displaySkuSpecs } =
      (selectedConfiguration as CatalogItemDetails_catalogItem_computerCatalogInfo_configurations) ||
      {};
    specifications = displaySkuSpecs || [];
    areSpecificationsVisible = Boolean(
      specifications && specifications.length > 0,
    );
  }

  return (
    <Grid flexDirection="column" marginRight="auto">
      <BackButton
        text={t('common:backToCatalog')}
        to={{ pathname: backButtonPath, state: { force: true } }}
      />
      <Box>
        {loading ? (
          <SkeletonItemPriceDetails />
        ) : (
          <Box>
            <Typography
              kind="h5"
              color="primary.2"
              marginTop={0}
              marginBottom={15}
            >
              {catalogItemName}
            </Typography>
            {/* Price */}
            {pricing && <Pricing pricing={pricing} />}
          </Box>
        )}

        {/* Image */}
        {loading ? (
          <Box paddingTop="36px">
            <Skeleton width="90%" height="360px" />
          </Box>
        ) : (
          <ImageLoader
            imageName={catalogItemName}
            imageUrl={catalogItemImage}
            width="90%"
            height="360px"
            defaultImage={noImage}
          />
        )}

        {/* Item Description */}
        {loading ? (
          <SkeletonItemDescription />
        ) : (
          <Typography
            kind="body2"
            width="100%"
            color="primary.1"
            marginTop="38px"
          >
            {description}
          </Typography>
        )}

        {/* Model Specifications */}
        {isComputer &&
          (loading ? (
            <SkeletonModelSpecification />
          ) : (
            areSpecificationsVisible && (
              <ModelSpecifications specifications={specifications} />
            )
          ))}
      </Box>
    </Grid>
  );
};

export default CatalogItemDetails;
