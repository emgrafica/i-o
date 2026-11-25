import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { ApolloError } from 'apollo-client';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageTemplate from 'components/PageTemplate';
import { useDebounce } from 'utils/useDebounce';
import { useCatalogStatus } from 'store';
import { showWipCatalogFilters } from 'utils/showWorkInProgress';
import { CatalogPageContext } from './CatalogPageContext';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import {
  CATALOG_DATA,
  CATALOG_SORT_OPTIONS,
  CATALOG_ALERT_WELL,
  USER_PROFILE_REQUEST,
  CATALOG_ENTITLEMENT,
} from 'graphql/queries';
import {
  CatalogData,
  CatalogDataVariables,
} from 'graphql/queries/gqlTypes/CatalogData';
import {
  CatalogAlertWell,
  CatalogAlertWellVariables,
} from 'graphql/queries/gqlTypes/CatalogAlertWell';
import {
  UserProfileRequest,
  UserProfileRequestVariables,
} from 'graphql/queries/gqlTypes/UserProfileRequest';
import CatalogContent from './CatalogContent';
import {
  MAX_ITEMS_PER_PAGE,
  SORT_PRICE_LOW_TO_HIGH,
  titleMap,
  subTitleMap,
} from './utils';
import { LeaveModal } from 'components';
import {
  useReplacementInfo,
  useSetReplacementInfo,
  useOBOInfoLocalState,
} from '../../store/apollo/store/hooks';
import CatalogUnentitledMessage from 'components/CatalogUnentitledMessage';
import { getSelectedFilters } from './CatalogContent/utils';
import { CATALOG_FILTERS } from 'graphql/queries';
import { parseToFilterNodes } from './CatalogContent/utils';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { setFilters, resetCatalogStatus } from './statesManager';

/**
 * Props for CatalogContentProps
 */
export interface CatalogProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
}

/**
 * Catalog page
 */
