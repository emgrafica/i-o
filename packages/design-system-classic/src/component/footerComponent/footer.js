import React from 'react';
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import './footer.scss';
import { Row, Col } from "antd";
const Footer = (props) => {

  return (
    <div className="io-footer">
      <Row className="io-footer-container">
      <Col xs={24} md={16} className="io-footer-copyright">
        <span>
          {props.copyright}
        </span>
      </Col>
      <Col xs={24} md={8} className="io-footer-link">
        <ul>
          {props.copyrightData.map(item => (
            <li>
                <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
    </div>
  );
};

Footer.propTypes = {
  /**
   * Title of Copyright
   */
  copyright: PropTypes.string,
  /**
   * Copyright Data
   */
   copyrightData: PropTypes.array
};

Footer.defaultProps = {
  copyright: "© DXC Technology Company",
  copyrightData: [
    {
      title: 'Legal',
      path: '/#',
    },
    {
      title: 'Privacy',
      path: '/#',
    },
    {
      title: 'Feedback',
      path: '/#',
    }
  ]
};


export default Footer;



