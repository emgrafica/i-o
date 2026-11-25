import PropTypes from "prop-types";
import React from "react";
import "./button.scss";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const HlxButton = (props) => {
  const {
    disabled,
    label,
    onClick,
    style,
    startIcon,
    endIcon,
    loading,
  } = props;


  return (
    <div className="hlx-btn">
      <Button variant={label.toUpperCase() === "CANCEL" ? "outlined" : "contained"}
        disabled={disabled || loading}
        onClick={onClick}
        style={style}
        startIcon={loading && !!startIcon ? <CircularProgress size={16} style={{ color: '#333333' }} /> : startIcon}
        endIcon={loading && !!endIcon ? <CircularProgress size={16} style={{ color: '#333333' }} /> : endIcon}
      >
        {label}
      </Button>
    </div>

  );
};

HlxButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  startIcon: PropTypes.any,
  endIcon: PropTypes.any
};

HlxButton.defaultProps = {
  disabled: false,
  label: "Button",
  style: {},
  startIcon: '',
  endIcon: '',
  onClick: () => { console.log("onButtonClick") }
};

export default HlxButton;
