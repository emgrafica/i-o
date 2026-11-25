import "antd/dist/antd.css";

import { Col, Row } from "antd";
import React, { useEffect, useState, useCallback } from "react";

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
import { LinkLibraryUtils as Link_Library_Utils } from "../../utils/linkLibrary";
import { MuuriComponent } from 'muuri-react';
import { LINKLIRARYCONSTANTS as LINK_LIRARY_CONSTANTS } from "../../constants/linkLibraryConstants";
//Link Library
import { SESSIONSTORAGEKEYS as SESSION_STORAGE_KEYS } from "../../constants/storageConstants";
import Highlighter from "react-highlight-words";
import Text from "antd/lib/typography/Text";

import moment from "moment";
import imgGen from '../../assets/icons/outage-generic.svg';
const useFilter = (search = '', filter = []) => {
  return useCallback(
    function (data) {
      const isSearchMatch = !search
        ? true
        : data.title.toLowerCase().indexOf(search) > -1;
      const isFilterMatch = filter.length === 0 ? true : filter.indexOf(data.type) !== -1;
      return isFilterMatch && isSearchMatch;
    }
  )
};

const MuuriListComponent = (props) => {
  let [links, setLinks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const currentLinks = Link_Library_Utils.GetLinks(SESSION_STORAGE_KEYS.LINK_LIBRARY_MY_STUFF, LINK_LIRARY_CONSTANTS.MY_STUFF);
    setLinks(currentLinks);
  }, []);

  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : {};
  const currentTimeZone = currentUser?.time_zone;

  const pwdChangedDate = localStorage.getItem(AUTH.CURRENT_USER_PWDCHANGEDATE);
  let settings = localStorage.getItem(AUTH.SETTINGS);
  settings = settings ? JSON.parse(settings) : {};
  const pwdExpireddDays = settings.hasOwnProperty('PASSWORD_EXPIRED_DAYS') ? JSON.parse(settings.PASSWORD_EXPIRED_DAYS) : 0;
  const pwdReminderDays = settings.hasOwnProperty('PASSWORD_REMINDER_DAYS') ? JSON.parse(settings.PASSWORD_REMINDER_DAYS) : 0;
  const linkChangePwd = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_SUPPORT, LINKLIRARYCONSTANTS.PASSWORD_REMINDER, 1);
  const pwdExpiredObj = DateUtils.countDate(pwdExpireddDays, pwdReminderDays, pwdChangedDate);
  const reminderPwdExpired = pwdExpiredObj.reminderPwdExpired;
  let content;


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
  const options = {
    dragSortHeuristics: {
      sortInterval: 70
    },
    layoutDuration: 400,
    dragRelease: {
      duration: 400,
      easing: "ease-out"
    },
    dragEnabled: true,
    dragContainer: document.body,
    // The placeholder of an item that is being dragged.
    dragPlaceholder: {
      enabled: true,
      createElement: function (item) {
        // The element will have the Css class ".muuri-item-placeholder".
        return item.getElement().cloneNode(true);
      }
    }
  };
  let indexItem = 1;
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


  const onMyDevicesHandleClick = (uid) => {
    history.push({
      pathname: ROUTER.MY_DEVICES,
      search: `?uid=${uid}`,
      state: props,
    });
  };

  const onRefreshHandleClick = () => {
    history.push(ROUTER.MARKETPLACE);
  };

  const handleViewDetailClick = (kbNumber) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
      state: {
        path: history.location.pathname
      }
    });
  };

  const handleOnclickHelpLink = (param) => {
    if (param) {
      history.push({
        pathname: ROUTER.SEARCH,
        search: `?param=${param}&paging=${1}`, // query string
      });
    }
  };



  const handleViewDetailSPClick = (e, data) => {
    history.push({
      pathname: `/support-history/detail/${data.ticketNumber}`,
      state: {
        path: history.location.pathname
      }
    });
  };
  const filterFunction = useFilter(props.search, props.filter);
  const { announcements, featured_articles } = props.data.whatsNews;
  const myStuff = props.data.myStuff.data;
  const { supportHistory } = props.data.supportHistory;
  const hlTextArray = props.search.split(" ");
  return <Spin indicator={<LoadingOutlined />} spinning={props.isLoading}>
    {announcements && featured_articles && <MuuriComponent
      {...options}

      propsToData={({ title, type }) => ({ title, type })}
      filter={filterFunction}
      sort={props.sort}
    >
      {announcements && announcements.length > 0 &&
        announcements.map((item, index) => {

          return (
            <div key={++indexItem} title={item.kbName} type="outage" className="muuri-item-article">
              <IoCard.SingleCard
                onClick={() => onOutageCardClick(item)}
                eyebrowTitle="outage"
                cardTitle={<Highlighter
                  highlightClassName="kb-card-highlight-text"
                  searchWords={hlTextArray}
                  autoEscape={true}
                  textToHighlight={item.kbName}
                />}
                cardDesc={<Highlighter
                  highlightClassName="kb-card-highlight-text"
                  searchWords={hlTextArray}
                  autoEscape={true}
                  textToHighlight={item.kbContent}
                />}
              />
            </div>
          );
        })}
      {featured_articles &&
        featured_articles.length > 0 &&
        featured_articles.map((item, index) => {
          return (
            <div key={++indexItem} title={item.kbName} type="article" className="muuri-item-article">
              <IoCard.ArticleCard
                key={index}
                cardType='ARTICLE'
                cardTitle={<Highlighter
                  highlightClassName="kb-card-highlight-text"
                  searchWords={hlTextArray}
                  autoEscape={true}
                  textToHighlight={item.kbName}
                  />}
                cardDesc=''
                kbNumber={item.kbNumber}
                cardTitleMaxRox={4}
                onClick={onArticleCardClick}
              />
            </div>
          );
        })}
      {myStuff.map((item, index) => {
        const {
          is_new = false,
          manufacturer,
          model,
          processing,
          image,
          pc_state,
          knowledge,
          uid
        } = item;
        return (
          <div key={++indexItem} title={model} type="mystuff" className="muuri-item-article">
            <IoCard.DeviceCard
              uid={uid}
              is_new={is_new}
              manufacturer={<Highlighter
                highlightClassName="kb-card-highlight-text"
                searchWords={hlTextArray}
                autoEscape={true}
                textToHighlight={manufacturer}
                />}
              model={<Highlighter
                highlightClassName="kb-card-highlight-text"
                searchWords={hlTextArray}
                autoEscape={true}
                textToHighlight={model}
                />}
              processing={processing}
              image={image}
              pc_state={pc_state}
              kbNumber={knowledge ? knowledge.kbNumber : ''}
              getHelpUrl={handleOnclickHelpLink}
              onMyDevicesHandleClick={onMyDevicesHandleClick}
              onRefreshHandleClick={onRefreshHandleClick}
              handleViewDetailClick={handleViewDetailClick}
            />
          </div>
        );
      })}
      {supportHistory.map((item, index) => {
        return (
          <div key={++indexItem} title={item.short_description} type="support" className="muuri-item-article">
            <IoCard.TicketCard
              status={item.state}
              titleTicket={<Highlighter
                highlightClassName="kb-card-highlight-text"
                searchWords={hlTextArray}
                autoEscape={true}
                textToHighlight={item.short_description}
                />}
              ticketNumber={item.number}
              timeStamp={moment().to(moment.tz(item.updatedDate, currentTimeZone))}
              onClick={handleViewDetailSPClick}
            />
          </div>
        );
      })}
    </MuuriComponent>}
    {props.isLoading && <IoCard.EmptyCard
        contentDescription={<Text></Text>}
      />}
  </Spin>;

};
MuuriListComponent.defaultProps = {
  data: []
};

export default MuuriListComponent;
