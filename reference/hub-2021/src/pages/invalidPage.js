import { IoCard } from '@i-o/design-system-classic';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/invalidPage/invalidPage.scss";
import React from "react";
import { Card, Typography, Row } from "antd";
const { Title, Text } = Typography;
const InvalidPage = () => {
  return (
    <div>
      <IoCard.BannerHeaderComponent
        title = "404"
        className = "invalid-container"
      >
      </IoCard.BannerHeaderComponent>
      <div className="custom_container">
        <div className="custom_container_inner">
          <Row align="middle" justify="center">
          <Card className="card-404 card-wrap">
            <Title level="4" className="title-section">Page Not Found</Title>
            <Text className="fsz14">Oops! The page that you are looking for does not exist.</Text>
          </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InvalidPage;
