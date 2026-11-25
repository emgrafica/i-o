import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "antd";
import OpenLinkIcon from "../../../assets/icons/open-link-icon.svg";
import chatLargeIcon from "../../../assets/icons/chat-large-icon.svg";
import "antd/dist/antd.css";
import './linkCard.scss';

const LinkCard = (props) => {

  const {url, cardTitle, cardDesc, cardIcon, showOpenLink, onClick} = props;
  return (
    <div className="io-link-card">
        <img src={cardIcon} />
        <h4>{cardTitle}</h4>
        <span className="description-knowledge-bottom">
        {cardDesc}
        </span>
        <div>
            <a href={url} target="_new">
                <Button 
                onClick={()=>onClick()}
                className="btn-request" 
                size="large">
                    {cardTitle}
                    {showOpenLink && (<img src={OpenLinkIcon} />)}
                </Button>
            </a>
        </div>
    </div>
  );
};

LinkCard.propTypes = {
    /**
     * Url
     */
    url: PropTypes.string,
    /**
     * Title of card
     */
    cardTitle: PropTypes.string,
    /**
     * Description of card
     */
    cardDesc: PropTypes.string,
    /**
     * What icon to use
     */
    cardIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    /**
    * Show open link icon
    */
    showOpenLink: PropTypes.bool,
    // /**
    //  * Optional click handler
    //  */
    onClick: PropTypes.func,
};

LinkCard.defaultProps = {
  url: "https://teams.microsoft.com/l/chat/0/0?users=DXC_ConnectChat_Demo@enchat.svcs.entsvcs.com",
  cardTitle:'Chat with an agent',
  cardDesc: 'Talk to one of our specialists to get the help you need.',
  cardIcon: chatLargeIcon,
  showOpenLink: false
};

export default LinkCard;