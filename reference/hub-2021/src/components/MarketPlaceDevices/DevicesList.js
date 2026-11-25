import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MARKETPLACE_DEVICES } from "../../constants";
import { loadMarketplaceAllDevicesAction } from './../../redux/actions/marketPlaceDevicesAction';
import DeviceCard from "./DeviceCard";

const { Title } = Typography;

const DevicesList = (props) => {
  const {marketplaceDevices, loadMarketplaceAllDevicesAction } = props;
  const {data: devices, isLoading} = marketplaceDevices ;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    loadMarketplaceAllDevicesAction();
    if(localStorage.getItem(MARKETPLACE_DEVICES.RESHOW)){
      localStorage.removeItem(MARKETPLACE_DEVICES.RESHOW);
    }
  }, []);

  localStorage.setItem(MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES ,JSON.stringify(devices));

  const generateListMarketPlaceDevice = () => {
 
    return devices.map((device, index) => {
        return (
          <Col xs={12} sm={8} lg={6} key={index}>
            <DeviceCard data={device} key={index} />
          </Col>
        );
      });
  }

  return (
    <Spin spinning={isLoading}  indicator={<LoadingOutlined/>}>
      <h4 className="title-section title-black">Devices</h4>
      <Row className="my-3" gutter={[16, 16]}>
        {generateListMarketPlaceDevice()}
      </Row>
    </Spin>
  );
};

//connect into Redux saga
const mapStateToProps = ({ marketplaceDevices, myStuff}) => ({
  marketplaceDevices
});

const mapDispatchToProps = (dispatch) => ({
  loadMarketplaceAllDevicesAction: () => dispatch(loadMarketplaceAllDevicesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList);



