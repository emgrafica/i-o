import { LoadingOutlined } from "@ant-design/icons";
import { IoCard } from '@i-o/design-system-classic';
import { Col, Row, Spin } from "antd";
import "antd/dist/antd.css";
import { ROUTER } from "constants/routerConstants";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./TopKnowledgeArticle.scss";

const TopKnowledgeArticle = (props) => {
  const history = useHistory();
  const onArticleCardClick = (e, data) => {
    history.push({
      pathname: `/knowledges/detail/${data.kbNumber}`,
      state: {
        path: history.location.pathname
      }
    });
  };
  let content;
  if (props.data && props.data.length > 0) {
    const dataArticle = props.data;
    let topArticle = [];
    if (dataArticle.length > 3) {
      for (let index = 0; index < 3; index++) {
        topArticle.push(dataArticle[index]);
      }
    } else {
      topArticle = dataArticle;
    }
    content = (
      <Row>
        {topArticle.length > 0 &&
          topArticle.map((item, index) => {
            return (
              <Col xs={24} sm={12} lg={8} key={index} className="custom-ant-col-sm-8">
                {/* <Article data={item} key={index} path={history.location.pathname}></Article> */}
                <IoCard.ArticleCard
                  key={index}
                  cardType='ARTICLE'
                  cardTitle={item.kbName}
                  cardDesc=''
                  kbNumber={item.kbNumber}
                  cardTitleMaxRox= {4}
                  onClick={onArticleCardClick}
                />
              </Col>
            );
          })}
      </Row>
    );
  } else {
    return null;
  }

  const handleClickSearch = () => {
    history.push({
      pathname: ROUTER.SEARCH,
      search: `?paging=${1}`, // query string
      state: {
        path: history.location.pathname
      }
    });
  };

  return (
    <div className="top-article-ticket">
      <h4 className="title-section title-link" onClick={handleClickSearch}>
        Top Knowledge Articles
      </h4>
      <Spin spinning={props.loading} indicator={<LoadingOutlined />}>
        {content}
      </Spin>
    </div>
  );
};

export default TopKnowledgeArticle;
