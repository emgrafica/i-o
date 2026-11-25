import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";

import pcRefImg from '../../../assets/icons/pc-refresh.svg';
import refreshImg from '../../../assets/icons/refresh-icon.svg';
import "antd/dist/antd.css";
import './deviceInfoCard.scss';

const DeviceInfoCard = (props) => {


  const {eyebrowTitle,hasKB, cardTitle, cardDesc, pcImage, onClick} = props;
  return (
    <Card className="device-item card-wrap"
      onClick={()=>onClick()}
      hoverable
    >
      {/* Device Info */}
      <div className="device-info">
        <div className="device-content">
          <div className="device-name">
            <span>{eyebrowTitle}</span>
          </div>
          <h5>
            {cardTitle}
          </h5>
        </div>
        <div className="device-img">
          {!hasKB && (
            <div>
              <img src={pcImage} />
              <div className="device-refresh-icon">
                <img src={refreshImg} />
              </div>
            </div>
          )}
          {hasKB && (
            <div>
              <img src={pcRefImg} />
            </div>
          )}
        </div>
      </div>
      {/* Description */}
      <div className="captionRegular-cover d-flex align-items-end">
        <span className="captionRegular">{cardDesc}
        </span>
      </div>
    </Card>
  );
};

DeviceInfoCard.propTypes = {
  /**
   * Has KB
   */
   hasKB: PropTypes.bool,
   /**
   * Title of eye brow
   */
  eyebrowTitle: PropTypes.string,
  /**
   * Title of card
   */
  cardTitle: PropTypes.string,
  /**
   * Description of card
   */
  cardDesc: PropTypes.string,
  /**
   * What imaage to use
   */
   pcImage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // /**
  //  * Optional click handler
  //  */
  onClick: PropTypes.func,
};

DeviceInfoCard.defaultProps = {
  hasKB: true,
  eyebrowTitle:'PC REFRESH',
  cardTitle: 'PC Refresh Program Overview ',
  cardDesc: 'The instructions below only apply if you received a message inviting you to refresh your existing PC.Update, August 25, 2020: The PC Refresh program has resumed for this new fiscal year to replace...',
  pcImage: pcRefImg,
  onClick: undefined,
};


export default DeviceInfoCard;



