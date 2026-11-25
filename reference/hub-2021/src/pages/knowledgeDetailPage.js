import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "antd";
import React from "react";
import KnowledgeDetail from "../components/Knowledge/KnowledgeDetail/KnowledgeDetail";

const KnowledgeDetailPage = (props) => {
    return (
      <div>
        <Row>
            {
              <KnowledgeDetail {...props}/>
            }
        </Row>
      </div>
    );
};

export default KnowledgeDetailPage;
