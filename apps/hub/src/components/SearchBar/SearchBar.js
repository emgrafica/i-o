import { ArrowRightOutlined } from "@ant-design/icons";
import { TextField } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { useAppInsightsContext, useTrackEvent } from "@microsoft/applicationinsights-react-js";
import { Button, Col, Layout, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { MdChat } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { AUTH, ROUTER } from "../../constants";
import { LINKLIRARYCONSTANTS } from "../../constants/linkLibraryConstants";
import { SESSIONSTORAGEKEYS } from "../../constants/storageConstants";
import { LinkLibraryUtils } from "../../utils/linkLibrary";
import backIcon from "./../../assets/icons/arrow-back-white.svg";
import "./SearchBar.scss";
import { IoCard } from '@i-o/design-system-classic';

const { Content } = Layout;
//Link Library

const GoBack = (props) => {
  const {history, chatWithAgentUrl} = props;
  if (window.location.pathname === "/home" || window.location.pathname === "/") return null;
  const { isHideBack = false } = props || {};
  const appInsights = useAppInsightsContext();
  const trackChatWithAgent = useTrackEvent(appInsights, "Chat With Agent");
  const handleClick = () => {
    trackChatWithAgent({time: new Date().toLocaleString()});
  };
  
  return (
    <div className="search-bar-group-button">
      {!isHideBack && !!history.location.state?.path && history.location.state?.path !== ROUTER.SEARCH && <Link className="button-back" to={history.location.state?.path} >
        <img src={backIcon} />
        Go Back
      </Link>}
      
      {!!history.location.state?.params && 
        <Button 
          className="button-back" 
          onClick={() => {
            history.goBack();
          }}
        >
          <img src={backIcon} />
          Go Back
        </Button>}

      <div className='floatRight'>
        <a href={chatWithAgentUrl} target="_new">
          <Button
            type="primary"
            onClick={handleClick}
            className="button-chat"
            icon={<MdChat className="button-chat-icon" />}
            size="large"
          >
            Chat with an agent
          </Button>
        </a>
      </div>
    </div>
  );
};

const SearchBar = (props) => {
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = JSON.parse(currentUser);
  const history = useHistory();
  const [searchState, setSearchState] = useState({
    search: props.value,
    searchFilter: "all"
  });

  const [searchSelected, setSearchSelected] = useState(false);

  //Url for Chat With Agent
  let chatWithAgentUrl = LinkLibraryUtils.GetLinkByOrderNumber(
    SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL,
    LINKLIRARYCONSTANTS.SEARCH_RESULT,
    2
  );

  const handleGoHome = () => {
    history.push({
      pathname: ROUTER.HOME
    });
  }

  useEffect(() => {
    if (props.value) {
      setSearchState({
        search: props.value,
        searchFilter: "all"
      });
      setSearchSelected(props.value ? true : false);
    }
  }, [props.value]);

  const appInsights = useAppInsightsContext();
  const trackSearch = useTrackEvent(appInsights, "Knowledge Search", searchState);

  function handleChange(e) {
    setSearchSelected(e.target.value === "" ? false : true);
    setSearchState({ ...searchState, [e.target.name]: e.target.value });
  }

  const handleClick = (e) => {
    trackSearch({keyword: searchState.search});
    props.searchClick(searchState.search);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value){
      trackSearch({keyword: e.target.value});
      props.search(e);
    }
  }

  let welcome;
  if (currentUser && currentUser.first_name) {
    welcome = (
      <div className="mx-lg-auto form search-title">
        {props.welcomeText}
      </div>
    );
  } else {
    welcome = null;
  }
  

  return (
    <IoCard.BannerHeaderComponent
      title = {props.backgroundText}
      className = "search-container position-relative" 
    >
      <Content className="custom_container body-search-container">
        <div>
          {welcome}
          <div className="text-white">
            <div className="mx-auto text-center form">
              <TextField
                name="search"
                value={searchState.search || ''}
                id="outlined-start-adornment"
                className="textField"
                placeholder={props.placeHolder}
                size="small"
                InputProps={{
                  classes: {
                    notchedOutline: 'notchedOutline'
                  },
                  startAdornment: <Search className='searchIcon' />,
                  endAdornment: (
                    <ArrowRightOutlined
                      className={
                        `forwardIcon ${searchSelected ? 'forwardIconWithBlueColor' : 'forwardIconWithGrayColor'}`
                      }
                      onClick={handleClick}
                    />
                  )
                }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                variant="outlined"
              />
            </div>
          </div>
          <Row span={24}>
            <Col xs={24}>
              <GoBack chatWithAgentUrl={chatWithAgentUrl} isHideBack={props.isHideBack} goHome={handleGoHome} history={history} />
            </Col>
          </Row>
        </div>
      </Content>
    </IoCard.BannerHeaderComponent>
  );
};

export default SearchBar;
