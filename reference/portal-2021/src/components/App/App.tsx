// @ts-nocheck
import { Box } from '@lumos/core';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { SecureRoute, Security } from '@okta/okta-react';
import { ConnectChatWidget } from 'azure-connect-chat-react-component-widget';
import { Footer, TopNav } from 'components';
import { CHAT_WIDGE, LANGUAGE } from 'constants/index';
import {
  AssignmentIssuePage,
  GetSupportPage,
  GetSupportSearchPage,
  HomePage,
  LoginPage,
  MaintenancePage,
  PageNotFoundPage,
  PCRefreshPage,
  TermsOfUsePage,
} from 'pages';
import KnowledgeDetailPage from 'pages/GetSupportSearchPage/KnowledgeArticleList/KnowledgeDetail';
import OrdersAndIncidentsPage from 'pages/OrdersAndIncidentsPage';
import PcLostAndStolenPage from 'pages/PcLostAndStolenPage';
import PcReportBrokenPage from 'pages/PcReportBrokenPage';
import PcReturnPage from 'pages/PcReturnPage';
import PilotPage from 'pages/PilotPage';
import SearchPage from 'pages/SearchPage';
import TechnologyPage from 'pages/TechnologyPage';
import PubSub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import UserService from 'services/userServices';
import { oktaAuthConfig, oktaSignInConfig, env, chatWidget } from 'utils/env';
import ErrorBoundary from 'utils/ErrorBoundary';
import { loadGeInspiraFont } from 'utils/fonts';
import { isProxied, proxyPrefix } from 'utils/proxy';
import ThirdPartyScript from "./ThirdPartyScript";
import {
  AssignmentIssue,
  GetSupportPath,
  GetSupportSearchPath,
  HomePath,
  KnowledgeDetail,
  LoginPath,
  MaintenancePath,
  ManagePersonalRequestsPath,
  ManagePersonalTechnologyPath,
  PcLostAndStolenPath,
  PcRefresh,
  PcReportBroken,
  PcReturnPath,
  PilotModePath,
  SearchPath,
  TermsPath,
} from 'utils/routes';
import {
  showWipSearchPage,
} from 'utils/showWorkInProgress';
import useDevice, { Device } from 'utils/useDevice';
import LogoIo from './../../assets/images/logo-io.png';
import { StyleConnectChatWidgetWrapper, StyledAppContainer } from './App.style';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

/**
 * Props for Switch routes
 */
interface SwitchProps {
  setShowFeedback: (showFeedback: boolean) => void;
  onRestoreOriginalUri: Function;
}

const oktaAuth = new OktaAuth(oktaAuthConfig);
/**
 * Switch routes for the application.
 *
 * Used for testing purposes as our testing utility
 * functions override `<Router>` with a provided history.
 */

export const SwitchRoutes: React.FC<SwitchProps> = ({
  setShowFeedback,
  onRestoreOriginalUri,
}) => {
  const customAuthHandler = async () => {
    window.location.href = LoginPath;
  };
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    onRestoreOriginalUri();
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>

        <Route
          exact
          path={LoginPath}
          render={secureProps => (
            <LoginPage {...secureProps} config={oktaSignInConfig} />
          )}
        />
        <Route exact path={PilotModePath} component={PilotPage} />
        <SecureRoute exact path={HomePath} component={HomePage} />
        {/* TODO: Add conditional WIP rendering when Collaboration Page is available */}

        <SecureRoute
          exact
          path={ManagePersonalRequestsPath}
          component={OrdersAndIncidentsPage}
        />
        <SecureRoute
          exact
          path={ManagePersonalTechnologyPath}
          component={TechnologyPage}
        />
        {/* Search */}
        {showWipSearchPage && (
          <SecureRoute exact path={SearchPath} component={SearchPage} />
        )}
        {/* Get Support */}
        <SecureRoute exact path={GetSupportPath} component={GetSupportPage} />
        {/* Knowledge detail */}
        <SecureRoute
          exact
          path={KnowledgeDetail}
          component={KnowledgeDetailPage}
        />
        {/* Get Support Search*/}
        <SecureRoute
          path={GetSupportSearchPath}
          component={GetSupportSearchPage}
        />
        {/* User */}
        {/* {showWipUserPreferencePage && (
          <SecureRoute
            path={UserPreferencesPath}
            component={UserPreferencesPage}
          />
        )} */}
        {/* Miscellaneous */}
        <SecureRoute exact path={TermsPath} component={TermsOfUsePage} />
        <SecureRoute exact path={MaintenancePath} component={MaintenancePage} />
        <SecureRoute
          path={`${PcRefresh}/:deviceID`}
          component={PCRefreshPage}
        />

        <SecureRoute
          path={`${AssignmentIssue}/:deviceID`}
          component={AssignmentIssuePage}
        />

        <SecureRoute
          path={`${PcReturnPath}/:deviceID`}
          component={PcReturnPage}
        />

        <SecureRoute
          path={`${PcLostAndStolenPath}/:deviceID`}
          component={PcLostAndStolenPage}
        />

        <SecureRoute
          path={`${PcReportBroken}/:deviceID`}
          component={PcReportBrokenPage}
        />

        {/* External Re-directions
        <SecureRoute
          path={PcSetupPath}
          component={redirectTo(PcSetupArticle)}
        />
        <SecureRoute
          path={DataTransferPath}
          component={redirectTo(DataTransferArticle)}
        /> */}
        {/* Fallback */}
        <Route
          path="/404"
          render={() => <PageNotFoundPage setShowFeedback={setShowFeedback} />}
        />
      </Switch>
    </Security>
  );
};
/**
 * Application root.
 */
