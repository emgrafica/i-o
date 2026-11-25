import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from "@material-ui/core";
import DateUtils from "../../utils/date";

import "./comments.scss";
import Box from "@material-ui/core/Box";
import LikeIcon from "../../assets/icons/like-icon.svg";
import LikesIcon from "../../assets/icons/likes-icon.svg";
import Avatar from "@material-ui/core/Avatar";
import NavigationIcon from "@material-ui/icons/Navigation";
import ReplyIcon from "@material-ui/icons/Reply";
import EditComment from './editComment/editComment';

const COMMENT_LEVEL_NO_INDENTATION = 3;

const Comment = (props) => {
  const { children, comment, currentTimeZone, className, avatarUser, onDeleteComment, currentUserId, submitEditComment } = props;
  const [inputVal, setInputVal] = useState("");
  const [likeComment, setLikeComment] = useState(!!comment.liked);
  const [hasEditComment, setHasEditComment] = useState(false);

  const handleChange = (event) => {
    if (event.target.value) {
      setInputVal(event.target.value);
    } else setInputVal("");
  };
  const showHideReply = (uid) => {
    setInputVal("");
    props.showHideReply(uid);
  };
  const submitComment = (commentVal, uid) => {    
    if(commentVal.trim() !== ''){
      setInputVal("");   
      props.submitComment(commentVal, uid);
    }   
  };
  const handleOnKeyPress = (e, commentVal, uid = "") => {
    if (e.key === "Enter") {      
      e.preventDefault();
      if( commentVal.trim() !== ''){       
        setInputVal("");
        props.submitComment(commentVal, uid);    
      }  
    }
  };
  const handleChangeLike = (likeComment, comment) => {
    setLikeComment(!likeComment);
    props.handleChangeLike(!likeComment, comment);
  };

  const onEditComment = () => {
    setHasEditComment(true);
  }
  const onSubmitEditComment = (commentVal, uid) => {
    submitEditComment(commentVal, uid);
    setHasEditComment(false);
  }
  return (
    <Box className={`comment ${className}`}>
      <Grid container wrap="nowrap" className="comment-inner">
        <Grid item>
          <Box className="avatar-input" pr={2}>
            <Avatar
              src={
                !!avatarUser.avatar && avatarUser?.user === comment?.user?.uid
                  ? avatarUser.avatar
                  : "/broken-image.jpg"
              }
            />
          </Box>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Box className="cmt-content">
            <h6 className="heading6 cmt-author-name">{comment?.user?.name}</h6>
            {currentUserId === comment?.user?.uid && !hasEditComment && (
              <Box className="comment-action">
                <Button
                  className="buttonLink"
                  onClick={() => onEditComment(comment.uid)}
                >
                  Edit
                </Button>
                <Button
                  className="buttonLink"
                  onClick={() => onDeleteComment(comment.uid)}
                >
                  Delete
                </Button>
              </Box>
            )}
            <Box className="comment-date">
              <p className="captionRegular cmt-author-time">
                {DateUtils.timetoXbyUTC(comment?.createdDate, currentTimeZone)}
              </p>
              {!hasEditComment &&
                !!comment?.updatedDate &&
                comment?.createdDate !== comment?.updatedDate && (
                  <Tooltip
                    title={`Edited ${DateUtils.timetoXbyUTC(
                      comment?.updatedDate,
                      currentTimeZone
                    )}`}
                    arrow
                  >
                    <p className="captionRegular cmt-author-time edited-comment">
                      Edited
                    </p>
                  </Tooltip>
                )}
            </Box>
            {!!hasEditComment ? (
              <EditComment
                comment={comment}
                handleCancelEdit={() => setHasEditComment(false)}
                submitEditComment={onSubmitEditComment}
              />
            ) : (
              <Box className="cmt-content-detail bodyRegular">
                {ReactHtmlParser(comment?.comments)}
              </Box>
            )}
          </Box>
          <Grid container alignItems="center" className="cmt-buttons">
            <Grid item xs>
              <Button
                className={`buttonLink ${!!likeComment ? "like-comment" : ""}`}
                onClick={() => handleChangeLike(likeComment, comment)}
              >
                <img src={LikeIcon} alt="Like" />
                <span>Like</span>
              </Button>
              <Button
                className="buttonLink buttonReply"
                onClick={() => showHideReply(comment?.uid)}
              >
                <ReplyIcon />
                <span>Reply</span>
              </Button>
            </Grid>
            <Grid item>
              <Box className="num-likes">
                <span className="captionRegular">
                  {comment.likeCount} Like{comment.likeCount > 1 ? "s" : ""}
                </span>
                <img src={LikesIcon} alt="3 Likes" />
              </Box>
            </Grid>
          </Grid>
          {comment.reactQuill && (
            <Box py={2}>
              <Paper component="form" className="cmt-form">
                <InputBase
                  className="input"
                  placeholder="Add a comment"
                  inputProps={{ "aria-label": "Add a comment" }}
                  value={inputVal}
                  onKeyPress={(e) => handleOnKeyPress(e, inputVal, comment.uid)}
                  onChange={(event) => handleChange(event)}
                />
                <IconButton
                  className={`submit-btn ${
                    inputVal ? "submit-active-btn" : ""
                  }`}
                  type="button"
                  aria-label="search"
                  onClick={() => submitComment(inputVal, comment.uid)}
                >
                  <NavigationIcon />
                </IconButton>
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
      {children.length > 0 && <Box className="comment-nested">{children}</Box>}
    </Box>
  );
};

const OriginalComment = (props) => {
  const {
    children,
    comment,
    currentTimeZone,
    submitComment,
    showHideReply,
    className,
    handleChangeLike,
    avatarUser,
    currentUserId,
    onDeleteComment,
    submitEditComment,
  } = props;

  return (
    <Comment
      comment={comment}
      currentTimeZone={currentTimeZone}
      submitComment={submitComment}
      showHideReply={showHideReply}
      className={className}
      handleChangeLike={handleChangeLike}
      avatarUser={avatarUser}
      currentUserId={currentUserId}
      onDeleteComment={onDeleteComment}
      submitEditComment={submitEditComment}
    >
      {children}
    </Comment>
  );
};

function CommentNested(props) {
  const {
    comment,
    currentTimeZone,
    submitComment,
    showHideReply,
    commentlevel,
    handleChangeLike,
    avatarUser,
    currentUserId,
    onDeleteComment,
    submitEditComment,
  } = props;

  const nestedComments = (comment.children || []).map((comment) => {
    return (
      <CommentNested
        key={comment.uid}
        comment={comment}
        currentTimeZone={currentTimeZone}
        submitComment={submitComment}
        showHideReply={showHideReply}
        commentlevel={commentlevel + 1}
        handleChangeLike={handleChangeLike}
        avatarUser={avatarUser}
        currentUserId={currentUserId}
        onDeleteComment={onDeleteComment}
        submitEditComment={submitEditComment}
      />
    );
  });

  return (
    <OriginalComment
      comment={comment}
      currentTimeZone={currentTimeZone}
      submitComment={submitComment}
      showHideReply={showHideReply}
      className={
        commentlevel >= COMMENT_LEVEL_NO_INDENTATION
          ? "comment-level-no-indentation"
          : ""
      }
      handleChangeLike={handleChangeLike}
      avatarUser={avatarUser}
      currentUserId={currentUserId}
      onDeleteComment={onDeleteComment}
      submitEditComment={submitEditComment}
    >
      {nestedComments}
    </OriginalComment>
  );
}

const Comments = (props) => {
  const {
    commentsData,
    currentTimeZone,
    totalCountPages,
    currentPage,
    lastComment,
    avatarUser,
    currentUserId,
    onDeleteComment,
    submitEditComment,
  } = props;
  const [commentDataState, setCommentDataState] = useState([]);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setCommentDataState(commentsData);
  }, [commentsData]);

  const handleChange = (event) => {
    if (event.target.value) {
      setInputVal(event.target.value);
    } else setInputVal("");
  };

  // let latestCmt = getLatestComment(commentsData);

  function submitComment(commentVal, uid = "") {
    if(commentVal.trim() !== ''){
      setInputVal("");  
      props.submitComment(commentVal, uid);  
    }    
  }

  const handleOnKeyPress = (e, commentVal, uid = "") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if(commentVal.trim() !== ''){
        setInputVal("");
        props.submitComment(commentVal, uid);
      }
    }
  };

  const showHideReply = (uid, isShow = true) => {
    const newCommentDate = showHideReplyChild(commentDataState, uid, isShow);
    setCommentDataState(newCommentDate);
  };

  const showHideReplyChild = (commentDataState, uid, isShow = true) => {
    const newCommentDate = commentDataState.map((item) => {
      if (item.children && item.children.length > 0) {
        item.children = showHideReplyChild(item.children, uid, isShow);
      }
      item.uid === uid
        ? (item.reactQuill = isShow && !item.reactQuill)
        : (item.reactQuill = false);
      return item;
    });
    return newCommentDate;
  };

  const handleChangeLike = (val1, val2) => {
    props.handleChangeLike(val1, val2);
  };

  return (
    <Box className="comments-wrap">
      <h4 className="heading4">Leave a Comment</h4>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Box className="avatar-input" pr={2}>
            <Avatar
              src={
                !!avatarUser.avatar ? avatarUser.avatar : "/broken-image.jpg"
              }
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Paper component="form" className="cmt-form">
            <InputBase
              className="input"
              placeholder="Add a comment"
              inputProps={{ "aria-label": "Add a comment" }}
              value={inputVal}
              onKeyPress={(e) => handleOnKeyPress(e, inputVal, "")}
              onChange={(event) => handleChange(event)}
            />
            <IconButton
              className={`submit-btn ${inputVal ? "submit-active-btn" : ""}`}
              type="button"
              aria-label="search"
              onClick={() => submitComment(inputVal, "")}
            >
              <NavigationIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      {commentsData.length > 0 && (
        <Box pt={4} pb={2}>
          <p className="bodyRegular">
            <span className="bodyBold">Comments</span> (Latest comment{" "}
            {DateUtils.timetoXbyUTC(lastComment?.createdDate, currentTimeZone)}{" "}
            by {lastComment?.user?.name})
          </p>
        </Box>
      )}
      <Box paddingBottom={3}>
        {commentsData &&
          commentsData.length > 0 &&
          commentsData.map((comment) => {
            return (
              <CommentNested
                commentlevel={1}
                key={comment.uid}
                comment={comment}
                currentTimeZone={currentTimeZone}
                submitComment={submitComment}
                showHideReply={showHideReply}
                handleChangeLike={handleChangeLike}
                avatarUser={avatarUser}
                currentUserId={currentUserId}
                onDeleteComment={onDeleteComment}
                submitEditComment={submitEditComment}
              />
            );
          })}
      </Box>
      {commentsData.length > 0 &&
        totalCountPages > currentPage * 5 &&
        totalCountPages > 5 && (
          <Box textAlign="center" paddingBottom={3}>
            <span
              className="buttonLink showMoreLink"
              onClick={props.handleChangePage}
            >
              Show more comments
            </span>
          </Box>
        )}
    </Box>
  );
};

