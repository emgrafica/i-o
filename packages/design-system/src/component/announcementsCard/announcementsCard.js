import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import EyeBrow from '../cardComponent/eyeBrow/eyeBrow';
import "./announcementsCard.scss";

const AnnouncementsCard = (props) =>{
    const { title, eyebrowTitle, content, handleClick } = props;
    return (
        <Card className="announcements-card-container" onClick={handleClick}>
            <CardContent className="announcements-card-body">
                <div className="announcements-card-header">
                <EyeBrow color="#d81e5b" backgroundColor="#fddee2" text={eyebrowTitle}/>
                </div>
                <div className="announcements-card-title">{title}</div>
                <div className="announcements-card-content">{content}</div>
            </CardContent>
        </Card>
    )
};

AnnouncementsCard.propTypes = {
    eyebrowTitle: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    kbNumber: PropTypes.string,
    handleClick: PropTypes.func,
}

AnnouncementsCard.defaultProps = {
    eyebrowTitle: "Announcements",
    title: "Pulse VPN updates coming soon. PC restart required.",
    content: "A new version of Pulse VPN (version 9.1.12) will be available on Aug. 17, 2021 for install following the steps below.DXC IT will push the Pulse VPN update to PCs beginning on Aug. 24. Please note:When..."
}

export default AnnouncementsCard;