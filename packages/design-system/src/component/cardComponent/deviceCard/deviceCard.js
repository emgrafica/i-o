import React from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import './deviceCard.scss';
import EyeBrow from '../eyeBrow/eyeBrow'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { CardHeader } from '@material-ui/core';

const generateClassName = createGenerateClassName({
  productionPrefix: "io-pc-refresh-card"
});

const DeviceCard = (props) => {
  const {
    refreshInfo,
    returnInfo,
    getInfoUrl,
    onActionClick,
    infoDevice
  } = props;

  const { new_asset } = infoDevice.process_stage;

  let actionName = '';
  let infoLink = refreshInfo;
  let infoText = 'More Info';
  let warningText = '';
  let colorEyeBrow = '';
  let backgroundColorEyeBrow = '';
  let manufacturer = infoDevice.manufacturer;
  let model = infoDevice.model;
  let image = infoDevice.model_picture;
  let serialNumber = infoDevice.serial_number;

  const refStatus = {
    REFRESH: 'ELIGIBLE_FOR_REFRESH',
    PREPARING_DEVICE: 'PREPARING_DEVICE',
    DEVICE_IN_TRANSIT: 'DEVICE_IN_TRANSIT',
    PC_RETURN: 'PC_RETURN',
    PREPARING_SHIPPING_MATERIALS: 'PREPARING_SHIPPING_MATERIALS',
  };

  const generateDeviceCard = () => {
    switch (infoDevice.process_stage.stage) {
      case refStatus.REFRESH:
        actionName = 'Refresh';
        warningText = 'Your device is due to be refreshed. Click below to request your new device';
        colorEyeBrow = '#F57803';
        backgroundColorEyeBrow = '#FFE5CD';
        break;
      case refStatus.PREPARING_DEVICE:
        model = new_asset.model;
        manufacturer = new_asset.manufacturer;
        image = new_asset.model_picture;
        actionName = 'Track this Device';
        serialNumber = '';
        warningText = "We're preparing your new device for delivery";
        colorEyeBrow = '#F57803';
        backgroundColorEyeBrow = '#FFE5CD';
        break;
      case refStatus.DEVICE_IN_TRANSIT:
        model = new_asset.model;
        manufacturer = new_asset.manufacturer;
        image = new_asset.model_picture;
        actionName = 'Track Delivery';
        serialNumber = '';
        warningText = "Your new device is on it's way! Click below to track the delivery";
        colorEyeBrow = '#F57803';
        backgroundColorEyeBrow = '#FFE5CD';
        break;
      case refStatus.PC_RETURN:
        actionName = 'Track this Request';
        infoLink = returnInfo;
        infoText = 'Return Instructions';
        warningText = 'You need to return your old device, click below for instructions';
        colorEyeBrow = '#F57803';
        backgroundColorEyeBrow = '#FFE5CD';
        break;
      case refStatus.PREPARING_SHIPPING_MATERIALS:
        actionName = 'Track this Request';
        infoLink = returnInfo;
        infoText = 'Return Instructions';
        warningText = 'You need to return your old device, click below for instructions'
        break;
      default:
        break;
    }
  };

  generateDeviceCard();

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div className="my-stuff-card">
        <Card className="card-wrap device-card">
          <CardHeader className="device-card-header" title={<EyeBrow color={colorEyeBrow} backgroundColor={backgroundColorEyeBrow} text={infoDevice.process_stage.task_eyebrow} />}/>
          <CardContent className="device-card-content">
            <CardMedia
              className={"my-stuff-card-image-wrapper"}
              image={image}
            />
            <div className="my-stuff-card-body">
              <div>
                <p className="my-stuff-card-body-type">{manufacturer}</p>
              </div>
              <div>
                <h5 className="my-stuff-card-body-name">{model}</h5>
              </div>
              {serialNumber &&
                <div className="my-stuff-card-configuration-item" >
                  <div> <LocalOfferIcon /></div>
                  <div className="my-stuff-card-configuration-item-header">Serial Number</div>
                  <div className="my-stuff-card-configuration-item-content">{serialNumber}</div>
                </div>
              }
              <div className="my-stuff-card-body-status">{warningText}</div>
            </div>
          </CardContent>
          <CardActions className="device-card-footer">
            {[refStatus.PREPARING_DEVICE, refStatus.DEVICE_IN_TRANSIT].includes(infoDevice.process_stage.stage) && ['pc_breakfix', 'pc_lost_stolen'].includes(infoDevice.process_stage?.request_type) ? null :  
              <>
                <p className="my-stuff-card-link-text">
                  <span onClick={() => getInfoUrl(infoLink)}>
                    {infoText}
                  </span>
                </p>
                <Divider className="my-stuff-divider-bar" orientation="vertical" flexItem />
              </>
            }
            <p className="my-stuff-card-link-text">
              <span onClick={() => onActionClick()}>{actionName}</span>
            </p>
          </CardActions>
        </Card>
      </div>
    </StylesProvider>
  );
};





