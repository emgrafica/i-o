import React, { useState } from "react";
import PropTypes from "prop-types";
import "./loadingWithBackdrop.scss";
import { Backdrop, CircularProgress, Box, Typography } from "@material-ui/core";

const LoadingWithBackdrop = (props) => {
  const { isOpen, handleClose, percentage, loadingText } = props;
  return (
    <Backdrop
      className="loading-with-backdrop-container"
      open={isOpen}
      onClick={handleClose}>
      {!percentage && <CircularProgress className="loading-with-backdrop-circular" />}
      {(percentage || percentage === '0') && <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {percentage == '0' && <CircularProgress className="loading-with-backdrop-circular" />}
        {percentage != '0' && <CircularProgress className="loading-with-backdrop-circular" variant="determinate" value={Math.round(percentage)} />}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div">
            {`${Math.round(percentage)}%`}
          </Typography>
        </Box>

      </Box>}
      {loadingText && <Typography variant="caption" component="div" className="loading-message">
        {loadingText}
      </Typography>}
    </Backdrop>
  )
};

LoadingWithBackdrop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  percentage: PropTypes.string,
  loadingText: PropTypes.string,
}

LoadingWithBackdrop.defaultProps = {
  isOpen: true,
  percentage: '',
  loadingText: ''
};


export default LoadingWithBackdrop;