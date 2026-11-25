// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import './detailLostAndStolen.scss';

const DetailLostAndStolen = (props) => {
  const { data } = props;
  
  return (
    <div>
      <div className="detail-lost-stolen">
        <p>
          <span className="title">Lost / Stolen:</span>
          <span className="value">{data.issue}</span>
        </p>
      </div>
    </div>
  );
};

DetailLostAndStolen.propTypes = {
  data: PropTypes.object
};

DetailLostAndStolen.defaultProps = {
  data: {
    issue: 'content in here'
  }
};

export default DetailLostAndStolen;

