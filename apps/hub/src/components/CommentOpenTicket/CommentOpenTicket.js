import { IoCard } from "@i-o/design-system-classic";
import { Col, Input, Row, Timeline } from "antd";
import IconSendPurple from "assets/icons/icon-sent-purple.svg";
import SendOutlined from "assets/icons/sent-ticket-icon.svg";
import { getAvatarName } from "common/functions/functions";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { AUTH } from "../../constants";
import DateUtils from "../../utils/date";
import "./CommentOpenTicket.scss";
import ReactHtmlParser from 'react-html-parser';

function CommentOpenTicket(props) {
  const { comments, isDisabled } = props;
  const {isModalBadWordsVisible, setIsModalBadWordsVisible} = props;

  if (!comments) return null;
  const [commentsState, setCommentsState] = useState([]);
  const [state, setState] = useState({});
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  const time_zone = !!currentUser ? JSON.parse(currentUser).time_zone : "";
  const fullName = !!currentUser ? JSON.parse(currentUser).name : "";

  useEffect(() => {
    setState({ comment: "" });
    if (comments.comments) {
      setCommentsState(comments.comments);
    }
  }, [comments]);

  async function submitComment(e) {
    const value = e.target.value || state.comment;
    //setState({comment: ""});
    //props.submit(value);
    if(value == 0){
      return null;
    }
    if (props.submit(value)){
      setState({comment: ""});
    }
        
  }

  function onInputChange(e) {
    setState({
      [e.target.name]: e.target.value,
    });

    if(!e.target.value){
      setIsModalBadWordsVisible(false);
    }
  }

  function transformAvatar(name) {
    const avatar_name = getAvatarName(name);
    return (
      <Avatar
        name={avatar_name}
        maxInitials={2}
        size={62}
        round={true}
        title={name}
      />
    );
  }

  function getUICommment(commentsState) {
    if (commentsState.length > 0) {
      return (
        <Timeline className="time-line-block" mode="left">
          {commentsState.map((item, index) => {
            return (
              <Timeline.Item
                className={
                  item.userFullName === fullName ? "full-circle" : ""
                }
                color={item.userFullName === fullName ? "#6cc24a" : "gray"}
                label={DateUtils.timetoXbyUTC(item.createdDate, time_zone)}
              >
                <h6>{item.userFullName} commented</h6>
                {ReactHtmlParser(item.comment)}
              </Timeline.Item>
            );
          })}
        </Timeline>
      );
    }

    return (
      <IoCard.EmptyCard
        contentDescription={
          <div>
            <span className="txt-desc">No Comments</span>
            <span className="sub-desc">Be the first to leave a comment.</span>
          </div>
        }
      />
    );
  }

  // function CommmentItem(item) {
  //   const { currentUser } = props;
  //   if (item) {
  //     const isCurrentUser =
  //         currentUser && currentUser.name.trim() === item.userFullName,
  //       class_name = isCurrentUser ? "current-user" : "",
  //       authorContent = !isCurrentUser ? (
  //         <div>
  //           <span className="author-name">{item.userFullName}</span>{" "}
  //           <span className="time-span">
  //             {DateUtils.timetoXbyUTC(item.createdDate, time_zone)}
  //           </span>
  //         </div>
  //       ) : (
  //         <div>
  //           <span className="time-span">
  //             {DateUtils.timetoXbyUTC(item.createdDate, time_zone)}
  //           </span>
  //           <span className="author-name">{item.userFullName}</span>
  //         </div>
  //       );

  //     return (
  //       <li className={class_name}>
  //         <Comment
  //           author={authorContent}
  //           avatar={transformAvatar(item.userFullName)}
  //           content={<p>{item.comment}</p>}
  //           datetime={item.updatedByUserTitle}
  //         />
  //       </li>
  //     );
  //   }

  //   return null;
  // }

  if (commentsState) {
    return (
      <div className="ticket-content">
        <Row className="comment-content">
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Input
                  className={`input-comment ${isDisabled ? 'input-disabled' : ''} ${isModalBadWordsVisible ? 'input-error' : '' }`}
                  name="comment"
                  type="text"
                  value={state.comment}
                  onChange={onInputChange}
                  onPressEnter={(e) => submitComment(e)}
                  placeholder="Type your message here..."
                  disabled={isDisabled}
                  suffix={
                    <img
                      src={`${state.comment ? IconSendPurple : SendOutlined}`}
                      onClick={(e) => submitComment(e)}
                    />
                  }
                />
                {isModalBadWordsVisible && <p className="bad-words-comment">Your comment contains offensive words that are violating i-o policy</p>}
              </Col>
            </Row>
            <Row>{getUICommment(commentsState)}</Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CommentOpenTicket;
