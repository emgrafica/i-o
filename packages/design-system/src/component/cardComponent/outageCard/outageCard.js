import React from "react";
import "./outageCard.scss";
import PropTypes from "prop-types";
import { Button, Card } from "@material-ui/core";
import OutageIcon from "../../../assets/icons/outage-generic.svg";
import DateUtils from "../../../utils/date";

const OutageCard = (props) => {
  const { outage } = props;
  return (
    <Card className="outage-card-container">
      <div className="outage-icon">
        <img src={OutageIcon} alt="outage-icon" />
      </div>
      <div className="outage-title">{outage.name}</div>
      <div className="outage-content">
        {DateUtils.timetoXbyGMT(outage.lastUpdated)} &#8226;{" "}
        {outage.content}
      </div>
      <Button className="outage-link" onClick={props.onClickViewDetail}>
        View now
      </Button>
    </Card>
  );
};

OutageCard.propTypes = {
  outage: PropTypes.object,
  onClickViewDetail: PropTypes.func,
};

OutageCard.defaultProps = {
  outage: {
    id: "e20cef611b83a09057c162c8624bcbd4",
    name: "Chorley Network Outage 2",
    knowledgeBase: "Announcements",
    number: "KB0014912",
    content:
      "There has been an issue with the Chorley Huron network and some Users may not be able to access the internet when connected. This is a known issue, please refrain from creating support tickets for...",
    rating: 3.6,
    viewCount: 0,
    score: 0,
    lastUpdated: "2021-09-20 07:33:38",
    createdDate: "2021-03-22 15:31:17",
    publishedDate: "2021-03-22",
  },
  onClickViewDetail: () => {},
};
export default OutageCard;
