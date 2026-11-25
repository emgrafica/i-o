// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { IoInput } from '@i-o/design-system';
import { Grid, Box, Typography, SideSheet } from '@lumos/core';
import PageTemplate from 'components/PageTemplate';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import { GetSupportPath, GetSupportSearchPath } from 'utils/routes';
import KnowledgeArticleList from './KnowledgeArticleList';
import BusinessApplicationFilters from './BusinessApplicationFilters';
import SkeletonCard from './SkeletonCard';
import {
  searchAllKnowledge,
  getFilterKnowledgeBaseAndCategory,
} from 'services/knowledgeServices';
import TopSection from 'pages/GetSupportPage/TopSection';
import {
  BorderBox,
  StyledCircularProgress,
  StyledViewMoreLink,
  StyledButton,
} from './index.style';
import { AUTH } from 'constants/authConstants';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import UserService from 'services/userServices';

const sortList = [
  { value: 'relevancy,true', label: 'Relevance' },
  { value: 'sys_view_count,true', label: 'Views' },
  { value: 'published,true', label: 'Newest' },
  { value: 'rating,true', label: 'Rating' },
];
/**
 * Get Support Search Page
 */
const GetSupportSearchPage: React.FC = () => {
  const { t } = useTranslation('getSupportSearch');
  const history = useHistory();
  const location = useLocation();
  // get params from url
  let { q: urlKeywords, knowledge_base = [], cate = [], order_by = 'relevancy,true' } = queryString.parse(location.search);

  // set keywords, languageCode and activeTab based on url params
  // or sensible defaults if missing
  const keywords = typeof urlKeywords === 'string' ? urlKeywords : '';
  knowledge_base = Array.isArray(knowledge_base) ? knowledge_base : [knowledge_base];
  cate = Array.isArray(cate) ? cate : [cate];

  // this includes having no keywords
  if (!location.search || !keywords) history.replace(GetSupportPath);

  const [dataFilters, setDataFilters] = useState([]);
  const [listKBaseFilters, setListKBFilters] = useState([]);
  const [listCategoryFilters, setListCategoryFilters] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>(knowledge_base);
  const [category, setCategory] = useState<string[]>(cate);
  const [orderBy, setOrderBy] = useState<string>(order_by);
  const [businessFilters] = useState<string[]>([]);
  const [pageSize] = useState(6);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [isFilterSideSheetOpen, setIsFilterSideSheetOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  let currentUser: any = UserService.getCurrentUser();

  const generateKBSearchURL = (value: string) => {
    if (value) {
      const query = queryString.stringify({
        q: value,
        order_by: orderBy,
        knowledge_base: knowledgeBase,
        cate: category
      }, { arrayFormat: 'separator' });
      history.push(`${GetSupportSearchPath}?${query}`);
    }
  };

  const onKBSearch = (value: string) => {
    setKnowledgeBase([]);
    setListKBFilters([]);
    setCategory([]);
    setListCategoryFilters([]);
    setOrderBy('relevancy,true')
    setPageIndex(1);
    generateKBSearchURL(value);
  }

  useEffect(() => {
    setLoading(true);
    setPageIndex(1);
    getFilterKnowledgeBaseAndCategory({
      keyword: keywords,
      user_name: currentUser.user_name,
      knowledge_bases: knowledgeBase,
      categories: category,
    }).then(response => {
      if (response?.data) {
        if (!knowledgeBase.length || !listKBaseFilters.length) {
          setListKBFilters(response?.data?.knowledge_base);
        }
        if (!category.length || !listCategoryFilters.length) {
          setListCategoryFilters(response?.data?.category_tree);
        }
      }
    });
    searchAllKnowledge({
      keyword: keywords,
      page_size: pageSize,
      page_index: 1,
      user_name: currentUser.user_name,
      knowledge_bases: knowledgeBase,
      categories: category,
      order_by: orderBy,
    }).then(response => {
      if (response?.data) {
        const responseData = response.data;
        setDataFilters(responseData?.data);
        setTotalItems(responseData?.totalCount);
      }
      setLoading(false);
    });
    generateKBSearchURL(keywords);
  }, [knowledgeBase, category, orderBy]);

  useEffect(() => {
    if (pageIndex > 1) {
      setLoadingMore(true);
      searchAllKnowledge({
        keyword: keywords,
        page_size: pageSize,
        page_index: pageIndex,
        user_name: currentUser.user_name,
        knowledge_bases: knowledgeBase,
        categories: category,
        order_by: orderBy,
      }).then(response => {
        if (response?.data) {
          const responseData = response.data;
          setDataFilters([...dataFilters, ...responseData?.data]);
        }
        setLoadingMore(false);
      });
    }
  }, [pageIndex]);

  let tabContent;
  if (isLoading)
    tabContent = (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  else if (dataFilters) {
    let totalPages, list, itemsCount;
    list = (
      <KnowledgeArticleList items={dataFilters.length ? dataFilters : []} />
    );
    itemsCount = dataFilters.length;
    totalPages = Math.floor(totalItems / pageSize) || 0;
    tabContent = (
      <>
        {list}
        {itemsCount !== 0 &&
          itemsCount < totalItems &&
          (isLoadingMore ? (
            <Grid alignItems="center" flexDirection="column" width="100%">
              <StyledCircularProgress />
            </Grid>
          ) : (
            <StyledViewMoreLink
              onClick={() => setPageIndex(pageIndex + 1)}
              fontWeight="bold"
              color="grayScale.10"
              kind="body2"
              marginX={2}
            >
              View More Results
            </StyledViewMoreLink>
          ))}
      </>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  return (
    <>
      <Box
        backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
        backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
        minHeight={120}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundColor="#FFFFFF"
        justifyContent="center"
      >
        <Grid justifyContent="center" height="100%">
          <Grid flexDirection="column" width="100%"
            maxWidth={{
              xs: '340px',
              sm: '670px',
              lg: '1095px',
              xl: '1400px',
              xxl: '1400px',
            }}>
            <GridLayout columnGutters={0}>
              <Row marginBottom={6} justifyContent="center">
                <Box width={{ xs: 1, md: 0.8, lg: 1 / 2 }}>
                  <Box paddingTop="20px" display="flex" justifyContent="center">
                    <GetSupportSearchInput firstName={currentUser.first_name} initialKeywords={keywords} hasAnimation={true} onSearch={onKBSearch} />
                  </Box>
                </Box>
              </Row>
            </GridLayout>
          </Grid>
        </Grid>
      </Box>
      
        <TopSection>
          <Typography
            id="pageTitle"
            kind="h1"
            fontWeight="bold"
            fontSize={{ xxs: 3, md: 7 }}
            marginTop={{ xxs: '12px', md: '20px' }}
            marginBottom={2}
            color="grayScale.10"
          >
            Support Center
          </Typography>
        </TopSection>

      <PageTemplate title={t('title')} paddingTop={{ xxs: '14px', md: '0px' }} backgroundColor="linear-gradient(135deg,#eceef1,#eceef1)">
      <Box
        borderBottom=" 1px solid #cacaca;"
        marginBottom={2}
      />
        <Grid flexDirection={{ xxs: 'column' }} height="100%">
          <Grid flexDirection="column" width="100%">
            <GridLayout columnGutters={0}>
              {/* <Row borderBottom=" 1px solid #cacaca;">
                </Row> */}
              <Row>
                <Col
                  backgroundColor=""
                  colspan={{ xs: '12', md: '3', lg: '3' }}
                >
                  {/* <Grid
                    paddingRight={{ xs: '0px', md: '12px', lg: '12px' }}
                    flexDirection="column"
                    width="100%"
                  >
                    <Typography
                      id="topResult"
                      kind="h5"
                      fontWeight="bold"
                      fontSize={3}
                      marginTop="0"
                      marginLeft={2}
                      marginBottom={2}
                      color="grayScale.10"
                    >
                      New Search
                    </Typography>
                    <GetSupportSearchInput firstName={currentUser.first_name} initialKeywords={keywords} hasAnimation={false} onSearch={onKBSearch} />
                  </Grid> */}
                  {totalItems !== 0 ? (
                    <Box display="flex-start" margin={2}>
                      {!showFilter ? (
                        <StyledButton
                          startIcon={<VisibilityIcon />}
                          size="small"
                          onClick={() => setShowFilter(true)}
                        >
                          Show Filters
                        </StyledButton>
                      ) : (
                        <StyledButton
                          startIcon={<VisibilityOffIcon />}
                          size="small"
                          onClick={() => setShowFilter(false)}
                        >
                          Hide Filters
                        </StyledButton>
                      )}
                    </Box>
                  ) : (
                    ''
                  )}
                  {totalItems !== 0 && <Box display={showFilter ? '' : 'none'}>
                    <BorderBox
                      marginTop={4}
                      paddingRight={{ xs: '0px', md: '12px', lg: '12px' }}
                    >
                      <Typography
                        kind="body2"
                        margin="-10px 0 0 10px"
                        backgroundColor="#eceef1"
                        width="max-content"
                      >
                        Knowledge Base
                      </Typography>
                      <Box margin="15px 0">
                        <IoInput.SelectTreeComponent
                          selectedItems={knowledgeBase}
                          data={listKBaseFilters}
                          label="Knowledge Base"
                          multiple={true}
                          onChange={setKnowledgeBase}
                        />
                      </Box>
                    </BorderBox>
                    <BorderBox
                      marginTop="15px"
                      paddingRight={{ xs: '0px', md: '12px', lg: '12px' }}
                    >
                      <Typography
                        kind="body2"
                        margin="-10px 0 0 10px"
                        backgroundColor="#eceef1"
                        width="max-content"
                      >
                        Category
                      </Typography>
                      <Box margin="15px 0">
                        <IoInput.SelectTreeComponent
                          selectedItems={category}
                          data={listCategoryFilters}
                          label="Category"
                          multiple={true}
                          onChange={setCategory}
                        />
                      </Box>
                    </BorderBox>
                  </Box>}
                </Col>
                <Col colspan={{ xs: '12', md: '9', lg: '9' }}>
                  <Box paddingLeft={{ xs: '0px', md: '12px', lg: '0px' }}>
                    <Row>
                      <Col colspan={{ xs: '12', md: '6', lg: '6' }}>
                        <Typography
                          id="topResult"
                          kind="h5"
                          fontWeight="bold"
                          fontSize={3}
                          marginTop="0"
                          marginLeft={2}
                          marginBottom={2}
                          color="grayScale.10"
                        >
                          Top Results
                        </Typography>
                        <Typography kind="body2" margin={2}>
                          {t('showingResultsFor', { totalItems, keywords })}
                        </Typography>
                      </Col>
                      <Col
                        alignItems="flex"
                        flexDirection="row"
                        colspan={{ xs: '12', md: '6', lg: '6' }}
                      >
                        {totalItems !== 0 ? (
                          <Box marginLeft={2}>
                            <Typography
                              id="topResult"
                              kind="h5"
                              fontWeight="bold"
                              fontSize={3}
                              marginTop="0"
                              marginBottom={2}
                              color="grayScale.10"
                            >
                              Sort By:
                            </Typography>
                            <IoInput.RadioGroupComponent
                              isRow={true}
                              data={sortList}
                              selected={orderBy}
                              onChange={e => setOrderBy(e.target.value)}
                            ></IoInput.RadioGroupComponent>
                          </Box>
                        ) : (
                          ''
                        )}
                      </Col>
                    </Row>
                    {tabContent}
                  </Box>
                </Col>
              </Row>
            </GridLayout>
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
