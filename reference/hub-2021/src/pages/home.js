import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/home/home.scss";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { AUTH } from "../constants";
import MyStuffComponent from "../components/MyStuff/MyStuffComponent";
import { ROUTER } from "./../constants";
import SearchBar from "../components/SearchBar/SearchBar";
import SupportHistoryComponent from "../components/SupportHistory/SupportHistoryComponent";
import Whatsnew from "../components/Whatsnew/Whatsnew";
import { useHistory } from "react-router-dom";
import { LINKLIRARYCONSTANTS } from "../constants/linkLibraryConstants";
import { SESSIONSTORAGEKEYS } from "../constants/storageConstants";
import { LinkLibraryUtils } from "../utils/linkLibrary";
import SupportHistoryAction from "redux/actions/supportHistoryAction";
import { loadMyStuffAction } from "redux/actions/myStuffAction";
import MuuriListComponent from "../components/Whatsnew/MuuriListComponent";
import { Select, Typography, Divider, Row, Col, Tag } from 'antd';
import { TextField } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import RightOutlined from "../assets/icons/arrow-right.svg";
const { Title } = Typography;

const list = [
  { keyIcon: "key", text: "Reset Password" },
  { keyIcon: "cloud-download-alt", text: "Update Software" },
  { keyIcon: "clock", text: "View my timesheet" },
  { keyIcon: "map-marker-alt", text: "Find a team member" },
];

