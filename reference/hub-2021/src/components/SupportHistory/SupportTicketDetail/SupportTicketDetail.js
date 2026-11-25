import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Input, Modal, Row, Spin, Typography } from "antd";
import "antd/dist/antd.css";
import CommentOpenTicket from "components/CommentOpenTicket/CommentOpenTicket";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SupportHistoryDetailAction from "redux/actions/supportHistoryDetailAction";
import ArrowBackIcon from "../../../assets/icons/arrow-back.svg";
import { AUTH, ROUTER } from "../../../constants";
import {badWordsFilter} from './../../../utils/badWordsFiter';
import BadWordsAction  from "./../../../redux/actions/badWordsAction";

const { Text } = Typography;
const { TextArea  } = Input;

const SupportTicketDetail = (props) => {
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  currentUser = !!currentUser ? JSON.parse(currentUser) : {};

  let settings = localStorage.getItem(AUTH.SETTINGS);
  settings = !!settings ? JSON.parse(settings) : {};

  const isResolveRequiredComment = settings.hasOwnProperty('INCIDENT_RESOLVE_REQUIRED_COMMENT') ? settings.INCIDENT_RESOLVE_REQUIRED_COMMENT : true;
  const isReopenRequiredComment = settings.hasOwnProperty('INCIDENT_REOPEN_REQUIRED_COMMENT') ? settings.INCIDENT_REOPEN_REQUIRED_COMMENT : true;
  
  const ticketNumber = props.match.params.id;
  const isIncidentTicket = ticketNumber.substring(0, 3) === "INC";
  const { supportHistoryDetail } = props;
  const { SHDetail } = supportHistoryDetail;
  const [commentObj, setCommentObj] = useState({});
  const history = useHistory();
  const [linkBack, setLinkBack] = useState('');
  const [isVisibleModalComment, setIsVisibleModalComment] = useState(false);
  const [isModalBadWordsVisible, setIsModalBadWordsVisible] = useState(false);
  const [isBadWordsComment, setIsBadWordsComment] = useState(false);

  const {badWords, loadBadWordsSagaAction, applyBadWordsToFilter} = props

  useEffect(() => {
    if(!badWords.isAddedWordFilter) loadBadWordsSagaAction();

    window.scrollTo(0, 0);
    props.getSupportHistoryDetail(ticketNumber, currentUser, isIncidentTicket);
    
    // Handle link back
    if(!!history.location.state){
      if(!!history.location.state.path)
      {
        setLinkBack(history.location.state.path); 
      }else{
        setLinkBack(`${ROUTER.SUPPORTHISTORY}`);
      }
  
    } else {
      setLinkBack(`${ROUTER.LIST_WHATSNEW}`);
    }
  }, [props.match.params.id]);

  const onSubmitButton = (value) => {
    if (!value.length) {
      return false;
    }

    if(badWordsFilter.isBadWordsFilter(value, badWords, applyBadWordsToFilter)){
      setIsModalBadWordsVisible(true);
      return false;
    }
    setIsModalBadWordsVisible(false);
    props.submitCommentTicketDetail(ticketNumber, isIncidentTicket, currentUser, value, SHDetail);
    return true;
  }

  const onTextAreaChange = (e) => { 
    setCommentObj({
      [e.target.name]: e.target.value
    });
    if (!e.target.value) {
      setIsBadWordsComment(false);
    }
  };

  const showModalComment = (e) => {
    if (isResolveRequiredComment && isReopenRequiredComment) {
      setIsVisibleModalComment(true);
      return;
    }
    props.updateIncidentTicketDetail(SHDetail, currentUser, e.target, ticketNumber, isIncidentTicket, '');
  }

  const handleCancel = () => {
    setIsVisibleModalComment(false);
    setIsBadWordsComment(false);
    setCommentObj({});
  }

  const updateTicketRequiredComment = (e) => { 
    if (!commentObj.comments || commentObj.comments == 0) {
      return;
    }
    if(badWordsFilter.isBadWordsFilter(commentObj.comments, badWords, applyBadWordsToFilter)){
      setIsBadWordsComment(true);
      return;
    }
    setIsBadWordsComment(false);
    props.updateIncidentTicketDetail(SHDetail, currentUser, e.target, ticketNumber, isIncidentTicket, commentObj.comments);
    handleCancel();
  }

  const handleShowMsg = () => {
    Modal.warning({
      title: 'Action Not Allowed',
      content: 'In order to reopen a P1 or P2 ticket, you must contact the Service Desk directly.',
      className: 'modal-method-custom',
      closable: true
    });
  };
  

  return (
    <Spin
      spinning={supportHistoryDetail.isLoading}
      indicator={<LoadingOutlined />}
    >
      <div className="support-history-detail custom_container">
        <Row className="linkstyle">
          <Link className="go-back-pos go-back-link" to={linkBack}>
            <img src={ArrowBackIcon} />&nbsp;Go Back
          </Link>
        </Row>
        <Row>
          <Col>
            <Text
              className={`status-text status-${SHDetail.state
                ?.toLowerCase()
                .replace(/\s/g, "-")}`}
            >
              {SHDetail.state}
            </Text>
            <h4 className="title-card">{SHDetail.shortDescription}</h4>
          </Col>
        </Row>
        <Row justify="center" gutter={32} className="reset-margin inner">
          <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
            <CommentOpenTicket
              comments={SHDetail.comments}
              isDisabled={supportHistoryDetail.disabledComment}
              submit={onSubmitButton}
              currentUser={currentUser}
              isModalBadWordsVisible = {isModalBadWordsVisible}
              setIsModalBadWordsVisible = {setIsModalBadWordsVisible}
            ></CommentOpenTicket>
          </Col>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
            <div className="info-ticket">
              <Descriptions layout="vertical" colon={false} column={2}>
                <Descriptions.Item label="NUMBER">
                  {SHDetail.number}
                </Descriptions.Item>
                {SHDetail.createdDate && (
                  <Descriptions.Item label="CREATED">
                    {moment(SHDetail.createdDate).fromNow()}
                  </Descriptions.Item>
                )}
                {SHDetail.priority && (
                  <Descriptions.Item label="PRIORITY">
                    {SHDetail.priority}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label="STATE"
                  className={`item-state state-${SHDetail.originalState
                    ?.toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {SHDetail.originalState}
                </Descriptions.Item>
              </Descriptions>
              <Row justify="space-around" className="reset-margin">
                {supportHistoryDetail.buttonValue && (
                  <>
                    <Button
                      onClick={!supportHistoryDetail.disabledBtn ? showModalComment : handleShowMsg}
                      size="large"
                      block
                      shape="round"
                      className="button-default-1 mt-15"
                    >
                      {supportHistoryDetail.buttonValue}
                    </Button>
                    <Modal 
                      className="modal-basic-custom"
                      visible={isVisibleModalComment} 
                      onCancel={handleCancel}
                      footer={[
                        <Button 
                          className={`${!!commentObj.comments ? 'button-default-1' : 'btn-disabled'} btn-add-comment`}
                          onClick={updateTicketRequiredComment}
                        >
                          {supportHistoryDetail.buttonValue}
                        </Button>
                      ]}
                      maskClosable={false}
                    >
                      <p className="ttl-modal">{supportHistoryDetail.buttonValue}</p>
                      <div className="inner">
                        <h5>You need to provide a comment before {supportHistoryDetail.buttonValue === 'Mark Resolved' ? 'resolving' : 'reopening'} {SHDetail.number}</h5>
                        <p className="txt-comment">Comment</p>
                        <TextArea 
                          className={`input-comment ${isBadWordsComment ? 'input-error' : '' }`}
                          name="comments"
                          value={commentObj.comments}
                          onChange={onTextAreaChange}
                          placeholder={`Please leave a comment before ${supportHistoryDetail.buttonValue === 'Mark Resolved' ? 'resolving your issue' : 'reopening your request'}.`}
                        />
                        {isBadWordsComment && <p className="bad-words-comment">Your comment contains offensive words that are violating i-o policy</p>}
                      </div>
                    </Modal>
                  </>
                )}
              </Row>
            </div>
          </Col>
        </Row>
        {/* <Modal title="[TODO]: Wait for Design "
                visible={isModalBadWordsVisible} 
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={handleBadWordsOk} >
              <p>Your message contain the bad words please review it.</p>
        </Modal> */}
      </div>
    </Spin>
  );
};

const mapStateToProps = ({ supportHistoryDetail, badWords }) => ({
  supportHistoryDetail,
  badWords
});

const mapDispatchToProps = (dispatch) => ({
  getSupportHistoryDetail: (ticketNumber, currentUser, ticketINC) =>
    dispatch(
      SupportHistoryDetailAction.getSupportHistoryDetail(
        ticketNumber,
        currentUser,
        ticketINC
      )
    ),
  updateIncidentTicketDetail: (
    SHDetail,
    currentUser,
    target,
    ticketNumber,
    ticketINC,
    comments
  ) =>
    dispatch(
      SupportHistoryDetailAction.updateIncidentTicketDetail(
        SHDetail,
        currentUser,
        target,
        ticketNumber,
        ticketINC,
        comments
      )
    ),
  submitCommentTicketDetail: (
    ticketNumber,
    isIncidentTicket,
    currentUser,
    value,
    SHDetail
  ) =>
    dispatch(
      SupportHistoryDetailAction.submitCommentTicketDetail(
        ticketNumber,
        isIncidentTicket,
        currentUser,
        value,
        SHDetail
      )
    ),
    loadBadWordsSagaAction: () => dispatch(BadWordsAction.loadBadWordsSagaAction()),
    applyBadWordsToFilter: () => dispatch(BadWordsAction.applyBadWordsToFilter())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupportTicketDetail);
