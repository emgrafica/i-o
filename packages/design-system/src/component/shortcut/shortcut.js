import React from "react";
import PropTypes from "prop-types";
import "./shortcut.scss";
import LaptopMacOutlinedIcon from "@material-ui/icons/LaptopMacOutlined";
import { Card, CardActionArea } from "@material-ui/core";

const iconLaptop = <LaptopMacOutlinedIcon fontSize="inherit" />;
const Shortcut = (props) => {
  return (
    <div className="shortcut-container"> 
        <CardActionArea href={props.url}>
          <Card hoverable className="shortcut-card">
            <div className="shortcut-icon">{props.icon}</div>
            <div className="shortcut-name">{props.name}</div>
            {props.supname === ''? null :<div className="shortcut-supname">{props.supname}</div>}
          </Card>
          </CardActionArea>
    </div>

  );
};

Shortcut.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  supname:  PropTypes.string,
  url: PropTypes.string,
};

Shortcut.defaultProps = {
  icon: iconLaptop,
  name: 'My Devices',
  supname: '',
  url: '',
};
export default Shortcut;
