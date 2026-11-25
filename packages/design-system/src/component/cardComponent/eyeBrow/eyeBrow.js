import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core";
import "./eyeBrow.scss";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "io-eyebrow"
});

const useStyles = makeStyles(
  {
    colorStyle: {
      color: props => props.color+"!important",
    },
    backgroundStyle: {
      background: props => props.backgroundColor+"!important",
    }
  }
);

const EyeBrow = (props) => {
  const { colorStyle, backgroundStyle } = useStyles(props);
  const { text, icon } = props;
  return (
    <StylesProvider generateClassName={generateClassName}>
      <div className="chip">
        <div className={`${colorStyle} ${backgroundStyle} eyebrow`}> {icon} {text}</div>
      </div>
    </StylesProvider>
  );
};

EyeBrow.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string
};

EyeBrow.defaultProps = {
  text: "News",
};

export default EyeBrow;
