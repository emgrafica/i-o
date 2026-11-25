import { Button, Col, Row, Typography } from "antd";
import { PC_REF_STATUS } from "constants/pcRefreshConstants";
import React, { useEffect, useMemo } from "react";
import ReactHtmlParser from "react-html-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MyDeviceDetailComponent.scss";
import DateUtils from "../../utils/date";
import { AUTH } from "../../constants/authConstants";
import { IoCard} from '@i-o/design-system-classic';

const { Text, Title } = Typography;

const MyDeviceDetailComponent = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let {
    uid,
    state,
    primary_secondary,
    last_active,
    serial_number,
    pc_state,
    display_name,
    manufacturer,
    image,
    specifications,
    description,
    configuration,
    model: name,
    knowledge,
  } = props.device;
  const { getHelpUrl, onRefreshHandleClick, handleViewDetailClick } = props;

  const generatePrimaryItem = () => {
    if (primary_secondary == "null" || primary_secondary == null) {
      primary_secondary = "N/A";
    }
    return (
      <div className="device-content icon-placeholder">
        <span className="text-bold-black">Primary: </span>
        <span>{primary_secondary}</span>
      </div>
    );
  };

  const generateConfiguration = (
    configuration,
    state,
    last_active,
    serial_number
  ) => {
    const { since, cpu, vga_card, ram, osLicence, disk, sinceStr } =
      configuration || {};

    const currentTimeZone = useMemo(() => {
      let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
      if (currentUser) {
        const time_zone = JSON.parse(currentUser).time_zone;
        return time_zone;
      } else {
        return;
      }
    }, [AUTH.CURRENT_USER]);
    let timeToNow = DateUtils.timetoXbyUTC(last_active, currentTimeZone);

    return (
      <div className="my-device-configuration">
        <div className="device-content icon-placeholder">
          <span className="text-bold-black">Asset state: </span>
          <span>{state ? state : "N/A"}</span>
        </div>
        {generatePrimaryItem()}
        <div className="device-content icon-home">
          <span className="text-bold-black">Owned since: </span>
          <span>{since ? sinceStr : "N/A"}</span>
        </div>
        <div className="device-content icon-duration">
          <span className="text-bold-black">Last active: </span>
          <span>{last_active ? timeToNow : "N/A"}</span>
        </div>
        <div className="device-content icon-os">
          <span className="text-bold-black">Os: </span>
          <span>{osLicence ? osLicence : "N/A"}</span>
        </div>
        <div className="device-content icon-serial">
          <span className="text-bold-black">Serial number: </span>
          <span>{serial_number ? serial_number : "N/A"}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="my-device-detail-component">
      <div className="article-my-devices">
        <h5 className="title-section title-black">My Devices</h5>
        <Row className="slide-content">
          <Col xs={24} md={12}>
            <img className="my-device-image" src={image} alt={display_name} />
          </Col>
          <Col xs={24} md={12} className="info-devices">
            <div className="my-device-manufacturer">{manufacturer}</div>
            <div className="my-device-display-name">{name}</div>
            <div className="my-device-refresh-available">
              {" "}
              {pc_state === PC_REF_STATUS.REFRESH
                ? "Refresh available"
                : ""}{" "}
            </div>

            <div className="content-info">
              {generateConfiguration(
                configuration,
                state,
                last_active,
                serial_number
              )}
              <div className="my-device-list-button">
                {pc_state === PC_REF_STATUS.REFRESH && (
                  <Button
                    className="btn-refresh button-default-1"
                    onClick={() => onRefreshHandleClick(props.device)}
                  >
                    {" "}
                    Refresh{" "}
                  </Button>
                )}
                {(pc_state === PC_REF_STATUS.RETURNED) && (
                  <Button
                    className="btn-return button-default-1"
                    onClick={() => handleViewDetailClick(knowledge.kbNumber, uid)}
                  >
                    {" "}
                    Return Instructions{" "}
                  </Button>
                )}
                {(pc_state === PC_REF_STATUS.BEING_REFRESHED) && (
                  <Button
                    className="btn-return button-default-1"
                    onClick={() => handleViewDetailClick(knowledge.kbNumber, uid)}
                  >
                    {" "}
                    Refresh Instructions{" "}
                  </Button>
                )}
                <Button
                  className="link-underline-grey"
                  onClick={() => getHelpUrl(name)}
                >
                  {" "}
                  Get Help{" "}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="article-description">
        <h5 className="title-section title-black">Description</h5>
        <div className="description-content">
          {description ? (
            ReactHtmlParser(description)
          ) : (
            <IoCard.EmptyCard
              contentDescription={
                <>
                  <Text>NO DESCRIPTION CURRENTLY AVAILABLE.</Text>
                </>
              }
            />
          )}
        </div>
      </div>

      <div className="article-spec">
        <h5 className="title-section title-black">Specifications</h5>
        <div className="description-content">
          {specifications ? (
            ReactHtmlParser(specifications)
          ) : (
            <IoCard.EmptyCard
              className="article-empty-card"
              contentDescription={
                <>
                  <Text>NO SPECIFICATIONS CURRENTLY AVAILABLE.</Text>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDeviceDetailComponent;
