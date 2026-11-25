import React from "react";
import "./BackTop.scss";
import { BackTop } from "antd";
import { UpOutlined } from '@ant-design/icons';

function BackTopButton(props) {
  return (
    <BackTop>
      <div className="back-top">
        <UpOutlined />
      </div>
    </BackTop>
  );
}

export default BackTopButton;
