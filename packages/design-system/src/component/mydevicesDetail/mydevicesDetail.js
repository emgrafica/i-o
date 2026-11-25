import { Button, Tooltip } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from "react-html-parser";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../../styles/scss/common.scss';
import Empty from '../empty/empty';
import './mydevicesDetail.scss';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const MydevicesDetail = (props) => {

  const {
    itemDetail,
    horizontal,
    onClickAction,
    isShowDetailDevice,
    isShowSpecifications,
    isShowDescription,
    isLableRefresh,
    isCopySerialNumber
  } = props;
  let arrActions = Object.keys(itemDetail.actions);
  let arrTextActions = ['Device Refresh', 'Device Return', 'Report Broken Device', "I Don't Have This Device", 'Acknowledge My Device', 'Report Missing Device'];

  const onClickCopy = () => {
    var copyText = document.getElementById("copy-txt");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <div className="item-devices">
      <div className={horizontal ? "devices-detail-horizontal-inner inner" : "inner"}>
        <div
          className={
            (horizontal && !isShowDescription && !isShowSpecifications) ?
              "info-device-horizontal info-device" : "info-device"}
        >
          <div className={"info-device-thumbnail"}>
            <p className="option">{itemDetail.manufacturer}</p>
            <h3 className="ttl-device">{itemDetail.model}</h3>
            <div className="image-block">
              <img src={itemDetail.model_picture} alt={itemDetail.display_name} />
              {isLableRefresh && itemDetail.process_stage.stage === 'ELIGIBLE_FOR_REFRESH' && <span className="label-refresh">
                <RefreshOutlinedIcon />
                Ready for Refresh
              </span>}
            </div>
          </div>
          {isShowDetailDevice && <ul className="content">
            <li>
              <LocalOfferIcon />
              <span className="label label-serial">Serial number</span>
              <span className="value">{!!itemDetail.serial_number ? itemDetail.serial_number : "N/A"}</span>
              {isCopySerialNumber && 
                <>
                  <input type="text" defaultValue={!!itemDetail.serial_number ? itemDetail.serial_number : "N/A"} id="copy-txt" className="copy-txt" />
                  <button className="btn-copy" onClick={onClickCopy} title="Copy">
                    <FileCopyIcon />
                  </button>
                </>
              }
            </li>
            <li>
              <EventIcon />
              <span className="label label-owned">Owned since</span>
              <span className="value">{itemDetail.configuration.since}</span>
            </li>
            <li>
              <AccessTimeIcon />
              <span className="label label-date">Last active</span>
              <span className="value">{itemDetail.configuration.lastActive}</span>
            </li>
            <li>
              <GpsFixedIcon />
              <span className="label label-os">OS</span>
              <span className="value">{itemDetail.configuration.osLicence}</span>
            </li>
          </ul>}
        </div>

        {(isShowDescription || isShowSpecifications || arrActions.length > 0) && <div className="info-device-detail">
          {isShowDescription && <div className="detail-block">
            <h5>Description</h5>
            <div className="description-content">
              {!!itemDetail.model_description ? (
                ReactHtmlParser(itemDetail.model_description)
              ) : (
                <Empty text='NO DESCRIPTION CURRENTLY AVAILABLE.' />
              )}
            </div>
          </div>}

          {isShowSpecifications && <div className="detail-block">
            <h5>Specifications</h5>
            <div className="description-content">
              {!!itemDetail.spec_os_version ? (
                ReactHtmlParser(itemDetail.spec_os_version)
              ) : (
                <Empty text='NO SPECIFICATIONS CURRENTLY AVAILABLE.' />
              )}
            </div>
          </div>}

          <div className="detail-block list-link">
            <ul>
              {arrActions.map((item, index) => {
                return (
                  <>
                  {itemDetail.actions[item] ? 
                    <li key={index}>
                      <Button onClick={() => { onClickAction(item) }} className="item-link">{arrTextActions[index]}</Button>
                    </li> 
                    : 
                    <li key={index}>
                      <Tooltip title={"This option is not avail right now."}>
                        <span>
                        <Button disabled className="item-link-disabled">{arrTextActions[index]}</Button>
                        </span>
                      </Tooltip>
                    </li>
                  }
                  </>
                );
              })}
            </ul>
          </div>
        </div>}
      </div>
    </div>
  );
};

