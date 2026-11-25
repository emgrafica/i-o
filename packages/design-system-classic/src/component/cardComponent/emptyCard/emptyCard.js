import PropTypes from "prop-types";
import React from "react";
import "antd/dist/antd.css";
import "./emptyCard.scss";
import EmptySvg from "../../../assets/icons/empty-icon.svg";
import { Empty } from "antd";

const EmptyCard = (props) => {
  const { contentDescription, className, emptyIcon } = props;
  const classes = "io-empty-card "+className;
  return (
    <Empty
      image={emptyIcon}
      className={classes}
      description={contentDescription}
    />
  );
};

EmptyCard.propTypes = {
  /**
   * Content of card
   */
  contentDescription: PropTypes.element,
  /**
   * CSS of card
   */
  className: PropTypes.string,
   /**
   * Icon of card
   */
  emptyIcon: PropTypes.string
};

EmptyCard.defaultProps = {
  contentDescription: "No Data",
  className: "",
  emptyIcon: EmptySvg
};

export default EmptyCard;
