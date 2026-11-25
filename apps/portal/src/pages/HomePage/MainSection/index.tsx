/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { REST_URL, YOUR_GEAR } from 'constants/index';
import { Box, Grid, Col, Row, Form, Typography, Button } from '@lumos/core';
import { DialogContent, IconButton } from '@material-ui/core';
//import { useSetOBOInfoLocalState } from 'store/apollo/store/hooks';
import { MuuriComponent } from 'muuri-react';
import { IoCard } from '@i-o/design-system';
import { useHistory } from 'react-router-dom';
import {
  CompanyPortal,
  NavigationDevicesPath,
  NavigationKnowledgePath,
  NavigationTicketsPath,
  PcRefresh,
} from 'utils/routes';
import LoadingScreen from 'components/LoadingScreen';
import {
  AccountBox,
  Apps,
  CreateOutlined,
  Description,
  FilterList,
  LaptopMacOutlined,
} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

import {
  IoAccordion,
  IoCard,
  IoDxcGear,
  IoLoadingWithBackdrop,
  IoAnnouncementsCard,
  IoYourSoftware
} from '@i-o/design-system';
import UserDefaultImg from 'assets/images/branding/avatar2.png';
import OutageIcon from 'assets/images/homePage/outage-generic.svg';
import AcknowledgeDeviceCard from 'components/AcknowledgeDevice';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import PrimaryDeviceCard from 'components/PrimaryDeviceCard';
import TicketDetail from 'components/TicketDetail';
import TicketsCard from 'components/TicketsCard';
import { AUTH } from 'constants/authConstants';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeviceServices from 'services/devicesServices';
import {
  getArticleByURLType,
  getTopThreeKnowledgeNews,
} from 'services/knowledgeServices';
import TicketServices, { getTicketDetail } from 'services/ticketServices';
import UserService from 'services/userServices';
import styled from 'styled-components';
import DateUtils from 'utils/date';
import {
  StyledMainSection,
  StyledOutageComponent,
  StyledViewMoreLink,
  StyleOutageDialog,
  StyleOutageNotification,
} from './mainSection.style';
const CustomButton = styled(Button)`
  color: #7229c0;
  margin: 0 3px;
  background: white !important;
  width: 90px;
  height: 46px;
  font-size: 10px;
  border-radius: 64px;
  opacity: 0.6;
  &.custome-button-active {
    opacity: 1;
    color: white;
    background: #7229c0 !important;
  }
`;

const CustomCol = styled(Col)`
  &.col-engage-custom {
    // background: white;
  }

  &.col-your-gear-custom {
    // background: red;
  }

  &.col-support-custom {
    // background: green;
  }
`;

export const AccountBoxIcon = styled(AccountBox).attrs(_ => ({}))`
  ${({ }) => `
    font-size: 75px !important;
    color: #7229c0;
    margin-top: -8px;
  `}
`;
const WrapBox = styled.div`
  display: flex;
`;

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
    // createElement: function (item) {
    //   // The element will have the Css class ".muuri-item-placeholder".
    //   return item.getElement().cloneNode(true);
    // }
  },
  dragStartPredicate: {
    distance: 10,
  },
};
const sortOption = [
  {
    label: 'Sort by card type',
    value: 'priority',
  },
  {
    label: 'Sort by name',
    value: 'title',
  },
];

const filterOption = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Announcement',
    value: 'announcement',
  },
  {
    label: 'Outage',
    value: 'outage',
  },
];

let yourGearFrame = [
  // {
  //   id: 1,
  //   type: YOUR_GEAR.PRIMARY_DEVICE.TYPE,
  // },
  // {
  //   id: 2,
  //   type: YOUR_GEAR.USER_INFO.TYPE,
  // },
  {
    id: 3,
    type: YOUR_GEAR.DXC_GEAR.TYPE,
  },
  // Start: branding Michael feedback
  // {
  //   id: 4,
  //   type: YOUR_GEAR.NAVIGATION_DEVICES.TYPE,
  // },
  // End: branding Michael feedback

  // {
  //   id: 5,
  //   type: YOUR_GEAR.NAVIGATION_KNOWLEDGE.TYPE,
  // },
  // {
  //   id: 6,
  //   type: YOUR_GEAR.NAVIGATION_TICKETS.TYPE,
  // },
  {
    id: 7,
    type: YOUR_GEAR.NAVIGATION_YOURSOFTWARE.TYPE,
  },
];

