import React from 'react';
import './empty.scss';
import iconEmpty from './../../assets/icons/empty-icon.svg';

const empty = (props) => {
  return (
    <div className="empty-card">
      <img src={iconEmpty} alt="icon-empty" />
      <p className="text-empty">{props.text}</p>
    </div>
  );
};

export default empty;