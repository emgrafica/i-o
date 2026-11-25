import React from 'react';
import PropTypes from 'prop-types';
import { Card, Progress } from "antd";
import dividerBar from "../../../assets/images/divider.png";
import "antd/dist/antd.css";
import './deviceCard.scss';
const { Meta } = Card;
const DeviceCard = (props) => {
  const {
    uid,
    is_new,
    manufacturer: type,
    model: name,
    processing,
    image,
    pc_state,
    kbNumber,
  } = props;


  const {
    onMyDevicesHandleClick,
    onRefreshHandleClick,
    handleViewDetailClick,
    getHelpUrl,
  } = props;

  const refStatus = {
    REFRESH : 'REFRESH_AVAILABLE',
    BEING_REFRESHED: 'BEING_REFRESHED',
    RETURNED: 'TO_BE_RETURNED'
  };

  const generateFooter = (pc_state) => {
    switch (pc_state) {
      case refStatus.REFRESH:
        return (
          <>
            <a
              className="my-stuff-card-link-text"
              onClick={() => getHelpUrl(name)}
              target="_new"
            >
              Get Help
            </a>
            <img className="my-stuff-divider-bar" alt={type} src={dividerBar} />
            <div
              className="my-stuff-card-link-text"
              onClick={() => onRefreshHandleClick()}
            >
              Refresh
            </div>
          </>
        );
      case refStatus.RETURNED:
      case refStatus.BEING_REFRESHED:
        return (
          <>
            {kbNumber && (
              <div
                className="my-stuff-card-link-text"
                onClick={() => handleViewDetailClick(kbNumber)}
              >
                {pc_state === refStatus.BEING_REFRESHED && 'Refresh Instructions'}
                {pc_state === refStatus.RETURNED && 'Return Instructions'}
              </div>
            )}
          </>
        );
      default:
        return (
          <>
            <a
              className="my-stuff-card-link-text"
              onClick={() => getHelpUrl(name)}
              target="_new"
            >
              Get Help
            </a>
          </>
        );
    }
  };
  return (
    <div className="my-stuff-card">
      <Card hoverable className="card-wrap">
        { is_new && (
          <span className="eyebrown-item">NEW</span>
        )}
        <Meta
          description={
            <div>
              <div
                className="my-stuff-card-body"
                onClick={() => onMyDevicesHandleClick(uid)}
              >
                <div className="my-stuff-card-image-wrapper">
                  <img className="my-stuff-card-image" src={image} />
                </div>
                <div>
                  <p className="my-stuff-card-body-type">{type}</p>
                </div>
                <div>
                  <h5 className="my-stuff-card-body-name">{name}</h5>
                </div>
                {pc_state === refStatus.REFRESH && (
                  <div className={pc_state}>
                    <div>
                      <Progress
                        percent={processing}
                        showInfo={false}
                        strokeColor="#813ACF"
                      />
                    </div>
                    <div
                      className={
                        processing !== 100
                          ? "my-stuff-card-body-status"
                          : "my-stuff-card-body-status my-stuff-card-body-status-successful"
                      }
                    >
                      {" "}
                      Refresh Available{" "}
                    </div>
                  </div>
                )}

                {(pc_state === refStatus.RETURNED ||
                  pc_state === refStatus.BEING_REFRESHED) && (
                  <div className={pc_state}>
                    <div className="my-stuff-card-body-status">
                      {" "}
                      {pc_state === refStatus.BEING_REFRESHED && 'Prepare for refresh'}
                      {pc_state === refStatus.RETURNED && 'Prepare for return'}
                      {" "}
                    </div>
                    <div>&nbsp;</div>
                  </div>
                )}

                {!pc_state && (
                  <div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                  </div>
                )}
              </div>
              <div className="my-stuff-card-footer">
                {generateFooter(pc_state)}
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};





DeviceCard.propTypes = {
  /**
   * identify it is a new device card.
   */
  is_new: PropTypes.bool,

  /**
   * the state of device card:
   *   a) Refresh device card.
   *   b) Being refreshed device card.
   *   c) To be return device card.
   */
  pc_state: PropTypes.oneOf( [
    'REFRESH_AVAILABLE',
    'BEING_REFRESHED',
    'TO_BE_RETURNED'
  ]),

  /**
   * display processing bar:
   */
  processing: PropTypes.oneOf([0, 100]),

  /**
   * What image to use
   */
   image: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),


  /**
  * manufacturer device
  */
  manufacturer: PropTypes.string,

  /**
   * model device
   */
  model: PropTypes.string,
  /**
   * the number for refresh and return
   */
   kbNumber: PropTypes.string,
  /**
   * Optional click handleViewDetailClick
   */
  onMyDevicesHandleClick: PropTypes.func,
  /**
   * Optional click handleViewDetailClick
   */
  onRefreshHandleClick: PropTypes.func,
  /**
   * Optional click handleViewDetailClick
   */
  handleViewDetailClick: PropTypes.func,
   /**
   * Optional click getHelpUrl
   */
  getHelpUrl: PropTypes.func,

};


DeviceCard.defaultProps = {
  is_new: true,
  pc_state:'REFRESH_AVAILABLE',
  processing: '100',
  image:'https://iotest-cdn.azureedge.net/images/devices_apple_ipad.jpg',
  manufacturer: 'Apple',
  model:'Apple iPad',
  kbNumber: '',
  onMyDevicesHandleClick:()=>{},
  onRefreshHandleClick:()=>{},
  handleViewDetailClick:()=>{},
  getHelpUrl:()=> {}
};


export default DeviceCard;



