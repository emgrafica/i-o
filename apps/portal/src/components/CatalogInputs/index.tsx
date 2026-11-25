import React from 'react';
import { Grid, Pagination } from '@lumos/core';
import Refine from '../Refine';
import SortBy from '../SortBy';

export interface RefineProps {
  refineValue: string;
  handleRefineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SortByProps {
  handleSetSortBy: (selectedItem: string) => void;
  options: any[];
  sortBy: string;
}

export interface PaginationProps {
  totalHits: number;
  pageCount: number;
  currentPageNumber: number;
  handlePaginationClick: (pageNumber: number) => void;
}

export interface CatalogInputProps {
  refineProps: RefineProps;
  sortByProps: SortByProps;
  paginationProps: PaginationProps;
}

// Max catalog models per page
const MAX_ITEMS_PER_PAGE = 24;

// defaultValue prop for SortBy
const DEFAULT_SORT_BY_VALUE = {
  label: 'Price: Low to High',
  value: 'Price Low to High',
};

/*
 *  Maps the SortBy value to its corresponding label value
 *  This label is required to create the appropriate shape for SortBy's selectedOption prop
 */
const SORT_BY_LABEL_MAP: { [index: string]: string } = {
  'Price Low to High': 'Price: Low to High',
  'Price High to Low': 'Price: High to Low',
  'Name A to Z': 'Name: A to Z',
  'Name Z to A': 'Name: Z to A',
};

/**
 * Groups the input elements within CatalogPage
 */
const CatalogInputs: React.FC<CatalogInputProps> = props => {
  const {
    refineProps: { refineValue, handleRefineChange },
    sortByProps: { handleSetSortBy, options, sortBy },
    paginationProps: {
      totalHits,
      pageCount,
      currentPageNumber,
      handlePaginationClick,
    },
  } = props;
  const selectedOption = {
    label: SORT_BY_LABEL_MAP[sortBy] as string,
    value: sortBy,
  };
  return (
    <Grid flexDirection="row" justifyContent="space-between">
      <Grid flexDirection="row" justifyContent="flex-start">
        <Refine inputValue={refineValue} onChange={handleRefineChange} />
        <SortBy
          onChange={handleSetSortBy}
          options={options}
          defaultOption={DEFAULT_SORT_BY_VALUE}
          selectedOption={selectedOption}
        />
      </Grid>
      <Grid justifyContent="flex-end">
        {totalHits > MAX_ITEMS_PER_PAGE && (
          <Pagination
            pageCount={pageCount}
            currentPageNumber={currentPageNumber}
            onChange={handlePaginationClick}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default CatalogInputs;
