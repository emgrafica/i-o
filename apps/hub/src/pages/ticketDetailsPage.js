import { Layout } from "antd";
import React from "react";
import SupportTicketDetail from "../components/SupportHistory/SupportTicketDetail/SupportTicketDetail";

const { Content } = Layout;
const TicketDetailsPage = (props) => {
  return (
    <Content>
      <SupportTicketDetail {...props} />
    </Content>
  );
};

export default TicketDetailsPage;
