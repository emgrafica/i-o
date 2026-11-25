import React from "react";
import PropTypes from "prop-types";
import "./supportCard.scss";

import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { GoPrimitiveDot } from 'react-icons/go';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AlbumIcon from '@material-ui/icons/Album';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EventIcon from '@material-ui/icons/Event';
import EyeBrow from "../cardComponent/eyeBrow/eyeBrow";

const SupportCard = (props) => {
  return (
    <Card className="io-device-primary">
      <CardHeader title = {
        <Grid container className="device-card-header" >
          <Grid item xs={12}>
                {props.primaryDevice.device.deviceStatus === 'Ready for Refresh' ? (                  
                  <div className={"device-card-header-status"}>
                    <EyeBrow color="#000000" backgroundColor="#ebebeb" text="NEW"/>
                  </div>
                  ) : null}            
          </Grid>
        </Grid>
      }/>
      <CardContent className="device-card-content" >
        <Grid container>
          <Grid item xs={12} className="device-card-content-image">
            <Grid item xs = {4} >
                <Grid item xs={12} align="left" className="device-card-content-image-brand">
                  {/* {props.primaryDevice.device.deviceBrand} */}
                </Grid>
            </Grid>
            <Grid item xs = {8}>
                <CardMedia className={"device-card-content-CardMedia"}
                  image={props.primaryDevice.device.deviceImage}
                  title={props.primaryDevice.device.deviceImage}
                />
            </Grid>
          </Grid>
          <Grid item xs= {12} className ="device-card-configuration">
              <div className ="device-card-deviceBrand">{props.primaryDevice.device.deviceBrand}</div>
              <div className ="device-card-deviceName">{props.primaryDevice.device.deviceName}</div>
              <div className="device-card-configuration-item" >
                  <div> <LocalOfferIcon/></div>
                  <div className="device-card-configuration-item-header">Serial Number</div>
                  <div className="device-card-configuration-item-content">{props.primaryDevice.device.configuration.serialNumber}</div>
              </div>
              <div className="device-card-configuration-item" >
                  <div ><EventIcon/></div>
                  <div className="device-card-configuration-item-header">Owner since</div>
                  <div className="device-card-configuration-item-content">{props.primaryDevice.device.configuration.since}</div>
              </div>
              <div className="device-card-configuration-item" >
                  <div><AccessTimeIcon/></div>
                  <div  className="device-card-configuration-item-header">Last active</div>
                  <div className="device-card-configuration-item-content">{props.primaryDevice.device.configuration.lastActive}</div>
              </div>
              <div className="device-card-configuration-item" >
                  <div><AlbumIcon/></div>
                  <div className="device-card-configuration-item-header">OS</div>
                  <div className="device-card-configuration-item-content">{props.primaryDevice.device.configuration.osLicence}</div>
              </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

SupportCard.propTypes = {
  primaryDevice: PropTypes.object
}

SupportCard.defaultProps = {
  primaryDevice: {
      state: "REFRESH_ELIGIBLE_STATE",
      device: {
          deviceBrand: "Apple",
          deviceStatus: "Ready for Refresh",
          deviceImage: "https://io-cdn-4340f158ad8483d0.azureedge.net/device-image/94af9a72db2e701018e16462ca961968",
          deviceName: "MacBook Pro 15\"",
          configuration: {
              serialNumber: "SN-BNGUYEN42001",
              since: "N/A",
              lastActive: "5 days ago",
              osLicence: "N/A"
          }
      },
      primaryDeviceDetail: {
          uid: "9750a2b2db2e701018e16462ca961901",
          asset_function: "Primary",
          serial_number: "SN-BNGUYEN42001",
          display_name: "SN-BNGUYEN42001 - Apple MacBook Pro 15\"",
          asset_tag: "SN-BNGUYEN42001",
          company: "DXC Technology",
          os: null,
          assigned_date: "",
          last_active: "4 days ago",
          eligible_for_refresh: "true",
          state: "REFRESH_ELIGIBLE_STATE",
          substate: null,
          manufacturer: "Apple",
          model_category: "Computer",
          model: "MacBook Pro 15\"",
          model_number: "MD318LL/A",
          model_description: "<p><span style=\"font-size: medium;\"> <span style=\"color: gray;\"> Apple MacBook Pro MD104LL/A 15.4-Inch Laptop</span> </span></p>\r\n<ul><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">2.6 GHz Quad-Core Intel Core i7 processor</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">8 GB DDR3 RAM; 750 GB Hard Drive</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">15.4 inch LED-backlit display, 1440-by-900 resolution</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">NVIDIA GeForce GT 650M 1GB Graphics</span></li><li style=\"color: gray;\"><span style=\"font-size: 10.0pt;\">Mac OS X v10.7 Lion, 7 Hour Battery Life</span></li></ul>",
          model_picture: "https://io-cdn-4340f158ad8483d0.azureedge.net/device-image/94af9a72db2e701018e16462ca961968",
          model_type: "Standard Laptop",
          process_state: "ELIGIBLE_FOR_REFRESH",
          deviceStatus: "Ready for Refresh",
          device_type: "laptop",
          process_state_order: 2,
          configuration: {
              since: "N/A",
              osLicence: "N/A",
              lastActive: "5 days ago"
          },
          image: "https://io-cdn-4340f158ad8483d0.azureedge.net/device-image/94af9a72db2e701018e16462ca961968"
      }
  }
}

export default SupportCard