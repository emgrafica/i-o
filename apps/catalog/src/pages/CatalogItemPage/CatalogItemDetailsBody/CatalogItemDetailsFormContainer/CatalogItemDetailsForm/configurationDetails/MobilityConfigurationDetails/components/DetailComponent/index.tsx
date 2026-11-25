import React from 'react';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues as MobilityInputValue } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import { Grid, Typography } from '@lumos/core';
import TileList from '../TileList';

/**
 * Props for DetailComponent
 */
export interface DetailComponentProps {
  title: string;
  inputValues: MobilityInputValue[];
  selectedInputId?: string | null;
  onChange: (inputValue: MobilityInputValue) => void;
  isLargeTile?: boolean;
  isRequired?: boolean;
}

/**
 * Detail component
 */
const DetailComponent: React.FC<DetailComponentProps> = ({
  title,
  inputValues,
  selectedInputId,
  onChange,
  isLargeTile,
  isRequired,
}) => {
  return (
    <Grid flexDirection="column" paddingTop="20px">
      <Grid flexDirection="row" paddingBottom="10px">
        <Typography
          kind="h6"
          fontWeight="bold"
          fontSize="18px"
          lineHeight="26px"
          color="primary.0"
        >
          {title}
        </Typography>
        {isRequired && (
          <Typography
            kind="h6"
            fontWeight="bold"
            fontSize="18px"
            lineHeight="26px"
            color="state.danger"
            paddingLeft="5px"
          >
            *
          </Typography>
        )}
      </Grid>

      <TileList
        inputValues={inputValues}
        selectedInputId={selectedInputId}
        onChange={onChange}
        isLargeTile={isLargeTile}
      />
    </Grid>
  );
};

export default DetailComponent;
