//@ts-nocheck
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PropTypes from "prop-types";
import React from "react";
import HlxButton from "../../input/button/button";
import EyeBrow from "../eyeBrow/eyeBrow";
import "./acknowledgeCard.scss";

const AcknowledgeCard = (props) => {

  const { acknowledgeDevice } = props;
 
  return (
    <Card className="io-acknowledge-pc">
      <CardHeader
        className="io-acknowledge-card-header"
        title={<EyeBrow color='#F57803' backgroundColor='#FFE5CD' text={acknowledgeDevice.process_stage.task_eyebrow} />}
      />
      <CardContent className="io-acknowledge-card-content">
        <Grid item container>
          <Grid item xs={12} className="io-acknowledge-card-content-image">
              <CardMedia
                className={"io-acknowledge-card-content-CardMedia"}
                image={acknowledgeDevice.model_picture}
                title={`${acknowledgeDevice.model} ${acknowledgeDevice.manufacturer} ${acknowledgeDevice.serial_number}`}
              />
          </Grid>
          <Grid item xs={12} className="io-acknowledge-card-configuration">
            <Grid item xs={12}>
              <div className="io-acknowledge-card-deviceBrand">
                Device Inactive
              </div>
              <div className="io-acknowledge-card-deviceName">
                Device Inactive (your last login was 30 days ago). Please acknowledge your device.
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="io-acknowledge-card-configuration-item">
                <div>
                  {" "}
                  <LocalOfferIcon />
                </div>
                <div className="io-acknowledge-card-configuration-item-header">
                  Serial Number
                </div>
                <div className="io-acknowledge-card-configuration-item-content">
                  {acknowledgeDevice.serial_number}
                </div>
              </div>
              <div className="io-acknowledge-card-configuration-item">
                <div>
                  <AccessTimeIcon />
                </div>
                <div className="io-acknowledge-card-configuration-item-header">
                  Last active
                </div>
                <div className="io-acknowledge-card-configuration-item-content">
                  {acknowledgeDevice.configuration.lastActive}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <div className="io-acknowledge-card-footer">
              <HlxButton
                label="Acknowledge this device"
                onClick={() => props.handleAcknowledge()}
                style={{ height: 25, fontSize: 12, borderRadius: 16 }}
              ></HlxButton>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AcknowledgeCard.propTypes = {
  acknowledgeDevice: PropTypes.object,
  handleAcknowledge: PropTypes.func,
};

AcknowledgeCard.defaultProps = {
  acknowledgeDevice: {
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
      canRegisterOwnership: true,
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
  handleAcknowledge: () => { },
};

export default AcknowledgeCard;
