import React from 'react';
import { Box, Grid, Typography } from '@lumos/core';
import { CatalogModel } from '.';
import noImage from 'assets/images/noimage_computer.png';
import ImageLoader from 'components/ImageLoader';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

export interface CardBodyProps {
  /**
   * Selected item from catalog
   */
  item: CatalogModel;
}

const CardBody: React.FC<CardBodyProps> = ({
  item: { productOverlay, catalogItemImage, catalogItemName, description },
}) => {
  const breakpoint = useBreakpoint();
  const body2LineHeight = 1.27;
  const maxLineCount = 2;
  return (
    <Grid flexDirection={{ xxs: 'row', md: 'column' }} height="85%">
      <Grid
        justifyContent="center"
        marginBottom={4}
        opacity={productOverlay ? 0.3 : 1}
      >
        <ImageLoader
          imageName={catalogItemName}
          imageUrl={catalogItemImage}
          width={breakpoint >= Breakpoint.md ? '100%' : '100px'}
          height={breakpoint >= Breakpoint.lg ? '150px' : '100px'}
          defaultImage={noImage}
        />
      </Grid>
      <Box marginLeft={breakpoint >= Breakpoint.md ? '0px' : '5px'}>
        <Typography
          id="catalogItemName"
          kind="body1"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="18px"
          color="primary.0"
          style={{ minHeight: 35, maxHeight: 35 }}
          marginY={{ xxs: 0, md: 4 }}
        >
          {catalogItemName}
        </Typography>
        <Typography
          id="description"
          kind="body2"
          marginTop={{ xxs: 0, md: 2 }}
          marginBottom={1}
          lineHeight="16px"
          paddingTop="10px"
          display="-webkit-box"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLineCount,
            minHeight: 34,
            maxHeight: `${body2LineHeight * maxLineCount}rem`,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default CardBody;
