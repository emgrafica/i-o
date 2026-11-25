import '@fortawesome/fontawesome-free/css/all.css';
import { Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useRef, useEffect} from 'react';
import Avatar from 'react-avatar';
import {
    Col, Container, Nav, Navbar,
    NavDropdown, NavItem, Overlay, Row, Popover,
} from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import { matchPath } from "react-router";
import { withRouter, useHistory } from 'react-router-dom';
import cacheService from 'services/cacheService';
import { AUTH, ROUTER } from '../../constants';
import './TopNav.scss';
import SearchBar from "../SearchBar/SearchBar";
import Search from "@material-ui/icons/Search";

require('dotenv').config() //need to call a env variable in .env file

function UserCusAvatar(props) {
    // If a user avatar is available, return an img tag with the pic
    let { user } = props;
    if (user && user.avatar) {
        return <img src={user.avatar} alt="user" className="rounded-circle align-self-center mr-2" />;
    }

    if (user && user.name && user.avatar_name) {
        return <Avatar name={user.avatar_name} maxInitials={2} size={24} round={true} title={user.name} className="avatar-item" />
    } else {
        return <i className="far fa-user-circle fa-lg user-default-icon" />
    }
}

function AuthNavItem(props) {
    // If authenticated, return a dropdown with the user's info and a
    // sign out button
    const { user, oktaAuth } = props;


    const title = user ? (
        <Row>
            <Col className="px-0 col-auto c-mr-s03-0 avatar-block"><UserCusAvatar user={user} /></Col>
            <Col className="title-content px-0 col">
                <div className="fsz16"><h5>{user.name}</h5></div>
                {/* <div className="fsz11">Employee ID: {user.employee_number}</div>
                <div className="fsz12"><SettingOutlined /> Manage Account</div> */}
            </Col>                
        </Row>
 

    ) : (null);
    const location = user ? (user.city + ', ' + user.state) : "";
    const content = user ? (
        <Container className="fsz14">
            <Row>
                <Col xs={5} md={5} className="body-Semibold pl-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0C3.78857 0 2 1.878 2 4.2C2 7.35 6 12 6 12C6 12 10 7.35 10 4.2C10 1.878 8.21143 0 6 0ZM6 5.7C5.21143 5.7 4.57143 5.028 4.57143 4.2C4.57143 3.372 5.21143 2.7 6 2.7C6.78857 2.7 7.42857 3.372 7.42857 4.2C7.42857 5.028 6.78857 5.7 6 5.7Z" fill="#5F249F" />
                    </svg><span>Location</span>
                </Col>
                <Col className="user-info pr-0">
                    {location}
                </Col>
            </Row>
            <Row>
                <Col xs={5} md={5} className="body-Semibold pl-0">
                    <svg width="12" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.995 0C2.235 0 0 2.24 0 5C0 7.76 2.235 10 4.995 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 4.995 0ZM8.46 3H6.985C6.825 2.375 6.595 1.775 6.295 1.22C7.215 1.535 7.98 2.175 8.46 3ZM5 1.02C5.415 1.62 5.74 2.285 5.955 3H4.045C4.26 2.285 4.585 1.62 5 1.02ZM1.13 6C1.05 5.68 1 5.345 1 5C1 4.655 1.05 4.32 1.13 4H2.82C2.78 4.33 2.75 4.66 2.75 5C2.75 5.34 2.78 5.67 2.82 6H1.13ZM1.54 7H3.015C3.175 7.625 3.405 8.225 3.705 8.78C2.785 8.465 2.02 7.83 1.54 7ZM3.015 3H1.54C2.02 2.17 2.785 1.535 3.705 1.22C3.405 1.775 3.175 2.375 3.015 3ZM5 8.98C4.585 8.38 4.26 7.715 4.045 7H5.955C5.74 7.715 5.415 8.38 5 8.98ZM6.17 6H3.83C3.785 5.67 3.75 5.34 3.75 5C3.75 4.66 3.785 4.325 3.83 4H6.17C6.215 4.325 6.25 4.66 6.25 5C6.25 5.34 6.215 5.67 6.17 6ZM6.295 8.78C6.595 8.225 6.825 7.625 6.985 7H8.46C7.98 7.825 7.215 8.465 6.295 8.78ZM7.18 6C7.22 5.67 7.25 5.34 7.25 5C7.25 4.66 7.22 4.33 7.18 4H8.87C8.95 4.32 9 4.655 9 5C9 5.345 8.95 5.68 8.87 6H7.18Z" fill="#5F249F" />
                    </svg><span>Language</span>
                </Col>
                <Col className="user-info pr-0">
                    {user.preferred_language}
                </Col>
            </Row>
            <Row>
                <Col xs={5} md={5} className="body-Semibold pl-0">
                    <svg width="12" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5C6.38125 5 7.5 3.88125 7.5 2.5C7.5 1.11875 6.38125 0 5 0C3.61875 0 2.5 1.11875 2.5 2.5C2.5 3.88125 3.61875 5 5 5ZM5 6.25C3.33125 6.25 0 7.0875 0 8.75V10H10V8.75C10 7.0875 6.66875 6.25 5 6.25Z" fill="#5F249F" />
                    </svg><span>Reports To</span>
                </Col>
                <Col className="user-info pr-0">
                    {user.manager_name}
                </Col>
            </Row>
            <Row className="user-menu-footer">
                <Col className="px-0">
                    <Button className="btn-secondary btn-signout" onClick={props.authButtonMethod} type="default" shape="round" size="large">Sign Out</Button>
                </Col>
            </Row>
        </Container>
    ) : (null);

    if (user) {
        return (
            
            <NavDropdown className="overlay-user" title={<UserCusAvatar user={user} />} id="basic-nav-dropdown" alignRight>
                <div className="ant-popover-arrow"><span className="ant-popover-arrow-content"></span></div>
                <NavDropdown.Item className="p-0">{title}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="p-0">{content}</NavDropdown.Item>
            </NavDropdown>

            // <Popover overlayClassName="overlay-user" content={content} trigger="click" placement="bottom">
            //     <Button type="text"><UserCusAvatar user={user} /></Button>
            // </Popover>
        );
    }

    // Not authenticated, return a sign in link
    return (
        <NavItem>
            <a href="#"
                onClick={props.authButtonMethod}
                className="btn-link nav-link border-0"
                color="link">Sign In</a>
        </NavItem>
    );
}

