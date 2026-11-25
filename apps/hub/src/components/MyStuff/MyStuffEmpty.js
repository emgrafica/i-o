import { Card, Col, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { LINKLIRARYCONSTANTS as LINK_LIRARY_CONSTANTS } from "../../constants/linkLibraryConstants";
//Link Library
import { SESSIONSTORAGEKEYS as SESSION_STORAGE_KEYS } from "../../constants/storageConstants";
import { LinkLibraryUtils as Link_Library_Utils } from "../../utils/linkLibrary";
import {
  default as laptopIcon,
  default as registerDevice,
} from "./../../assets/images/myStuff/accessories.svg";
import windowIcon from "./../../assets/images/myStuff/manage.svg";
import "./MyStuffEmpty.scss";
import { systemCard } from "./MyStuffEmptySystemData";
import { IoCard } from '@i-o/design-system-classic';

const { Meta } = Card;

const MyStuffEmpty = () => {
  let [links, setLinks] = useState([]);

  useEffect(() => {
    // Links from Link Library
    const currentLinks = Link_Library_Utils.GetLinks(
      SESSION_STORAGE_KEYS.LINK_LIBRARY_MY_STUFF,
      LINK_LIRARY_CONSTANTS.MY_STUFF
    );
    setLinks(currentLinks);
  }, []);
  const generateIconSrc = (item) => {
    const { type } = item;
    if (type === "software") {
      return (
        windowIcon
      );
    } else if (type === "accessories") {
      return (
        registerDevice
      );
    } else if (type === "register_device") {
      return (
        laptopIcon
      );
    }
  };

  const generateJumpToUrl = (item) => {
    const { type } = item;
    // Make sure links for My Stuff exist
    if (links) {
      if (type === "software") {
        return links.find((item) => item.card_order === 2) != undefined
          ? links.find((item) => item.card_order === 2).url
          : "#";
      } else if (type === "return_device") {
        return links.find((item) => item.card_order === 3) != undefined
          ? links.find((item) => item.card_order === 3).url
          : "#";
      } else if (type === "accessories") {
        return links.find((item) => item.card_order === 4) != undefined
          ? links.find((item) => item.card_order === 4).url
          : "#";
      }
    }

    return "#";
  };

  const generateMyStuffEmpty = () => {
    return (
      <>
        {systemCard.map((item, index) => {
          const { name, link } = item;
          return (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="custom-ant-col-md-ex-8"
              key={index}
            >
              <IoCard.GeneralCard
                cardType="large card"
                displayLinkIcon={true}
                name={name}
                srcIcon={generateIconSrc(item)}
                link={link}
                url={generateJumpToUrl(item)}
              />
            </Col>
          );
        })}
      </>
    );
  };

  return (
    <div className="my-stuff-empty-style">
      <Row
        gutter={[
          { xs: 8, sm: 8, md: 8, lg: 16 },
          { xs: 8, sm: 8, md: 8, lg: 16 },
        ]}
      >
        {generateMyStuffEmpty()}
      </Row>
    </div>
  );
};

export default MyStuffEmpty;
