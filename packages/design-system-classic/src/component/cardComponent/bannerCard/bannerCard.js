import { Col, Row } from "antd";
import PropTypes from 'prop-types';
import React from 'react';
import './bannerCard.scss';
import iconInfo from './../../../assets/icons/icon-info.png';

const BannerCard = (props) => {
  const {cardHeader, cardTitle, btnTitle, btnUrl, children, classOuter} = props;
  return (
    <Row className="market-place-support">
      <h4 className="title-section title-black">{cardHeader}</h4>
      <Col span={24} className={`outer ${classOuter}`}>
        <Row className="content-container">
          <Col xs={24} md={12}>
            <h3 className="title-article">{cardTitle}</h3>
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          {!!btnUrl && <a href={btnUrl} target="_blank" className="link-support button-default-1">
            <span>
              {btnTitle}
              <img src={iconInfo} alt="icon-info" className="icon-info" />
            </span>
          </a>}
        </Row>
      </Col>
    </Row>
  );
};

BannerCard.propTypes = {
  /**
   * Header of card
   */
  cardHeader: PropTypes.string,
  /**
   * Title of card
   */
  cardTitle: PropTypes.string,

  /**
   * Header of card
   */
  classOuter: PropTypes.string,

  /**
   * url to button link to
   */
  btnUrl: PropTypes.string,

  /**
   * button_description of card
   */
  btnTitle: PropTypes.string,

  /**
   * children element of card
   */
  children: PropTypes.any
 
};

BannerCard.defaultProps = {
  cardHeader: 'App & Software',
  cardTitle: 'Looking for software?',
  classOuter: 'outer-software',
  btnUrl: 'https://jira.dxc.com/',
  btnTitle: "Open Company Portal",
  children: "Content in here..."  
};

export default BannerCard;