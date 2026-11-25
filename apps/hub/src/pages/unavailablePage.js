import { IoCard } from '@i-o/design-system-classic';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/unavailablePage/unavailablePage.scss";
import React from "react";
import { Card, Typography, Row } from "antd";
const { Title, Text } = Typography;
const UnavailablePage = () => {
  return (
    <div>
      <IoCard.BannerHeaderComponent
        title = "503"
        className = "unavailable-container"
      >
      </IoCard.BannerHeaderComponent>
      <div className="custom_container">
        <div className="custom_container_inner">
          <Row align="middle" justify="center">
          <Card className="card-503 card-wrap">
            <Title level="4" className="title-section">Service is Temporarily Unavailable</Title>
            <Text className="fsz14">Sorry, the service you requested is unavailable.<br/> Please try again later.</Text>
          </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UnavailablePage;
