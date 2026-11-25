import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import React from 'react';
import html from 'react-inner-html';
import { KNOWLEDGE } from '../../constants/knowledgeConstants';
import EyeIcon from "./../../assets/icons/security-eye.svg";
import LikeIcon from '../../assets/icons/like-icon.svg';
import './../../styles/scss/common.scss';
import './kbDetail.scss';
import {FileCopyOutlined} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const KBDetail = (props) => {
  const { kbDetail, usefulPercentage, children, totalView } = props;
  const ContentComp = ({ content }) => {
    return <div {...html(content)} />;
  };

  const kbType = kbDetail.type ? kbDetail.type.toUpperCase() : null;
  const isOutageArticles = kbType === KNOWLEDGE.OUTAGE;
  // const kb_type = kbType || KNOWLEDGE.KB_SUPPORT_ARTICLE;
  const kb_type = isOutageArticles ? kbType : KNOWLEDGE.KB_SUPPORT_ARTICLE;

  const onClickCopy = () => {
    var copyText = window.location.href;
    navigator.clipboard.writeText(copyText);
  }

  return (
    <div className="kb-detail wrapper-container">
      <div className="kb-title">
        {/* MWA-5409: Knowledge Article Rendering Improvements */}
        <div className="kb-header">
          <p className="kb-type">{kb_type}</p>
          <div className="kb-number">{kbDetail.number}</div>
        </div>
        <div className="title">
          <h2>
            {kbDetail.name}
            <Tooltip title="Copy to clipboard" arrow placement="top">
              <IconButton style={{ padding: 0, background: 'transparent' }} aria-label="copy" onClick={onClickCopy}>
                <FileCopyOutlined style={{ fontSize: 14, color: '#000000' }} />
              </IconButton>
            </Tooltip></h2>

        </div>

        <div className="inner">
          {/* date */}
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
            <span className="latest-update"> {kbDetail.publishedDate}</span>
          </span>

          {/* rating */}
          {!isOutageArticles && (
            <Rating name="read-only" value={+kbDetail.rating} readOnly />
          )}

          {/*View count */}
          {!isOutageArticles && totalView !== 0 && (
            <span className="viewcount">
              {" "}
              <img src={EyeIcon} alt="eye-icon" />
              <span className="kb-viewcount"> ({totalView})</span>
            </span>
          )}

          {/* useful percentage */}
          {!isOutageArticles && !!usefulPercentage && (
            <div className="kb-useful-percentage">
              <img src={LikeIcon} alt="like-icon" />
              <span>{usefulPercentage}% found this useful</span>
            </div>
          )}
        </div>
      </div>
      <div className="inner-content">
        <ContentComp content={kbDetail.content}></ContentComp>

        {children}
      </div>
    </div>
  );
};

export default KBDetail;
