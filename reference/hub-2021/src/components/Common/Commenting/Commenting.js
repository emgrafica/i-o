import { LoadingOutlined } from '@ant-design/icons';
import { Col, Input, Button, Comment, Pagination, Spin, Typography, Row } from 'antd';
import moment from "moment";
import React, { useEffect, useState, useMemo } from 'react';
import Avatar from "react-avatar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DateUtils from "../../../utils/date";
import { AUTH } from "../../../constants/authConstants";
import ReactHtmlParser from 'react-html-parser';

import IconSendPurple from "../../../assets/icons/icon-sent-purple.svg";
import SendOutlined from "../../../assets/icons/sent-ticket-icon.svg";
import { getAvatarName } from '../../../common/functions/functions';
import { IoCard } from '@i-o/design-system-classic';
import "./Commenting.scss";
import replyIco from '../../../assets/icons/reply.svg';

const { Text } = Typography;

const COMMENT_LEVEL_NO_INDENTATION = 3;

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'align',
  'list', 'bullet', 'indent',
  'link', 'image'
];
const regex = /(<([^>]+)>)/ig;

function transformAvatar(name) {
  //return `https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=62`;
  const avatar_name = getAvatarName(name);
  return <Avatar name={avatar_name} maxInitials={2} size={40} round={true} title={name} />
}

