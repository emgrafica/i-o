// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Row, Col } from '@lumos/core';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import { searchAllKnowledge } from 'services/knowledgeServices';
import UserService from 'services/userServices';
import { IoAccordion, IoTicketRequestMini } from '@i-o/design-system';
import { MuuriComponent } from 'muuri-react';
import DateUtils from 'utils/date';
import {
  getIncidentTicket,
  getRequestTicket
} from 'services/ticketServices';
import moment from 'moment';
import {
  StyledViewMoreLink,
} from 'pages/HomePage/MainSection/mainSection.style';
import {
  GetSupportSearchPath,
  NavigationTicketsPath,
  NavigationRequestTicketsPath
} from 'utils/routes';
import TicketDetail from 'components/TicketDetail';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

const MiddleSection: React.FC = () => {
  const history = useHistory();

  const [topFeatures, setTopFeatures] = useState([]);
  const [dataRequest, setDataRequest] = useState([]);
  const [dataIncident, setDataIncident] = useState([]);
  const [totalTopFeatures, setTotalTopFeatures] = useState(0);
  const [totalRequestItems, setTotalRequestItems] = useState(0);
  const [totalIncidentItems, setTotalIncidentItems] = useState(0);
  const [topArticleIndex, setTopArticleIndex] = useState(1);
  const [checkStatusChange, setCheckStatusChange] = useState('');

  let dataUser: any = UserService.getCurrentUser();

  const options = {
    dragSortHeuristics: {
      sortInterval: 70,
    },
    layoutDuration: 400,
    dragRelease: {
      duration: 400,
      easing: 'ease-out',
    },
    dragStartPredicate: {
      distance: 10,
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

  const onArticleCardClick = (kbNumber: string) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
    });
  };

  const changeStatus = status => {
    setCheckStatusChange(status);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const onClickViewDetail = itemD => {
    setItemDetail(itemD);
    setIsOpen(true);
  };

  useEffect(() => {
    getIncidentTicket({
      page_size: 3,
      page_index: 1,
      user_name: dataUser.user_name,
      refine: '',
      states: 'open',
      sort_order: '',
      date_range: '',
    }).then(response => {
      if (response?.data) {
        const responseData = response.data;
        setDataIncident(responseData?.items);
        setTotalIncidentItems(responseData?.totalItems);
      }
    });

    getRequestTicket({
      page_size: 3,
      page_index: 1,
      user_name: dataUser.user_name,
      refine: '',
      states: 'open',
      request_for: '',
      sort_order: '',
      date_range: '',
      categories: ''
    }).then(response => {
      if (response?.data) {
        const responseData = response.data;
        setDataRequest(responseData?.items);
        setTotalRequestItems(responseData?.totalItems);
      }
    });
  }, [checkStatusChange]);

  useEffect(()=> {
    searchAllKnowledge({
      page_size: 6,
      page_index: topArticleIndex,
      user_name: dataUser.user_name,
    }).then(response => {
      if (response?.data) {
        const responseData = response.data;
        setTopFeatures([...topFeatures, ...responseData?.data]);
        setTotalTopFeatures(responseData?.totalCount);
      }
    });
  }, [topArticleIndex])
  return (
    <>
      <Box
        backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
        backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
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
            <Row marginBottom={6} justifyContent="center">
              <Box width={{ xs: 1, md: 0.8, lg: 1 / 2 }}>
                <Box paddingTop="20px" display="flex" justifyContent="center">
                  <GetSupportSearchInput firstName={dataUser.first_name} />
                </Box>
              </Box>
            </Row>
          </Grid>
        </Grid>
      </Box>
      <Grid justifyContent="center">
        <Grid
          flexDirection="column"
          width="100%"
          maxWidth={{
            xs: '340px',
            sm: '670px',
            lg: '1095px',
            xl: '1400px',
            xxl: '1400px',
          }}
          padding={{
            xxs: '14px 17px',
            xs: '14px 17px',
            sm: '14px 24px',
            md: '14px 24px',
            lg: '14px 80px',
          }}
        >
          <Row flexDirection="row" margin="0px !important">
            <Col
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '12',
                xl: '6',
                xxl: '6',
              }}
              padding="0px !important"
              paddingRight="5px !important"
            >

              <Typography
                kind="h5"
                fontSize="18px"
                fontWeight="bold"
                color="grayScale.6"
                style={{
                  borderBottom: '1px solid #CCCCCC',
                }}
              >
                Top Knowledge Articles
              </Typography>
              <MuuriComponent {...options} dragFixed>
                {topFeatures.map((item) => {
                  return (
                    <Box key={item.id} marginTop="10px" width={1}>
                      <IoAccordion.AccordionDetails
                        title={item.name}
                        description={item.content}
                        rate={item.rating}
                        lastUpdated={DateUtils.timetoXbyUTC(
                          item.lastUpdated,
                          dataUser.time_zone,
                        )}
                        viewCount={item.viewCount}
                        kbNumber={item.number}
                        onViewDetail={onArticleCardClick}
                      ></IoAccordion.AccordionDetails>
                    </Box>
                  );
                })}
              </MuuriComponent>
              {topFeatures.length < totalTopFeatures && (
                <StyledViewMoreLink
                  onClick={() => setTopArticleIndex(topArticleIndex+1)}
                  fontWeight="bold"
                  color="grayScale.10"
                  kind="body2"
                  marginLeft="auto"
                  marginRight="10px"
                  fontSize="14px !important"
                >
                  View More &#x2192;
                </StyledViewMoreLink>
              )}
            </Col>
            <Col
              colspan={{
                xxs: '12',
                xs: '12',
                sm: '12',
                md: '12',
                lg: '12',
                xl: '6',
                xxl: '6',
              }}
              padding="0px !important"
              marginTop={{ xxs: 6, xl: 0 }}
              paddingLeft={{ xl: "5px !important" }}
            >
              <Box
                alignItems="center"
                marginBottom={6}
              >
                <Typography
                  kind="h5"
                  fontSize="18px"
                  fontWeight="bold"
                  color="grayScale.6"
                  style={{
                    borderBottom: '1px solid #CCCCCC',
                  }}
                >
                  Your Support
                </Typography>
                <MuuriComponent {...options} dragFixed>
                  {dataIncident.map((item, index) => {
                    return (
                      <Box key={item.id} marginTop="10px" width={1}>
                        <IoTicketRequestMini
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
                      </Box>
                    );
                  })}
                </MuuriComponent>
                {totalIncidentItems > 3 && (
                  <StyledViewMoreLink
                    onClick={() => {
                      history.push(NavigationTicketsPath);
                    }}
                    fontWeight="bold"
                    color="grayScale.10"
                    kind="body2"
                    marginLeft="auto"
                    marginRight="10px"
                    fontSize="14px !important"
                  >
                    View More &#x2192;
                  </StyledViewMoreLink>
                )}
              </Box>
              <Box
                alignItems="center"
              >
                <Typography
                  kind="h5"
                  fontSize="18px"
                  fontWeight="bold"
                  color="grayScale.6"
                  style={{
                    borderBottom: '1px solid #CCCCCC',
                  }}
                >
                  Your Requests
                </Typography>
                <MuuriComponent {...options} dragFixed>
                  {dataRequest.map((item, index) => {
                    return (
                      <Box key={item.id} marginTop="10px" width={1}>
                        <IoTicketRequestMini
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
                      </Box>

                    );
                  })}
                </MuuriComponent>
                {totalRequestItems > 3 && (
                  <StyledViewMoreLink
                    onClick={() => {
                      history.push(NavigationRequestTicketsPath);
                    }}
                    fontWeight="bold"
                    color="grayScale.10"
                    kind="body2"
                    marginLeft="auto"
                    marginRight="10px"
                    fontSize="14px !important"
                  >
                    View More &#x2192;
                  </StyledViewMoreLink>
                )}
              </Box>
            </Col>
          </Row>
        </Grid>
        <TicketDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          infoTicketDetail={itemDetail}
          currentUser={dataUser}
          changeStatus={changeStatus}
        />
      </Grid>
    </>
  );
};

export default MiddleSection;
