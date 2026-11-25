import {
  useAppInsightsContext,
  useTrackEvent
} from "@microsoft/applicationinsights-react-js";
import { Layout, Row, Col } from "antd";
import { IoCard } from '@i-o/design-system-classic';
import React from "react";
import chatLargeIcon from "../../assets/icons/chat-large-icon.svg";
import OpenLinkIcon from "../../assets/icons/open-link-icon.svg";
import toolIcon from "../../assets/icons/tool-icon.svg";
import { LINKLIRARYCONSTANTS } from "../../constants/linkLibraryConstants";
//Link Library
import { SESSIONSTORAGEKEYS } from "../../constants/storageConstants";
import { LinkLibraryUtils } from "../../utils/linkLibrary";
// import "./KnowledgeBottomSupport.scss";

const { Content } = Layout;

const KnowledgeBottomSupport = (props) => {
  //Url for Chat With Agent
  let requestFormUrl = LinkLibraryUtils.GetLinkByOrderNumber(
    SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL,
    LINKLIRARYCONSTANTS.SEARCH_RESULT,
    1
  );
  let chatWithAgentUrl = LinkLibraryUtils.GetLinkByOrderNumber(
    SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL,
    LINKLIRARYCONSTANTS.SEARCH_RESULT,
    2
  );

  const appInsights = useAppInsightsContext();
  const trackChatWithAgent = useTrackEvent(appInsights, "Chat With Agent");
  const handleClick = () => {
    trackChatWithAgent({ time: new Date().toLocaleString() });
  };
  return (
    <Content>
      <Row className="row-style">
        {/* <Col md={12} sm={24} xs={24} className="row-col-style">
          <img src={toolIcon} />
          <h4>Browse request forms</h4>
          <span className="description-knowledge-bottom">
            Find the request form you need to submit your own request in IT
            Connect.
          </span>
          <div>
            <a href={requestFormUrl} target="_new">
              <Button className="btn-request" size="large">
                Browse request forms
                <img src={OpenLinkIcon} />
              </Button>
            </a>
          </div>
        </Col>
        <Col md={12} sm={24} xs={24} className="row-col-style">
          <img src={chatLargeIcon} />
          <h4>Chat with an agent</h4>
          <span className="description-knowledge-bottom">
            Talk to one of our specialists to get the help you need.
          </span>
          <div>
            <a href={chatWithAgentUrl} target="_new">
              <Button
                onClick={handleClick}
                className="btn-request"
                size="large"
              >
                Chat with an agent
              </Button>
            </a>
          </div>
        </Col> */}
        <Col md={12} sm={24} xs={24}>
          <IoCard.LinkCard
            url={requestFormUrl}
            cardTitle='Browse request forms'
            cardDesc={`Find the request form you need to submit your own request in IT
            Connect.`}
            cardIcon={toolIcon}
            showOpenLink={true}
          />
        </Col>

        <Col md={12} sm={24} xs={24}>
          <IoCard.LinkCard
            url={chatWithAgentUrl}
            cardTitle='Chat with an agent'
            cardDesc='Talk to one of our specialists to get the help you need.'
            cardIcon={chatLargeIcon}
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default KnowledgeBottomSupport;
