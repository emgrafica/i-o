import React from 'react';
import { Grid, Typography } from '@lumos/core';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues as MobilityInputValue } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import ImageLoader from 'components/ImageLoader';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

export interface TileBodyProps {
  /**
   * Input Value renderer
   */
  inputValue: MobilityInputValue;
}

const TileBody: React.FC<TileBodyProps> = ({
  inputValue: { value, image },
}) => {
  const breakpoint = useBreakpoint();
  return (
    <Grid flexDirection={{ xxs: 'row', md: 'column' }}>
      {image ? (
        <ImageLoader
          imageName={value}
          imageUrl={image}
          width={breakpoint >= Breakpoint.md ? '100%' : '100px'}
          height={breakpoint >= Breakpoint.lg ? '150px' : '100px'}
          defaultImage={''}
        />
      ) : null}

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
        {value}
      </Typography>
    </Grid>
  );
};

export default TileBody;
