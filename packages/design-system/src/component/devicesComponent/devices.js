import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import UnListedDevices from "./../unlistedDeviceComponent/unListedDevices";
import ArrowBackIcon from "./../../assets/icons/arrow-back.svg";
import "./../../styles/scss/common.scss";
import Device from "./../deviceComponent/device";
import "./devices.scss";

const Devices = (props) => {
  return (
    <div className="wrapper-container devices-list">
      {props.devicesData.length > 0 &&
        props.devicesData.map((item) => {
          return (
            <Device
              key={item.uid}
              deviceData={item}
              handleMoreActions={() => props.handleMoreActions(item)}
              handleAcknowledge={() => props.handleAcknowledge(item)}
              handleReportIssue={() => props.handleReportIssue()}
              isShowAcknowledgeBtn={item.actions?.canRegisterOwnership}
            />
          );
        })}

      {/* <h4 className="heading4">Unlisted Device</h4>
      <UnListedDevices handleReturnActions={props.handleReturnActions} /> */}
    </div>
  );
};

Devices.propTypes = {
  devicesData: PropTypes.array,
  history: PropTypes.any,
  handleMoreActions: PropTypes.func,
  handleAcknowledge: PropTypes.func,
  handleReportIssue: PropTypes.func,
  handleReturnActions: PropTypes.func,
};

Devices.defaultProps = {
  devicesData: [],
  history: {},
  handleMoreActions: () => { },
  handleAcknowledge: () => { },
  handleReportIssue: () => { },
  handleReturnActions: () => { }
};

export default Devices;
