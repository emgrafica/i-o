import PropTypes from "prop-types";
import React from "react";
import { TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./search.scss";
import searchIcons from "../../../assets/icons/search.svg";

const SearchBox = (props) => {
  const {
    onSearch,
    keywords,
    onChange,
    placeholder = "",
    startIcon,
    endIcon,
    hasAnimation,
  } = props;
  const [searchSelected, setSearchSelected] = React.useState(false);
  const [isActiveSearch, setActiveSearch] = React.useState(false);
  const isMobileMode = window.screen.width < 768;

  return (
    <TextField
      name="search"
      value={keywords || ""}
      id="outlined-start-adornment"
      placeholder={'Hi ' + (isActiveSearch ? placeholder + "...how can we help you?" : placeholder+'...')}
      className={hasAnimation ? (isActiveSearch || keywords ? "active-search" : "textField"): "default-search"}
      onMouseOver={() => {
        if (!isMobileMode && hasAnimation)
          setActiveSearch(true);
      }}
      onMouseOut={() => {
        if (!isMobileMode && hasAnimation)
          setActiveSearch(false);
      }}
      InputProps={{
        classes: {
          notchedOutline: "notchedOutline",
        },
        startAdornment: startIcon && (
          <img src={startIcon} className="startIcon" />
        ),
        endAdornment: endIcon && (
          <img
            src={endIcon}
            className={`endIcon ${searchSelected
              ? "forwardIconWithBlueColor"
              : "forwardIconWithGrayColor"
              }`}
            onClick={() => onSearch()}
          />
        ),
      }}
      onChange={(e) => {
        setSearchSelected(e.target.value === "" ? false : true);
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch();
      }}
      variant="outlined"
    />
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  keywords: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
};

SearchBox.defaultProps = {
  onSearch: () => { },
  keywords: "",
  onChange: () => { },
  placeholder: "Search",
  startIcon: "",
  endIcon: searchIcons,
  hasAnimation: true
};

export default SearchBox;