const CatalogPage: React.FC<CatalogProps & RouteComponentProps> = ({
  catalogItemClass,
}) => {
  const { t } = useTranslation();
  const replacementInfo = useReplacementInfo();
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const userId = useUserId();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  //-------------------------------------------------
  // Catalog Page Status global state will manage every selection from Catalog on one single place.
  // This will guarantee to maintain the selection state on Catalog when navigating back to Catalog,
  // only if the catalogItemClass doesn't change.
  // TODO: Move currentPageNumber to catalogStatus
  //-------------------------------------------------
  const [catalogStatus, setCatalogStatus] = useCatalogStatus();
  const {
    refineValue,
    sortBy,
    filtersSelected: catalogFiltersSelected,
  } = catalogStatus;

  const setRefineValue = (value: string) => {
    setCatalogStatus({
      ...catalogStatus,
      refineValue: value,
    });
  };
  const setSortBy = (value: string) => {
    setCatalogStatus({
      ...catalogStatus,
      sortBy: value,
    });
  };
  const setFiltersSelected = (action?: {
    type: string;
    selectedFilters: string[];
  }) => {
    const type = action ? action.type : '';
    const selectedFilters = action ? action.selectedFilters : [];
    setFilters(type, selectedFilters, catalogStatus, setCatalogStatus);
  };

  const [queryError, setQueryError] = useState<string | null>();

  //-------------------------------------------------
  // Reset every selection on Catalog Page Status if catalogItemClass change
  //-------------------------------------------------
  useEffect(() => {
    if (catalogItemClass !== catalogStatus.itemClass) {
      resetCatalogStatus(catalogItemClass, setCatalogStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogItemClass]);

  //-------------------------------------------------
  // Set page number to 1 when using Refine
  //-------------------------------------------------
  const updatedRefineValue = useDebounce(refineValue, 500);
  useEffect(() => {
    setCurrentPageNumber(1);
    // Debounce is used below, because we want the page number to update
    // when the user is finished typing - just like when updating the query
    // and getting new results
  }, [updatedRefineValue]);

  //-------------------------------------------------
  // Define query variables by CatalogItemClass
  //-------------------------------------------------
  let queryVariablesByCatalogItemClass = {};
  if (catalogItemClass === CatalogItemClass.computer) {
    const memory: string[] =
      catalogFiltersSelected && catalogFiltersSelected.memory;
    const storage: string[] =
      catalogFiltersSelected && catalogFiltersSelected.storage;
    const osType: string[] =
      catalogFiltersSelected && catalogFiltersSelected.osType;
    const processor: string[] =
      catalogFiltersSelected && catalogFiltersSelected.processor;

    queryVariablesByCatalogItemClass = {
      memory: memory.length > 0 ? memory : [],
      storage: storage.length > 0 ? storage : [],
      osType: osType.length > 0 ? osType : [],
      processor: processor.length > 0 ? processor : [],
    };
  } else if (catalogItemClass === CatalogItemClass.mobility) {
    const osType: string[] =
      catalogFiltersSelected && catalogFiltersSelected.osType;

    queryVariablesByCatalogItemClass = {
      osType: osType.length > 0 ? osType : [],
    };
  }

  /**
   * Callback that handles onError event of useQuery
   *
   * @param error - Error thrown from useQuery
   */
  const handleQueryError = (error: ApolloError) => {
    setQueryError(error.message);
  };

  //-------------------------------------------------
  // Query to get Catalog Items
  //-------------------------------------------------
  const categories: string[] =
    catalogFiltersSelected && catalogFiltersSelected.categories;
  const manufacturers: string[] =
    catalogFiltersSelected && catalogFiltersSelected.manufacturers;

  const { data: catalogAlertWellData } = useQuery<
    CatalogAlertWell,
    CatalogAlertWellVariables
  >(CATALOG_ALERT_WELL, {
    variables: {
      userId: oboUser ? oboUser.userId : userId!,
      catalogClass: catalogItemClass,
    },
    errorPolicy: 'ignore',
  });

  const { loading, data, error, refetch } = useQuery<
    CatalogData,
    CatalogDataVariables
  >(CATALOG_DATA, {
    variables: {
      userId: oboUser ? oboUser.userId : userId!,
      catalogClass: catalogItemClass,
      categories: categories.length > 0 ? categories : [],
      manufacturers: manufacturers.length > 0 ? manufacturers : null,
      refine: useDebounce(refineValue, 500),
      pageNumber: currentPageNumber,
      pageSize: MAX_ITEMS_PER_PAGE,
      sortBy: sortBy.length > 0 ? sortBy : SORT_PRICE_LOW_TO_HIGH,
      ...queryVariablesByCatalogItemClass,
    },
    onError: handleQueryError,
  });

  //-------------------------------------------------
  // Query to get Catalog Items
  //-------------------------------------------------
  const { data: userData } = useQuery<
    UserProfileRequest,
    UserProfileRequestVariables
  >(USER_PROFILE_REQUEST, {
    variables: {
      userId,
    },
  });

  let preferredName: string | null = '';
  let firstName: string | null = '';
  let lastName: string | null = '';

  if (userData && userData.userProfile) {
    ({ preferredName, firstName, lastName } = userData.userProfile);
  }

  if (preferredName) {
    firstName = preferredName;
  }

  if (oboUser) {
    firstName = oboUser.firstName;
    lastName = oboUser.lastName;
  }

  const setReplacementInfo = useSetReplacementInfo();

  const exitReplacement = () => {
    setReplacementInfo(null);
  };

  /**
   * Fetches options for SortBy dropdown
   */
  const {
    data: catalogSortOptionsData,
    refetch: catalogSortOptionsRefetch,
  } = useQuery(CATALOG_SORT_OPTIONS, {
    variables: {
      catalogClass: catalogItemClass,
    },
    onError: handleQueryError,
  });

  /** Fetches data to populate catalog filter categories */
  const {
    loading: catalogFiltersLoading,
    data: catalogFiltersData,
    error: catalogFiltersError,
    refetch: catalogFiltersRefetch,
  } = useQuery(CATALOG_FILTERS, {
    variables: {
      class: catalogItemClass,
      userId: oboUser ? oboUser.userId : userId!,
    },
    skip: !showWipCatalogFilters,
  });

  // Current state of FilterBox
  const currentFilters = catalogFiltersData
    ? parseToFilterNodes(
        catalogFiltersData.catalogFilters,
        getSelectedFilters,
        catalogFiltersSelected,
      )
    : [];

  /** Fetches if user is entitled to catalog */
  const { data: catalogEntitlementData } = useQuery(CATALOG_ENTITLEMENT, {
    variables: {
      catalogClass: catalogItemClass,
      userId: oboUser ? oboUser.userId : userId!,
    },
  });

  let catalogModels = null;
  let catalogAlertWell;
  let catalogSortOptions = null;

  if (data && catalogSortOptionsData) {
    ({ catalogModels } = data);
    ({ catalogSortOptions } = catalogSortOptionsData);
  }

  if (catalogAlertWellData) {
    ({ catalogAlertWell } = catalogAlertWellData);
  }

  return (
    <PageTemplate
      hasBanner
      title={t(titleMap[catalogItemClass])}
      subtitle={t(subTitleMap[catalogItemClass])}
    >
      {/*
        Provides loading and error states of useQuery to all children in the tree.
        Now we can conditionally render children based on these states.
      */}
      <CatalogPageContext.Provider
        value={{
          loading,
          error: queryError,
          filterBoxProps: {
            loading: catalogFiltersLoading,
            error: catalogFiltersError,
            filters: currentFilters,
          },
          handleSetCatalogInfo: () => {
            //TODO: We need to consider if we really need this method. Currently it is being triggered when an Item is clicked on View button to go to PDP.
          },
        }}
      >
        {!loading &&
        catalogEntitlementData &&
        !catalogEntitlementData.catalogEntitlement.entitled ? (
          <CatalogUnentitledMessage
            catalogItemClass={catalogItemClass}
            name={`${firstName} ${lastName}`}
          />
        ) : (
          <CatalogContent
            catalogItemClass={catalogItemClass}
            catalogModels={catalogModels}
            catalogAlertWell={catalogAlertWell}
            catalogSortOptions={catalogSortOptions}
            filters={catalogFiltersSelected}
            setFilters={setFiltersSelected}
            setSortBy={setSortBy}
            sortBy={sortBy}
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            refineValue={refineValue}
            setRefineValue={setRefineValue}
            loading={loading}
            catalogModelsError={error}
            catalogModelsRefetch={() => {
              setQueryError(null);
              catalogSortOptionsRefetch();
              refetch();
            }}
            catalogFiltersRefetch={catalogFiltersRefetch}
          />
        )}
        {replacementInfo && (
          <LeaveModal
            title={t('pages:request.leaveModal.title')}
            content={t('pages:request.leaveModal.content')}
            onConfirm={exitReplacement}
          />
        )}
      </CatalogPageContext.Provider>
    </PageTemplate>
  );
};

export default withRouter(CatalogPage);
