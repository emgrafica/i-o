import React from "react";
import PropTypes from "prop-types";
import { Col, Modal, Row } from "antd";
import "antd/dist/antd.css";
import "./popupDialog.scss";

const PopupDialog = (props) => {
  const { showModal, popUpParam, onCancel } = props;
  const {
    buttonList,
    icon,
    title,
    content,
    header,
    linkText,
    linkRedirect,
  } = popUpParam;
  return (
      <Row>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Modal
            className="io-popup-dialog"
            title={title}
            visible={showModal}
            onCancel={onCancel}
            footer={buttonList}
          >
            <div>
              <img src={icon} />
            </div>
            <p className="header">{header}</p>
            <p className="content">{content}</p>
            <a className="link" href={linkRedirect} target="_new">
              {linkText}
            </a>
          </Modal>
        </Col>
      </Row>
  );
};

PopupDialog.propTypes = {
  /**
   * Show Modal
   */
  showModal: PropTypes.bool,
  /**
   * Popup params
   */
  popupParams: (PropTypes.object = {
    /**
     * Icon of Popup
     */
    icon: PropTypes.string,
    /**
     * Title of Popup
     */
    title: PropTypes.string,
    /**
     * Header of Popup
     */
    header: PropTypes.string,
    /**
     * content of Popup
     */
    content: PropTypes.string,
    /**
     * Footer of Popup
     */
    buttonList: PropTypes.element,
  }),
  /**
   * onCancel Action
   */
  onCancel: PropTypes.func,
};

PopupDialog.defaultProps = {
  showModal: false,
  popupParams: {
    icon: "",
    title: "",
    header: "",
    content: "",
    buttonList: <></>
  },
  onCancel: () => {},
};

export default PopupDialog;
