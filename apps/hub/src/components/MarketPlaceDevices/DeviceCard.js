import { Button, Card, Typography } from "antd";
import React from "react";
import html from "react-inner-html";
import { useHistory } from "react-router-dom";
import "./DeviceCard.scss";

const { Text } = Typography;

function ContentComp({ content }) {
  return <div {...html(content)} />;
}

const DeviceCard = (props) => {
  const {
    device_profile = "",
    image = "",
    id = "",
    title_description
  } = props.data;
  let {available_refresh} = props.data;
  const history = useHistory();

  const handleViewDetailClick = () => {
    history.push({
      pathname: `/marketplace-devices/${id}`
    });
  };
  
  return (
    <div className="card-container list-card-device">
      <Card className="card-content" onClick={handleViewDetailClick}>
        <div className="end-btn">
          {available_refresh && (
            <Button className="btn-refresh">Refresh Available</Button>
          )}
        </div>
        <div className="image-devices">
          <img src={image} />
        </div>
        <h5 className="profile">
          {device_profile}
        </h5>
        <Text className="description">
          <ContentComp content={title_description}></ContentComp>
        </Text>
      </Card>
    </div>
  );
};

export default DeviceCard;
