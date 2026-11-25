import React from "react";
import PropTypes from "prop-types";
import { Col, Modal, Row, Button } from "antd";
import dxcLogo from "../../../assets/icons/dxc-logo.svg";
import "antd/dist/antd.css";
import "./notificationPrompt.scss";

const NotificationPrompt = (props) => {
  const { showModal, onCancel, onSuccess, promptParams } = props;
  const { icon, title, content, cancelButtonTitle, successButtonTitle } = promptParams;
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={6} xl={6}>
        <Modal
          className="io-notification-prompt"
          visible={showModal}
          footer={null}
          closable={false}
          maskClosable={false}
        >
          <div className="brand-logo">
            <img src={icon} />
          </div>
          <div className="dialog-content">
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <Row className="dialog-actions">
              <Button onClick={onCancel} className="io-action-button cancel-button">{cancelButtonTitle}</Button>
              <Button onClick={onSuccess} className="io-action-button success-button">{successButtonTitle}</Button>
            </Row>
          </div>
        </Modal>
      </Col>
    </Row>
  );
};

NotificationPrompt.propTypes = {
  /**
   * Show Modal
   */
  showModal: PropTypes.bool,

  /**
   * onCancel Action
   */
  onCancel: PropTypes.func,

  /**
 * onSuccess
 */
  onSuccess: PropTypes.func,

  /**
   * Dialog Params
   */
  promptParams: (PropTypes.object = {
    /**
   * Icon of dialog
   */
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),

    /**
   * Title of dialog
   */
    title: PropTypes.string,

    /**
   * Content of dialog
   */
    content: PropTypes.string,

    /**
   * Title of cancel button
   */
    cancelButtonTitle: PropTypes.string,

    /**
   * Title of success button
   */
    successButtonTitle: PropTypes.string,
  }),
};

NotificationPrompt.defaultProps = {
  showModal: false,
  promptParams: {
    icon: dxcLogo,
    title: 'i-o would like to send you notifications about PC lifecycle, support requests and critical outages.',
    content: `To allow notifications, push allow here and when the browser asks,
    Notifications can be turned off anytime from browser settings.`,
    cancelButtonTitle: 'Not now',
    successButtonTitle: 'Allow'
  },
};

export default NotificationPrompt;
