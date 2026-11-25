import { Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React from "react";
import html from "react-inner-html";
import articleBook from "../../../assets/icons/article-book.svg";
import eyeImg from "../../../assets/icons/security-eye.svg";
import calendarImg from "../../../assets/icons/time-calendar.svg";
import Card from "@material-ui/core/Card";
import Tooltip from '@material-ui/core/Tooltip';

import "./accordionDetails.scss";

const AccordionDetails = (props) => {
  let {
    type,
    image,
    title,
    description,
    rate,
    lastUpdated,
    viewCount,
    kbNumber,
    onViewDetail,
  } = props;

  const ContentComp = ({ content }) => {
    return <div {...html(content)} />;
  };
  return (
    <Card className="io-accordion-details" onClick={() => onViewDetail(kbNumber)}>
          <Grid spacing={1} container>
            <Grid justifyContent="space-between" alignItems="center" container item xs={12} lg={6}>
              <Grid item xs={2}>
                <div className="cover">
                  <img src={image} alt="imageCard" />
                </div>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title={title} placement="top">
                  <div className="title">{title}</div>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid alignItems="center" container item xs={12} lg={6}>
              <Grid container item xs={4}>
                <Rating
                  className="rate"
                  name="size-small"
                  defaultValue={rate}
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid container item xs={3}>
                <img src={eyeImg} className="icons" alt="imageCard" />
                <div className="viewcount">
                  ({viewCount})
                </div>
              </Grid>
              <Grid container item xs={5}>
                {lastUpdated && (
                  <>
                    <img src={calendarImg} className="icons" alt="imageCard" />
                    <div className="lastupdated">
                      {lastUpdated}
                    </div>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
    </Card>

  );
};

AccordionDetails.propTypes = {
  /**
   * Type of card
   */
  type: PropTypes.string,
  /**
   * kbNumber
   */
  kbNumber: PropTypes.string,

  /**
   * Title of card
   */
  title: PropTypes.string,
  /**
   * Description of card
   */
  description: PropTypes.string,
  /**
   * What image to use
   */
  image: PropTypes.string,
  /**
   * Rating
   */
  rate: PropTypes.number,
  /**
   * lastUpdated
   */
  lastUpdated: PropTypes.string,
  /**
   * viewCount
   */
  viewCount: PropTypes.number,
  /**
   * Optional click handler
   */
  onViewDetail: PropTypes.func,
};

AccordionDetails.defaultProps = {
  kbNumber: "",
  type: "",
  title: "Universal ID -- First time login and Portal overview",
  description:
    "Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com",
  image: articleBook,
  rate: 0,
  lastUpdated: "",
  viewCount: 0,
  onViewDetail: () => { },
};

export default AccordionDetails;
