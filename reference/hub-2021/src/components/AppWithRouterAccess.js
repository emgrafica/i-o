import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { oktaAuthConfig, oktaSignInConfig } from "../config";
import HomePage from "../pages/home";
import InvalidPage from "../pages/invalidPage";
import UnavailablePage from "../pages/unavailablePage";
import KnowledgeDetailPage from "../pages/knowledgeDetailPage";
import MarketPlace from "../pages/marketplace";
import MarketPlaceDevices from "../pages/marketPlaceDevices";
import MyDevices from "../pages/myDevices";
import PilotUser from "../pages/pilotUser";
import SearchPage from "../pages/searchPage";
import SupportHistory from "../pages/supportHistory";
import TicketDetailsPage from "../pages/ticketDetailsPage";
import ListWhatsnew from "../pages/whatsnewList";
import { AUTH, ROUTER } from "./../constants";
import Login from "./Login/Login";
import RequestDeviceForm from "./RequestDeviceForm/requestDeviceForm";
import TopNav from "./TopNav/TopNav";
import BackTop from "./Common/BackTop/BackTop";


const oktaAuth = new OktaAuth(oktaAuthConfig);
const AppWithRouterAccess = (props) => {
  const [auth_info, setAuthInfo] = useState({
    isAuthenticated: false,
    token: null,
    user: {},
  });

  const location = useLocation();
  const { hash } = useLocation();

  const customAuthHandler = () => {
    window.location.href = ROUTER.LOGIN;
  };

  useEffect(() => { 
    const token = oktaAuth.getAccessToken();
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    currentUser = !!currentUser ? JSON.parse(currentUser) : {};
    if (!!currentUser && !!currentUser.uid) {
      setAuthInfo({
        isAuthenticated: true,
        token: token,
        user: currentUser
      });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
          <TopNav
            oktaAuth={oktaAuth}
            authInfo={auth_info}
            location={location}
          />
          <Switch>
            <Route
              path="/login"
              render={() => (
                <Login
                  config={oktaSignInConfig}
                />
              )}
            />
            
            <div className="main-content">
            <BackTop/>

              <Switch>
                <Route path="/login/callback" component={LoginCallback} />
                <Route exact path={ROUTER.PILOT_MODE} component={PilotUser} />
             
                <SecureRoute
                  exact
                  path={ROUTER.SEARCH}
                  component={(props) => (
                    <SearchPage {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.KNOWLEDGE_DETAIL}
                  component={(props) => (
                    <KnowledgeDetailPage
                      {...props}
                      hashTag={hash}
                      authInfo={auth_info}
                    />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.MARKETPLACE}
                  component={(props) => (
                    <MarketPlace {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.MARKETPLACE_DETAIL}
                  component={(props) => (
                    <MarketPlaceDevices {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.SUPPORTHISTORY}
                  component={(props) => (
                    <SupportHistory {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.TICKET_DETAIL}
                  component={(props) => (
                    <TicketDetailsPage {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.MY_DEVICES}
                  component={(props) => (
                    <MyDevices {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.MARKETPLACE_DEVICE_REGISTER}
                  component={(props) => (
                    <RequestDeviceForm {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.HOME}
                  component={(props) => (
                    <HomePage {...props} authInfo={auth_info} />
                  )}
                />

                <SecureRoute
                  exact
                  path={ROUTER.ROOT}
                  component={(props) => <HomePage {...props} />}
                />

                <SecureRoute
                  exact
                  path={ROUTER.LIST_WHATSNEW}
                  component={(props) => (
                    <ListWhatsnew {...props} authInfo={auth_info} />
                  )}
                />
                <Route exact path="/503" component={UnavailablePage}/>
                <Route path="/404" component={InvalidPage} />
                <Redirect to="/404" />
                {/* <SecureRoute path={ROUTER.HOME} component={HomePage}/> */}

              </Switch>
            </div>
          </Switch>
        </Security>
      </BrowserRouter>
    </>
  );
};

export default AppWithRouterAccess;
