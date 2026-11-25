import React, {useEffect, useState } from 'react'
import "antd/dist/antd.css";
import { Col, Row, Button} from "antd";
import './requestDeviceForm.scss';
import { connect } from "react-redux";
import 'reactjs-popup/dist/index.css';
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { ROUTER, AUTH } from "./../../constants";
import laptopIcon from '../../assets/icons/laptop-icon.svg';
import completedIcon from '../../assets/icons/completedIcon.png';
import {DeviceFormTypes} from '../../redux/actions/DeviceFormAction';
import DeviceFormAction from '../../redux/actions/DeviceFormAction';
import {loadMyStuffAction} from './../../redux/actions/myStuffAction';
import DynamicForm from "../../tools/dynamicForms/components/DynamicForm";
import { MARKETPLACE_DEVICES } from "../../constants/marketPlaceDeviceConstants";
import { IoDialog } from '@i-o/design-system-classic'


const RequestDeviceForm = (props) => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>requestDeviceForm: " + JSON.stringify(props));
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>requestDeviceForm: " + JSON.stringify(props.history.location.state));
    const {device, myStuff, deviceForm= [] } = props;
    const {deviceIsRefreshed = {} } = myStuff;
    const {image, device_profile: model_category, title_description: display_name} = device;
    const history = useHistory();

    const closePopUp = () => {
      props.setDeviceFormIsModalVisible(false);
      props.setDeviceFormIsExceptionVisible(false);
       history.push({
         pathname: ROUTER.HOME,
      });
    }

    const popUpParam = {
      icon: completedIcon,
      title: null,
      header: 'Device request complete',
      content: 'We’ve received your request and will send you updates in the next couple of days.',
      buttonList: [<Button type="primary" 
      style={{ borderRadius: '100px', height: '40px', width: '170px',backgroundColor: '#7229C0', marginBottom: '20px'}}  
      onClick={closePopUp}>Close</Button>],
      //action: null
    };

    const popUpExceptionParam = {
      icon: laptopIcon,
      title: 'Request Exception',
      header: 'There is error when submit request device form. Please contact with admin.',
      linkText: 'help.dxc.com',
      linkRedirect: 'https://csc.service-now.com/',
      content: 'For additional assistance with exception requests visit:',
      buttonList: [<Button type="primary" style={{ borderRadius: '100px', height: '40px', width: '170px',backgroundColor: '#7229C0', marginBottom: '20px'}} 
       onClick={closePopUp}>Close</Button>],
      //action: null
    };

    useEffect(() => {
      if(!localStorage.getItem(AUTH.CURRENT_USER)) 
        return;

      if(!myStuff.deviceIsRefreshed || myStuff.deviceIsRefreshed.length === 0) {
          let userInfo = JSON.parse(localStorage.getItem(AUTH.CURRENT_USER));
          props.loadMyStuffAction(userInfo.user_name);
      }
      //init flags
      props.setDeviceFormIsModalVisible(false);
      props.setDeviceFormIsExceptionVisible(false);
      props.setDeviceFormSetIsSpinning(false);

      if(!device) {
        props.loadDeviceForm("PC Refresh");
      }

    }, []);

    const jsonData = props.deviceForm.data;
    return (
      <>
        <h4  className="request-device-form-header">
            Request Device
        </h4>
        <div className="request-device-form-crossbar"/>
        <Row span={24}>
          <Col xs={1} sm={1} md={1} lg={2} xl={2} >&nbsp;</Col>
          <Col className="dynamic-form"  xs={22} sm={22} md={22} lg={20} xl={20}>
              <Row>
                  <div className="request-device-information">
                      <img className="request-device-information-image" src={image} alt="Image not found" />
                      <div className="request-device-information-display-content">
                          <h5 className="request-device-information-display-name">{model_category}</h5> 
                          <div className="request-device-information-display-comment"> 
                            {ReactHtmlParser(display_name)}
                          </div> 
                      </div>
                  </div>
              </Row>
              <Row>
                  <h5 className="request-device-form-title">Delivery Address</h5>
              </Row>
              <Row>
                <DynamicForm inputs={jsonData} onSubmit={onSubmit} onCancel={props.onCancel} />
              </Row>

          </Col>
        {/* You can use url and objectKey prop to request for getting inputs 
        from server (Server should send validations as string from response to map them)*/}
        <Col xs={1} sm={1} md={1} lg={2} xl={2} >&nbsp;</Col>
        </Row>
        <div className="request-device-form-crossbar-end"/>
        {deviceForm.isModalVisible&& <IoDialog.PopupDialog showModal={deviceForm.isModalVisible} popUpParam={popUpParam} onCancel={closePopUp} />}
        {deviceForm.isExceptionVisible&& <IoDialog.PopupDialog showModal={deviceForm.isExceptionVisible} popUpParam={popUpExceptionParam} onCancel={closePopUp} />}

        </>
    )

    function onSubmit(e) {      
      localStorage.removeItem(MARKETPLACE_DEVICES.RESHOW);
      const requestContent = {
        userInfo:JSON.parse(localStorage.getItem(AUTH.CURRENT_USER)),
        deviceIsRefreshed:deviceIsRefreshed[0],
        deviceMarketplace: device,
        deviceForm: e
      };
      props.submitDeviceRequestForm(requestContent);      
    }
  }


//connect into Redux saga
const mapStateToProps = ({ deviceForm, router, myStuff}) => ({
    deviceForm,
    router,
    myStuff,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    loadDeviceForm: (typeForm) => dispatch(DeviceFormTypes.loadDeviceFormAction(typeForm)),
    loadMyStuffAction: (userId) => dispatch(loadMyStuffAction(userId)),
    submitDeviceRequestForm: (DeviceFormContent) => dispatch(DeviceFormAction.saveDeviceFormAction(DeviceFormContent)),
    setDeviceFormClosePopUp: (isModalVisible,isExceptionVisible) => dispatch(DeviceFormAction.setDeviceFormClosePopUp(isModalVisible, isExceptionVisible)),
    setDeviceFormIsModalVisible: (isModalVisible) => dispatch(DeviceFormAction.setDeviceFormIsModalVisible(isModalVisible)),
    setDeviceFormIsExceptionVisible:(isExceptionVisible) => dispatch(DeviceFormAction.setDeviceFormIsExceptionVisible(isExceptionVisible)),
    setDeviceFormSetIsSpinning: (isSpinning) => dispatch(DeviceFormAction.setDeviceFormSetIsSpinning(isSpinning))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(RequestDeviceForm);
  
  