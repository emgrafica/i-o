import { FilterNode } from 'components/FiltersBox/types';
import i18next from 'i18next';

/**
 * It returns the associated translated requestStatus label.
 * @param status to be translated
 * Should align with RequestStatusType enum in globalTypes file
 */
export const getRequestStatusI18nKey = (
  status:
    | 'Approval'
    | 'InProgress'
    | 'Pending'
    | 'Completed'
    | 'Cancelled'
    | 'Declined'
    | 'Error'
    | 'OnHold',
): string => {
  return `enums:RequestStatusType:${status}`;
};

/**
 * It returns the associated translated requestReason label.
 * @param reasonForRequest to be translated.
 * Should align with ReasonForRequestLabel enum in globalTypes file
 */
export const getReasonForRequestI18nKey = (
  reasonForRequest:
    | 'primary'
    | 'additional'
    | 'temporary'
    | 'newGcomService'
    | 'refreshReplacement'
    | 'earlyReplacement'
    | 'missingReplacement'
    | 'brokenReplacement'
    | 'return'
    | 'reassign'
    | 'specialRequest'
    | 'changeExistingService'
    | 'specialChangeRequest'
    | 'terminateService'
    | 'newAccessory',
): string => {
  return `enums:ReasonForRequestLabel:${reasonForRequest}`;
};

interface ResourceFilter {
  /**
   * Name of the filter
   */
  filterName: string;
  /**
   * Whether or not this is a filterable property
   */
  filterable: boolean;
  /**
   * Whether or not the filter name should be displayed
   */
  displayFilterName: boolean;
  /**
   * Child filters that this filter has
   */
  children?: ResourceFilter[] | null;
}

export function parseToFilterNodes(
  requestFilters: ResourceFilter[],
): FilterNode[] {
  return requestFilters.map<FilterNode>(filter => {
    return {
      ...filter,
      isChecked: false,
      children:
        'children' in filter
          ? filter.children
            ? parseToFilterNodes(filter.children)
            : null
          : null,
    };
  });
}

export function getFilters<T>(f: FilterNode, mapper: Record<string, T>): T[] {
  let filters = [];
  if (f.children) {
    for (const child of f.children) {
      if (child.isChecked) {
        filters.push(mapper[child.filterName]);
      }
    }
  }

  return filters;
}

export type FilterPair = { filter: FilterNode; filterParent: FilterNode };
/**
 * Flatten all filters into one filter array
 * @param filters
 */
export const getSelectedFilters = (filters: FilterNode[]): FilterPair[] => {
  const allFilters: FilterPair[] = [];
  for (const filter of filters) {
    if (filter.children) {
      allFilters.push(
        ...filter.children
          .filter(f => f.isChecked)
          .map(f => ({ filter: f, filterParent: filter })),
      );
    }
  }
  return allFilters;
};

/* Translates a filter name */
export const translateFilterName = (filterName: string): string => {
  return i18next.t(`requests:filters.${filterName}`);
};

/**
 * Translates a filter node (and all its children recursively).
 * Stores the translation in the field `filterNameI18n`,
 * of the received `filter` argument
 */
export const translateFilterNode = (filter: FilterNode) => {
  filter.filterNameI18n = translateFilterName(filter.filterName);
  if (filter.children) filter.children.forEach(translateFilterNode);
};