const SearchNav = (props)=> { 
    const { user, oktaAuth } = props;
    const history = useHistory();
    const [dropDownOpen, setdropDownOpen] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClose = (event) =>{ //Hide when click outside
        setdropDownOpen(!dropDownOpen);
    }

    const handleShow = (event) => {
      setdropDownOpen(!dropDownOpen);
      setTarget(event.target);
    };

    const handleClick = (value) => { 
        if (value) {
          setTimeout(() => {
            history.push({
              pathname: ROUTER.SEARCH,
              search: `?param=${value}&paging=${1}`,
              state: {
                path: history.location.pathname,
                params: history.location.search
              }
            });         
          }, 50);
        }
        setTimeout(()=>{
            setdropDownOpen(!dropDownOpen);
        },3);
        return null;
      };

    const handleKeyDown = async (e) => { 
        if (e.key === "Enter" && e.target.value) {
          const searchValue = e.target.value;
          setTimeout(() => {
            history.push({
              pathname: ROUTER.SEARCH,
              search: `?param=${searchValue}&paging=${1}`,
              state: {
                path: history.location.pathname,
                params: history.location.search
              }
            });
          }, 50);
        }       
        setdropDownOpen(!dropDownOpen);
        return null;
    };

    const placeHolderSearch = "Search & browse...";
    const title ="Search or Browse for Help";    
    const searchBar =   (<div className="search-bar">
                            <SearchBar                            
                            placeHolder={placeHolderSearch}                                                                                    
                            search={handleKeyDown}
                            searchClick={handleClick}/>
                        </div>);
    const searchIcon = (<Search  className='Icon' />);
    const content =(
        <div className="form-search-header">
            <div className="form-item-1">
                {title}
            </div>
            <div className="form-item-2">
                {searchBar}
            </div>
        </div>
    );

    if(user){
        return (     
           <div ref={ref}>
               <a onClick={handleShow} ><span>{searchIcon}</span></a>              
               <Overlay
                    show={dropDownOpen}
                    target={target}
                    container={ref.current}
                    placement="bottom-start"     
                    rootClose
                    onHide={handleClose}
               >
                   <Popover>
                      <Popover.Content>{content}</Popover.Content>
                   </Popover>
               </Overlay>
       
           </div>
        );
    }
    return null;          
}

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        const { oktaAuth, authInfo } = props;
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true,
            nav: false
        };

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = async () => {
        // localStorage.removeItem(AUTH.CURRENT_USER);
        cacheService.cacheClearPolicy();
        localStorage.clear();
        sessionStorage.clear();
        this.props.oktaAuth.signOut();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', null);
    }

    handleScroll = () => {
        if (window.pageYOffset > 48) {
            if (!this.state.nav) {
                this.setState({ nav: true });
            }
        } else {
            if (this.state.nav) {
                this.setState({ nav: false });
            }
        }
    }


    render() {

        this.currentUser = localStorage.getItem(AUTH.CURRENT_USER);
        this.settings = localStorage.getItem(AUTH.SETTINGS);
        const { oktaAuth, authInfo, location } = this.props;
        let user_settings = {};
        if (this.currentUser && this.currentUser !== "undefined") {
            this.currentUser = JSON.parse(this.currentUser);
        }
        //console.log("TOP VAR Environment variable>>>", process.env);
        //Set logo links for authenticated and not authenticated user
        let homeLink;
        const matchLoginPath = matchPath(location.pathname, {
            path: ROUTER.LOGIN,
            exact: true,
            strict: true
        });
        const matchPilotPath = matchPath(location.pathname, {
            path: ROUTER.PILOT_MODE,
            exact: true,
            strict: true
        });
        if (!matchLoginPath &&
            !matchPilotPath &&
            !this.settings &&
            authInfo.isAuthenticated
        ) {
            oktaAuth.signOut();
            return <></>
        }
        if (this.currentUser) {
            homeLink = "/home"
        }
        else {
            homeLink = "/login";
            return (null);
        }
        user_settings = JSON.parse(this.settings);
        const listRouterHasSearchBar = [ROUTER.ROOT, ROUTER.HOME, ROUTER.WELCOME, ROUTER.SUPPORTHISTORY, ROUTER.MARKETPLACE],
            isHaveSearchBar = listRouterHasSearchBar.indexOf(location.pathname) !== -1 ? true : false;

        return authInfo.isAuthenticated && !!authInfo.user.uid && location.pathname !== '/login' && (
            <Navbar collapseOnSelect expand="lg" bg="nav-main" className={"navigation-bar " + (!isHaveSearchBar ? "navigation-bar-background" : "") + (this.state.nav ? ' navigation-bar-scrolling' : '')} fixed="top">
                <div className="custom_container">
                    <div className="custome-d-md-flex d-lg-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Brand href={homeLink} className="app-logo">
                                {user_settings && !!user_settings.MAIN_LOGO && <img
                                    alt=""
                                    src={user_settings.MAIN_LOGO}
                                    className="d-inline-block align-top"
                                />}{' '}

                                {user_settings && !!user_settings.PORTAL_NAME && <span className="home-product-name">
                                    {ReactHtmlParser(user_settings.PORTAL_NAME)}
                                </span>}
                            </Navbar.Brand>
                            {/* <Nav className="auth-lg-item">
                
                </Nav> */}
                            <div className="auth-lg-item">
                                <AuthNavItem
                                    authButtonMethod={this.logout}
                                    user={this.currentUser} />
                            </div>
                        </div>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link href={homeLink} className={`${window.location.pathname === '/home' || window.location.pathname === '/' ? 'active-route' : ''}`}>Home</Nav.Link>
                                <Nav.Link href="/support-history" className={`${window.location.pathname === '/support-history' ? 'active-route' : ''}`}>Support Center</Nav.Link>
                                <Nav.Link href="/marketplace" className={`${window.location.pathname === '/marketplace' ? 'active-route' : ''}`}>Marketplace</Nav.Link>
                                {/* <Nav.Link href="#"><i className="fa fa-map-marker" aria-hidden="true"></i></Nav.Link> */}
                                {/* <Nav.Link href="#"><i className="fa fa-bell" aria-hidden="true"></i></Nav.Link> */}  
                                <Nav>
                                    <SearchNav user={this.currentUser} />
                                </Nav>              
                            </Nav>
                            <Nav className="justify-content-end auth-lg-item-collapse d-none custom-d-md-block d-lg-block" navbar>
                                <AuthNavItem
                                    authButtonMethod={this.logout}
                                    user={this.currentUser} />
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        );
    }
}

export default withRouter(TopNav)