DeviceCard.propTypes = {
  /**
 * the state of device card:
 *   a) Refresh device card.
 *   b) Prepare device card.
 *   c) Transit device card.
 *   d) To be return device card.
 */
  infoDevice: PropTypes.object,

  /**
  * the refreshInfo link
  */
  refreshInfo: PropTypes.string,
  /**
  * the returnInfo link
  */
  returnInfo: PropTypes.string,
  /**
   * Optional click onActionClick
   */
  onActionClick: PropTypes.func,
  /**
   * Optional click getInfoUrl
   */
  getInfoUrl: PropTypes.func,

};


DeviceCard.defaultProps = {
  infoDevice: {
    "uid": "2c319066db1b7410bf85ce1c2996191e",
    "asset_function": "Primary",
    "serial_number": "TDO-221021-02",
    "display_name": "TDO-221021-02 - Apple MacBook Pro 15\"",
    "asset_tag": "TDO-221021-02",
    "company": null,
    "os": null,
    "assigned_date": "2021-10-22 08:35:55",
    "last_active": "2021-10-22 08:35:55",
    "eligible_for_refresh": "true",
    "state": "In use",
    "substate": "Being refreshed",
    "model_category": "Computer",
    "model": "MacBook Pro 15\"",
    "model_number": "MD322LL/A",
    "model_description": "<p><span style=\"font-size: medium;\"><span style=\"color: gray;\"> Apple MacBook Pro MD104LL/A 15.4-Inch Laptop</span></span></p>\r\n<ul><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">2.6 GHz Quad-Core Intel Core i7 processor</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">8 GB DDR3 RAM; 750 GB Hard Drive</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">15.4 inch LED-backlit display, 1440-by-900 resolution</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">NVIDIA GeForce GT 650M 1GB Graphics</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">Mac OS X v10.7 Lion, 7 Hour Battery Life</span></li></ul>",
    "model_picture": "https://io-cdn-a51e75912f320a32.azureedge.net/device-image/bc306b6587e43300693331a2f5cb0b85",
    "model_type": "Executive Laptop",
    "spec_os_version": "",
    "spec_os_service_pack": "",
    "spec_disk_space": "0",
    "spec_ram": "0",
    "spec_cpu_type": "",
    "spec_cpu_name": "",
    "spec_cpu_speed": "",
    "spec_cpu_core_count": "",
    "spec_cpu_count": "",
    "spec_cpu_manufacturer": "",
    "actions": {
      "canRefresh": false,
      "canReturn": false,
      "canReportBroken": true,
      "canReportOwnershipError": false,
      "canRegisterOwnership": false,
      "canReportMissing": true,
      "canVisible": true
    },
    "requests": [
      {
        "sys_id": "23ca3e1bdb9ff410bf85ce1c2996190d",
        "request_number": "RITM0011294",
        "request_type": "pc_lost_stolen",
        "request_stage": "preparing_device",
        "created_at": "2021-10-25 04:52:23",
        "requested_for": "tdo43@dxc.com"
      }
    ],
    "process_stage": {
      "stage": "PREPARING_DEVICE",
      "stage_text": "PREPARING DEVICE",
      "request_sys_id": "23ca3e1bdb9ff410bf85ce1c2996190d",
      "request_number": "RITM0011294",
      "request_type": "pc_lost_stolen",
      "delivery_ref": "",
      "new_asset": {
        "uid": "d3bb6a2eac10019b4fa294baf5775f21",
        "model": "MacBook Pro 15\"",
        "manufacturer": "Apple",
        "model_number": "MD322LL/A",
        "model_picture": "https://io-cdn-a51e75912f320a32.azureedge.net/device-image/bc306b6587e43300693331a2f5cb0b85"
      },
      "task_eyebrow": "PREPARING DEVICE",
      "asset_eyebrow": "Being refreshed"
    },
    "manufacturer": "Apple"
  },
  refreshInfo: '',
  returnInfo: '',
  onActionClick: () => { },
  getInfoUrl: () => { },
};


export default DeviceCard;



