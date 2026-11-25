import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import "./generalCard.scss";
import PropTypes from 'prop-types';

const { Meta } = Card;

const GeneralCard = (props) => {

  const {
    cardType,
    uid,
    name,
    link,
    typeIcon,
    srcIcon,
    url,
    displayLinkIcon,
  } = props;

  const { onMyDevicesHandleClick } = props;

  const generateContent = () => {
    return (
      <div>
        {(!displayLinkIcon) ?
          (<div className="deviceImg-cover"><img alt={typeIcon} src={srcIcon} onClick={() => onMyDevicesHandleClick(uid)} /></div>) :
          (<div className="generalImg-cover"><img alt={typeIcon} src={srcIcon} className="general-card-icon" /></div>)
        }
        {cardType == "small card" ?
          <h6>
            {name}
          </h6>
          :
          <div className="title-cover">
          <h4>
            {name}
          </h4>
          </div>
        }

        <div className="general-card-link">
          <div className={cardType == "small card" ? "captionSemibold" : "bodySemibold"}>{link}</div>
          <div className="general-card-icon-cover">
            {displayLinkIcon && <BsBoxArrowUpRight className="general-card-icon" />}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className={cardType == "large card" ? "LargeCard" : ""}>
      <Card hoverable className={`card-wrap general-card ${!displayLinkIcon ? 'device-card' : ''}`}>
        <Meta
          description={
            displayLinkIcon ? (
              <a href={url ? url : "#"} target="_blank">
                {generateContent()}
              </a>
            ) : (
              <div onClick={() => onMyDevicesHandleClick(uid)}>
                {generateContent()}
              </div>
            )
          }
        />
      </Card>
    </div>

  );
};



GeneralCard.propTypes = {
  cardType: PropTypes.oneOf([
    'large card',
    'small card'
  ]),
  /**
  * displayLinkIcon: display link icon
  *    true: is display link icon
  *    false: is not display link icon
  */
  displayLinkIcon: PropTypes.bool,
  /**
  * uid: the id of small device
  */
  uid: PropTypes.string,
  /**
   * name: the name of card
   */
  name: PropTypes.string,
  /**
   * link: the uri link of card
   */
  link: PropTypes.string,
  /**
   * What image to use
   */
  srcIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  /**
   * url: the link of small card
   */
  url: PropTypes.string,
  /**
   * Optional click handleViewDetailClick
   */
  onMyDevicesHandleClick: PropTypes.func,
};


GeneralCard.defaultProps = {
  cardType: "small card",
  displayLinkIcon: false,
  uid: "84b81272878fa41020ae0e1acebb35e2",
  name: "ThinkPad 1410",
  srcIcon: "https://cdn.i-o.systems/images/devices_lenovo_thinkcentre_m92p.jpg",
  link: "Prepare for return",
  url: '',
  onMyDevicesHandleClick: () => { },
};


export default GeneralCard;
