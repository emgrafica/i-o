import { LoadingOutlined } from "@ant-design/icons";
import { Col, Layout, Pagination, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import KnowledgeBottomSupport from "./KnowledgeBottomSupport";
import { IoCard } from "@i-o/design-system-classic";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { MuuriComponent } from 'muuri-react';
import Highlighter from "react-highlight-words";
import "./KnowledgePages.scss";
const { Text } = Typography;
const { Content } = Layout;

const options = {
  dragSortHeuristics: {
    sortInterval: 70
  },
  layoutDuration: 400,
  dragRelease: {
    duration: 400,
    easing: "ease-out"
  },
  dragEnabled: true,
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    // createElement: function (item) {
    //   // The element will have the Css class ".muuri-item-placeholder".
    //   return item.getElement().cloneNode(true);
    // }
  }
};

const KnowledgePages = (props) => {
  const {
    knowledge,
    handlePaging,
    totalCount,
    isLoading,
    currentPage,
    path,
  } = props;
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onArticleCardClick = (e, data) => {
    history.push({
      pathname: `/knowledges/detail/${data.kbNumber}`
    });
  };
  const hlTextArray = props.searchQuery.split(" ");
  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
      <Content className="knowledge-page custom_container">
        <label className="label font-opensans-semi-bold">
          {" "}
          {totalCount} Results{" "}
        </label>
        {!isLoading && knowledge.length > 0 && (
          <>
            <div className="knowledge-page-detail">
              {knowledge && knowledge.length>0 &&  <MuuriComponent
                {...options}
              >
                {knowledge.map((knowledge, index) => {
                  return (
                    <div key={index} className="muuri-item-ar">
                      <IoCard.ArticleCard
                        key={index}
                        direction="vertical"
                        cardType=""
                        cardTitle={<Highlighter
                          highlightClassName="kb-card-highlight-text"
                          searchWords={hlTextArray}
                          autoEscape={true}
                          textToHighlight={knowledge.kbName}
                        />}
                        cardDesc={
                          <div>{moment(knowledge.lastUpdated).format("DD MMM YYYY") +
                          " - "}
                          <Highlighter
                            highlightClassName="kb-card-highlight-text"
                            searchWords={hlTextArray}
                            autoEscape={true}
                            textToHighlight={knowledge.kbContent}
                          />
                        </div>
                        }
                        kbNumber={knowledge.kbNumber}
                        onClick={onArticleCardClick}
                      />
                    </div>
                  );
                })}
              </MuuriComponent>}
              {/* {knowledge.map((knowledge, index) => {
                return (
                  <Col xs={24} md={8} key={index}>
                    <IoCard.ArticleCard
                      key={index}
                      direction="vertical"
                      cardType=""
                      cardTitle={knowledge.kbName}
                      cardDesc={
                        moment(knowledge.lastUpdated).format("DD MMM YYYY") +
                        " - " +
                        knowledge.kbContent
                      }
                      kbNumber={knowledge.kbNumber}
                      onClick={onArticleCardClick}
                    />
                  </Col>
                );
              })} */}
            </div>
            <Pagination
              defaultPageSize={15}
              className="pagination-custom"
              size="small"
              total={totalCount}
              showSizeChanger={false}
              onChange={handlePaging}
              current={currentPage}
            />
          </>
        )}
        {!isLoading && knowledge.length === 0 && (
          <IoCard.EmptyCard
            className="empty-content"
            contentDescription={
              <>
                <Text className="txt-desc">HMM...</Text>
                <Text className="sub-desc">
                  We couldn’t find what you were looking for.
                  <br />
                  Try using a different search term.
                </Text>
              </>
            }
          />
        )}
      </Content>
      <Content className="knowledge-support-bottom">
        <div className="custom_container">
          <KnowledgeBottomSupport />
        </div>
      </Content>
    </Spin>
  );
};

export default KnowledgePages;
