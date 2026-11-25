
import { ArrowForwardIos, Assignment } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import imageComputer from './../../assets/images/placeholder-pc.png';
import { IoComponent } from '../index';
import './confirmDevice.scss';
import HlxButton from '../input/button/button';

const DetailLostAndStolen = (props) => {
  const { onClickNo, onClickYes, isLoading } = props;

  return (
    <div className="confirm-device">
      <h2 className="title">Replacement Device</h2>
      <img src={imageComputer} alt="imagePc" />
      <p className="content-confirm-detail">Click <strong>Yes, Replace Device</strong> to order a device to replace your missing one. Or click <strong>More Resources</strong>  to access a knowledge article with more information and options.</p>
      <div className="group-btn">
        <HlxButton
          onClick={onClickYes}
          disabled={isLoading}
          label="Yes, Replace Device"
        ></HlxButton>
        <span className="or-statement"><b>or</b></span>
        <HlxButton
          onClick={onClickNo}
          loading={isLoading}
          label="More Resources"
          onClick={onClickNo}
        ></HlxButton>
      </div>
    </div>
  );
};

DetailLostAndStolen.propTypes = {
  isLoading: PropTypes.bool,
  onClickNo: PropTypes.func,
  onClickYes: PropTypes.func
};

DetailLostAndStolen.defaultProps = {
  onClickNo: () => { },
  onClickYes: () => { }
};

export default DetailLostAndStolen;