const OriginalComment = ({ children, commentData, showHideReply, submitComment, className, isModalBadWordsVisible, setIsModalBadWordsVisible, isSubmitReply, setisSubmitReply }) => {
  const [comments, setComments] = useState('');
  
  const handleChange = (value) => {
    let hasText = !!value.replace(regex, "").length;
    setComments(value);
    if (!hasText) {
      setIsModalBadWordsVisible(false);
      setisSubmitReply(false);
    }
  }

  const currentTimeZone = useMemo(() => {
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    if (currentUser) {
      const time_zone = (JSON.parse(currentUser)).time_zone;
      return time_zone;
    } else {
      return;
    }
  }, [AUTH.CURRENT_USER])

  const handleCancelClick = (uid) => {
    setComments('');
    setIsModalBadWordsVisible(false);
    setisSubmitReply(false);
    showHideReply(uid, false);
  }
  const handleSubmitReply = (comments, uid) => {
    let trimCommentsReply = comments.replace(/((<p><br><\/p>(?:(?!<p><br><p>))|(\s|\s+$)))+/gm," ");
    setisSubmitReply(true);
    submitComment(trimCommentsReply, uid);
  }
  return (
    <Comment
      actions={[<div key="comment-nested-reply">
        <div className="replyActions">
          <span onClick={() => showHideReply(commentData.uid)}><img src={replyIco} />Reply</span>
        </div>
        
        {commentData.reactQuill &&
          <div className="editor">
            <ReactQuill modules={modules} formats={formats} value={comments} onChange={handleChange} />
            {isModalBadWordsVisible && isSubmitReply && <p className="bad-words-comment">Your comment contains offensive words that are violating i-o policy</p>}
            <div className="btn-cover">
              <Button type="default" onClick={() => handleCancelClick(commentData.uid)}>Cancel</Button>
              <Button type="primary" onClick={() => handleSubmitReply(comments, commentData.uid)}>Submit</Button>
            </div>
          </div>}
      </div>]}
      author={commentData.updatedByUserFullName}
      avatar={transformAvatar(commentData.updatedByUserFullName)}
      content={ReactHtmlParser(commentData.comments)}
      // datetime={moment.utc(commentData.lastUpdated).fromNow()}
      datetime={DateUtils.timetoXbyUTC(commentData.lastUpdated, currentTimeZone)}
      className={className}
    >
      {children}
    </Comment>
  )
};
function Comments(props) {
  const { comment, showHideReply, submitComment, commentlevel, isModalBadWordsVisible, setIsModalBadWordsVisible, isSubmitReply, setisSubmitReply } = props;

  const nestedComments = (comment.children || []).map(comment => {
    return <Comments showHideReply={showHideReply} submitComment={submitComment} key={comment.uid} commentlevel={commentlevel + 1} comment={comment} type="child"
      isModalBadWordsVisible={isModalBadWordsVisible}
      setIsModalBadWordsVisible={setIsModalBadWordsVisible} 
      isSubmitReply={isSubmitReply}
      setisSubmitReply={setisSubmitReply} />
  })
  return (
    <OriginalComment commentData={comment}
      showHideReply={showHideReply}
      submitComment={submitComment}
      className={commentlevel >= COMMENT_LEVEL_NO_INDENTATION ? "comment-level-no-indentation" : ""}
      isModalBadWordsVisible={isModalBadWordsVisible}
      setIsModalBadWordsVisible={setIsModalBadWordsVisible}
      isSubmitReply={isSubmitReply}
      setisSubmitReply={setisSubmitReply}
    >
      {nestedComments} 
    </OriginalComment>
  )
}
function Commenting(props) {
  const { isModalBadWordsVisible, setIsModalBadWordsVisible } = props;
  const [pagingState, setPagingState] = useState({
    number: props.kbNumber,
    type: 'comment_only',
    page_size: 5,
  });
  const [state, setState] = useState({});
  const [commentDataState, setCommentDataState] = useState([]);
  const [comments, setComments] = useState('');
  const [richTextEditor, setRichTextEditor] = useState(false);
  const [isSubmitComment, setisSubmitComment] = useState(false);
  const [isSubmitReply, setisSubmitReply] = useState(false);

  const handleChange = (value) => {
    let hasText = !!value.replace(regex, "").length;
    setComments(value);
    if (!hasText) {
      setIsModalBadWordsVisible(false);
      setisSubmitComment(false);
    }
  }


  const showHideReply = (uid, isShow = true) => {
    const newCommentDate = showHideReplyChild(commentDataState, uid, isShow);
    setIsModalBadWordsVisible(false);
    setisSubmitComment(false);
    setisSubmitReply(false);
    setCommentDataState(newCommentDate);
  };

  const showHideReplyChild = (commentDataState, uid, isShow = true) => {
    const newCommentDate = commentDataState.map((item) => {
      if (item?.children && item.children.length > 0) {
        item.children = showHideReplyChild(item.children, uid, isShow);
      }
      item.uid === uid ? item.reactQuill = isShow && !item.reactQuill : item.reactQuill = false;
      return item;
    });
    return newCommentDate;
  };

  useEffect(() => {
    getAllComments();
    setCommentDataState(props.commentData);
  }, [props.commentCount,props.pageIndex, props.commentData.length,props.commentData, props.kbNumber]);


  function getAllComments() {
    props.onLoadComment(pagingState);
  }

  async function submitComment(comments, uid = '') {
    // const value = uid ? e : (e.target.value || state.comment);
    const param = {
      kb_number: props.kbNumber,
      kb_user_feedback: props.userName,
      kb_comments: comments,
      kb_parent: uid,
    }
    if (props.onAddComment(param, pagingState)) {
      setComments('');
      setisSubmitComment(false);
      setisSubmitReply(false);
      setRichTextEditor(false);
    }
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

  function onInputchange(e) {
    setState({
      [e.target.name]: e.target.value
    });
  }

  const handleSubmitComment = (comments) => {
    let trimComments = comments.replace(/((<p><br><\/p>(?:(?!<p><br><p>))|(\s|\s+$)))+/gm," ");
    setisSubmitComment(true);
    submitComment(trimComments);
  }

  const handlePaging = (e) => {
    props.onPageChange(e, {
      ...pagingState,
      page_index: e,
    });
  };

  const handleInputCommentClick = () => {
    setRichTextEditor(true);
  }

  const cancleComment = () => {
    setComments('');
    setRichTextEditor(false);
    setisSubmitComment(false);
  }

  return (
    <Spin spinning={props.isLoading} indicator={<LoadingOutlined />} id = "ant-list-header-comments">
      <Col xs={24} md={16} className='list-content col-padding-right'>
        <span className='ant-list-header'>Comments</span>
        <div className='input-container'>
          {transformAvatar(props.fullName)}
          {/* {inputComment()} */}
          <div className="input-comment">
            {
              !richTextEditor && <a className="input-comment-link" onClick={handleInputCommentClick}>Click here to add a comment or question...</a>
            }
            { 
              richTextEditor && <>
                <ReactQuill modules={modules} formats={formats} value={comments} onChange={handleChange} />        
                {isModalBadWordsVisible && isSubmitComment && <p className="bad-words-comment">Your comment contains offensive words that are violating i-o policy</p>}
                <div className="btn-cover">
                  <Button type="default" onClick={cancleComment}>Cancel</Button>
                  <Button type="primary" onClick={() => handleSubmitComment(comments)}>Submit</Button>
                </div>
              </>
            }
          </div>

        </div>
        {commentDataState.length !== 0 &&
          <>
            {
              commentDataState.map((comment) => {
                return (
                  <Comments
                    showHideReply={showHideReply} submitComment={submitComment}
                    commentlevel={1} key={comment.uid} comment={comment}
                    isModalBadWordsVisible={isModalBadWordsVisible}
                    setIsModalBadWordsVisible={setIsModalBadWordsVisible}
                    isSubmitReply={isSubmitReply}
                    setisSubmitReply={setisSubmitReply} 
                    />
                )
              })
            }



            {/* <Pagination
              defaultPageSize={5}
              size="small"
              total={props.commentCount}
              showSizeChanger={false}
              onChange={handlePaging}
              current={props.pageIndex}
            /> */}
          </>
        }
      </Col>
      {props.isDisplayShowMore && <Col xs={24} md={16} className='list-content '>
        <Row className="comment-content">
          <div className="show-more-comments"
            onClick={() => props.onPageChange(pagingState)}>
            {props.isDisplayShowMore ? 'Show more comments' : ''}
          </div>
        </Row>
      </Col>}

      {
        !props.isLoading && props.commentData.length === 0 && <Col xs={24} md={16} className='col-padding-right'>
          <IoCard.EmptyCard
            contentDescription={
              <>
                <Text className='txt-desc'>NO COMMENTS</Text>
                <Text className='sub-desc'> Be the first to leave a comment.</Text>
              </>
            }
          />
        </Col>
      }

      <Col xs={24} md={16} className='list-content col-padding-right'>
      </Col>
    </Spin>)
}

export default Commenting
