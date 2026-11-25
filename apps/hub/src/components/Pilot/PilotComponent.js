import React, {useEffect, useState} from 'react'
import appIcon from '../../assets/icons/io-icon.svg';
import logoutIcon from '../../assets/images/pilot/Vector.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './PilotComponent.scss';
import { Col, Row, Card} from "antd";
import { Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import { AUTH } from './../../constants';
import ReactHtmlParser from 'react-html-parser';

const { Meta } = Card;

const PilotComponent = () => {
  let homeLink = "/login";
  let url = 'https://csc.service-now.com';
  let BROWSER_NAME_DEFAULT = 'Portal';
  const [currentUser, setCurrentUser] = useState(null);
  let user_settings = {};
  const settings = localStorage.getItem(AUTH.SETTINGS);
  user_settings = JSON.parse(settings);
  
  const portalName = user_settings && !!user_settings.BROWSER_NAME? ReactHtmlParser(user_settings.BROWSER_NAME) : BROWSER_NAME_DEFAULT;
  useEffect(() => {
    const userInfo = localStorage.getItem(AUTH.CURRENT_USER);
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
    }     
  }, []);

    return (
      <div>
        {!currentUser &&
          <Navbar collapseOnSelect expand="lg" bg="nav-main" className="navigation-bar pilot-navigation-bar custom_container" sticky="top">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              {user_settings && !!user_settings.PORTAL_NAME?               
              <Navbar.Brand href={homeLink} className="app-logo">             
              <img
                alt="" 
                src={user_settings.MAIN_LOGO }
                className="d-inline-block align-top"
                />                              
              <span className="product-name">
                {ReactHtmlParser(user_settings.PORTAL_NAME )}
                </span>
              </Navbar.Brand> : <NavbarBrand></NavbarBrand> }
              <Navbar.Collapse id="responsive-navbar-nav" className="navigation-bar-end">
                  <Nav className="mr-auto">
                  </Nav>
                  <Nav className="justify-content-end auth-lg-item-collapse" navbar>
                      <div className="logout-Icon">
                          <a href={homeLink}>
                            <img src={logoutIcon} />
                          </a>
                      </div>
                  </Nav>
              </Navbar.Collapse>
              </Navbar>
        }

      <div className="pilot-container">
        <Row span={24}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="aus-bg">
            {user_settings && !!user_settings.PORTAL_NAME?     
              <span>{ReactHtmlParser(user_settings.PORTAL_NAME)}</span> : <span></span> }
            </div>
            <div className="text-white">
              <div className="mx-auto text-center form">
              </div>
            </div>
          </Col>
        </Row>
        <Row span={24} className="pilot-card-wrapper">
        <Card hoverable className="pilot-card"> 
          <Meta
            description={
              <div>
                  <div className= 'pilot-card-header'>
                      Coming Soon!
                  </div> 
                  <div className= 'pilot-card-body'>
                      We are currently limiting access to <b>{portalName}</b> to make sure everything is in working order. 
                      You’ll receive an email when {portalName} is ready for you. In the meantime, 
                      please use <a href={url}  target="_blank"><u> IT Connect</u></a> to access support.
                  </div>                 
              </div>
              }
          />
        </Card>
        </Row>
      </div>
      </div>
    );
}

export default PilotComponent;
