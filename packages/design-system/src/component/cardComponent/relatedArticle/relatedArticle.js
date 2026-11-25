import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React from "react";
import html from "react-inner-html";
import toolPaperImg from "../../../assets/icons/tools-paper-icon.svg";
import calendarImg from "../../../assets/icons/time-calendar.svg";
import SvgIcon from '@material-ui/core/SvgIcon';
import "./relatedArticle.scss";

const RelatedArticle = (props) => {
  let {
    direction,
    cardImg,
    cardTitle,
    cardDesc,
    cardType,
    rate,
    lastUpdated,
    viewCount,
    kbNumber,
    onViewDetail,
  } = props;


  const ContentComp = ({ content }) => {
    return <div {...html(content)} />;
  };
  return direction === "horizontal" ? (
    <Card className="article-ticket-horizontal">
      <CardActionArea onClick={() => onViewDetail(kbNumber)}>
        {cardType && (
          <CardHeader
            className="header"
            title={
              <Typography
                className="article-ticket-type"
                variant="body2"
                component="h5"
              >
                {cardType}
              </Typography>
            }
          ></CardHeader>
        )}
        <CardContent className="content">
          <Grid container spacing={1}>
            <Grid item xs={4} className="grid-middle-left">
              {cardImg?(
                  <img className="cover" src={cardImg} alt="imageCard" />
              ):(
                  <img className="cover" src={toolPaperImg} alt="imageCard" />
              )}
             
            </Grid>
            <Grid item xs={8}>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                className="article-tittle number-of-line-1"
              >
                {cardTitle}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h5"
                className="article-desc number-of-line-2"
              >
                <ContentComp content={cardDesc}></ContentComp>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
  

      <CardActions className="actions">
        <Grid container direction="row" item xs={4} className="grid-bottom-left">
          {lastUpdated && (
            <>
              <img src={calendarImg} className="icons" alt="imageCard"/>
              <Typography variant="caption" color="textSecondary" component="h5" className="lastupdate">
                {lastUpdated}
              </Typography>
            </>
          )}
        </Grid>
        <Grid container direction="row" item xs={8}>
          <Rating
            className="rate"
            name="size-small"
            defaultValue={rate}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="textSecondary" component="h5">
            ({viewCount})
          </Typography>
        </Grid>
      </CardActions>
      </CardActionArea>
    </Card>
  ) : (
    <Card
      className="article-ticket"
      onMouseDown={() => onViewDetail(kbNumber)}
    >
      <CardHeader
        avatar={
          <div>
            <img src={cardImg} alt="imageCard" />
          </div>
        }
        title="Support Article"
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          className={
            "article-tittle number-of-line-" + props.cardTitleMaxRox
          }
        >
          {cardTitle}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h5"
          className="article-desc number-of-line-3"
        >
          <ContentComp content={cardDesc}></ContentComp>
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions disableSpacing>
        {lastUpdated && (
          <>
            <EventIcon className="article-event-icon"/>
            <Typography variant="body2" color="textSecondary" component="h5">
              {lastUpdated}
            </Typography>
          </>
        )}
        <Rating
          className="rate"
          name="size-small"
          defaultValue={rate}
          size="small"
          readOnly
        />
        <Typography variant="body2" color="textSecondary" component="h5">
          ({viewCount})
        </Typography>
      </CardActions>
    </Card>
  );
};

RelatedArticle.propTypes = {
  /**
   * Type of card
   */
  cardType: PropTypes.string,
  /**
   * kbNumber
   */
  kbNumber: PropTypes.string,

  /**
   * Title of card
   */
  cardTitle: PropTypes.string,

  /**
   * Max row of cardTitle
   */
  cardTitleMaxRox: PropTypes.number,
  /**
   * Description of card
   */
  cardDesc: PropTypes.string,
  /**
   * What image to use
   */
  cardImg: PropTypes.string,
  /**
   * Direction of the card. Just accept horizontal or  vertical
   */
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
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

RelatedArticle.defaultProps = {
  direction: "horizontal",
  kbNumber: "",
  cardType: "",
  cardTitleMaxRox: 2,
  cardTitle: "Universal ID -- First time login and Portal overview",
  cardDesc:
    "Universal ID is replacing Global Pass as the new way you will log into DXC sites, applications and tools. Universal ID will be rolled out in phases. Access the Universal ID PortalOpen uid.dxc.com",
  cardImg: toolPaperImg ,
  rate: 0,
  lastUpdated: "",
  viewCount: 0,
  onViewDetail: () => {},
};

export default RelatedArticle;
