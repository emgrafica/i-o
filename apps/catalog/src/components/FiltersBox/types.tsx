export interface FilterNode {
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * The filter name translated to the selected language
   */
  filterNameI18n?: string;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Child filters that this filter has
   */
  children: FilterNode[] | null;

  isChecked: boolean;
}

/**
 * Props for FiltersBox
 */
export interface FiltersBoxProps {
  loading: Boolean;
  error: Boolean;
  filters: FilterNode[];
  refetch?: Function;
  width?: string;
  onFilterChange: (
    filter: FilterNode,
    filterParent: FilterNode | null,
    filterType: string,
  ) => void;
  handleClearFilters?: () => void;
}
