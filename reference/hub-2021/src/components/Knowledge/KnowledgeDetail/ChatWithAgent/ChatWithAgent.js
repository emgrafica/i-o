import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css';
import { Button, Col, Row } from 'antd';
import "./index.scss"
import { LinkLibraryUtils } from '../../../../utils/linkLibrary';
import { SESSIONSTORAGEKEYS } from '../../../../constants/storageConstants';
import { LINKLIRARYCONSTANTS } from '../../../../constants/linkLibraryConstants';
import "./index.scss";
import chatIcon from '../../../../assets/icons/chat-icon.svg';

const propTypes = {
    className: PropTypes.string,
    onClickToChat: PropTypes.func
}

const defaultProps = {
    onClickToChat: () => {},
};

function ChatWithAgent(props) {
    const {classStyle, url} = props;
    let chatWithAgentUrl = LinkLibraryUtils.GetLinkByOrderNumber(SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL, LINKLIRARYCONSTANTS.SEARCH_RESULT, 2)
    return (
        <div className={classStyle}>
            <div className="chat-box">
                <div className="chat-content">
                    <Row className="chat-content-title">
                        <h6>Need Assistance?</h6>
                    </Row>
                    <Row className="chat-content-body">
                        <a href={chatWithAgentUrl} target="_new">
                            <Button onClick={()=>{props.onClickToChat}} type="primary" shape="round" icon={<img src={chatIcon} />} size="large" className="btn-chat button-default-1">Chat with an agent</Button>
                        </a>
                    </Row>
                </div>
               
            </div>
            
        </div>
    )
}

ChatWithAgent.propTypes = propTypes;
ChatWithAgent.defaultProps = defaultProps;

export default ChatWithAgent;
