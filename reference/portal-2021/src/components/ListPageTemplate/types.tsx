export interface SortByOption {
  label: string;
  value: string;
}
export interface DateRangeOption {
  label: string;
  value: string;
}

export interface RefineProps {
  refineValue: string;
  handleRefineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SortByProps {
  handleSetSortBy: (selectedItem: any) => void;
  options: SortByOption[];
  defaultSortValue: SortByOption;
  selectedOption: any;
}

export interface DateRangeProps {
  handleSetDateRange: (selectedItem: any) => void;
  options: DateRangeOption[];
  defaultDateRangeValue: DateRangeOption;
  selectedOption: any;
}

export interface PaginationProps {
  totalHits: number;
  pageCount: number;
  currentPageNumber: number;
  maxItemsPerPage: number;
  handlePaginationClick: (pageNumber: number) => void;
}
