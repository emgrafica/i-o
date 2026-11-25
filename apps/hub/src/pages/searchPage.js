import { Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import KnowledgePages from "../components/Knowledge/KnowledgePages";
import SearchBar from "../components/SearchBar/SearchBar";
import { AUTH, ROUTER } from "./../constants";
import { loadKnowledgeAction } from "./../redux/actions/knowledgeAction";

const SearchPage = (props) => {
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  if (!currentUser) return <></>;
  currentUser = JSON.parse(currentUser);

  let { isLoading, knowledge, error, params, totalCount } = props.knowledge;
  const urlParams = new URLSearchParams(decodeURIComponent(props.location.search));

  const searchQuery = urlParams.get("param");
  const pagingNumber = parseInt(urlParams.get("paging"));

  const [pagingState, setPagingState] = useState({
    query: searchQuery,
    kb_base_ids: "",
    user_name: currentUser.user_name,
    language: "",
    page_size: 15,
    page_index: pagingNumber,
    text_limit: null
  });
  const history = useHistory();

  useEffect(() => { 
    //scroll page on the top
    window.scrollTo(0, 0);
    //Nav Search
    if(pagingState.query != searchQuery){
      setPagingState((prevState) => ({ ...prevState, query: searchQuery, page_index: pagingNumber}));
      pagingState.query = searchQuery;
    }
    if (props.location) {
      const params = decodeURIComponent(props.location.search);
      const urlParams = new URLSearchParams(params);

      let searchQuery = urlParams.get("param");
      let pagingNumber = parseInt(urlParams.get("paging"));
      setPagingState((prevState) => ({ ...prevState, query: searchQuery, page_index: pagingNumber}));

      if (pagingState) {
        props.knowledgeLoading(pagingState);
      }
    }
  }, [searchQuery, pagingNumber, pagingState.page_index]);



  const historyRouter = (params) => {
    const {pathName, param, paging} = params;
    
    let url = `?`;
    if(param){
      url +=`param=${param}`;
    }
    if(paging){
      if(url!="?"){
        url+="&";
      }
      url +=`paging=${paging}`;
    }
    
    history.push({
      pathname: pathName,
      search: url,
      state: {
        params: history.location.search
      }
    });
  }

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const handlePaging = (current) => {
    setPagingState((prevState) => ({ ...prevState, query : props.knowledge.params.query, page_index: current}));
    //update the url 
    historyRouter({pathName: ROUTER.SEARCH, param: props.knowledge.params.query, paging: current});
    props.knowledgeLoading(pagingState);
  };

  const handleKeyDown = (e) => { 
    if(e.key === "Enter" && e.target.value) {
      setPagingState((prevState) => ({ ...prevState, query : e.target.value, page_index: 1}));
      if(pagingState.query != e.target.value){
        pagingState.query = e.target.value;
      }

      //update the url 
      historyRouter({pathName: ROUTER.SEARCH, param: pagingState.query, paging: 1});
      props.knowledgeLoading(pagingState);
    }
    return null;
  };

  const handleClick = (value) => { 
    if (value) {
      setPagingState((prevState) => ({ ...prevState, query : value, page_index: 1}));

      //update the url 
      historyRouter({pathName: ROUTER.SEARCH, param: value, paging: 1});
      props.knowledgeLoading(pagingState);

    }
    return null;
  };

  const placeHolderSearch = "Search knowledge articles";
  if (params) {
    return (
      <div className="knowledge-articles">
        <Row>
          <Col span={24}>
            <SearchBar
              backgroundText={currentUser ? currentUser.city : ""}
              placeHolder={placeHolderSearch}
              value={params.query}
              search={handleKeyDown}
              searchClick={handleClick}
            />
          </Col>
        </Row>
        <div>
          <Row>
            <Col span={24}>
              <KnowledgePages
                knowledge={knowledge}
                searchQuery={searchQuery}
                handleDelete={handleDelete}
                handlePaging={handlePaging}
                isLoading = {isLoading}
                totalCount={totalCount}
                currentPage={pagingState.page_index}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = ({ isLoading, knowledge, error }) => ({
  isLoading,
  knowledge,
  error
});

const mapDispatchToProps = (dispatch) => ({
  knowledgeLoading: (param) => dispatch(loadKnowledgeAction(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
