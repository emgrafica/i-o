import { LoadingOutlined } from '@ant-design/icons';
import { Col, Comment, Input, List, Pagination, Spin, Typography } from 'antd';
import PropTypes from 'prop-types';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import Avatar from "react-avatar";
import IconSendPurple from "../../../assets/icons/icon-sent-purple.svg";
import SendOutlined from "../../../assets/icons/sent-ticket-icon.svg";
import { getAvatarName } from '../../../common/function';
// import EmptyComponent from '../Empty/EmptyComponent';
import "./commentComponent.scss";
const { Text } = Typography;

const CommentComponent = (props) => {
  const [pagingState, setPagingState] = useState({
    number: props.kbNumber,
    type: 'comment_only',
    page_size: 5,
  });
  const [state, setState] = useState({});
  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    props.onLoadComment(pagingState);
  }

  async function submitComment(e) {
    const value = e.target.value || state.comment;
    const param = {
      kb_number: props.kbNumber,
      kb_user_feedback: props.userName,
      kb_comments: value
    }
    setState({
      comment: ''
    });
    props.onAddComment(param, pagingState);


  }
  function inputComment() {
    return (
      <Input className="input-comment"
        ref={props.refInput}
        name="comment" type="text"
        onPressEnter={(e) => submitComment(e)}
        suffix={<img
          src={`${state.comment ? IconSendPurple : SendOutlined}`}
          onClick={(e) => submitComment(e)} />}
        value={state.comment}
        onChange={onInputchange}
        placeholder="Add a Comment or Question" />
    );
  }
  function transformAvatar(name) {
    //return `https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=62`;
    const avatar_name = getAvatarName(name);
    return <Avatar name={avatar_name} maxInitials={2} size={40} round={true} title={name} />
  }
  function onInputchange(e) {
    setState({
      [e.target.name]: e.target.value
    });
  }

  const handlePaging = (e) => {
    props.onPageChange(e, {
      ...pagingState,
      page_index: e,
    });
  };


  return (<Spin spinning={props.isLoading} indicator={<LoadingOutlined />}>
    <Col xs={24} md={16} className='list-content col-padding-right'>
      <span className='ant-list-header'>Comments</span>
      <div className='input-container'>
        {transformAvatar(props.fullName)}
        {inputComment()}
      </div>
      {props.commentData.length !== 0 &&
        <><List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={props.commentData}
          renderItem={item => {
            return <li className="comment-list-item">
              <Comment
                author={item.updatedByUserFullName}
                avatar={transformAvatar(item.updatedByUserFullName)}
                content={item.comments}
                // datetime={strFromDays + ' ago'}
                datetime={moment.utc(item.lastUpdated).fromNow()}
              />
            </li>
          }}
        />

          <Pagination
            defaultPageSize={5}
            size="small"
            total={props.commentCount}
            showSizeChanger={false}
            onChange={handlePaging}
            current={props.pageIndex}
          />
        </>
      }
    </Col>
    {/* { !props.isLoading && props.commentData.length === 0 && <Col xs={24} md={16} className='col-padding-right'>
      <EmptyComponent
        className="empty-component"
        contentDescription={
          <>
            <Text className='txt-desc'>NO COMMENTS</Text>
            <Text className='sub-desc'> Be the first to leave a comment.</Text>
          </>
        }
      />
    </Col>
    } */}

  </Spin>)

};

CommentComponent.propTypes = {
  /**
   * KbNumber
   */
  kbNumber: PropTypes.string,
  /**
  * UserName
  */
  userName: PropTypes.string,
  /**
  * FullName
  */
  fullName: PropTypes.string,
  /**
   * refInput
   */
  refInput: PropTypes.string,

  /**
   * commentData
   */
  commentData: PropTypes.array,
  /**
   * CommentCount
   */
  commentCount: PropTypes.number,
  /**
   * PageIndex
   */
  pageIndex: PropTypes.number,
  /**
  * isLoading
  */
  isLoading: PropTypes.bool,
  /**
   * CommentCount
   */
  onLoadComment: PropTypes.func,
  /**
   * PageIndex
   */
  onPageChange: PropTypes.func,
  /**
  * isLoading
  */
  onAddComment: PropTypes.func,
};

CommentComponent.defaultProps = {
  userName: 'i-o',
  fullName: 'i-o Portal',
  commentData: [{
    comments: "new comment",
    createdDate: "2021-05-21 05:16:57",
    kbNumber: "KB0038462",
    lastUpdated: "2021-05-21 05:16:57",
    parentComment: "",
    parentFeedback: "",
    rating: "",
    uid: "68de1a3c8714fc90a3788597cebb352f",
    updatedBy: "io.devtest",
    updatedByUserEmail: "tbui25@dxc.com",
    updatedByUserFullName: "Thao Bui",
    updatedByUserName: "tbui25@dxc.com",
    updatedByUserTitle: "",
    useful: ""
  }],
  commentCount: 7,
  pageIndex: 1,
  isLoading: false,
  onLoadComment: () => { },
  onPageChange: () => { },
  onAddComment: () => { },
};

export default CommentComponent;

