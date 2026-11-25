import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import React from 'react';
import { MdImportantDevices } from 'react-icons/md';
import EventIcon from '@material-ui/icons/Event';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RefreshIcon from '@material-ui/icons/Refresh';
import AlbumIcon from '@material-ui/icons/Album';
import './device.scss';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DefaultPC from "../../../assets/images/placeholder-pc.png";
import { GoPrimitiveDot } from 'react-icons/go';


export const listState = {
    NORMAL_STATE: 'NORMAL_STATE',
    REFRESH_ELIGIBLE_STATE: 'REFRESH_ELIGIBLE_STATE',
    RETURN_STATE: 'RETURN_STATE',

}

function Device(props) {


    const {nameCard, device, state, isShowAction} = props;
    let {deviceBrand, deviceStatus, deviceImage, deviceName, configuration} = device;

    const {
      viewDetailHandler,
      RefreshHandler,
      ReportIssueHandler,
    } = props;

    if(!deviceImage){
        deviceImage = DefaultPC;
    }

    let status = '';
    let eligibleForRefresh = false;
    let color = 'green';

    if(state === listState.NORMAL_STATE){
        status = 'IN USE';
    }

    if(state === listState.REFRESH_ELIGIBLE_STATE){
        status = 'IN USE';
        eligibleForRefresh = true;
    }

    if(state === listState.RETURN_STATE) {
        status = 'PENDING RETURN';
        color  = 'orange';
    }


    return (
      <Card className="io-device-primary">
        <CardHeader title = {
            <Grid container className= "device-card-header" >
                <Grid item xs={6}>
                    <div className= {"device-card-header-status-" + color} >
                        <GoPrimitiveDot/>
                         {status}
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className= "device-card-header-name">
                        <MdImportantDevices />&nbsp; {nameCard}
                    </div>
                </Grid>
            </Grid>
        }
        />
        <CardContent className = "device-card-content" >
          <Grid container >
                <Grid item xs={12} className= {"device-card-content-refresh " + (eligibleForRefresh ? " show " : " hide ")} >
                    <RefreshIcon  className="device-card-content-refresh-icon " />
                    <div className="device-card-content-refresh-content">
                        {deviceStatus}
                    </div>
                </Grid>
                <Grid item xs={12} className ="device-card-content-image">
                    <Grid item xs = {4} >
                        <Grid item xs={12} align="left" className="device-card-content-image-brand">
                        {/* {deviceBrand} */}
                        </Grid>
                    </Grid>
                    <Grid item xs = {8}>
                        <CardMedia className = {"device-card-content-CardMedia" + (eligibleForRefresh ? "-refresh " : "")}
                            image= {deviceImage}
                            title= {deviceName}
                            />
                    </Grid>
                </Grid>
                <Grid item xs= {12} className ="device-card-configuration">
                     <div className ="device-card-deviceBrand">{deviceBrand}</div>
                    <div className ="device-card-deviceName">{deviceName}</div>
                    <div className="device-card-configuration-item" >
                        <div> <LocalOfferIcon/></div>
                        <div className="device-card-configuration-item-header">Serial Number</div>
                        <div className="device-card-configuration-item-content">{configuration.serialNumber}</div>
                    </div>
                    <div className="device-card-configuration-item" >
                        <div ><EventIcon/></div>
                        <div className="device-card-configuration-item-header">Owner since</div>
                        <div className="device-card-configuration-item-content">{configuration.since}</div>
                    </div>
                    <div className="device-card-configuration-item" >
                        <div><AccessTimeIcon/></div>
                        <div  className="device-card-configuration-item-header">Last active</div>
                        <div className="device-card-configuration-item-content">{configuration.lastActive}</div>
                    </div>
                    <div className="device-card-configuration-item" >
                        <div><AlbumIcon/></div>
                        <div className="device-card-configuration-item-header">OS</div>
                        <div className="device-card-configuration-item-content">{configuration.osLicence}</div>
                    </div>
                </Grid>
            </Grid>
          </CardContent>


          {isShowAction && <CardActions disableSpacing >
            <Grid container className = {"device-card-footer" + (eligibleForRefresh ? "-eligible":"")} >
                <Grid item xs={eligibleForRefresh ?  4 : 6}>
                  <div className = "device-card-footer-link" >
                    <div onMouseDown={(e) => viewDetailHandler(e, {...props})}>View Details</div>
                  </div>
                </Grid>
                {eligibleForRefresh && <Grid item xs={4}>
                  <div  className = {"device-card-footer-refresh-link"}>
                      <div onMouseDown = {(e) => RefreshHandler(e, {...props})} >Refresh</div>
                  </div>
                </Grid>}
                <Grid item xs={eligibleForRefresh ?  4 : 6}>
                  <div  className = "device-card-footer-link" >
                      <div onMouseDown = {(e) => ReportIssueHandler(e, {...props})}>More Actions</div>
                  </div>
                </Grid>
            </Grid>
        </CardActions>}
      </Card>
    );
}

Device.propTypes = {
    // status: PropTypes.oneOf([ 'IN_USE', 'IN STOCK' ]),
    nameCard: PropTypes.string,
    device: {
        deviceBrand: PropTypes.string,
        deviceImage: PropTypes.string,
        deviceStatus: PropTypes.oneOf(['Ready For Refresh', 'Being Refreshed','To Be Returned']),
        deviceName: PropTypes.string,
        configuration: {
            serialNumber: PropTypes.string,
            since: PropTypes.string,
            lastActive: PropTypes.string,
            osLicence: PropTypes.string,
          },
    },
    // eligibleForRefresh: PropTypes.bool,
    state: PropTypes.oneOf(
        [ listState.NORMAL_STATE,
          listState.REFRESH_ELIGIBLE_STATE,
          listState.RETURN_STATE,
        ]),
    viewDetailHandler: PropTypes.func,
    RefreshHandler: PropTypes.func,
    ReportIssueHandler: PropTypes.func,
    isShowAction:PropTypes.bool
}

Device.defaultProps = {
//   status: '',
  isShowAction:true,
  nameCard: '',
  device:{
      deviceBrand: '',
      deviceStatus: '',
      deviceImage: "",
      deviceName: "",
      configuration: {
          serialNumber: "",
          since: "",
          lastActive: '',
          osLicence: "",
        },
  },
    // eligibleForRefresh: false,
    state: listState.NORMAL_STATE,
    viewDetailHandler: () => {},
    RefreshHandler: () => {},
    ReportIssueHandler: () => {},
}

export default Device;

