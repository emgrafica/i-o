/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { GET_SUPPORT_SEARCH } from 'graphql/queries/GetSupportSearch';
import { KnowledgeArticleLanguageCode } from 'gqlTypes/globalTypes';
import {
  GetSupportSearch,
  GetSupportSearchVariables,
} from 'graphql/queries/gqlTypes/GetSupportSearch';
import {
  Grid,
  Pagination,
  Box,
  Typography,
  Alert,
  SideSheet,
} from '@lumos/core';
import { WorkOutline } from '@material-ui/icons';
import PageTemplate from 'components/PageTemplate';
import BackButton from 'components/BackButton';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import ShowFor from 'components/ShowFor';
import { GetSupportPath, GetSupportSearchPath } from 'utils/routes';
import { useKnowledgeArticlesLanguage } from 'store';
import Tabs, { TabLabel } from './Tabs';
import KnowledgeArticleList from './KnowledgeArticleList';
import BusinessApplicationList from './BusinessApplicationList';
import BusinessApplicationFilters from './BusinessApplicationFilters';
import { BusinessFilterButton } from './BusinessFilterButton';
import SkeletonCard from './SkeletonCard';
import RetryQuery from 'components/RetryQuery';

// Max search results per page
const MAX_ITEMS_PER_PAGE = 24;

/**
 * Get Support Search Page
 */
