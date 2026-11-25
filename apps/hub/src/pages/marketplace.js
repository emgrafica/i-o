import { IoCard } from '@i-o/design-system-classic';
import {
  Divider,
  Image,
  Layout,
  List,
  Row
} from "antd";
import React, { useEffect, useState } from "react";
import HeadPhoneDesktop from "../assets/images/marketPlace/icon-headphone-desktop.png";
import HeadPhoneMobile from "../assets/images/marketPlace/icon-headphone-mobile.png";
import DevicesList from "../components/MarketPlaceDevices/DevicesList";
import { LINKLIRARYCONSTANTS } from "../constants/linkLibraryConstants";
import { SESSIONSTORAGEKEYS } from "../constants/storageConstants";
import "../styles/scss/marketPlace/marketPlace.scss";
import { LinkLibraryUtils } from "../utils/linkLibrary";

const { Content } = Layout;
const data = [
  {class: 'ms-x'},
  {class: 'ms-t'},
  {class: 'ms-n'},
  {class: 'ms-o'},
  {class: 'ms-w'},
  {class: 'ms-p'}
];

const MarketPlace = (props) => {
  //Url for Chat With Agent
  const [companyPortalUrl, setCompanyPortalUrl] = useState("");
  const [dxcGearUrl, setDxcGearUrl] = useState("");

  useEffect(() => {
    let link01 = LinkLibraryUtils.GetLinkByOrderNumber(
      SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE,
      LINKLIRARYCONSTANTS.MARKET_PLACE,
      1
    );
    setCompanyPortalUrl(link01);

    let link02 = LinkLibraryUtils.GetLinkByOrderNumber(
      SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE,
      LINKLIRARYCONSTANTS.MARKET_PLACE,
      2
    );
    setDxcGearUrl(link02);

  }, [sessionStorage.getItem(SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE)]);

  return (
    <div className="market-place">
      <IoCard.BannerHeaderComponent
        title = "Marketplace"
        className = "banner"
      >
        <div className="custom_container">
          <h1 className="title-bg">Browse <br /> Marketplace</h1>
        </div>
      </IoCard.BannerHeaderComponent>
      <Content className="content-marketplace">
        <div className="custom_container">
          <Row>
            <DevicesList />
          </Row>

          <Divider className="line-breack" />

          <IoCard.BannerCard
            cardHeader="App & Software"
            cardTitle="Looking for software?"
            classOuter="outer-software"
            btnUrl={companyPortalUrl}
            btnTitle="Open Company Portal"
          >
            <Row align="middle">
              <List
                className="list-icon"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item className={`item-software item-${item.class}`}></List.Item>
                )}
              />
            </Row>
          </IoCard.BannerCard>

          <Divider className="line-breack line-accessories" />

          <IoCard.BannerCard
            cardHeader="Accessories"
            cardTitle="Looking for accessories?"
            classOuter="outer-access"
            btnUrl={dxcGearUrl}
            btnTitle="Go to DXC Gear"
          >
            <Row align="middle" className="img-headphone">
              <Image
                preview={false}
                src={HeadPhoneMobile}
                className="img-headphone-mobile"
              />
              <Image
                preview={false}
                src={HeadPhoneDesktop}
                className="img-headphone-desktop"
              />
            </Row>
          </IoCard.BannerCard>
        </div>
      </Content>
    </div>
  );
};

export default MarketPlace;
