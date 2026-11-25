import { LoadingOutlined } from "@ant-design/icons";
import { IoCard } from '@i-o/design-system-classic';
import { Card, Col, Row, Spin } from "antd";
import "antd/dist/antd.css";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AUTH } from "./../../constants";
import './SupportHistoryCard.scss';

const SupportHistoryComponent = (props) => {
  const { supportHistory = [], totalCount, isLoading } = props.supportHistory;

  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : {};
  const currentTimeZone = currentUser?.time_zone;
  const history = useHistory();

  const handleViewDetailClick = (e, data) => {
    history.push({
      pathname: `/support-history/detail/${data.ticketNumber}`,
      state:{
        path: history.location.pathname
      }
    });
  };

  const generateTicketLargeCards = () => {
    const numberLargeCard =
      supportHistory.length < 4 ? supportHistory.length : 1;
    return (
      <>
        {supportHistory.map((item, index) => {
          if (index < numberLargeCard) {
            return (
              <Col xs={24} sm={12} md={12} lg={8} className="largeCard" key={index} >
                <IoCard.TicketCard 
                  status={item.state}
                  titleTicket={item.short_description}
                  ticketNumber={item.number}
                  timeStamp={moment().to(moment.tz(item.updatedDate, currentTimeZone))}
                  onClick={handleViewDetailClick}
                />
              </Col>
            );
          }
        })}
      </>
    );
  };

  const generate2TicketSmallCards = () => {
    return (
      <>
        {supportHistory.map((item, index) => {
          if (index > 0 && index < 3) {
            return (
              <Col xs={24} sm={24} md={24} lg={24} key={index}>
                <IoCard.TicketCard 
                  status={item.state}
                  titleTicket={item.short_description}
                  ticketNumber={item.number}
                  timeStamp={moment().to(moment.tz(item.updatedDate, currentTimeZone))}
                  onClick={handleViewDetailClick}
                />
              </Col>
            );
          }
        })}
      </>
    );
  };

  const generate2TicketSmallCardsViewAll = () => {
    const haveEndCard = totalCount > 5;
    return (
      <>
        {supportHistory.map((item, index) => {
          if (index === 3 ) {
            return (
              <Col xs={24} sm={12} md={12} lg={24} key={index}  >
                <IoCard.TicketCard 
                  status={item.state}
                  titleTicket={item.short_description}
                  ticketNumber={item.number}
                  timeStamp={moment().to(moment.tz(item.updatedDate, currentTimeZone))}
                  onClick={handleViewDetailClick}
                />
              </Col>
            );
          }
          if (index === 4) {
            return (
              <Col xs={24} sm={12} md={12} lg={24} key={index} className="small-card-section" >
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} key={index} >
                    <IoCard.TicketCard 
                      status={item.state}
                      titleTicket={item.short_description}
                      ticketNumber={item.number}
                      timeStamp=''
                      onClick={handleViewDetailClick}
                    />
                  </Col>
                  {haveEndCard && (
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <IoCard.SeeMoreCard 
                        totalCount={totalCount - 5}
                        linkRedirect='/support-history'
                      />
                    </Col>
                  )}
                </Row>
              </Col>
            );
          }
        })}
      </>
    );
  };

  let content;
  if (supportHistory.length) {
    content = (
      <Row>
        {generateTicketLargeCards()}

        {/* generate 2 small cards */}
        {supportHistory.length > 3 && (
          <Col xs={24} sm={12} md={12} lg={8} className="mediaCard" >
            <Row>
              {generate2TicketSmallCards()}
            </Row>
          </Col>
        )}

        {/* generate 2 small cards and view all */}
        {supportHistory.length > 3 && (
          <Col xs={24} sm={24} md={24} lg={8} className="medium-small-card-section" >
            <Row>
              {generate2TicketSmallCardsViewAll()}
            </Row>
          </Col>
        )}
      </Row>
    );
  } else {
    content = (
      <IoCard.EmptyCard
        contentDescription={<Text>NO SUPPORT HISTORY YET</Text>}
      />
    );
  }

  return (
    <div className="support-history-component-style">
      <h4>
        <Link className="title-section title-link" to='/support-history'>Support History</Link>
      </h4>
      <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
        <div className="mt-15">{content}</div>
      </Spin>
    </div>
  );
};
SupportHistoryComponent.defaultProps = {
  supportHistory: {}
};

export default SupportHistoryComponent;
