import React, { useEffect } from 'react';
import { Grid } from '@lumos/core';
import TileBody from './TileBody';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues as MobilityInputValue } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { StyledCard } from './index.style';

interface TileComponentProps {
  /**
   * Input Value renderer.
   */
  inputValue: MobilityInputValue;

  /**
   * Is input value selected.
   */
  isSelected: boolean;

  /**
   * Click handler for tile's on click
   */
  onClick: (inputValue: MobilityInputValue) => void;

  isLargeTile?: boolean;
}
const TileComponent: React.FC<TileComponentProps> = ({
  inputValue,
  onClick,
  isSelected,
  isLargeTile,
}) => {
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (!isSelected && inputValue.default) {
      onClick(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTileClick = () => {
    onClick(inputValue);
  };

  return (
    <Grid justifyContent="left">
      {/* Tile component view */}
      <StyledCard
        minHeight="86px"
        width="100%"
        maxWidth={isLargeTile ? '497px' : '180px'}
        smBreakpoint={breakpoint <= Breakpoint.sm}
        onClick={onTileClick}
        hasFullBorder={isSelected}
      >
        {/* input value image and details */}
        <TileBody inputValue={inputValue} />
      </StyledCard>
    </Grid>
  );
};

export default TileComponent;
