import PropTypes from "prop-types";
import React from "react";
import "./refreshStatusCard.scss";
import { Card, Grid, Box, Typography, Link } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TodayIcon from "@material-ui/icons/Today";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";

import LaptopMacOutlinedIcon from "@material-ui/icons/LaptopMacOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";

import DefaultPC from "../../../assets/images/placeholder-pc.png";

const REFRESH_STATUS = {
  REFRESH: "ELIGIBLE_FOR_REFRESH",
  PREPARING: "PREPARING_DEVICE",
  TRANSIT: "DEVICE_IN_TRANSIT",
  RETURN: "PC_RETURN",
  CLOSED: "CLOSED",
};

const RefreshStatusCard = (props) => {
  const { status, imgPC, titleOfPC, typeOfPC, url } = props;
  const refreshStatusList = [
    {
      status: REFRESH_STATUS.REFRESH,
      state: "ACTION REQUIRED",
      title: "Refresh eligible",
      timeline: 0,
      actionName: "Refresh PC",
    },
    {
      status: REFRESH_STATUS.PREPARING,
      state: "PREPARING DEVICE",
      title: "Request Submitted",
      timeline: 1,
      actionName: "View Request",
    },
    {
      status: REFRESH_STATUS.TRANSIT,
      state: "IN TRANSIT",
      title: "PC has been shipped",
      timeline: 2,
      actionName: "Track delivery",
    },
    {
      status: REFRESH_STATUS.RETURN,
      state: "PENDING RETURN",
      title: "Return old PC",
      timeline: 3,
      actionName: "Return Instructions",
    },
    {
      status: REFRESH_STATUS.CLOSED,
      state: "COMPLETED",
      title: "Arrived at depot",
      timeline: 4,
      actionName: "Finish",
    },
  ];

  const classProgress =
    status === REFRESH_STATUS.CLOSED
      ? "completed"
      : status === REFRESH_STATUS.REFRESH
      ? "action-required"
      : "";

  const TimelineStatus = (props) => {
    const numberLine = 4;
    let timelineRows = [];
    for (let i = 0; i < numberLine; i++) {
      timelineRows.push(
        <TimelineItem key={i}>
          <TimelineSeparator>
            <TimelineDot color={i < props.progress ? "primary" : "inherit"} />
            {/* <TimelineDot color='primary' /> */}
            {i < 3 && <TimelineConnector />}
          </TimelineSeparator>
        </TimelineItem>
      );
    }
    return (
      <Timeline align="alternate">
        {timelineRows}
      </Timeline>
    );
  };

  return (
    <Card className="pc-status">
      {refreshStatusList.map(
        (item) =>
          item.status === status && (
            <Grid container className="pc-status-container">
              <Grid item xs={4}>
                <Box className={`progress-status ${classProgress}`}>
                  <FiberManualRecordIcon />
                  <span>{item.state}</span>
                </Box>
                <img
                  className="pc-image"
                  src={imgPC ? imgPC : DefaultPC}
                  alt="PC image"
                />
                <Box className="pc-detail">
                  <Box>
                    <Typography>{typeOfPC}</Typography>
                    <Typography>{titleOfPC}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="pc-timeStamp">
                  <Typography className="pc-timeStamp-title">
                    {item.title}
                  </Typography>
                  <Box className="time-line-status">
                    <TimelineStatus progress={item.timeline} />
                  </Box>
                  <Link href={url ? url : "#"} onClick={props.onClick}>
                    {item.actionName}
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="pc-status-icon">
                  {status === REFRESH_STATUS.REFRESH && (
                    <Box>
                      <RefreshOutlinedIcon className="pc-status-icon-right sub-icon" />
                      <LaptopMacOutlinedIcon className="pc-status-icon-right" />
                    </Box>
                  )}
                  {status === REFRESH_STATUS.PREPARING && (
                    <DescriptionOutlinedIcon className="pc-status-icon-right" />
                  )}
                  {status === REFRESH_STATUS.TRANSIT && (
                    <LocalShippingOutlinedIcon className="pc-status-icon-right" />
                  )}
                  {status === REFRESH_STATUS.RETURN && (
                    <Box>
                      <KeyboardReturnIcon className="pc-status-icon-right sub-icon return" />
                      <LaptopMacOutlinedIcon className="pc-status-icon-right" />
                    </Box>
                  )}
                  {status === REFRESH_STATUS.CLOSED && (
                    <Box>
                      <CheckCircleOutlineOutlinedIcon className="pc-status-icon-right sub-icon finish" />
                      <LaptopMacOutlinedIcon className="pc-status-icon-right" />
                    </Box>
                  )}
                  <br></br>
                  <Box className="pc-status-calendar">
                    <TodayIcon />
                    <Typography>JUST NOW</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )
      )}
    </Card>
  );
};

RefreshStatusCard.propTypes = {
  status: PropTypes.oneOf([
    "ELIGIBLE_FOR_REFRESH",
    "PREPARING_DEVICE",
    "DEVICE_IN_TRANSIT",
    "PC_RETURN",
    "CLOSED",
  ]),
  imgPC: PropTypes.string,
  titleOfPC: PropTypes.string,
  typeOfPC: PropTypes.string,
  url: PropTypes.string,
};

RefreshStatusCard.defaultProps = {
  status: "",
  imgPC: "",
  titleOfPC: "",
  typeOfPC: "",
  url: "",
};

export default RefreshStatusCard;
