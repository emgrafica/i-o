import React from "react";
import PropTypes from "prop-types";
import "./kbFlagHelpful.scss";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import LikeIcon from "../../assets/icons/like-icon.svg";
import SelectStar from "../../assets/icons/select-star.svg";

const KBFlagHelpful = (props) => {
  const { useful, rating, showMessage, isUseful } = props;

  const handleChangeUseful = (val) => {
    props.handleChangeUseful(val);
  };

  const handleChangeRating = (event) => {
    props.handleChangeRating(event.target.value);
  };

  return (
    <Box className="flag-helpful">
      <h4 className="heading4">Help us, help you.</h4>
      <Grid container className="flag-helpful-container">
        <Grid item xs={12} sm={8} className="flag-helpful-left">
          <p className="heading6">Was this article useful?</p>
          <Box className={`flag-icon-list icon-${useful} ${isUseful ? 'icon-disabled' : ''}`}>
            <Button
              onClick={() => handleChangeUseful("yes")}
              className="flag-icon flag-like-icon"
              disabled={isUseful}
            >
              <img src={LikeIcon} alt="like-icon" />
              <span>Yes</span>
            </Button>
            <Button
              onClick={() => handleChangeUseful("no")}
              className="flag-icon flag-dislike-icon"
              disabled={isUseful}
            >
              <img src={LikeIcon} alt="dislike-icon" />
              <span>No</span>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} className="rating-section">
          <img
            className="select-rating"
            src={SelectStar}
            alt="select-star-icon"
          />
          <Rating
            name="rating"
            className="rating"
            value={rating}
            onChange={(e) => handleChangeRating(e)}
          />
          {/* show notification when change feedback */}
          {showMessage &&<div id='hideMe'>
            Thank you for your feedback.
          </div>}
        </Grid>
      </Grid>
    </Box>
  );
};

KBFlagHelpful.propTypes = {
  rating: PropTypes.number,
  useful: PropTypes.string,
  showMessage: PropTypes.bool,
  isUseful: PropTypes.bool,
  handleChangeUseful: PropTypes.func,
  handleChangeRating: PropTypes.func,
};

KBFlagHelpful.defaultProps = {
  rating: 1,
  useful: "",
  showMessage: false,
  isUseful: false,
  handleChangeUseful: () => {},
  handleChangeRating: () => {},
};

export default KBFlagHelpful;
