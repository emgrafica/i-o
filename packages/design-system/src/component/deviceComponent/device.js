import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import PropTypes from "prop-types";
import React from "react";
import "./device.scss";
import EyeBrow from "../cardComponent/eyeBrow/eyeBrow";
import HlxButton from "../input/button/button";

const Device = (props) => {
  const { deviceData, isShowAction, horizontal } = props;

  return (
    <div className="io-device">
      <Grid item xs={12}>
        <Card
          className={horizontal ? "card card-wrap" : "vertical-card card-wrap"}
        >
          <Grid container direction={horizontal ? 'row' : 'column'}>
            <Grid item {...(horizontal ? { xs: 5, sm: 3, md: 2 } : {})} className="img-thumbnail">
              <div className="cardMedia">
                <Grid
                  container
                  direction="row"
                  alignContent="center"
                  className="h-100"
                >
                  <img src={deviceData.model_picture} alt={deviceData.model} />
                </Grid>
              </div>
            </Grid>

            <Grid {...(horizontal ? { xs: 7, sm: 6, md: 8 } : {})}>
              <div className="cardDetails">
                {deviceData.process_state === "ELIGIBLE_FOR_REFRESH" && (
                  <div className="eyebrow-ready-refresh">
                    <Grid container direction="row" alignItems="center">
                    
                      <EyeBrow color='#000000' backgroundColor='#ebebeb' icon={<RefreshOutlinedIcon style={{fontSize: "1rem"}}/>} text='Ready for Refresh'/>                                             
                    </Grid>
                  </div>
                )}
                <div className={horizontal ? "cardContent" : ""}>
                  <Typography className="captionRegular">
                    {deviceData.manufacturer}
                  </Typography>
                  <Typography className="heading5">
                    {deviceData.model}
                  </Typography>
                </div>
              </div>
            </Grid>
            
            <Grid item xs={12} sm={3} md={2}>
              {isShowAction && (
                <div className="cardButton">
                  <HlxButton label="More Actions" onClick={props.handleMoreActions}></HlxButton>
                </div>
              )}
            </Grid>

          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

Device.propTypes = {
  deviceData: PropTypes.object,
  isShowAction: PropTypes.bool,
  horizontal: PropTypes.bool,
};

Device.defaultProps = {
  isShowAction: true,
  horizontal: true,
  deviceData: {
    asset_function: null,
    asset_tag: "AG972332",
    assigned_date: "2021-03-25 10:42:50",
    company: "DXC Technology",
    configuration: {
      cpu: "N/A",
      vga_card: "N/A",
      disk: "N/A",
      osLicence: "N/A",
      since: "N/A",
    },
    deviceStatus: "Ready for Refresh",
    device_profile: "",
    device_type: "laptop",
    display_name: "<p>AG972332 - Lenovo ThinkPad T430</p>",
    eligible_for_refresh: "false",
    image: "/static/media/emptyLaptop01-removebg-preview.8e5daae6.png",
    isRefresh: true,
    last_active: "N/A",
    manufacturer: "Lenovo",
    model: "Lenovo ThinkPad T430",
    model_category: "Computer",
    model_description: null,
    model_number: "2349A66",
    model_picture:
      "https://io4340f158ad8483d0.blob.core.windows.net/device-image/793d774a1b8674d0f2949682b24bcb44",
    os: "Windows 7 Enterprise",
    process_state: "ELIGIBLE_FOR_REFRESH",
    processing: 100,
    serial_number: "PG84994",
    spec_cpu_core_count: "",
    spec_cpu_count: "",
    spec_cpu_manufacturer: "",
    spec_cpu_name: "Intel(R) Core(TM) i5-3320M CPU @ 2.60GHz@2.594GHz",
    spec_cpu_speed: "2,594",
    spec_cpu_type: "Intel(R) Core(TM) i5-3320M CPU @ 2.60GHz",
    spec_disk_space: "",
    spec_os_service_pack: "",
    spec_os_version: "",
    spec_ram: "3,884,652",
    state: "In use",
    substate: null,
    uid: "21182818db35bb00568acebe3b9619d4",
  },
};

export default Device;
