import { LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Rate, Row, Spin } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import html from "react-inner-html";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "../../../assets/icons/arrow-back.svg";
import { AUTH, KNOWLEDGE, ROUTER } from "../../../constants";
import { LINKLIRARYCONSTANTS } from "../../../constants/linkLibraryConstants";
//Link Library
import { SESSIONSTORAGEKEYS } from "../../../constants/storageConstants";
import DateUtils from "../../../utils/date";
import { LinkLibraryUtils } from "../../../utils/linkLibrary";
import AttachmentComponent from "../../Common/Attachments/Attachment.component";
import Commenting from "../../Common/Commenting/Commenting";
import Rating from "../../Common/Rating/Rating";
import ChatWithAgent from "./ChatWithAgent/ChatWithAgent";
import KnowledgeDetailAction from './../../../redux/actions/knowledgeDetailAction';
import {
  FEEDBACK_TYPE
} from "../../../common/constant";
import "./KnowledgeDetail.scss";
import MostViewedArticles from './MostViewedArticles/MostViewedArticles';
import { badWordsFilter } from './../../../utils/badWordsFiter';
import BadWordsAction from "./../../../redux/actions/badWordsAction";


const { Content } = Layout;

function ContentComp({ content }) {
  return <div {...html(content)} />;
}


// const scrollToEle = (hash)=>{
//   if (hash === '') {
//     window.scrollTo(0, 0);
//   }
//   else {
//     setTimeout(() => {
//       const id = hash.replace('#', '');
//       let element = document.getElementById(id);
//       if (!!element) {
//         element.scrollIntoView({behavior: "smooth", block: "start"});
//         return;
//       }
//       element = document.getElementsByName(id);
//       if (element.length>0) {
//         element[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
//       } else {
//         window.scrollTo(0, 0);
//       }
//     }, 0);
//   }
// };

const propTypes = {};

