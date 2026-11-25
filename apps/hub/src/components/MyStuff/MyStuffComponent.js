import { LoadingOutlined } from "@ant-design/icons";
import { IoCard } from '@i-o/design-system-classic';
import { Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LINKLIRARYCONSTANTS as LINK_LIRARY_CONSTANTS } from "../../constants/linkLibraryConstants";
//Link Library
import { SESSIONSTORAGEKEYS as SESSION_STORAGE_KEYS } from "../../constants/storageConstants";
import { LinkLibraryUtils as Link_Library_Utils } from "../../utils/linkLibrary";
import { MY_DEVICES, ROUTER } from "./../../constants";
import MyStuffCardSmall from "./MyStuffCardSmall";
import smallCardData from "./MyStuffCardSystemData";
import "./MyStuffComponent.scss";
import MyStuffEmpty from "./MyStuffEmpty";

const MyStuffComponent = (props) => {
  const { isLoading } = props.myStuff;
  let { data = [], deviceIsRefreshed = [] } = props.myStuff;

  localStorage.setItem(
    MY_DEVICES.AVAILABLE_DEVICES_FOR_REFRESH,
    JSON.stringify(deviceIsRefreshed)
  );

  let [links, setLinks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const currentLinks = Link_Library_Utils.GetLinks(SESSION_STORAGE_KEYS.LINK_LIBRARY_MY_STUFF, LINK_LIRARY_CONSTANTS.MY_STUFF);
    setLinks(currentLinks);
  }, []);

  const onMyDevicesHandleClick = (uid) => {
    history.push({
      pathname: ROUTER.MY_DEVICES,
      search: `?uid=${uid}`,
      state: props,
    });
  };

  const onRefreshHandleClick = () => {
    history.push(ROUTER.MARKETPLACE);
  };

  const handleViewDetailClick = (kbNumber) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
      state: {
        path: history.location.pathname
      }
    });
  };

  const handleOnclickHelpLink = (param) => {
    if (param) {
      history.push({
        pathname: ROUTER.SEARCH,
        search: `?param=${param}&paging=${1}`, // query string
      });
    }
  };

  const generateMyStuffSmallCards = (paramResponsiveSmallCard) => {
    let result = [];
    if (data.length >= 3) {
      result.push(data[2]);
    }

    smallCardData.map((item) => result.push(item));

    // get first 3 cards to displays
    if (result.length > 3) {
      result = result.slice(0, 3);
    }

    return (
      <>
        {result.map((item, index) => {
          return (
            <>
              <Col
                xs={paramResponsiveSmallCard.xs}
                md={paramResponsiveSmallCard.md}
                lg={paramResponsiveSmallCard.lg}
                xl={paramResponsiveSmallCard.xl}
                key={index}
                className={item.className ? item.className : ""}
              >
                <MyStuffCardSmall
                  myStuff={item}
                  key={index}
                  links={links}
                  onMyDevicesHandleClick={onMyDevicesHandleClick}
                />
              </Col>

              {/*generate view All cards*/}
              {data.length >= 3 && index === 2 && (
                <Col
                  xs={paramResponsiveSmallCard.xs}
                  md={paramResponsiveSmallCard.md}
                  lg={paramResponsiveSmallCard.lg}
                  xl={paramResponsiveSmallCard.xl}
                  key={index}
                >
                  <IoCard.SeeMoreCard 
                    totalCount={data.length}
                    linkRedirect={`${ROUTER.MY_DEVICES}?uid=${data[0]['uid']}`}
                  />
                </Col>
              )}
            </>
          );
        })}
      </>
    );
  };

  const generateMyStuffLargeCards = (responsiveParam) => {
    return (
      <>
        {data.map((item, index) => {
          if (index < 2) {

            const {
              is_new = false,
              manufacturer,
              model,
              processing,
              image,
              pc_state,
              knowledge,
              uid
            } = item;

            return (
              <Col
                xs={responsiveParam.xs}
                sm={responsiveParam.sm}
                md={responsiveParam.md}
                lg={responsiveParam.lg}
                xl={responsiveParam.xl}
                className="c-ant-col-md-12"
                key={item.uid}
              >

               <IoCard.DeviceCard
                  uid = {uid}
                  is_new = {is_new}
                  manufacturer ={manufacturer}
                  model={model}
                  processing={processing}
                  image={image}
                  pc_state={pc_state}
                  kbNumber={knowledge ? knowledge.kbNumber: ''}
                  getHelpUrl={handleOnclickHelpLink}
                  onMyDevicesHandleClick={onMyDevicesHandleClick}
                  onRefreshHandleClick={onRefreshHandleClick}
                  handleViewDetailClick={handleViewDetailClick}
                />
              </Col>
            );
          }
        })}
      </>
    );
  };

  const generateMyStuffContent = () => {
    let paramResponsiveLargeCard = { xs: 24, sm: 24, md: 8, lg: 8, xl: 8 };
    let paramResponsiveWrapperSmallCard = {xs: 24, sm: 24, md: 8, lg: 8, xl: 8};
    let paramResponsiveSmallCard = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };

    if (data.length === 0) {
      return (
        <div className="my-stuff-component-style">
          <h4 className="heading-text">My Stuff</h4>
          <MyStuffEmpty />
        </div>
      );
    } else {
      return (
        <div className="my-stuff-component-style">
          <h4 className="heading-text">My Stuff</h4>
          <Row>
            {/* generate 2 small cards */}
            {generateMyStuffLargeCards(paramResponsiveLargeCard)}

            {/* generate 4 small cards */}
            <Col
              xs={paramResponsiveWrapperSmallCard.xs}
              sm={paramResponsiveWrapperSmallCard.sm}
              lg={paramResponsiveWrapperSmallCard.lg}
              md={paramResponsiveWrapperSmallCard.md}
              xl={paramResponsiveWrapperSmallCard.xl}
              className="c-ant-col-md-12"
              key={100}
            >
              <div className="my-stuff-small-cards-wrapper">
                <Row key={100}>
                  {generateMyStuffSmallCards(paramResponsiveSmallCard)}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
      {generateMyStuffContent()}
    </Spin>
  );
}
export default MyStuffComponent;
