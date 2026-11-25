import React, { useState } from 'react';
import { Box, Collapsible, Form, Grid } from '@lumos/core';
import FilterChevron from './FilterChevron';
import { CategoryLabel } from './FilterBox.style';

export interface CategoryProps {
  /**
   * Checked value for the FilterBox category. This is optional - if the consumer does not use
   * the prop or pass a value in, then no checkbox will be shown. Otherwise, checkbox will be
   * shown with the value passed in.
   */
  checked?: boolean;
  /**
   * onChange function for the FilterBox category.
   */
  onChange?: () => void;
  /**
   * Display value for the FilterBox category.
   */
  name: string;
}

/**
 * FilterBox Category sub-component
 */
const Category: React.FC<CategoryProps> = props => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Box
      padding={2}
      paddingLeft={0}
      paddingRight={0}
      borderBottom="1px solid #D9D8D6"
    >
      <Grid
        flexDirection="row"
        paddingTop="10px"
        paddingBottom="10px"
        justifyContent="space-between"
      >
        <Grid flexDirection="row" flexWrap="nowrap" alignItems="center">
          {props.checked !== undefined && (
            <Box>
              <Form.Checkbox
                value={props.name}
                id={props.name}
                onChange={props.onChange}
                marginRight={5}
                checked={props.checked}
              />
            </Box>
          )}
          <CategoryLabel
            hasCheckbox={props.checked !== undefined}
            onClick={() => setExpanded(!expanded)}
          >
            {props.name}
          </CategoryLabel>
        </Grid>
        <Box paddingTop={1}>
          <FilterChevron
            selected={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        </Box>
      </Grid>
      <Collapsible expand={expanded}>
        <Grid flexDirection="column" marginLeft={22} marginBottom={1}>
          {props.children}
        </Grid>
      </Collapsible>
    </Box>
  );
};

export default Category;
