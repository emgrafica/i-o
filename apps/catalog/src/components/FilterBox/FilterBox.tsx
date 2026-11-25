import React from 'react';
import Category from './Category';
import { CategoryProps } from './Category';
import Item from './Item';
import { ItemProps } from './Item';

/**
 * Composition of composite components that the FilterBox component exposes
 * @interface FilterBoxComposition
 */
export interface FilterBoxComposition {
  /**
   * Section component for containing related form items
   */
  Category: React.FC<CategoryProps>;
  /**
   * Sub-component of `FilterBox` for wrapping form inputs.
   */
  Item: React.FC<ItemProps>;
}

/**
 * Component to handle selection of filterable data
 */
const FilterBox: React.FC & FilterBoxComposition = props => (
  <div>{props.children}</div>
);

FilterBox.Category = Category;
FilterBox.Item = Item;

export default FilterBox;