const useFilter = (search = '', filter = '') => {
  return useCallback(
    function (data) {
      const isSearchMatch = (!search || data.isAlwayShow)
        ? true
        : data.title?.toLowerCase().indexOf(search.trim().toLowerCase()) > -1;

      const isFilterMatch =
        filter.value !== 'all'
          ? filter.value === data.type || data.isAlwayShow
          : true;
      return isFilterMatch && isSearchMatch;
    },
    [search, filter.value],
  );
};

const OutageNotification = props => {
  const { outage } = props;
  return (
    <>
      <div className="outage-icon">
        <img src={OutageIcon} alt="outage-icon" />
      </div>
      <div className="outage-title">{outage.name}</div>
      <div className="outage-content">{outage.content}</div>
    </>
  );
};
const OutageDialog = props => {
  const { outage, open, handleClose, onClickViewDetail } = props;
  return (
    <StyleOutageDialog open={open} onClose={handleClose}>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="outage-closeBtn"
        >
          <CloseIcon />
        </IconButton>
        <IoCard.OutageCard
          outage={outage}
          onClickViewDetail={onClickViewDetail}
        />
      </DialogContent>
    </StyleOutageDialog>
  );
};

const MainSection: React.FC = () => {
  //const setOBOInfoLocalState = useSetOBOInfoLocalState();
  let dataUser: any = UserService.getCurrentUser();
  let muuriKey = 1;

  const dafaultFilterCardOption = {
    label: 'All',
    value: 'all',
  };
  const dafaultSortCardOption = {
    label: 'Sort by card type',
    value: 'priority',
  };
  const [filterCardOption, setFilterCardOption] = useState(
    dafaultFilterCardOption,
  );
  const [sortCardOption, setSortCardOption] = useState(dafaultSortCardOption);
  const [listDeviceSupport, setListDeviceSupport] = useState([]);
  const [listDeviceYourGear, setListDeviceYourGear] = useState([]);
  const [loadPrimaryDevice, setLoadPrimaryDevice] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();
  const filterFunction = useFilter(searchValue, filterCardOption);

  // PC Refresh Card
  const [kbPCRefreshLink, setkbPCRefreshLink] = useState('');
  const [kbPCReturnLink, setkbPCReturnLink] = useState('');

  const [annoucementArticle, setAnnoucementArticle] = useState([]);
  const [loadAnnoucementArticle, setLoadAnnoucementArticle] = useState(false);
  const [topNews, setTopNews] = useState([]);

  const [featureArticle, setFeatureArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUserInfo, setImgUserInfo] = useState();
  const [showImg, setShowImg] = useState(true);
  const [outage, setOutage] = useState({});
  const [openOutageDialog, setOpenOutageDialog] = useState(false);
  const [isDxcGear, setIsDxcGear] = useState(null);
  const [loadDxcGear, setLoadDxcGear] = useState(false);
  const [isMorePC, setIsMorePC] = useState(false);
  const [defaultListPC, setDefaultListPC] = useState([]);
  const [allDeviceYourGear, setAllDeviceYourGear] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [openLoadingAckowledge, setOpenLoadingAckowledge] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getKBConfig = async () => {
      let resultRefresh = await UserService.getConfig('KB_PC_REFRESH');
      if (!resultRefresh) return;
      setkbPCRefreshLink(resultRefresh.data.value);
      let resultReturn = await UserService.getConfig('KB_PC_RETURN');
      if (!resultReturn) return;
      setkbPCReturnLink(resultReturn.data.value);
    };

    getKBConfig();

    const getDeviceList = async () => {
      let result = await DeviceServices.getPCResfreshStatus(dataUser.user_name);
      if (!result) return;
      const deviceListFilterYourGear = result.filter((item: any) => item.actions.canVisible);
      const deviceListFilterSupport = result.filter((item: any) => !!item.process_stage.stage && !['UNDER_INVESTIGATION'].includes(item.process_stage.stage));
      
      const morePc = deviceListFilterYourGear.length > 3;
      setIsMorePC(morePc);
      setAllDeviceYourGear(deviceListFilterYourGear);

      let tmp = [];
      if (morePc) {
        for (let index = 0; index < 3; index++) {
          tmp.push(deviceListFilterYourGear[index]);
        }
        setDefaultListPC(tmp);
      }
      setListDeviceYourGear(morePc ? tmp : deviceListFilterYourGear);
      setListDeviceSupport(deviceListFilterSupport);
      
      setLoadPrimaryDevice(true);

    };
    getDeviceList();

    const getArticles = async () => {
      let annouRes = await getArticleByURLType(REST_URL.ANNOUNCEMENT, {
        user_name: dataUser.user_name,
        page_size: 4,
        page_index: 1,
      });
      setAnnoucementArticle(annouRes?.data);
      setLoadAnnoucementArticle(true);

      let featureRes = await getArticleByURLType(REST_URL.GET_ALL_FEATURE, {
        user_name: dataUser.user_name,
        page_size: 4,
        page_index: 1,
      });
      setFeatureArticle(featureRes.data);

      let topNews = await getTopThreeKnowledgeNews({
        page_size: 18,
        page_index: 1,
        user_name: dataUser.user_name,
      });
      setTopNews(topNews);

      setIsLoading(false);
      window.scrollTo(0, 0);
      if (!!annouRes?.data) {
        annouRes?.data.forEach(outage => {
          const optionsOutage = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            type: toast.TYPE.SUCCESS,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            onClick: () => {
              setOpenOutageDialog(true);
              setOutage(outage);
            },
          };
          return toast(<OutageNotification outage={outage} />, optionsOutage);
        });
      }
    };
    getArticles();

    const getImageUserInfo = async () => {
      localStorage.removeItem('IMAGE_USER_INFO');

      let userInfo = UserService.getCurrentUser();

      if (!userInfo) {
        const response = await UserService.getUserDetailByEmail(dataUser.email);
        userInfo = response.data[0];
      }

      if (userInfo != null) {
        const imageUserInfo = userInfo.photo;
        setImgUserInfo(imageUserInfo);
        setShowImg(true);
        localStorage.setItem('IMAGE_USER_INFO', imageUserInfo);
      } else {
        setShowImg(false);
        return 'not valued';
      }
    };
    getImageUserInfo();

  }, []);

  useEffect(() => {
    (async () => {
      let response = await UserService.checkUserDxcGear(
        dataUser.email,
        dataUser.country,
      );
      if (response?.data) {
        setIsDxcGear(response.data.results);
      }
      setLoadDxcGear(true);
    })();
  }, []);

  // wait all card load before geneate display card
  useEffect(() => {
    if (loadPrimaryDevice && loadDxcGear && loadAnnoucementArticle) {
      if (!isDxcGear) {
        yourGearFrame = yourGearFrame.filter(
          i => i.type !== YOUR_GEAR.DXC_GEAR.TYPE,
        );
      }
      setYourGear(yourGearFrame);
    }
  }, [loadPrimaryDevice, loadDxcGear, loadAnnoucementArticle]);

  //Password expire

  const [secretKeyConfig, setSecretKeyConfig] = useState({});
  const [secretKeyChangeUrl, setSecretKeyChangeUrl] = useState({});
  useEffect(() => {
    const fetchSecretKeyConfig = async () => {
      let result = await UserService.getSecretKeyConfig();

      if (!result) return;
      const responseData = result.data.value.secretKey_change_url;
      setSecretKeyConfig(result.data.value);
      setSecretKeyChangeUrl(responseData);
    };
    fetchSecretKeyConfig();
  }, []);
  const secretKeyChangedDate = localStorage.getItem(AUTH.CURRENT_USER_SECRET_KEY_CHANGEDATE);
  const secretKeyExpireddDays = secretKeyConfig.expiry_days;
  const secretKeyReminderDays = secretKeyConfig.reminder_days;
  const secretKeyExpiredObj = DateUtils.countDate(
    secretKeyExpireddDays,
    secretKeyReminderDays,
    secretKeyChangedDate,
  );

  const reminderSecretKeyExpired = secretKeyExpiredObj.reminderSecretKeyExpired;
  const reminderDays = secretKeyExpiredObj.reminderDays;
  const charNumberDays = reminderDays > 1 ? 'days' : 'day';

  //const [arrReminders, setarrReminders] = useState([]);
  const arrReminders = [];
  if (reminderSecretKeyExpired) {
    arrReminders.push(secretKeyExpiredObj);
  }

  // Get Incidents, Orders, Approvals
  const [incidents, setIncidents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCheckEngage, setIsCheckEngage] = useState(true);
  const [isCheckSupport, setIsCheckSupport] = useState(true);
  const [isCheckUrGrear, setIsUrGrear] = useState(true);
  useEffect(() => {
    (async () => {
      let incidentsResult = await TicketServices.getIncident(
        dataUser.user_name,
      );
      let ordersResult = await TicketServices.getOrder(dataUser.user_name);
      setIncidents(incidentsResult);
      setOrders(ordersResult);
    })();
  }, []);

  const renderCardSize = (widthStyle, heightStyle) => {
    let result = {
      marginY: '5px',
      marginX: '5px',
    };
    const defaultWidthStyle = {
      small: '145px',
      normal: '300px',
      large: '610px',
    };
    const defaultHeightStyle = {
      small: '67px',
      normal: '144px',
      large: '300px',
    };
    return {
      ...result,
      width: defaultWidthStyle[widthStyle],
      height: defaultHeightStyle[heightStyle],
    };
  };
  const getMuuriSize = (defaultValue: String) => {
    if (isCheckUrGrear && isCheckSupport && isCheckEngage) {
      return defaultValue;
    } else if (
      (isCheckUrGrear && isCheckSupport) ||
      (isCheckSupport && isCheckEngage) ||
      (isCheckEngage && isCheckUrGrear)
    ) {
      return '6';
    } else {
      return '12';
    }
  };

  const getUserCard = async () => {
    const a = await setTimeout(() => {
      return (
        <Box
          key={(muuriKey = ++muuriKey)}
          priority={4}
          isAlwayShow={true}
          //title="UserInfor"
          type="UserInfor"
          {...renderCardSize('normal', 'large')}
        >
          <IoCard.UserInforCard
            {...dataUser}
            userName={dataUser.name}
            image={UserDefaultImg}
          />
        </Box>
      );
    }, 500);
  };

  const [yourGear, setYourGear] = useState([]);
  const onArticleCardClick = (kbNumber: string) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const onClickViewTicketDetail = async ticketNumber => {
    let result = await getTicketDetail(true, ticketNumber, dataUser.user_name);
    if (!result) {
      return;
    }
    setItemDetail(result.data);
    setIsOpen(true);
  };

  const changeStatus = status => {
    setCheckStatusChange(status);
  };

  const handleOpenLoadingAcknowledge = (boolean) => {
    setOpenLoadingAckowledge(boolean);
  };

  const handleReloadDevice =  async () => {
    (async () => {
      setLoadPrimaryDevice(false);
      setOpenLoadingAckowledge(true);
      let result = await DeviceServices.getPCResfreshStatus(dataUser.user_name);
      if (result) {
        setListPrimaryDevice(result);
      }
      setLoadPrimaryDevice(true);
      setOpenLoadingAckowledge(false);
    })();
  }
  
  const handleClickGeneralCard = (link: string) => {
    history.push(`${link}`);
  }

  return (
    <>
      <StyledMainSection
        display="flex"
        // backgroundImage="linear-gradient(135deg,rgb(255 255 255),#eceef1);"
        backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundColor="#eceef1"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
      >
        <Box
          height="100%"
          width="100%"
          paddingBottom="32px"
          display="flex"
          backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
          backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          justifyContent="center"
        >
          <Grid
            flexDirection="column"
            height="100%"
            width="100%"
            maxWidth={{
              xs: '340px',
              sm: '670px',
              lg: '1095px',
              xl: '1400px',
              xxl: '1400px',
            }}
            padding={{
              xxs: '0px 17px',
              xs: '0px 17px',
              sm: '0px 24px',
              md: '0px 24px',
              lg: '0px 80px',
            }}
          >
            <Row alignItems="center" flexDirection="column">
              <Box width={{ xs: 1, md: 0.8, lg: 1 / 2 }}>
                <Box paddingTop="20px" display="flex" justifyContent="center">
                  <GetSupportSearchInput firstName={dataUser.first_name} />
                </Box>
              </Box>
            </Row>
          </Grid>
        </Box>
        <Box
          height="100%"
          width="100%"
          padding={{
            xxs: '42px 17px 113px 17px',
            xs: '42px 17px 113px 17px',
            sm: '38px 24px 114px 24px',
            md: '38px 24px 114px 24px',
            lg: '14px 80px 152px 80px',
          }}
          maxWidth={{
            xs: '340px',
            sm: '670px',
            lg: '1095px',
            xl: '1400px',
            xxl: '1400px',
          }}
        >
          <Grid flexDirection="column">
            {isLoading && (
              <Box height={300}>
                <LoadingScreen />
              </Box>
            )}
            {!isLoading && (
              <Row flexDirection="row" margin="0px !important">
                {isCheckEngage && (
                  <CustomCol
                    colspan={{
                      xxs: '12',
                      xs: '12',
                      sm: '12',
                      md: '12',
                      lg: getMuuriSize('12'),
                      xl: getMuuriSize('6'),
                      xxl: getMuuriSize('6'),
                    }}
                    className="col-engage-custom"
                    padding="0px !important"
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
                      News &amp; Knowledge
                    </Typography>

                    <MuuriComponent
                      {...options}
                      propsToData={({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      }) => ({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      })}
                      filter={filterFunction}
                      id="Muuri-Engage"
                      sort={sortCardOption.value}
                    >
                      {annoucementArticle.map((item, index) => {
                        return (
                          <Box
                            key={(muuriKey = ++muuriKey)}
                            priority={index}
                            title={item.name}
                            isAlwayShow={true}
                            type={item.knowledgeBase}
                            {...renderCardSize('normal', 'normal')}
                          >
                            <IoCard.OutageCard
                              outage={item}
                              onClickViewDetail={() =>
                                onArticleCardClick(item.number)
                              }
                            />
                          </Box>
                        );
                      })}
                      {topNews.map((item, index) => {
                        return (
                          <Box
                            key={(muuriKey = ++muuriKey)}
                            priority={index + 10}
                            type={item.knowledgeBase}
                            title={`${item.knowledgeBase} ${item.name}`}
                            {...renderCardSize('normal', 'normal')}
                          >
                            <IoAnnouncementsCard
                              eyebrowTitle={item.knowledgeBase}
                              title={item.name}
                              content={item.content}
                              kbNumber={item.number}
                              handleClick={() => {
                                history.push({
                                  pathname: `/knowledges/detail/${item.number}`,
                                });
                              }}
                            />
                          </Box>
                        );
                      })}
                    </MuuriComponent>
                    <Box margin="5px"  className="top-knowledge-articles" title="Top Knowledge Articles">
                      <IoCard.EyeBrow text="Top Knowledge Articles" color="#5f249f" backgroundColor="#e9e0f7"/>               
                      {featureArticle.map((item, index) => {
                        if (index < 3) {
                          return (
                            <Box key={item.id} marginTop="10px">
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
                        }
                      })}
                      {featureArticle.length > 3 && (
                        <StyledViewMoreLink
                          onClick={() => {
                            history.push({
                              pathname: NavigationKnowledgePath,
                            });
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
                  </CustomCol>
                )}

                {isCheckUrGrear && (
                  <CustomCol
                    colspan={{
                      xxs: '12',
                      xs: '12',
                      sm: '12',
                      md: '12',
                      lg: getMuuriSize('12'),
                      xl: getMuuriSize('3'),
                      xxl: getMuuriSize('3'),
                    }}
                    className="col-your-gear-custom"
                    padding="0px !important"
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
                      My Technology
                    </Typography>
                    <MuuriComponent
                      {...options}
                      propsToData={({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      }) => ({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      })}
                      id="Muuri-UrGrear"
                      filter={filterFunction}
                      sort={sortCardOption.value}
                      dragEnabled={true}
                      dragSortHeuristics={{
                        sortInterval: 10,
                        minDragDistance: 5,
                        minBounceBackAngle: Math.PI / 2,
                      }}
                    >
                      {(!isCheckEngage && !isCheckSupport
                        ? annoucementArticle
                        : []
                      ).map((item, index) => {
                        return (
                          <StyledOutageComponent
                            key={(muuriKey = ++muuriKey)}
                            priority={index}
                            title={item.name}
                            type={item.knowledgeBase}
                            {...renderCardSize('normal', 'normal')}
                          >
                            <IoCard.OutageCard
                              outage={item}
                              onClickViewDetail={() =>
                                onArticleCardClick(item.number)
                              }
                            />
                          </StyledOutageComponent>
                        );
                      })}

                      {listDeviceYourGear.map((item, index) => {
                        return (
                          <Box
                            key={(muuriKey = ++muuriKey)}
                            priority={index + 10}
                            {...renderCardSize('normal', 'large')}
                          >
                            <PrimaryDeviceCard deviceItem={item} handleReloadDevice={handleReloadDevice}/>
                          </Box>
                        );
                      })}

                      {yourGear.map((item, index) => {
                        if (item.type === YOUR_GEAR.DXC_GEAR.TYPE) {
                          return (
                            <Box
                              key={(muuriKey = ++muuriKey)}
                              priority={index + 20}
                              title={YOUR_GEAR.DXC_GEAR.TITLE}
                              type="Nav"
                              isAlwayShow={true}
                              {...renderCardSize('small', 'normal')}
                            >
                              <IoDxcGear />
                            </Box>
                          );
                        } else if (
                          item.type === YOUR_GEAR.NAVIGATION_DEVICES.TYPE
                        ) {
                          return (
                            <Box
                              key={(muuriKey = ++muuriKey)}
                              priority={index + 20}
                              type="Nav"
                              title={YOUR_GEAR.NAVIGATION_DEVICES.TITLE}
                              isAlwayShow={true}
                              {...renderCardSize('small', 'normal')}
                            >
                              <IoCard.GeneralCard
                                srcIcon={<LaptopMacOutlined />}
                                name={YOUR_GEAR.NAVIGATION_DEVICES.NAME}
                                link={YOUR_GEAR.NAVIGATION_DEVICES.LINK}
                                handleClick={() =>
                                  handleClickGeneralCard(NavigationDevicesPath)
                                }
                                displayLinkIcon={true}
                              />
                            </Box>
                          );
                        } else if (
                          item.type === YOUR_GEAR.NAVIGATION_YOURSOFTWARE.TYPE
                        ) {
                          return (
                            <Box
                              key={(muuriKey = ++muuriKey)}
                              priority={index + 20}
                              type="Nav"
                              title={YOUR_GEAR.NAVIGATION_YOURSOFTWARE.TITLE}
                              isAlwayShow={true}
                              {...renderCardSize('small', 'normal')}
                            >
                              <IoYourSoftware                              
                                name={YOUR_GEAR.NAVIGATION_YOURSOFTWARE.NAME}
                                link={YOUR_GEAR.NAVIGATION_YOURSOFTWARE.LINK}
                                url={CompanyPortal}
                                srcIcon={<Apps />}
                              />
                            </Box>
                          );
                        }
                        else {
                          return <></>;
                        }
                      })}

                    </MuuriComponent>
                    {allDeviceYourGear.length > 3 && (
                      <StyledViewMoreLink
                        onClick={() => {
                          setListDeviceYourGear(isMorePC ? allDeviceYourGear : defaultListPC);
                          setIsMorePC(!isMorePC);
                          if (!isMorePC) window.scrollTo(0, 0);
                        }}
                        fontWeight="bold"
                        color="grayScale.10"
                        kind="body2"
                        marginLeft="5px"
                        fontSize="14px !important"
                      >
                        {isMorePC ? 'View More' : 'Show Less'} &#x2192;
                      </StyledViewMoreLink>
                    )}
                  </CustomCol>
                )}

                {isCheckSupport && (
                  <CustomCol
                    colspan={{
                      xxs: '12',
                      xs: '12',
                      sm: '12',
                      md: '12',
                      lg: getMuuriSize('12'),
                      xl: getMuuriSize('3'),
                      xxl: getMuuriSize('3'),
                    }}
                    className="col-support-custom"
                    padding="0px !important"
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
                      My Support
                    </Typography>
                    <MuuriComponent
                      {...options}
                      propsToData={({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      }) => ({
                        title,
                        type,
                        isAlwayShow,
                        priority,
                      })}
                      filter={filterFunction}
                      id="Muuri-Support"
                      sort={sortCardOption.value}
                    >
                      {(!isCheckEngage ? annoucementArticle : []).map(
                        (item, index) => {
                          return (
                            <StyledOutageComponent
                              key={(muuriKey = ++muuriKey)}
                              priority={index}
                              title={item.name}
                              type={item.knowledgeBase}
                              {...renderCardSize('normal', 'normal')}
                            >
                              <IoCard.OutageCard
                                outage={item}
                                onClickViewDetail={() =>
                                  onArticleCardClick(item.number)
                                }
                              />
                            </StyledOutageComponent>
                          );
                        },
                      )}

                      {/* Acknowledge Card */}
                      {listDeviceSupport
                        .filter(
                          e => e.actions.canRegisterOwnership,
                        )
                        .map((item, index) => {
                          return (
                            <Box
                              key={(muuriKey = ++muuriKey)}
                              priority={index + 12}
                              {...renderCardSize('normal', 'large')}
                            >
                              <AcknowledgeDeviceCard deviceItem={item} handleOpenLoadingAcknowledge={handleOpenLoadingAcknowledge} handleReloadDevice={handleReloadDevice}/>
                            </Box>
                          );
                        })}

                      {/* PC Refresh Card */}
                      {listDeviceSupport.map((item, index) => {
                        return (
                          <Box
                            key={(muuriKey = ++muuriKey)}
                            priority={index + 10}
                            {...renderCardSize('normal', 'large')}
                          >
                            <IoCard.DeviceCard
                              infoDevice={item}
                              onActionClick={() => {
                                if (item.process_stage.stage === 'ELIGIBLE_FOR_REFRESH') {
                                  history.push({
                                    pathname: `${PcRefresh}/${item.uid}`,
                                  });
                                } else {
                                  onClickViewTicketDetail(item.process_stage.request_number);
                                }
                              }}
                              refreshInfo={kbPCRefreshLink}
                              returnInfo={kbPCReturnLink}
                              getInfoUrl={onArticleCardClick}
                            />
                          </Box>
                        );
                      })}

                      {/*Password Expiring*/}
                      {arrReminders.map((item, index) => {
                        return (
                          <Box
                            key={(muuriKey = ++muuriKey)}
                            priority={index + 20}
                            title="Password Expiring"
                            isAlwayShow={true}
                            type="Nav"
                            {...renderCardSize('normal', 'normal')}
                          >
                            <IoCard.SecretKeyExpiringCard
                              urlChangePass={secretKeyChangeUrl}
                              reminderExpiredDays={item.reminderDays}
                              day={charNumberDays}
                              titleCard="Update your password"
                              description="Your UID pasword will expire in"
                            />
                          </Box>
                        );
                      })}

                      {/* Devices & Knowledge */}
                      {/* // Start: branding Michael feedback */}
                      {/* <WrapBox
                        isAlwayShow={true}
                      >
                        <Box
                          key={(muuriKey = ++muuriKey)}
                          priority={21}
                          type="Nav"
                          title={YOUR_GEAR.NAVIGATION_KNOWLEDGE.TITLE}
                          {...renderCardSize('small', 'normal')}
                          display="flex"
                        >
                          <IoCard.GeneralCard
                            srcIcon={<CreateOutlined />}
                            name={YOUR_GEAR.NAVIGATION_TICKETS.NAME}
                            link={YOUR_GEAR.NAVIGATION_TICKETS.LINK}
                            handleClick={() =>
                              handleClickGeneralCard(NavigationTicketsPath)
                            }
                            displayLinkIcon={true}
                          />
                        </Box>
                        <Box
                          key={(muuriKey = ++muuriKey)}
                          priority={22}
                          type="Nav"
                          title={YOUR_GEAR.NAVIGATION_KNOWLEDGE.TITLE}
                          {...renderCardSize('small', 'normal')}
                          display="flex"
                        >
                          <IoCard.GeneralCard
                            srcIcon={<Description />}
                            name={YOUR_GEAR.NAVIGATION_KNOWLEDGE.NAME}
                            link={YOUR_GEAR.NAVIGATION_KNOWLEDGE.LINK}
                            handleClick={() =>
                              handleClickGeneralCard(NavigationKnowledgePath)
                            }
                            displayLinkIcon={true}
                          />
                        </Box>
                      </WrapBox> */}
                      {/* // Start: branding Michael feedback */}
                      {/* My Open Card */}
                      <Box
                        key={(muuriKey = ++muuriKey)}
                        priority={30}
                        isAlwayShow={true}
                        type="Nav"
                        {...renderCardSize('normal', 'normal')}
                      >
                        <TicketsCard incidents={incidents} requests={orders} />
                      </Box>
                    </MuuriComponent>
                  </CustomCol>
                )}
              </Row>
            )}
          </Grid>
        </Box>

        <StyleOutageNotification>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </StyleOutageNotification>
        <OutageDialog
          open={openOutageDialog}
          outage={outage}
          onClickViewDetail={() => onArticleCardClick(outage.number)}
          handleClose={() => setOpenOutageDialog(false)}
        />
        <TicketDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          infoTicketDetail={itemDetail}
          currentUser={dataUser}
          changeStatus={changeStatus}
        />
        <IoLoadingWithBackdrop isOpen={openLoadingAckowledge} />
      </StyledMainSection>
    </>
  );
};

export default MainSection;
