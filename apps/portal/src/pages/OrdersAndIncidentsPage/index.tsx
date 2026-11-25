// @ts-nocheck
import { Box, Grid, Tabs, Typography } from '@lumos/core';
import {
  IoMultipleSelect,
  IoTicketRequest,
} from '@i-o/design-system';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import { Col, GridLayout, Row } from 'components/GridLayout';
import TicketDetail from 'components/TicketDetail';
import { AUTH } from 'constants/authConstants';
import moment from 'moment';
import { MuuriComponent } from 'muuri-react';
import TopSection from 'pages/GetSupportPage/TopSection';
import {
  BorderBox,
  StyledCircularProgress,
  StyledViewMoreLink,
} from 'pages/GetSupportSearchPage/index.style';
import SkeletonCard from 'pages/GetSupportSearchPage/SkeletonCard';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getIncidentTicket,
  getListFilterINC,
  getListFilterRITM,
  getRequestTicket,
} from 'services/ticketServices';
import DateUtils from 'utils/date';
import { PageTabs, PanelContainer, TabsContainer } from './index.style';
import { IRequestContext, ResourceType } from './types';

// Max incidents per page
export const MAX_ITEMS_PER_PAGE = 20;

/**
 * Hook that returns a RequestPage context
 * If null throw
 *
 * @return IRequestContext
 */
export const useRequestContext = (): IRequestContext => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Must be used within the "RequestPage"');
  }
  return context;
};

/**
 * This function prevents from invalid types to enter the active tab state.
 * @param type - unsafe string literal from the query string
 */
const normalizeResourceType = (type: any): ResourceType => {
  return type !== ResourceType.Requests
    ? ResourceType.Incidents
    : ResourceType.Requests;
};