const App: React.FC = () => {
  const device = useDevice();
  //const [showFeedback, setShowFeedback] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentEmail, setCurrentEmail] = useState(null);

  //const oboInfoLocalState = useOBOInfoLocalState();
  //const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  loadGeInspiraFont();
  //usePreferredLanguage();

  const checkAuthenticated = () => {
    oktaAuth.isAuthenticated().then(res => {
      setIsAuthenticated(res);
    });
  };

  const checkPilot = async userInfo => {
    let url = window.location.pathname;
    if (userInfo != null && url !== PilotModePath) {
      const checkUserPilot = await UserService.checkUserPilotMode(
        userInfo.user_name,
      );
      const statusCheckPilot = checkUserPilot.data?.success;
      if (statusCheckPilot === false) {
        window.location.href = PilotModePath;
      }
    } else if (!userInfo && url !== LoginPath) {
      window.location.href = LoginPath;
    }
  };

  useEffect(() => {
    checkAuthenticated();
    if (isAuthenticated) {
      const userInfo = UserService.getCurrentUser();
      if (userInfo) {
        setCurrentUser(userInfo);
        setCurrentEmail(userInfo.email);
        checkPilot(userInfo);
      }
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, currentEmail]);

  /**
   * Temporary prefix needed for stage.i-o.systems/portal to serve stage app
   * and i-o.systems/portal to serve production app.
   * stage.i-o.systems/portal will proxy http://example.com
   * i-o.systems/portal will proxy http://example.com
   */
  // TODO: remove baseName when revers proxying (dev.|qa.|stage.)example.com
  // to this app is no longer needed
  const baseName = isProxied() ? proxyPrefix + '/' : '/';
  const [isShowOpenChat, setIsShowOpenChat] = useState(true);

  PubSub.subscribe(CHAT_WIDGE.OPEN_CHAT, function (msg, data) {
    if (data === CHAT_WIDGE.CONNECTED) {
      setIsShowOpenChat(false);
    }
  });

  return (
    <Router basename={baseName}>
      <StyledAppContainer
        flexDirection="column"
        addTopMargin={false}
        mobileTopMargin={device === Device.Mobile}
      >
        <TopNav oktaAuth={oktaAuth} isAuthenticated={isAuthenticated} />
        <Box flex="1 0 auto" overflow="hidden">
          <ErrorBoundary>
            <SwitchRoutes
              setShowFeedback={() => { }}
              onRestoreOriginalUri={() => {
                checkAuthenticated();
              }}
            />
            {/* <Box display={{ xxs: 'none', md: 'block' }}>
              <GlobalFeedback showFeedback={showFeedback} />
            </Box> */}
          </ErrorBoundary>
        </Box>

        <NotificationContainer />
        {/* <ChatButton /> */}
        {isAuthenticated && <Footer />}

        {isAuthenticated && <ThirdPartyScript />}
        {/* {isAuthenticated && <ChatWidget />} */}
        {isAuthenticated && currentUser && currentEmail && (
          <StyleConnectChatWidgetWrapper>
            <ConnectChatWidget
              userFirstName={currentUser.first_name}
              userEmail={currentEmail}
              userLanguage={LANGUAGE.ENGLISH_UNITED_STATES}
              soundNotificationUrl={CHAT_WIDGE.OPEN_CHAT.SOUND_NOTIFICATION_URL}
              headerLogoUrl={LogoIo}
              minimizedFromOutSide={isShowOpenChat}
              environment={env(chatWidget.chatEnvironment)}
              secretKey={env(chatWidget.secretKey)}
            />
          </StyleConnectChatWidgetWrapper>
        )}
      </StyledAppContainer>
    </Router>
  );
};
export default App;
