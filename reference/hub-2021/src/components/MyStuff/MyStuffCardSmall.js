import React, { useEffect, useState } from "react";
import { PC_REF_STATUS } from "constants/pcRefreshConstants";
import returnIcon from "assets/images/myStuff/Vector01.png";
import laptopIcon from "assets/images/myStuff/accessories.svg";
import windowIcon from "assets/images/myStuff/manage.svg";
import { IoCard} from '@i-o/design-system-classic';

export const typeSmallCard =  {SOFTWARE: "software", ACCESSORIES: "accessories", RETURN_DEVICE: "return_device"};

const MyStuffCardSmall = (props) => {

  const { onMyDevicesHandleClick, myStuff } = props;
  const { name, link, type, image, model, uid, pc_state } = props.myStuff;
  const links = props.links;
  const [jumpToUrl, setJumpToUrl] = useState([]);

  const generateIconSrc = () => {
    if (type === typeSmallCard.SOFTWARE) 
      return  windowIcon;
    else if (type === typeSmallCard.ACCESSORIES)
      return laptopIcon;
    else if (type ===  typeSmallCard.RETURN_DEVICE) {
      return returnIcon;
    } else if (image && uid) {
      return image;
    } 
  };


  const generateStatus = (pc_state) => {
    switch (pc_state) {
      case PC_REF_STATUS.REFRESH:
        return "Refresh Available";
      case PC_REF_STATUS.RETURNED:
      case PC_REF_STATUS.BEING_REFRESHED:
        return "Prepare for return";
      default:
        return "";
    }
  };

  const generateUrl = (type, links) => {
    let url = "";
    if (links) {
      if (type === typeSmallCard.SOFTWARE) {
        url =
          links.find((item) => item.card_order === 2) != undefined
            ? links.find((item) => item.card_order === 2).url
            : "#";
      } else if (type ===  typeSmallCard.RETURN_DEVICE) {
        url =
          links.find((item) => item.card_order === 3) != undefined
            ? links.find((item) => item.card_order === 3).url
            : "#";
      } else if (type === typeSmallCard.ACCESSORIES) {
        url =
          links.find((item) => item.card_order === 4) != undefined
            ? links.find((item) => item.card_order === 4).url
            : "#";
      }

      setJumpToUrl(url);
    }
  };

  useEffect(() => {
     generateUrl(type, links);
  });

  return (
    <IoCard.GeneralCard
      cardType = "small card"
      uid = {uid}
      displayLinkIcon = {uid ? false: true}
      name = {name ? name: model}
      srcIcon = {generateIconSrc()}
      typeIcon = {type}
      link = {uid ? generateStatus(pc_state): link}
      url = {jumpToUrl}
      onMyDevicesHandleClick = {onMyDevicesHandleClick}
    />
  );
};

export default MyStuffCardSmall;