const GetSupportSearchPage: React.FC = () => {
  const { t } = useTranslation('getSupportSearch');
  const history = useHistory();
  const location = useLocation();
  const [businessFilters, setBusinessFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [isFilterSideSheetOpen, setIsFilterSideSheetOpen] = useState(false);

  // initialize page numbers and activeTab states
  const [knowledgeArticlePageNumber, setKnowledgeArticlePageNumber] = useState(
    1,
  );
  const [
    businessApplicationPageNumber,
    setBusinessApplicationPageNumber,
  ] = useState(1);

  // get params from url
  const {
    q: urlKeywords,
    language: urlLanguageCode,
    type: urlActiveTab,
  } = queryString.parse(location.search);

  const [
    knowledgeArticlesLanguage,
    setKnowledgeArticlesLanguage,
  ] = useKnowledgeArticlesLanguage();

  // set keywords, languageCode and activeTab based on url params
  // or sensible defaults if missing
  const keywords = typeof urlKeywords === 'string' ? urlKeywords : '';
  const activeTab =
    urlActiveTab === 'application'
      ? TabLabel.BusinessApplications
      : urlActiveTab === 'knowledge'
      ? TabLabel.KnowledgeArticles
      : null;

  // set global knowledgeArticlesLanguage with the language in the url
  // when the component renders for the first time
  useEffect(() => {
    const languageCode =
      typeof urlLanguageCode === 'string' &&
      urlLanguageCode in KnowledgeArticleLanguageCode
        ? (urlLanguageCode as KnowledgeArticleLanguageCode)
        : knowledgeArticlesLanguage;
    setKnowledgeArticlesLanguage(languageCode);
  }, []);

  // update url when the knowledgeArticlesLanguage global state changes
  useEffect(() => {
    const { q, type } = queryString.parse(location.search);
    const query = queryString.stringify({
      language: knowledgeArticlesLanguage,
      type,
      q,
    });
    history.replace(`${GetSupportSearchPath}?${query}`);
  }, [knowledgeArticlesLanguage]);

  // redirect to get support if url is incorrect,
  // this includes having no keywords
  if (!location.search || !keywords) history.replace(GetSupportPath);

  const { data, loading, error, refetch } = useQuery<
    GetSupportSearch,
    GetSupportSearchVariables
  >(GET_SUPPORT_SEARCH, {
    variables: {
      keywords,
      knowledgeArticleLanguage: knowledgeArticlesLanguage,
      knowledgeArticlePageNumber,
      businessApplicationPageNumber,
      pageSize: MAX_ITEMS_PER_PAGE,
      businessApplicationBusinessFilter: activeFilter
        ? activeFilter
        : undefined,
    },
    onCompleted: () => {
      data &&
        data.businessApplicationSearch &&
        data.businessApplicationSearch.businessFilters &&
        setBusinessFilters(data.businessApplicationSearch.businessFilters);
    },
  });

  useEffect(() => {
    setBusinessApplicationPageNumber(1);
    setKnowledgeArticlePageNumber(1);
  }, [keywords, knowledgeArticlesLanguage]);

  const addTabToUrl = (tabLabel: TabLabel) => {
    const query = queryString.stringify({
      q: keywords,
      language: knowledgeArticlesLanguage,
      type: tabLabel,
    });
    history.replace(`${GetSupportSearchPath}?${query}`);
  };

  let tabContent;
  if (error) tabContent = <RetryQuery onRetry={refetch} />;
  else if (loading)
    tabContent = (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  else if (data && activeTab) {
    let totalItems, totalPages, items, list, pageNumber, setPageNumber;
    if (activeTab === TabLabel.KnowledgeArticles) {
      ({ totalItems, totalPages, items } = data.knowledgeArticleSearch);
      list = <KnowledgeArticleList items={items} />;
      pageNumber = knowledgeArticlePageNumber;
      setPageNumber = setKnowledgeArticlePageNumber;
    } else {
      ({ totalItems, totalPages, items } = data.businessApplicationSearch);
      list = <BusinessApplicationList items={items} />;
      pageNumber = businessApplicationPageNumber;
      setPageNumber = setBusinessApplicationPageNumber;
    }
    tabContent = (
      <>
        <ShowFor tabletAndLarger>
          {activeTab === TabLabel.BusinessApplications &&
            knowledgeArticlesLanguage !== KnowledgeArticleLanguageCode.en && (
              <Alert
                marginTop="16px"
                marginBottom="0px"
                kind="active"
                compact
                fullWidth
                message={t('showingEnglishResults')}
              />
            )}
        </ShowFor>
        <Typography kind="body2" marginTop="20px" marginBottom="0">
          {t('showingResultsFor', { totalItems, keywords })}
        </Typography>
        {list}
        {totalPages > 1 && (
          <Grid alignSelf="flex-end" marginTop="24px">
            <Pagination
              pageCount={totalPages}
              currentPageNumber={pageNumber}
              onChange={setPageNumber}
            />
          </Grid>
        )}
      </>
    );
  }

  // get knowledgeArticleCount and businessApplicationCount
  // and push the new selected tab to the url
  let knowledgeArticleCount, businessApplicationCount;
  if (!loading && data) {
    knowledgeArticleCount = data.knowledgeArticleSearch.totalItems;
    businessApplicationCount = data.businessApplicationSearch.totalItems;
    if (!activeTab) {
      let selectedTab =
        businessApplicationCount && !knowledgeArticleCount
          ? TabLabel.BusinessApplications
          : TabLabel.KnowledgeArticles;

      // NOTE: The function `addTabToUrl` internally
      // calls `history.replace`, calling `history.replace`
      // inside the render function causes a warning
      // because the render should be a pure function
      // without side effects. I am using `setTimeout` to delay
      // the call so it happens outside the render function
      // to keep it pure.
      setTimeout(() => {
        addTabToUrl(selectedTab);
      }, 0);
    }
  }

  return (
    <>
      <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
        <Grid flexDirection={{ xxs: 'column', lg: 'row' }} height="100%">
          <Grid flexDirection="column" marginTop="6px" width={{ lg: '220px' }}>
            <BackButton
              text={t('common:back')}
              to={{ pathname: GetSupportPath }}
            />
            <ShowFor desktopAndLarger>
              {activeTab === TabLabel.BusinessApplications &&
                businessFilters.length > 0 && (
                  <BusinessApplicationFilters
                    businessFilters={businessFilters}
                    onChange={filter => {
                      setBusinessApplicationPageNumber(1);
                      setActiveFilter(filter);
                    }}
                    currentFilter={activeFilter}
                  />
                )}
            </ShowFor>
          </Grid>
          <Grid marginX={{ lg: '40px' }} flexDirection="column" width="100%">
            <Grid flexDirection={{ xxs: 'column', sm: 'row' }}>
              <Grid flexDirection="column" width="100%">
                <GetSupportSearchInput initialKeywords={keywords} />
              </Grid>
              <ShowFor tabletAndSmaller>
                {activeTab === TabLabel.BusinessApplications &&
                  businessFilters.length > 0 && (
                    <Box>
                      <BusinessFilterButton
                        withIconOnLeft={<WorkOutline />}
                        onClick={() => setIsFilterSideSheetOpen(true)}
                        width={{ xxs: '151px', sm: '162px' }}
                        marginLeft={{ xxs: '0px', sm: '24px' }}
                        marginBottom={{ xxs: '12px', sm: '0px' }}
                      >
                        {t('businessFiltersLabel')}
                      </BusinessFilterButton>
                    </Box>
                  )}
              </ShowFor>
            </Grid>

            <Box marginTop="15px">
              {activeTab && (
                <Tabs
                  activeTab={activeTab}
                  onClick={addTabToUrl}
                  knowledgeArticleCount={knowledgeArticleCount}
                  businessApplicationCount={businessApplicationCount}
                />
              )}
            </Box>
            {tabContent}
          </Grid>
        </Grid>
        <SideSheet
          isOpen={isFilterSideSheetOpen}
          onRequestClose={() => setIsFilterSideSheetOpen(false)}
        >
          <BusinessApplicationFilters
            businessFilters={businessFilters}
            sideSheetVersion
            onChange={filter => {
              setIsFilterSideSheetOpen(false);
              setBusinessApplicationPageNumber(1);
              setActiveFilter(filter);
            }}
            currentFilter={activeFilter}
          />
        </SideSheet>
      </PageTemplate>
    </>
  );
};

export default GetSupportSearchPage;