/** OrdersAndIncidentsPage displays all of a user's requests (opened and closed) */
const OrdersAndIncidentsPage: React.FC = () => {
  const { t } = useTranslation('requests');
  const { pathname, search } = useLocation();
  const { type } = queryString.parse(search);
  const [activeTab, setActiveTab] = useState<ResourceType>(
    normalizeResourceType(type),
  );
  const history = useHistory();

  const onTabClick = (tabLabel: string) => {
    setActiveTab(normalizeResourceType(tabLabel));
    const params = queryString.stringify({
      type: tabLabel,
    });
    history.push(`${pathname}?${params}`);
  };

  const [dataRequest, setDataRequest] = useState([]);
  const [dataIncident, setDataIncident] = useState([]);

  const [listFilterINC, setListFilterINC] = useState(null);
  const [listFilterRITM, setListFilterRITM] = useState(null);

  const [valueFilterStatusINC, setValueFilterStatusINC] = useState<string[]>(
    [],
  );
  const [valueFilterDateINC, setValueFilterDateINC] = useState<string[]>([]);

  const [valueFilterStatusRITM, setValueFilterStatusRITM] = useState<string[]>(
    [],
  );
  const [valueFilterDateRITM, setValueFilterDateRITM] = useState<string[]>([]);

  const [pageIndexINC, setPageIndexINC] = useState(1);
  const [pageIndexRITM, setPageIndexRITM] = useState(1);

  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);

  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : null;

  const [countItems, setCountItems] = useState(0);

  const [selectedObjStatusINC, setSelectedObjStatusINC] = useState([]);
  const [selectedObjStatusRITM, setSelectedObjStatusRITM] = useState([]);

  const [selectedObjDateINC, setSelectedObjDateINC] = useState([]);
  const [selectedObjDateRITM, setSelectedObjDateRITM] = useState([]);

  const [checkStatusChange, setCheckStatusChange] = useState('');

  const options = {
    dragSortHeuristics: {
      sortInterval: 70,
    },
    layoutDuration: 400,
    dragRelease: {
      duration: 400,
      easing: 'ease-out',
    },
    dragEnabled: true,
    dragContainer: document.body,
    layout: {
      fillGaps: true,
    },
    // The placeholder of an item that is being dragged.
    dragPlaceholder: {
      enabled: true,
    },
  };

  useEffect(() => {
    if (activeTab === ResourceType.Requests) {
      setLoading(true);
      getRequestTicket({
        page_size: 5,
        page_index: 1,
        user_name: currentUser.user_name,
        refine: '',
        states: valueFilterStatusRITM,
        request_for: '',
        sort_order: '',
        date_range: valueFilterDateRITM,
        categories: '',
      }).then(response => {
        if (response?.data) {
          const responseData = response.data;
          setDataRequest(responseData?.items);
          setCountItems(responseData?.items.length);
          setTotalItems(responseData?.totalItems);
        }
        setLoading(false);
      });
    }
  }, [
    listFilterRITM,
    valueFilterDateRITM,
    valueFilterStatusRITM,
    activeTab,
    currentUser.user_name,
    checkStatusChange,
  ]);

  useEffect(() => {
    if (activeTab === ResourceType.Incidents) {
      setLoading(true);
      getIncidentTicket({
        page_size: 5,
        page_index: 1,
        user_name: currentUser.user_name,
        refine: '',
        states: valueFilterStatusINC,
        sort_order: '',
        date_range: valueFilterDateINC,
      }).then(response => {
        if (response?.data) {
          const responseData = response.data;
          setDataIncident(responseData?.items);
          setCountItems(responseData?.items.length);
          setTotalItems(responseData?.totalItems);
        }
        setLoading(false);
      });
    }
  }, [
    listFilterINC,
    valueFilterDateINC,
    valueFilterStatusINC,
    activeTab,
    currentUser.user_name,
    checkStatusChange,
  ]);

  /** Update the query string when the tab changes */
  useEffect(() => {
    setDataIncident([]);
    setDataRequest([]);
    setTotalItems(0);
    setCountItems(0);
    setPageIndexRITM(1);
    setPageIndexINC(1);

    setValueFilterStatusINC([]);
    setValueFilterStatusRITM([]);
    setValueFilterDateINC([]);
    setValueFilterDateRITM([]);

    setSelectedObjStatusINC([]);
    setSelectedObjStatusRITM([]);
    setSelectedObjDateINC([]);
    setSelectedObjDateRITM([]);
  }, [activeTab, history, pathname]);

  useEffect(() => {
    const getListFilterIncidents = async () => {
      let result = await getListFilterINC(currentUser.user_name);
      if (!result) return;
      setListFilterINC(result.data);
    };

    const getListFilterRequest = async () => {
      let result = await getListFilterRITM(currentUser.user_name);

      if (!result) return;
      setListFilterRITM(result.data);
    };

    getListFilterIncidents();
    getListFilterRequest();
  }, [currentUser.user_name]);

  useEffect(() => {
    if (pageIndexRITM > 1) {
      setLoadingMore(true);
      getRequestTicket({
        page_size: 5,
        page_index: pageIndexRITM,
        user_name: currentUser.user_name,
        refine: '',
        states: valueFilterStatusRITM,
        request_for: '',
        sort_order: '',
        date_range: valueFilterDateRITM,
        categories: '',
      }).then(response => {
        if (response?.data) {
          const responseData = response.data;
          setDataRequest([...dataRequest, ...responseData?.items]);
          setCountItems(countItems + responseData?.items.length);
          setTotalItems(responseData?.totalItems);
        }
        setLoadingMore(false);
      });
    }
  }, [pageIndexRITM]);

  useEffect(() => {
    if (pageIndexINC > 1) {
      setLoadingMore(true);
      getIncidentTicket({
        page_size: 5,
        page_index: pageIndexINC,
        user_name: currentUser.user_name,
        refine: '',
        states: valueFilterStatusINC,
        sort_order: '',
        date_range: valueFilterDateINC,
      }).then(response => {
        if (response?.data) {
          const responseData = response.data;
          setDataIncident([...dataIncident, ...responseData?.items]);
          setCountItems(countItems + responseData?.items.length);
          setTotalItems(responseData?.totalItems);
        }
        setLoadingMore(false);
      });
    }
  }, [pageIndexINC]);

  // show ticket detail
  const [isOpen, setIsOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const onClickViewDetail = itemD => {
    setItemDetail(itemD);
    setIsOpen(true);
  };

  const changeStatus = status => {
    setCheckStatusChange(status);
  };

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
                    <GetSupportSearchInput firstName={currentUser.first_name} />
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
          marginBottom={1}
          color="grayScale.10"
        >
          My Support
        </Typography>
      </TopSection>
      <div className="wrapper-container" >
        <Box
          borderBottom=" 1px solid #cacaca;"
          marginBottom="20px"
        />
        <Grid flexDirection="column" height="100%">
          <GridLayout columnGutters={0}>
            <Row>
              <Col backgroundColor="" colspan={{ xs: '12', lg: '3' }}>
                <BorderBox paddingRight={{ xs: '0px', md: '12px', lg: '12px' }}>
                  <Typography
                    kind="body2"
                    margin="-10px 0 0 10px"
                    backgroundColor="#eceef1"
                    width="max-content"
                  >
                    Ticket Status
                  </Typography>
                  <Box margin="15px 0">
                    {activeTab === ResourceType.Incidents ? (
                      <IoMultipleSelect
                        multiple={true}
                        selectedItems={selectedObjStatusINC}
                        data={listFilterINC?.state}
                        label="Ticket Status"
                        onChange={e => {
                          setValueFilterStatusINC(
                            e.map(v => {
                              return v.id;
                            }),
                          );
                          setSelectedObjStatusINC(
                            e.map(v => {
                              return v;
                            }),
                          );
                        }}
                      />
                    ) : (
                      <IoMultipleSelect
                        multiple={true}
                        selectedItems={selectedObjStatusRITM}
                        data={listFilterRITM?.state}
                        label="Ticket Status"
                        onChange={e => {
                          setValueFilterStatusRITM(
                            e.map(v => {
                              return v.id;
                            }),
                          );
                          setSelectedObjStatusRITM(
                            e.map(v => {
                              return v;
                            }),
                          );
                        }}
                      />
                    )}
                  </Box>
                </BorderBox>

                <BorderBox
                  marginTop="40px"
                  marginBottom="40px"
                  paddingRight={{ xs: '0px', md: '12px', lg: '12px' }}
                >
                  <Typography
                    kind="body2"
                    margin="-10px 0 0 10px"
                    backgroundColor="#eceef1"
                    width="max-content"
                  >
                    Created Date
                  </Typography>
                  <Box margin="15px 0">
                    {activeTab === ResourceType.Incidents ? (
                      <IoMultipleSelect
                        multiple={false}
                        selectedItems={selectedObjDateINC}
                        data={listFilterINC?.date_range}
                        label="Created Date"
                        onChange={e => {
                          setValueFilterDateINC(
                            e.map(v => {
                              return v.id;
                            }),
                          );
                          setSelectedObjDateINC(
                            e.map(v => {
                              return v;
                            }),
                          );
                        }}
                      />
                    ) : (
                      <IoMultipleSelect
                        multiple={false}
                        selectedItems={selectedObjDateRITM}
                        data={listFilterRITM?.date_range}
                        label="Created Date"
                        onChange={e => {
                          setValueFilterDateRITM(
                            e.map(v => {
                              return v.id;
                            }),
                          );
                          setSelectedObjDateRITM(
                            e.map(v => {
                              return v;
                            }),
                          );
                        }}
                      />
                    )}
                  </Box>
                </BorderBox>
              </Col>

              <Col colspan={{ xs: '12', lg: '9' }}>
                <Box flex="1 1 auto">
                  <PageTabs
                    fullWidth
                    activeTab={activeTab}
                    onClick={onTabClick}
                    paddingRight="15px"
                  >
                    <TabsContainer>
                      <Tabs.Tab label={ResourceType.Incidents}>
                        {t('tabIncident')}
                      </Tabs.Tab>

                      <Tabs.Tab label={ResourceType.Requests}>
                        {t('tabRequest')}
                      </Tabs.Tab>
                    </TabsContainer>

                    <PanelContainer paddingTop="32px">
                      <Tabs.Panel label={ResourceType.Incidents} padding="0px">
                        {/* todo - wrap in React.Lazy. Currently automatically load when page load. */}
                        {isLoading ? (
                          <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                          </>
                        ) : (
                          <>
                            <Typography
                              kind="body2"
                              margin={2}
                              className="show-result-ticket"
                            >
                              Showing{' '}
                              <span>
                                {t('showingResultsFor', {
                                  countItems,
                                  totalItems,
                                })}
                              </span>
                            </Typography>

                            {activeTab === ResourceType.Incidents && (
                              <MuuriComponent {...options} dragFixed>
                                {dataIncident.map((item, index) => (
                                  <React.Fragment key={index}>
                                    <IoTicketRequest
                                      infoTicket={item}
                                      createdDate={moment(
                                        item.createDate,
                                      ).format('MM/DD/YYYY')}
                                      updatedDate={DateUtils.timetoXbyGMT(
                                        item.updateDate,
                                      )}
                                      onClickViewDetail={() =>
                                        onClickViewDetail(item)
                                      }
                                    />
                                  </React.Fragment>
                                ))}
                              </MuuriComponent>
                            )}
                            {countItems < totalItems &&
                              (isLoadingMore ? (
                                <Grid
                                  alignItems="center"
                                  flexDirection="column"
                                  width="100%"
                                  marginY="20px"
                                >
                                  <StyledCircularProgress />
                                </Grid>
                              ) : (
                                <StyledViewMoreLink
                                  onClick={e =>
                                    setPageIndexINC(pageIndexINC + 1)
                                  }
                                  fontWeight="bold"
                                  color="grayScale.10"
                                  kind="body2"
                                  marginX={2}
                                >
                                  View More Results
                                </StyledViewMoreLink>
                              ))}
                          </>
                        )}
                      </Tabs.Panel>

                      <Tabs.Panel label={ResourceType.Requests} padding="0px">
                        {/* todo - wrap in React.Lazy. Currently automatically load when page load. */}
                        {isLoading ? (
                          <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                          </>
                        ) : (
                          <>
                            <Typography
                              kind="body2"
                              margin={2}
                              className="show-result-ticket"
                            >
                              Showing{' '}
                              <span>
                                {t('showingResultsFor', {
                                  countItems,
                                  totalItems,
                                })}
                              </span>
                            </Typography>

                            {activeTab === ResourceType.Requests && (
                              <MuuriComponent {...options} dragFixed>
                                {dataRequest.map((item, index) => (
                                  <React.Fragment key={index}>
                                    <IoTicketRequest
                                      infoTicket={item}
                                      createdDate={moment(
                                        item.createDate,
                                      ).format('MM/DD/YYYY')}
                                      updatedDate={DateUtils.timetoXbyGMT(
                                        item.updateDate,
                                      )}
                                      onClickViewDetail={() =>
                                        onClickViewDetail(item)
                                      }
                                    />
                                  </React.Fragment>
                                ))}
                              </MuuriComponent>
                            )}
                            {countItems < totalItems &&
                              (isLoadingMore ? (
                                <Grid
                                  alignItems="center"
                                  flexDirection="column"
                                  width="100%"
                                  marginY="20px"
                                >
                                  <StyledCircularProgress />
                                </Grid>
                              ) : (
                                <StyledViewMoreLink
                                  onClick={e =>
                                    setPageIndexRITM(pageIndexRITM + 1)
                                  }
                                  fontWeight="bold"
                                  color="grayScale.10"
                                  kind="body2"
                                  marginX={2}
                                >
                                  View More Results
                                </StyledViewMoreLink>
                              ))}
                          </>
                        )}
                      </Tabs.Panel>
                    </PanelContainer>
                  </PageTabs>
                </Box>
              </Col>
            </Row>
          </GridLayout>
        </Grid>
      </div>

      <TicketDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        infoTicketDetail={itemDetail}
        currentUser={currentUser}
        changeStatus={changeStatus}
      />
    </>
  );
};

export default OrdersAndIncidentsPage;
