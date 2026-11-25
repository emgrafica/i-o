import { LoadingOutlined } from "@ant-design/icons";
import { IoCard } from '@i-o/design-system-classic';
import { Col, ConfigProvider, Layout, List, Row, Spin, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone-icon.svg";
import SearchBar from "../components/SearchBar/SearchBar";
import TopKnowledgeArticle from "../components/SupportHistory/KnowledgeArticle/TopKnowledgeArticle";
import "../styles/scss/supportCenter/support-center.scss";
import { AUTH, ROUTER } from "./../constants";
import SupportHistoryAction from "./../redux/actions/supportHistoryAction";

const { Content } = Layout;
const { Text } = Typography;

const SupportHistory = (props) => {
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : {};
  const currentTimeZone = currentUser?.time_zone;
  let settings = localStorage.getItem(AUTH.SETTINGS);
  settings = !!settings ? JSON.parse(settings) : {};
  const supportNumber = settings?.SUPPORT_DESK_PHONE_NUMBER;
  const {
    isLoading,
    supportHistory = [],
    dataArticle=[],
    isLoadingArticle,
    totalCount,
  } = props.supportHistory;
  const [pagingState, setPagingState] = useState({
    user_name: currentUser.user_name,
    page_size: 6,
    page_index: 1,
  });
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    props.fetchTopKnowledgeArticleItem();
    handlePaging(1);
  }, []);

  const handlePaging = (e) => {
    setPagingState({ ...pagingState }, (pagingState["page_index"] = e));
    props.loadSupportHistoryAction(pagingState);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && e.target.value) {
      const searchValue = e.target.value;
      setTimeout(() => {
        history.push({
          pathname: ROUTER.SEARCH,
          search: `?param=${searchValue}&paging=${1}`,
          state: {
            path: history.location.pathname
          }
        });
      }, 50);
    }
    return null;
  };
  const handleClick = (value) => {
    if (value) {
      setTimeout(() => {
        history.push({
          pathname: ROUTER.SEARCH,
          search: `?param=${value}&paging=${1}`,
          state: {
            path: history.location.pathname
          }
        });
      }, 50);
    }
    return null;
  };

  const customizeRenderEmpty = () => (
    <IoCard.EmptyCard
      contentDescription={<Text>NO SUPPORT HISTORY YET</Text>}
    />
  );

  const handleViewDetailClick = (e, data) => {
    history.push({
      pathname: `/support-history/detail/${data.ticketNumber}`,
      state:{
        path: history.location.pathname
      }
    });
  };

  return (
    <Layout style={{ background: "transparent" }}>
      <Row>
        <Col span={24}>
          <SearchBar
            backgroundText="Support"
            placeHolder="Search support..."
            isHideBack={true}
            welcomeText={<span id="welcomeQ">Search Support</span>}
            search={handleKeyDown}
            searchClick={handleClick}
          />
        </Col>
      </Row>
      {/* Top Article */}
      <Content className="supportHistorySection custom_container z-99">
        <div className="custom_container_inner">
          <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
            <div className="block-section">
              <Row className="support-history-block">
                <Col span={24}>
                  <h4>Support History</h4>
                </Col>
                <Col xs={24} md={16}>
                  <ConfigProvider renderEmpty={customizeRenderEmpty}>
                    <List
                      itemLayout="vertical"
                      size="large"
                      className="pagination-custom support-list"
                      pagination={!isLoading && {
                        onChange: handlePaging,
                        pageSize: 6,
                        total: totalCount,
                        showSizeChanger: false,
                        size: "small",
                        hideOnSinglePage: true,
                      }}
                      dataSource={supportHistory}
                      renderItem={(item) => (
                        <List.Item key={item.number} className="item-sh">
                          <IoCard.TicketCard 
                            status={item.state}
                            titleTicket={item.short_description}
                            ticketNumber={item.number}
                            timeStamp={moment().to(moment.tz(item.updatedDate, currentTimeZone))}
                            onClick={handleViewDetailClick}
                          />
                        </List.Item>
                      )}
                    />
                  </ConfigProvider>
                </Col>
                <Col
                  xs={24}
                  md={{ span: 6, offset: 2 }}
                  className="contact-block"
                >
                  <PhoneIcon />
                  <h4 className="title-contact">
                    Give us a call
                  </h4>
                  <Text className="txt-desc">Service Desk Hotline</Text>
                  <a href={"tel:" + supportNumber} className="button-default-2">
                    {supportNumber}
                  </a>
                </Col>
              </Row>
            </div>
          </Spin>
          <div className="block-section-last">
            <TopKnowledgeArticle
              data={dataArticle}
              loading={isLoadingArticle}
            ></TopKnowledgeArticle>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ isLoading, supportHistory, isLoadingArticle, dataArticle,error }) => ({
  isLoading,
  supportHistory,
  isLoadingArticle,
  dataArticle,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  loadSupportHistoryAction: (param) => dispatch(SupportHistoryAction.loadSupportHistoryAction(param)),
  fetchTopKnowledgeArticleItem: () => dispatch(SupportHistoryAction.fetchTopKnowledgeArticleItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportHistory);
