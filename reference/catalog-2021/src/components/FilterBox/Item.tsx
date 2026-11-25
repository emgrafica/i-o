import React from 'react';
import { Box, Form, Grid } from '@lumos/core';
import { FilterItemLabel } from './FilterBox.style';

export interface ItemProps {
  /**
   * Checked value for the FilterBox item.
   */
  checked: boolean;
  /**
   * onChange function for the FilterBox item.
   */
  onChange: () => void;
  /**
   * Display value for the FilterBox item.
   */
  name: string;
}

/**
 * FilterBox Item sub-component
 */
const Item: React.FC<ItemProps> = props => {
  return (
    <Box>
      <Grid
        flexDirection="row"
        paddingTop="10px"
        paddingBottom="10px"
        justifyContent="space-between"
      >
        <Grid flexDirection="row" flexWrap="nowrap" alignItems="center">
          <Form.Checkbox
            value={props.name}
            id={props.name}
            onChange={props.onChange}
            marginRight={5}
            checked={props.checked}
          />
          <FilterItemLabel onClick={props.onChange}>
            {props.name}
          </FilterItemLabel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Item;