const HomePage = (props, usersInfo) => {
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = JSON.parse(currentUser);
  const [knowledgeState, setKnowledgeState] = useState([]);
  const history = useHistory();
  const [searchGridValue, setSearchGridValue] = useState('');
  const [filterGridValue, setFilterGridValue] = useState([]);
  const [sortGridValue, setSortGridValue] = useState('type');

  useEffect(() => {
    window.scrollTo(0, 0);
    (async function fetchMyAPI() {
      setKnowledgeState([]);
    })();

    LinkLibraryUtils.GetLinkByOrderNumber(
      SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE,
      LINKLIRARYCONSTANTS.MARKET_PLACE,
      1
    );

    LinkLibraryUtils.GetLinkByOrderNumber(
      SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE,
      LINKLIRARYCONSTANTS.MARKET_PLACE,
      2
    );
  }, [sessionStorage.getItem(SESSIONSTORAGEKEYS.LINK_LIBRARY_MARKET_PLACE)]);
  if (!currentUser) return <></>;
  useEffect(() => {
    const params = {
      page_size: 20,
      page_index: 1,
      user_name: currentUser.user_name,
      // user_name:  "tdo43@dxc.com"
    };
    props.fetchWhatsnewsItem(currentUser, 20);
    props.loadMyStuffAction(currentUser.user_name);
    props.loadSupportHistoryAction(params);
  }, [currentUser.username]);
  const handleListWhatsnewClick = (path) => {
    history.push({
      pathname: path
    });
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && e.target.value) {
      //console.log("search value is: " + e.target.value);
      // const result = await searchAllKnowledge(e.target.value);
      // console.log(result);
      // setKnowledgeState(result.data)
      // return result;

      //console.log("Redirecting to Search Result");
      // window.location.href = "/search";
      const searchValue = e.target.value;
      setTimeout(() => {
        history.push({
          pathname: ROUTER.SEARCH,
          search: `?param=${searchValue}&paging=${1}`, // query string
          state: {
            path: history.location.pathname
          }
        });
      }, 50);
      //return (<Redirect to="/search" />);
      //this.props.history.push("/search");
    }
    return null;
  };
  const handleClick = (value) => {
    if (value) {
      setTimeout(() => {
        history.push({
          pathname: ROUTER.SEARCH,
          search: `?param=${value}&paging=${1}`, // query string
          state: {
            path: history.location.pathname
          }
        });
      }, 50);
    }
    return null;
  };
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const options = [{
    label: "Article",
    value: "article"
  }, {
    label: "Outage",
    value: "outage"
  }, {
    label: "Support",
    value: "support"
  }, {
    label: "My Stuff",
    value: "mystuff"
  }];
  // for (let i = 0; i < 100000; i++) {
  //   const value = `${i.toString(36)}${i}`;
  //   options.push({
  //     value,
  //     disabled: i === 10,
  //   });
  // }

  function handleChange(value) {
    setFilterGridValue(value);
    console.log(`selected ${value}`);
  }
  function handleSearchChange(e) {
    setSearchGridValue(e.target.value);
  }
  function handleSortChange(value) {
    setSortGridValue(value);
  }
  const welcomeText = currentUser ? (
    <div id="welcomeQ">
      How can we help,&nbsp;
      <span>{currentUser.first_name ? currentUser.first_name : ""}?</span>
    </div>
  ) : null;
  const placeHolderSearch = "Search knowledge articles";
  return (
    <div>
      <SearchBar
        backgroundText={currentUser ? currentUser.city : ""}
        placeHolder={placeHolderSearch}
        welcomeText={welcomeText}
        search={handleKeyDown}
        searchClick={handleClick}
      />
      <Row className="custom_container homepage muuri-tab-bar">
        <Col xs={8} sm={8} md={8} lg={8} style={{
          textAlign:"center"
        }}>
          <h5 className="whatsnew-title">
            <b onClick={e=>handleListWhatsnewClick('/whatsnew')}>
              What’s New
            </b>
            <img src={RightOutlined} className="homepage-content-arrow" />
          </h5>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} style={{
          textAlign:"center"
        }}>
          <h5 className="whatsnew-title">
            <b onClick={e=>handleListWhatsnewClick('/marketplace')}>
              My Stuff
            </b>
            <img src={RightOutlined} className="homepage-content-arrow" />
          </h5>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} style={{
          textAlign:"center"
        }}>
          <h5 className="whatsnew-title">
            <b onClick={e=>handleListWhatsnewClick('/support-history')}>
            Support History
            </b>
            <img src={RightOutlined} className="homepage-content-arrow" />
          </h5>
        </Col>
      </Row>
      <Row className="custom_container homepage muuri-tab-bar">
        {/* <Title level={4}>asd</Title> */}
        <Col xs={24} sm={12} md={8} lg={8} key={2} >
          <TextField
            name="search-list"
            value={searchGridValue || ''}
            id="outlined-start-adornment"
            className="textField search-muuri"
            placeholder="Search"
            size="small"
            onChange={handleSearchChange}
            InputProps={{
              classes: {
                notchedOutline: 'notchedOutline'
              },
              startAdornment: <Search className='searchIcon' />,
            }}
            variant="outlined"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} key={1}  >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Filter value..."
            // tagRender={selected => {
            //   console.log(selected);
            //   return <Tag key={selected.label} className={`tag-${selected.label}`}>{selected.label}</Tag>
            // }}
            defaultValue={filterGridValue}
            onChange={handleChange}
            options={options}
            size='large'
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} key={2}  >

          <Select
            defaultValue={sortGridValue}
            style={{ width: '100%' }}
            onChange={handleSortChange}
            options={[{
              label: "Sort by name",
              value: "title"
            }, {
              label: "Sort by card type",
              value: "type"
            }]}
            size='large'
          >
          </Select>
        </Col>

      </Row>
      <div className="custom_container homepage">
        <MuuriListComponent
          data={{
            whatsNews: props.supportHistory.whatsNews,
            myStuff: props.myStuff,
            supportHistory: props.supportHistory
          }}
          search={searchGridValue}
          filter={filterGridValue}
          sort={sortGridValue}
          isLoading={props.supportHistory.isLoadingWhatsNews}
          path={history.location.pathname}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ supportHistory, myStuff }) => ({
  supportHistory,
  myStuff,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWhatsnewsItem: (paramObj, maxItem) =>
    dispatch(SupportHistoryAction.fetchWhatsnewsItem(paramObj, maxItem)),
  loadMyStuffAction: (userId) => dispatch(loadMyStuffAction(userId)),
  loadSupportHistoryAction: (queryParams) =>
    dispatch(SupportHistoryAction.loadSupportHistoryAction(queryParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
