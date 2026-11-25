import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import { Row, Col, Layout,Spin } from 'antd';
import "./MarketplaceDeviceDetailComponent.scss";
import "./request-device-popup.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactHtmlParser from 'react-html-parser';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiDisc } from 'react-icons/fi';
import cpuIcon from './../../assets/images/myDevices/cpu.png';
import vgaCardIcon from './../../assets/images/myDevices/nvidia.png';
import ramIcon from './../../assets/images/myDevices/ram.png';
import diskIcon from './../../assets/images/myDevices/disk.png';
import { Button } from 'antd';
import { Link, useHistory } from "react-router-dom";
import RequestDeviceForm from './../RequestDeviceForm/requestDeviceForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import html from "react-inner-html";
import { SESSIONSTORAGEKEYS } from '../../constants/storageConstants';
import { LINKLIRARYCONSTANTS } from '../../constants/linkLibraryConstants';
import { LinkLibraryUtils } from '../../utils/linkLibrary';
import {loadMarketplaceDevicesActionById} from './../../redux/actions/marketPlaceDevicesDetailAction';
import { LoadingOutlined } from '@ant-design/icons';
import DeviceFormAction from '../../redux/actions/DeviceFormAction';
import { MARKETPLACE_DEVICES } from "../../constants/marketPlaceDeviceConstants";


const { Content } = Layout;
function ContentComp({ content }) {
  return <div {...html(content)} />;

}

const MarketplaceDeviceDetailComponent = (props) => {
  const id = props.params.match.params.id || '';
  const {marketplaceDeviceDetail, deviceForm} = props;
  const {isSpinning} = deviceForm;
  const {params, data: deviceDetail, isLoading} = marketplaceDeviceDetail;
  const {loadMarketplaceDevicesActionById} = props;
 
  const [popupShow, setShow] = useState(false);
  const handleShow =()=> {
    setShow(true);
    localStorage.setItem(MARKETPLACE_DEVICES.RESHOW, true );
  };
  const handleClose =()=> {
    setShow(false); 
    localStorage.removeItem(MARKETPLACE_DEVICES.RESHOW);
  };
  const getItemReshow = localStorage.getItem(MARKETPLACE_DEVICES.RESHOW)=='true'? true:false;
  useEffect(() => {   
    window.scrollTo(0, 0);
    loadMarketplaceDevicesActionById(id);
    props.loadDeviceForm("PC Refresh");       
    setShow(getItemReshow);  
  }, [params]);
 
  const { image, specifications, description, configuration = {}, available_refresh, device_profile, title_description } = deviceDetail;
  const { since, cpu, vga_card, ram, osLicence, disk } = configuration;
  const history = useHistory();

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>isSpinning: " + isSpinning);
  let requestExceptionUrl = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE, LINKLIRARYCONSTANTS.MARKET_PLACE, 3)

  return (
    <div className="market-place-container">
    <Spin
       size="large" 
       spinning={isSpinning || isLoading} 
       className="request-device-form-spin"  
       indicator={<LoadingOutlined/>}>
      <Content className="market-place-content custom_container">
          <Row className="market-devices-go-home">
            <Link to="/marketplace" className="icon-back">
              Marketplace
            </Link>
          </Row>
          <Row className="my-device-slider-header">
            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
              {/* <Image src={image} alt = {display_name} name ={display_name} /> */}
              <img className='my-device-image' src={image} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} className="market-detail-info">
              {/* <div className='my-device-manufacturer'>{manufacturer}</div> */}
              <div className="my-device-end-btn">{available_refresh ? 
                <Button className="my-device-btn-refresh" >Refresh Available</Button>
                : <Button className="my-device-btn-refresh-unvailable" >Unavailable for refresh</Button>}
              </div>
              <h3>{device_profile}</h3>
              {/* <div className='my-device-refresh-available'>Refresh Available</div> */}
              <span className="description">
                <ContentComp content={title_description}></ContentComp>
              </span>
              <div className='my-device-configuration'>
                {since && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><AiOutlineClockCircle /></div>
                  <div className="my-device-configuration-content">Owned since {since}</div>
                </div>}
                {cpu && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><img src={cpuIcon} alt="cpu icon" /></div>
                  <div className="my-device-configuration-content">{cpu}</div>
                </div>}
                {vga_card && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><img src={vgaCardIcon} alt="vga_card icon" /></div>
                  <div className="my-device-configuration-content">{vga_card}</div>
                </div>}
                {ram && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><img src={ramIcon} alt="ram icon" /></div>
                  <div className="my-device-configuration-content">{ram}</div>
                </div>}
                {disk && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><img src={diskIcon} alt="disk icon" /></div>
                  <div className="my-device-configuration-content">{disk}</div>
                </div>}
                {osLicence && <div className="my-device-configuration-wrapper">
                  <div className="my-device-configuration-icon"><FiDisc /></div>
                  <div className="my-device-configuration-content">{osLicence}</div>
                </div>}
              </div>
              <div className="my-device-list-button">
              {available_refresh ? (<Button className="my-device-list-button-refresh" onClick={handleShow}>Request</Button>):(<a href={requestExceptionUrl} target="_new">
                              <Button  className="my-device-list-button-unrefresh"> Request Exception </Button></a>) }
                  <Popup className = "request-device-popup"
                  open={popupShow}
                  modal
                  nested
                  disabled = {isSpinning}
                  closeOnEscape = {false}
                  closeOnDocumentClick = {false}
                  >       
                        
                    <div className="request-device-form">
                      <div className="request-device-popup">
                        <a className="close" onClick={handleClose} >
                          &times;
                        </a>
                      </div>
                      <div className="request-device-popup-content">
                        <RequestDeviceForm device = {deviceDetail} onCancel = {handleClose} setIsSpinning = {(flag)=> setIsSpinning(flag) }/>
                      </div>
                    </div>       
                </Popup>            
              </div>
            </Col>
          </Row>
          <Row>
            <hr className="my-devices-line" />
          </Row>
          <Row>
            <h5 className="my-devices-header">Description</h5>
          </Row>
          <Row>
            <Col span={24} className ="my-devices-description-content">
              {ReactHtmlParser(description)}
            </Col>
          </Row>
          <Row>
            <hr className="my-devices-line" />
          </Row>
          <Row>
            <h5 className="my-devices-header">Specifications</h5>
          </Row>
          <Row >
            <Col span={24} className ="my-devices-description-content">
              {ReactHtmlParser(specifications)}
            </Col>
          </Row>
        </Content>
    </Spin>
    </div>


  )
}

//connect into Redux saga
const mapStateToProps = ({ marketplaceDeviceDetail, deviceForm}) => ({
  marketplaceDeviceDetail,
  deviceForm
});


const mapDispatchToProps = (dispatch) => ({
  loadDeviceForm: (typeForm) => dispatch(DeviceFormAction.loadDeviceFormAction(typeForm)),
  loadMarketplaceDevicesActionById: (id) => dispatch(loadMarketplaceDevicesActionById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceDeviceDetailComponent);
