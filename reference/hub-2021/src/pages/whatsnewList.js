import { LoadingOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Spin } from "antd";
import "antd/dist/antd.css";
import { LINKLIRARYCONSTANTS } from "constants/linkLibraryConstants";
import { SESSIONSTORAGEKEYS } from "constants/storageConstants";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import WhatsNewAction from "redux/actions/whatsNewAction";
import { LinkLibraryUtils } from "utils/linkLibrary";
import arrowBack from '../assets/icons/arrow-back.svg';
import articleImg from '../assets/icons/article.svg';
import calendarIcon from '../assets/icons/calendar.svg';
import pcRefImg from '../assets/icons/pc-refresh.svg';
import refreshImg from '../assets/icons/refresh-icon.svg';
import pcEmpty from '../assets/images/empty/emptyLaptop01-removebg-preview.png';
import { AUTH } from "../constants/authConstants";
import { PC_REF_STATUS } from "../constants/pcRefreshConstants";
import '../styles/scss/home/whatsnew-list-details.scss';
import DateUtils from "../utils/date";
const { Content } = Layout;

const ListWhatsnew = (props) => {
  const currentTimeZone = useMemo(()=>{
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    if (currentUser) {
      const time_zone = (JSON.parse(currentUser)).time_zone;
      return time_zone;
    } else {
      return;
    }
  },[AUTH.CURRENT_USER]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    if (currentUser) props.fetchWhatsnewListItem(JSON.parse(currentUser));
  }, []);

  const history = useHistory();
  const onBackHomeClick = () => {
    history.push({
      pathname: '/',
    });
  }
  const onOutageClick = (kbNumber) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
      state: {
        path: history.location.pathname
      }
    });
  }
  const onPCRefreshClick = (item) => {
    history.push({
      pathname: item.pc_state !== PC_REF_STATUS.REFRESH ? `/knowledges/detail/${item.knowledge.kbNumber}` : `/marketplace`,
      state: {
        path: history.location.pathname
      }
    });
  }
  const onTicketClick = (number) => {
    history.push({
      pathname: `/support-history/detail/${number}`,
    });
  }
  let settings = localStorage.getItem(AUTH.SETTINGS);
  settings = !!settings ? JSON.parse(settings) : {};
  let pwdExpireDays = settings.hasOwnProperty('PASSWORD_EXPIRED_DAYS') ? JSON.parse(settings.PASSWORD_EXPIRED_DAYS) : 0;
  let pwdRiminderDays = settings.hasOwnProperty('PASSWORD_REMINDER_DAYS') ? JSON.parse(settings.PASSWORD_REMINDER_DAYS) : 0;
  let pwdChangeDate = localStorage.getItem(AUTH.CURRENT_USER_PWDCHANGEDATE);
  pwdChangeDate = !!pwdChangeDate ? pwdChangeDate : '';

  let cardExpireDay;
  const objExpireDay = DateUtils.countDate(pwdExpireDays, pwdRiminderDays, pwdChangeDate);
  const linkChangePwd = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_SUPPORT, LINKLIRARYCONSTANTS.PASSWORD_REMINDER, 1);

  {objExpireDay.reminderPwdExpired ? cardExpireDay = (
    <Row className="row-content">
      <Col className="items">
        <a href={linkChangePwd} target="_blank" className="d-block">
          <Card className="item-box card-wrap" hoverable>
            <div className="status-box">
              <span className="status">Password</span>
            </div>
            <h5 className="trim-text-1-line">Your Universal ID password is expiring in {objExpireDay.reminderDays}</h5>
            <p className="trim-text-1-line short-desc">Your Universal ID password expires in {objExpireDay.reminderDays}, click here to update it before it expires.</p>
          </Card>
        </a>
      </Col>
    </Row>
  ) : (<></>)}
  
  
  let content;
  const {whatsNewList, isLoading} = props;
  if (whatsNewList && Object.keys(whatsNewList).length > 0) {
    const outageData = whatsNewList.announcements;
    const pcRefreshData = whatsNewList.pc_refresh;
    const ticketData = whatsNewList.tickets;
    const article = whatsNewList.featured_articles;

    const hasKB = pcRefreshData.length > 0 && pcRefreshData[0].pc_state !== PC_REF_STATUS.REFRESH;
    const isReturned = pcRefreshData.length > 0 && pcRefreshData[0].pc_state === PC_REF_STATUS.RETURNED;
    let contentKB = '';
    if (hasKB) {
      contentKB = isReturned ? 'Please return your old PC' : 'Preparing for your new PC';
    }

    let arrTmp = [];
    if (article.length > 3) {
      for (let index = 0; index < 3; index++) {
        arrTmp.push(article[index]);
      }
    } else {
      arrTmp = article;
    }
    content = (
      <Content>
        {outageData.length > 0 &&
          outageData.map((item, index) => {
            let timeToNow = DateUtils.timetoXbyUTC(item.lastUpdated, currentTimeZone);

            return (
              <Row data={item} key={index} className="row-content" onClick={() => {
                onOutageClick(item.kbNumber);
              }}>
                <Col className="items">
                  <Card className="item-box card-wrap" hoverable>
                    <div className="status-box">
                      <Row wrap={false}>
                        <Col flex="auto">
                          <span className="status">Outage</span>
                        </Col>
                        <Col flex="none">
                          <img src={calendarIcon} className="align-middle" />
                          <span className="trim-text-1-line date align-middle d-inline-block">{timeToNow}</span>
                        </Col>
                      </Row>
                    </div>
                    <h5><span className="trim-text-1-line">{item.kbName}</span></h5>
                    <div>
                      <span className="trim-text-1-line short-desc">{item.kbContent}</span>
                    </div>
                  </Card>
                </Col>
              </Row>
            );
          })}

        {/* PC Refresh */}
        {pcRefreshData.length > 0 &&
          pcRefreshData.map((item, index) => {
            let timeToNow = DateUtils.timetoXbyUTC(item.assigned_date, currentTimeZone);

            return (
              <Row data={item} key={index} className="row-content" onClick={() => {
                onPCRefreshClick(item);
              }}>
                <Col className="items">
                  <Card className="item-box card-wrap" hoverable>
                    <div className="pc-content">
                      {/* Left Content */}
                      <div className="pc-left">
                        <div className="status-box">
                          <span className="ticket-status">PC Refresh</span>
                          <div className="time-now-pc">
                            <img src={calendarIcon} className="align-middle" />
                            <span className="trim-text-1-line date align-middle d-inline-block">{timeToNow}</span>
                          </div>
                        </div>
                        <h5><span className="trim-text-1-line">{hasKB ? item.knowledge.kbName : 'Refresh your device'}</span></h5>
                        <div className="pc-desc">
                          <span className="trim-text-1-line short-desc">{hasKB ? item.knowledge.kbContent : (`You are eligible to upgrade your ${item.model} device. Get started here.`)}</span>
                        </div>
                      </div>
                      {/* Right Content */}
                      <div className="pc-right">
                        {!hasKB && (
                          <Content>
                            <div className="pc-img">
                              <img src={item.image ? item.image : pcEmpty} />
                              <div className="ref-img">
                                <img src={refreshImg} />
                              </div>
                            </div>
                          </Content>
                        )}
                        {hasKB && (
                          <Content>
                            <img src={pcRefImg} />
                          </Content>
                        )}
                      </div>
                    </div>
               
                  </Card>

                </Col>
              </Row>
            );
          })}
        {/* Ticket Support */}
        {ticketData.length > 0 &&
          ticketData.map((item, index) => {
            let timeToNow = DateUtils.timetoXbyUTC(item.updatedDate, currentTimeZone);
            
            return (
              <Row data={item} key={index} className="row-content" onClick={() => {
                onTicketClick(item.number);
              }}>
                <Col className="items">
                  <Card className="item-box card-wrap" hoverable>
                    <div className="status-box">
                      <Row wrap={false}>
                        <Col flex="auto">
                          <span className="ticket-status">Support</span>
                          <span className={`ticket-state ${item.state === 'Open' ? 'ticket-open-state' : item.state === 'Action Required' ? 'ticket-actionrequired-state' : ''}`}><b>{item.state}</b></span>
                        </Col>
                        <Col flex="none">
                          <img src={calendarIcon} className="align-middle" />
                          <span className="trim-text-1-line date align-middle d-inline-block">{timeToNow}</span>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <h5><span className="trim-text-1-line">{item.short_description}</span></h5>
                    </div>
                    <div className="content-ticket">
                      <div>
                        <span className="trim-text-1-line short-desc">
                        {item.comments && item.comments.length > 0 ? item.comments[0].comment : (item.number + ' was created on your behalf')}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            );
          })}

        {/* Article */}
        {arrTmp.length > 0 &&
          arrTmp.map((item, index) => {
            return (
              <Row data={item} key={index} className="row-content" onClick={() => {
                onOutageClick(item.kbNumber);
              }}>
                <Col className="items">
                  <Card className="article-box ticket-box card-wrap" hoverable>
                    <div className="content-left">
                      <img src={articleImg} />
                    </div>
                    <div className="content-right">
                      <div className="article-status">
                        Article
                      </div>
                      <div className="article-content">
                        <h5><span className="trim-text-1-line">{item.kbName}</span></h5>
                      </div>
                      <div className="article-desc">
                        <span className="trim-text-1-line">{item.kbContent}</span>
                      </div>
                    </div>
                  </Card>

                </Col>
              </Row>
            );
          })}
      </Content>
    );

  } else {
    content = (
      <Row></Row>
    )
  }

  return (
    <div className="list-whatsnew custom_container">
      <Link to="/" className="icon-back back-home">
        Home
      </Link>
      <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
        <div className="content">
          <h3>What’s New</h3>
          <div className="items">
            {cardExpireDay}
            {content}
          </div>
        </div>
      </Spin>
    </div>
  );
};


const mapStateToProps = ({whatsNew}) => ({
  whatsNewList: whatsNew.whatsNewList,
  isLoading:whatsNew.isLoading
});
const mapDispatchToProps = (dispatch) => ({
  fetchWhatsnewListItem: (currentUser) =>
    dispatch(WhatsNewAction.fetchWhatsnewListItem(currentUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWhatsnew);