MydevicesDetail.propTypes = {
  itemDetail: PropTypes.object,
  horizontal: PropTypes.bool,
  onClickAction: PropTypes.func
};

MydevicesDetail.defaultProps = {
  itemDetail: {
    uid: "16a52556dba7341018e16462ca9619c9",
    asset_function: "Primary",
    serial_number: "TDO-211103-01",
    display_name: "TDO-211103-01 - Apple MacBook Pro 15\"",
    asset_tag: "TDO-211103-01",
    company: null,
    os: null,
    assigned_date: "2021-10-22 08:35:55",
    last_active: "2021-11-03 06:22:09",
    eligible_for_refresh: "false",
    state: "Missing",
    substate: "Under Investigation",
    model_category: "Computer",
    model: "MacBook Pro 15\"",
    model_number: "MD322LL/A",
    model_description: "<p><span style=\"font-size: medium;\"><span style=\"color: gray;\"> Apple MacBook Pro MD104LL/A 15.4-Inch Laptop</span></span></p>\r\n<ul><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">2.6 GHz Quad-Core Intel Core i7 processor</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">8 GB DDR3 RAM; 750 GB Hard Drive</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">15.4 inch LED-backlit display, 1440-by-900 resolution</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">NVIDIA GeForce GT 650M 1GB Graphics</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">Mac OS X v10.7 Lion, 7 Hour Battery Life</span></li></ul>",
    model_picture: "https://io-cdn-a51e75912f320a32.azureedge.net/device-image/bc306b6587e43300693331a2f5cb0b85",
    model_type: "Executive Laptop",
    spec_os_version: "",
    spec_os_service_pack: "",
    spec_disk_space: "0",
    spec_ram: "0",
    spec_cpu_type: "",
    spec_cpu_name: "",
    spec_cpu_speed: "",
    spec_cpu_core_count: "",
    spec_cpu_count: "",
    spec_cpu_manufacturer: "",
    configuration: {
      since: "October 2021",
      osLicence: "N/A",
      lastActive: "2 hours ago"
    },
    actions: {
      canRefresh: false,
      canReturn: true,
      canReportBroken: false,
      canReportOwnershipError: false,
      canRegisterOwnership: false,
      canReportMissing: false,
      canVisible: true
    },
    requests: [
      {
        sys_id: "0b396d9adba33050bf85ce1c299619af",
        request_number: "RITM0011594",
        request_type: "pc_lost_stolen",
        request_stage: "preparing_device",
        created_at: "2021-11-03 06:37:47",
        requested_for: "tdo43@dxc.com"
      }
    ],
    process_stage: {
      stage: "ELIGIBLE_FOR_REFRESH",
      stage_text: "PREPARING DEVICE",
      request_sys_id: "0b396d9adba33050bf85ce1c299619af",
      request_number: "RITM0011594",
      request_type: "pc_lost_stolen",
      delivery_ref: "",
      new_asset: {
        uid: "0c43b347c611227501522de2b8925855",
        model: "iMac 27\"",
        manufacturer: "Apple",
        model_number: "MC813LL/A",
        model_picture: "https://io-cdn-a51e75912f320a32.azureedge.net/device-image/1451f99987243300693331a2f5cb0bc8"
      },
      task_eyebrow: "PREPARING DEVICE",
      asset_eyebrow: "Under Investigation"
    },
    manufacturer: "Apple"
  },
  onClickAction: (() => { }),
  horizontal: false,
  isShowDetailDevice: true,
  isShowSpecifications: true,
  isShowDescription: true,
  isLableRefresh: true,
  isCopySerialNumber: false
};

export default MydevicesDetail;