const KnowledgeDetail = (props) => {
  const [isModalBadWordsVisible, setIsModalBadWordsVisible] = useState(false);

  const { badWords, loadBadWordsSagaAction, applyBadWordsToFilter } = props

  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  if (!currentUser) return <></>;
  currentUser = JSON.parse(currentUser);
  const kbNumber = props.match.params.id;
  const userName = currentUser ? currentUser.user_name : props.user.user_name;
  const history = useHistory();
  const commentInput = useRef(null);
  const copyCurrentLinkToClipboard = () => {
    var dummy = document.createElement("input"),
      text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  const handleFocusOnComment = () => {
    if (commentInput.current) {
      commentInput.current.focus()
    }
  }
  const { knowledgeDetail } = props;
  const { kbDetail, mostViewedArt, currentCommentPageIndex } = knowledgeDetail;

  //Url for Chat With Agent
  let chatWithAgentUrl = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL, LINKLIRARYCONSTANTS.SEARCH_RESULT, 2)
  const kbType = kbDetail.kbType ? kbDetail.kbType.toUpperCase() : null;
  const isOutageArticles = kbType === KNOWLEDGE.OUTAGE;
  const kb_type = kbType || KNOWLEDGE.KB_SUPPORT_ARTICLE;

  const [linkBack, setLinkBack] = useState('');

  const paramFeedback = {
    number: kbNumber,
    for_user_name: userName,
    user_name: userName,
    page_size: 1,
    page_index: 1
  };

  const  commentingFeedback = {
    number: kbNumber,
    type: 'comment_only',
    page_size: 5,
    page_index: 1
  };



  useEffect(() => {
    if (!badWords.isAddedWordFilter) loadBadWordsSagaAction();

    window.scrollTo(0, 0);
    if (knowledgeDetail.isEmpty) {
      history.push("/404");
    }
    if (kbNumber !== knowledgeDetail.kbNumber) {
      props.fetchKnowledgeDetailByKBNumber(kbNumber, userName);
      props.fetchLatestFeedbacksByKBNumber(paramFeedback);
      props.fetchKnowledgeDetailUserFeedback(commentingFeedback);
    }else{
      // scrollToEle(props.hashTag);
      props.fetchLatestFeedbacksByKBNumber(paramFeedback);
    }

    // handle link back
    if (!!history.location.state) {
      if (!!history.location.state.uid) {
        setLinkBack(`${ROUTER.MY_DEVICES}?uid=${history.location.state.uid}`);
      }
      if (!!history.location.state.path) {
        setLinkBack(history.location.state.path);
      }
    }

  }, [props.match.params.id, knowledgeDetail.isEmpty]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  const getLatestUseful = () => {
    if (!knowledgeDetail.latestUsefulComment && knowledgeDetail.latestUsefulOnly) {
      return knowledgeDetail.latestUsefulOnly.useful;
    }
    if (!knowledgeDetail.latestUsefulOnly && knowledgeDetail.latestUsefulComment) {
      return knowledgeDetail.latestUsefulComment.useful;
    }
    if (knowledgeDetail.latestUsefulComment && knowledgeDetail.latestUsefulOnly && knowledgeDetail.latestUsefulComment.useful && knowledgeDetail.latestUsefulOnly.useful) {
      if (moment(knowledgeDetail.latestUsefulComment.lastUpdated) > moment(knowledgeDetail.latestUsefulOnly.lastUpdated)) {
        return knowledgeDetail.latestUsefulComment.useful;
      } else {
        return knowledgeDetail.latestUsefulOnly.useful;
      }
    }
  }

  const handleViewDetailClick = (kbNumber) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`
    });
  };

  return (
    <Spin spinning={knowledgeDetail.isLoading || knowledgeDetail.isRatingLoading} indicator={<LoadingOutlined />}>
      <Content className="kb-detail custom_container">
        <Row className="linkstyle">
          {!!history.location.state?.path || !!history.location.state?.uid ?
            <Link className="go-back-pos go-back-link" to={linkBack} >
              <img src={ArrowBackIcon} />&nbsp;Go Back
            </Link> :
            <Button
              className="go-back-pos go-back-link"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={ArrowBackIcon} />&nbsp;Go Back
            </Button>
          }
        </Row>
        <div className="kb-cotainer">
          <Row className="main-kbContent"  >
            <Col md={16} sm={24} xs={24} className="col-padding-right left-main-kbContent">
              <Row>
                <div className="task">{kb_type}</div>
              </Row>
              <Row>
                <h3 className="title">{kbDetail.kbName}</h3>
              </Row>
              <Row className="rating">
                <span className="control">
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="kb-rating-icon"
                  >
                    <path
                      d="M10.7617 9.25V13.0117H7V9.25H10.7617ZM9.98828 0.988281H11.5V2.5H12.2383C12.6602 2.5 13.0117 2.65234 13.293 2.95703C13.5977 3.23828 13.75 3.58984 13.75 4.01172V14.4883C13.75 14.9102 13.5977 15.2734 13.293 15.5781C13.0117 15.8594 12.6602 16 12.2383 16H1.76172C1.33984 16 0.976562 15.8594 0.671875 15.5781C0.390625 15.2734 0.25 14.9102 0.25 14.4883V4.01172C0.25 3.58984 0.390625 3.23828 0.671875 2.95703C0.976562 2.65234 1.33984 2.5 1.76172 2.5H2.5V0.988281H4.01172V2.5H9.98828V0.988281ZM12.2383 14.4883V6.26172H1.76172V14.4883H12.2383Z"
                      fill="#737373"
                    />
                  </svg>
                  <span className="latest-update .content">
                    {" "}
                    {kbDetail.fromDays} ago{" "}
                  </span>
                </span>
                {!isOutageArticles && <span className="control">
                  <Rate
                    allowClear="false"
                    count="5"
                    value={kbDetail.kbRating}
                    disabled
                  ></Rate>{" "}
                </span>}

              </Row>
              <Row className="rating">
                {!isOutageArticles && <span className="control rating-hyperlink display-none">
                  {/* <a onClick={handleFocusOnComment}>Write a review</a> */}
                  <a href="#ant-list-header-comments">Write a review</a>
                </span>}
              </Row>
              <Row className="padding5 content-kb-cotainer">
                <ContentComp content={kbDetail.kbContent}></ContentComp>
              </Row>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <ChatWithAgent classStyle="chatBox" url={chatWithAgentUrl} />

              <AttachmentComponent
                attachments={kbDetail.noEmbedAttachments}
              ></AttachmentComponent>{" "}

              {mostViewedArt && mostViewedArt.length > 0 &&
                <MostViewedArticles
                  mostViewedArt={mostViewedArt}
                  onClickDetail={handleViewDetailClick}
                />}

            </Col>
          </Row>
          {!isOutageArticles && !knowledgeDetail.isLoading && <Row className="rating-content">
            <Rating
              kbNumber={kbNumber}
              userName={userName}
              kbRating={knowledgeDetail.latestRatingOnly}
              kbUseful={getLatestUseful()}
              isLoading={knowledgeDetail.isRatingLoading}
              sendFeedback={(rateState, feedbackType) => {
                props.knowledgeDetailProvideFeedback(rateState, kbNumber, userName, feedbackType)
              }}
            ></Rating>
          </Row>}
          {!isOutageArticles && !knowledgeDetail.isLoading && <Row >
            <Commenting
              kbNumber={kbNumber}
              userName={userName}
              refInput={commentInput}
              fullName={currentUser.name}
              commentData={knowledgeDetail.comments}
              commentCount={knowledgeDetail.commentTotalCount}
              pageIndex={knowledgeDetail.currentCommentPageIndex}
              isLoading={knowledgeDetail.isCommentLoading}
              isModalBadWordsVisible = {isModalBadWordsVisible}
              setIsModalBadWordsVisible = {setIsModalBadWordsVisible}
              onLoadComment={(params) => {
                if (kbNumber !== knowledgeDetail.kbNumber) props.fetchKnowledgeDetailUserFeedback(params);
              }}
              onPageChange={(params) => {
                const newParams = { ...params, page_index: currentCommentPageIndex + 1 };
                props.fetchKnowledgeDetailUserFeedback(newParams);
              }}
              onAddComment={(params, pageState) => {
                if (!params.kb_comments.length) {
                  return false;
                }

                if (badWordsFilter.isBadWordsFilter(params.kb_comments, badWords, applyBadWordsToFilter)) {
                  setIsModalBadWordsVisible(true);
                  return false;
                }
                setIsModalBadWordsVisible(false);
                props.knowledgeDetailProvideFeedback(params, kbNumber, userName, FEEDBACK_TYPE.COMMENT, pageState);
                return true;
              }}
              isDisplayShowMore={knowledgeDetail.commentTotalCount > currentCommentPageIndex * 5
                && knowledgeDetail.commentTotalCount > 5 ? true : false}
            />
          </Row>}
        </div>
      </Content>
    </Spin>
  );
};

KnowledgeDetail.propTypes = propTypes;

const mapStateToProps = ({ knowledgeDetail, badWords }) => ({
  knowledgeDetail,
  badWords
});

const mapDispatchToProps = (dispatch) => ({
  fetchKnowledgeDetailByKBNumber: (kbNumber, userName) => dispatch(KnowledgeDetailAction.fetchKnowledgeDetailByKBNumber(kbNumber, userName)),
  fetchKnowledgeDetailUserFeedback: (params) => dispatch(KnowledgeDetailAction.fetchKnowledgeDetailUserFeedback(params)),
  setCurrentCommentPageIndex: (pageIndex) => dispatch(KnowledgeDetailAction.setCurrentCommentPageIndex(pageIndex)),
  knowledgeDetailProvideFeedback:
    (rateState, kbNumber, userName, feedbackType = FEEDBACK_TYPE.RATING, pageState = {}) =>
      dispatch(KnowledgeDetailAction.knowledgeDetailProvideFeedback(rateState, kbNumber, userName, feedbackType, pageState)),
  fetchLatestFeedbacksByKBNumber: (params) => dispatch(KnowledgeDetailAction.fetchLatestFeedbacksByKBNumber(params)),
  loadBadWordsSagaAction: () => dispatch(BadWordsAction.loadBadWordsSagaAction()),
  applyBadWordsToFilter: () => dispatch(BadWordsAction.applyBadWordsToFilter())
});
export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeDetail);