Comments.propTypes = {
  currentTimeZone: PropTypes.string,
  commentsData: PropTypes.array,
  currentPage: PropTypes.number,
  lastComment: PropTypes.object,
  totalCountPages: PropTypes.number,
  handleChangeLike: PropTypes.func,
  submitComment: PropTypes.func,
  handleChangePage: PropTypes.func,
  avatarUser: PropTypes.object,
  currentUserId: PropTypes.string,
  onDeleteComment: PropTypes.func,
  submitEditComment: PropTypes.func,
};

Comments.defaultProps = {
  currentTimeZone: "Asia/Saigon",
  commentsData: [
    {
      children: [],
      uid: "0f214f6f879a7c5020ae0e1acebb35b9",
      parentComment: "021147e38796bc50ca3cff7acebb35a3",
      comments: "Level 4 comment by Trinh 6/9/2021 - 1:55pm",
      attachments: [],
      createdDate: "2021-09-06 06:55:54",
      updatedDate: "2021-10-25 06:44:45",
      user: {
        uid: "29e2eeaddbce4384e7e3719dae961980",
        initials: "XT",
        name: "Xuan Tran",
        avatar: "",
      },
      likeCount: 3,
      liked: {
        uid: "cee1b36b8716bc505f478597cebb3588",
      },
    },
  ],
  totalCountPages: 6,
  currentPage: 1,
  lastComment: {
    uid: "0f214f6f879a7c5020ae0e1acebb35b9",
    parentComment: "021147e38796bc50ca3cff7acebb35a3",
    comments: "Level 4 comment by Trinh 6/9/2021 - 1:55pm",
    attachments: [],
    createdDate: "2021-09-06 06:55:54",
    user: {
      uid: "29e2eeaddbce4384e7e3719dae961980",
      initials: "XT",
      name: "Xuan Tran",
      avatar: "",
    },
  },
  avatarUser: {},
  currentUserId: "29e2eeaddbce4384e7e3719dae961980",
  submitComment: () => {},
  handleChangeLike: () => {},
  handleChangePage: () => {},
  onDeleteComment: () => {},
  submitEditComment: () => {},
};

export default Comments;
