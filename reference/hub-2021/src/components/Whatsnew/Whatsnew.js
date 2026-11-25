import "antd/dist/antd.css";

import { Col, Row } from "antd";
import React from "react";

import ExpiredPassword from "../Whatsnew/ExpiredPassword";
import Announcement from "../Whatsnew/Announcement";
import DeviceInfo from "../Whatsnew/DeviceInfo";
import GenericAnnouncement from "../Whatsnew/GenericAnnouncement";
import GenericTicket from "../Whatsnew/GenericTicket";
import SupportTicket from "../Whatsnew/SupportTicket";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import RightOutlined from "../../assets/icons/arrow-right.svg";
import { useHistory } from "react-router-dom";
import DateUtils from "utils/date";
import { AUTH } from "../../constants";
import { LinkLibraryUtils } from "utils/linkLibrary";
import { SESSIONSTORAGEKEYS } from "constants/storageConstants";
import { LINKLIRARYCONSTANTS } from "constants/linkLibraryConstants";
import { IoCard } from '@i-o/design-system-classic';
import { PC_REF_STATUS } from "../../constants/pcRefreshConstants";

import imgGen from '../../assets/icons/outage-generic.svg';

const Whatsnew = (props) => {
  const history = useHistory();
  const pwdChangedDate = localStorage.getItem(AUTH.CURRENT_USER_PWDCHANGEDATE);
  let settings = localStorage.getItem(AUTH.SETTINGS);
  settings = settings ? JSON.parse(settings) : {};
  const pwdExpireddDays = settings.hasOwnProperty('PASSWORD_EXPIRED_DAYS') ? JSON.parse(settings.PASSWORD_EXPIRED_DAYS) : 0;
  const pwdReminderDays = settings.hasOwnProperty('PASSWORD_REMINDER_DAYS') ? JSON.parse(settings.PASSWORD_REMINDER_DAYS) : 0;
  const linkChangePwd = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_SUPPORT, LINKLIRARYCONSTANTS.PASSWORD_REMINDER, 1);
  const pwdExpiredObj = DateUtils.countDate(pwdExpireddDays, pwdReminderDays, pwdChangedDate);
  const reminderPwdExpired = pwdExpiredObj.reminderPwdExpired;
  let content;
  const handleListWhatsnewClick = () => {
    history.push({
      pathname: `/whatsnew`
    });
  };

  const handleListSupportHistoryClick = () => {
    history.push({
      pathname: `/support-history`
    });
  };
  
  const onDeviceCardClick = (data) => {
    //window.location.href=`mydevices?uid=${props.data.uid}`;
    history.push({
      pathname: checkHasKB(data) ? `/knowledges/detail/${data.knowledge.kbNumber}` : `/marketplace`,
      state: {
        path: props.path
      }
    });
  }
  const onSupportCardClick = (data) => {
    history.push({
      pathname: `/support-history/detail/${data.number}`,
      state: {
        path: props.path
      }
    });
  }
  const onOutageCardClick = (data) => {
    history.push({
      pathname: `/knowledges/detail/${data.kbNumber}`,
      state: {
        path: props.path
      }
    });
  };
  const onArticleCardClick = (e, data) => {
    history.push({
      pathname: `/knowledges/detail/${data.kbNumber}`,
      state: {
        path: data.path
      }
    });
  };
  const checkHasKB = (data) => {
    const pcState = data.pc_state;
    return (pcState !== PC_REF_STATUS.REFRESH);
  }
  const getContentKB = (data) => {
    let contentKB = '';
    if (checkHasKB(data)) {
        if (data && data.knowledge && data.knowledge.hasOwnProperty('kbName')) {
            contentKB = data.knowledge.kbName;
        }
    }
    return contentKB;
  }
  let countIndex = 0;
  const generateMultiCards = (isGenAnnouncements, isGenTicket, announcements, pcref, ticket, articleArr, remainCard, pwdExpired) => (
    <>
      <h5 className="whatsnew-title">
        <b onClick={handleListWhatsnewClick}>
          What’s New
        </b>
        <img src={RightOutlined} className="homepage-content-arrow" />
      </h5>
      <Row>
        {reminderPwdExpired &&
          <Col xs={24} sm={24} md={12} lg={8} className="custom-col-md-ex-4">
            {/* <ExpiredPassword data={pwdExpired}></ExpiredPassword> */}
            <a href={pwdExpired.url} target="_blank">
              <IoCard.SingleCard
                eyebrowTitle="password"
                cardTitle={`Your Universal ID password is expiring in ${pwdExpired.reminderDays}`}
              />
            </a>
          </Col>
        }
        {!isGenAnnouncements && announcements.length > 0 &&
          announcements.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
                <IoCard.SingleCard
                  onClick={() => onOutageCardClick(item)}
                  eyebrowTitle="outage"
                  cardTitle={item.kbName}
                  cardDesc={item.kbContent}
                />
              </Col>
            );
          })}
        {isGenAnnouncements && (
          <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
            {/* <GenericAnnouncement></GenericAnnouncement> */}
            <IoCard.MultipleCard
              onClick={handleListWhatsnewClick}
              eyebrowTitle="outage"
              cardTitle="View Outage Messages"
            />
          </Col>
        )}

        {pcref.length > 0 &&
          pcref.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
                {/* <DeviceInfo data={item} key={index} path={props.path}></DeviceInfo> */}
                <IoCard.SingleCard
                  onClick={() => onDeviceCardClick(item)}
                  eyebrowTitle="pc refresh"
                  cardTitle={checkHasKB(item) ? getContentKB(item) : 'A device refresh is available'}
                  cardDesc={checkHasKB(item) && item.knowledge ? item.knowledge.kbContent : (`Your ${item.model} is due for a replacement.`)}
                  pcImage={!checkHasKB(item) && item.image ? item.image : null}
                  pcEmpty={!checkHasKB(item) && !item.image ? true : false}
                />
              </Col>
            );
          })}
        {!isGenTicket && ticket.length > 0 &&
          ticket.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
                {/* <SupportTicket data={item} key={index} path={props.path}></SupportTicket> */}
                <IoCard.SingleCard
                  onClick={() => onSupportCardClick(item)}
                  eyebrowTitle="support"
                  cardTitle={item.short_description}
                  cardDesc={item.comments && item.comments.length > 0 ? item.comments[0].comment : (item.number + ' was created on your behalf')}
                />
              </Col>
            );
          })}
        {isGenTicket && (
          <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
            {/* <GenericTicket></GenericTicket> */}
            <IoCard.MultipleCard
              onClick={handleListSupportHistoryClick}
              eyebrowTitle="support"
              cardTitle="View Support Issues"
              multipleImage={imgGen}
            />
          </Col>
        )}
        {remainCard > 0 &&
          articleArr.length > 0 &&
          articleArr.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} key={countIndex++} className="custom-col-md-ex-4">
                <IoCard.ArticleCard
                  key={index}
                  cardType='ARTICLE'
                  cardTitle={item.kbName}
                  cardDesc=''
                  kbNumber={item.kbNumber}
                  cardTitleMaxRox={4}
                  onClick={onArticleCardClick}
                />
              </Col>
            );
          })}
      </Row>
    </>
  );

  if (props.data && Object.keys(props.data).length > 0) {
    let announcements = props.data.announcements;
    let pcref = props.data.pc_refresh;
    let ticket = props.data.tickets;

    const pwdExpired = {
      url: linkChangePwd,
      reminderDays: pwdExpiredObj.reminderDays
    };

    const totalPriorityItems =
      announcements.length + pcref.length + ticket.length;

    if (!reminderPwdExpired && announcements.length == 0 && pcref.length == 0 && props.data.featured_articles.length == 0 && ticket.length == 0) {
      content = (<></>)
    } else if (totalPriorityItems <= 3) {
      let articleArr = [];
      const remainCard = 3 - totalPriorityItems;
      const totalAnnounceandPC = announcements.length + pcref.length;
      if (reminderPwdExpired) {
        if (announcements.length == 3) {
          announcements.splice(2);
        } else if (announcements.length == 2) {
          pcref = [];
          ticket = [];
        } else if (announcements.length < 2) {
          if (totalAnnounceandPC >= 2) {
            ticket = [];
          } else if (ticket.length > 1) {
            if ((totalAnnounceandPC == 1) && (ticket.length == 2)) {
              ticket.splice(1);
            }
            if ((totalAnnounceandPC == 0)  && (ticket.length == 3)) {
              ticket.splice(2);
            }
          }
        }
      }

      if (((reminderPwdExpired && remainCard > 1) || (!reminderPwdExpired && remainCard > 0)) && props.data.featured_articles.length > 0) {
        const article = props.data.featured_articles;
        let forLoop;
        if (reminderPwdExpired) {
          forLoop =
          props.data.featured_articles.length >= remainCard
            ? (remainCard - 1)
            : props.data.featured_articles.length;
        } else {
          forLoop =
          props.data.featured_articles.length >= remainCard
            ? remainCard
            : props.data.featured_articles.length;
        }
        
        for (let idx = 0; idx < forLoop; idx++) {
          articleArr.push(article[idx]);
        }
      }
      content = generateMultiCards(false, false, announcements, pcref, ticket, articleArr, remainCard, pwdExpired);
    } else {

      const totalPCandTicket = pcref.length + ticket.length;
      const totalAnnounceandPC = announcements.length + pcref.length;

      const isGenAnnouncements =
        (announcements.length >= 2 && totalPCandTicket >= 1) ||
        (announcements.length > 3 && totalPCandTicket == 0);
      let isGenTicket =
        (ticket.length >= 2 && totalAnnounceandPC >= 1) ||
        (ticket.length > 3 && totalAnnounceandPC == 0);
      let articleArr = [];
      let totalGenCard = 0;
      let remainCard = 0;
      if (announcements.length >= 1) {
        totalGenCard++;
      }
      if (pcref.length >= 1) {
        totalGenCard++;
      }
      if (ticket.length >= 1) {
        totalGenCard++;
      }
      if (reminderPwdExpired && announcements.length >= 1 && pcref.length >= 1) {
        ticket = [];
        isGenTicket = false;
      }
      remainCard = totalGenCard < 3 ? 3 - totalGenCard : 0;
      if (((reminderPwdExpired && remainCard > 1) || (!reminderPwdExpired && remainCard > 0)) && props.data.featured_articles.length > 0) {
        const article = props.data.featured_articles;
        let forLoop;
        if (reminderPwdExpired) {
          forLoop =
          props.data.featured_articles.length >= remainCard
            ? (remainCard - 1)
            : props.data.featured_articles.length;
        } else {
          forLoop =
          props.data.featured_articles.length >= remainCard
            ? remainCard
            : props.data.featured_articles.length;
        }
        for (let idx = 0; idx < forLoop; idx++) {
          articleArr.push(article[idx]);
        }
      }
      content = generateMultiCards(isGenAnnouncements, isGenTicket, announcements, pcref, ticket, articleArr, remainCard, pwdExpired);
    }

  } else {
    content = (<></>);
  }

  return <Spin indicator={<LoadingOutlined />} spinning={props.isLoading}>{content}</Spin>;

};
Whatsnew.defaultProps = {
  data: []
};

export default Whatsnew;
