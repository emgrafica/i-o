import { Card } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './seeMoreCard.scss';
import iconArrow from './../../../assets/icons/arrow-right-purple.svg';

const SeeMoreCard = (props) => {
  const { totalCount, linkRedirect } = props;

  return (
    <a href={linkRedirect} className="link-see-more">
      <Card className="see-more-card card-wrap" hoverable >
        <p className="txt-view">View all ({totalCount})</p>
        <img src={iconArrow} alt="icon-arrow" className="icon-arrow" />
      </Card>
    </a>
  );
};

SeeMoreCard.propTypes = {
  totalCount: PropTypes.number,
  linkRedirect: PropTypes.string
};

SeeMoreCard.defaultProps = {
  totalCount: 0,
  linkRedirect: ''
};

export default SeeMoreCard;
