import PropTypes from "prop-types";
import React from "react";
import "antd/dist/antd.css";
import "./bannerHeaderComponent.scss";

const BannerHeaderComponent = (props) => {
  const { title, className, children } = props;
  const classes = className + ' io-banner';
  return (
    <div className={classes}>
      {children}
      <div className="title-shadow">{title}</div>
    </div>
  );
};

BannerHeaderComponent.propTypes = {
  /**
   * Content of component
   */
   title: PropTypes.string,
  /**
   * CSS of component
   */
  className: PropTypes.string,
  /**
   * children element of card
   */
   children: PropTypes.any
};

BannerHeaderComponent.defaultProps = {
  title: "",
  className: "",
  children: "" 
};

export default BannerHeaderComponent;
