import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@lumos/core';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { Footer, OBOStickyHeader, TopNav, ChatButton } from 'components';
import ReturnConfirmationPage from 'pages/confirmationPages/ReturnConfirmationPage';
import {
  ApprovalsPage,
  CatalogItemPage,
  HomePage,
  PageNotFoundPage,
  GetSupportPage,
  GetSupportSearchPage,
  IncidentCreationPage,
  IncidentConfirmationPage,
  TermsOfUsePage,
  UserPreferencesPage,
  CatalogPage,
  MaintenancePage,
  OrderConfirmationPage,
  CatalogCommunicationsPage,
  GComComingSoonPage,
  MobilityComingSoonPage,
  SoftwareComingSoonPage,
  CollaborationComingSoonPage,
} from 'pages';
import CatalogCheckoutPage from 'pages/checkoutPages/CatalogCheckoutPage';
import OrdersAndIncidentsPage from 'pages/OrdersAndIncidentsPage';
import TechnologyPage from 'pages/TechnologyPage';
import ReturnCheckoutPage from 'pages/checkoutPages/ReturnCheckoutPage';
import { StyledAppContainer } from './App.style';
import GlobalFeedback from '../GlobalFeedback';
import {
  CheckoutPath,
  OrderConfirmationPath,
  HomePath,
  LoginPath,
  GetSupportPath,
  ManageApprovals,
  ManagePersonalRequestsPath,
  ManagePersonalTechnologyCheckoutConfirmationPath,
  ManagePersonalTechnologyCheckoutPath,
  ManagePersonalTechnologyPath,
  RequestAccessoriesPath,
  RequestComputersPath,
  RequestMobilityPath,
  RequestGComPath,
  SearchPath,
  TermsPath,
  UserPreferencesPath,
  MaintenancePath,
  GetSupportSearchPath,
  IncidentCreationPath,
  IncidentConfirmationPath,
  RequestSoftwarePath,
  RequestCollaborationPath,
  PcSetupPath,
  DataTransferPath,
  DataTransferArticle,
  PcSetupArticle,
} from 'utils/routes';
import ErrorBoundary from 'utils/ErrorBoundary';

import { CatalogItemClass } from 'gqlTypes/globalTypes';
import useDevice, { Device } from 'utils/useDevice';
import SearchPage from 'pages/SearchPage';
import {
  showWipCatalogCommunicationsPage,
  showWipMobilityCatalogPage,
  showWipSearchPage,
  showWipUserPreferencePage,
} from 'utils/showWorkInProgress';
import { isProxied, proxyPrefix } from 'utils/proxy';
import { loadGeInspiraFont } from 'utils/fonts';
import { usePreferredLanguage } from 'hooks/usePreferredLanguage';
import redirectTo from 'utils/redirectTo';

/**
 * Props for Switch routes
 */
interface SwitchProps {
  setShowFeedback: (showFeedback: boolean) => void;
}

/**
 * Switch routes for the application.
 *
 * Used for testing purposes as our testing utility
 * functions override `<Router>` with a provided history.
 */
export const SwitchRoutes: React.FC<SwitchProps> = ({ setShowFeedback }) => (
  <Switch>
    <Route exact path={HomePath} component={HomePage} />
    {/* Login */}
    <Route exact path={LoginPath} component={PageNotFoundPage} />
    {/* Request */}
    <Route exact path={CheckoutPath} component={CatalogCheckoutPage} />
    <Route
      exact
      path={OrderConfirmationPath}
      component={OrderConfirmationPage}
    />
    <Route
      exact
      path={RequestComputersPath}
      render={props => (
        <CatalogPage catalogItemClass={CatalogItemClass.computer} {...props} />
      )}
    />
    <Route
      path={`${RequestComputersPath}/:catalogItemName`}
      render={props => (
        <CatalogItemPage
          catalogItemClass={CatalogItemClass.computer}
          {...props}
        />
      )}
    />
    <Route
      exact
      path={RequestAccessoriesPath}
      render={props => (
        <CatalogPage catalogItemClass={CatalogItemClass.accessory} {...props} />
      )}
    />
    <Route
      path={`${RequestAccessoriesPath}/:catalogItemName`}
      render={props => (
        <CatalogItemPage
          catalogItemClass={CatalogItemClass.accessory}
          {...props}
        />
      )}
    />
    <Route
      exact
      path={RequestMobilityPath}
      render={props =>
        showWipMobilityCatalogPage ? (
          <CatalogPage
            catalogItemClass={CatalogItemClass.mobility}
            {...props}
          />
        ) : (
          <MobilityComingSoonPage />
        )
      }
    />
    <Route
      exact
      path={RequestSoftwarePath}
      component={SoftwareComingSoonPage}
    />
    <Route
      exact
      path={RequestGComPath}
      render={props =>
        showWipCatalogCommunicationsPage ? (
          <CatalogCommunicationsPage
            catalogItemClass={CatalogItemClass.gcom}
            {...props}
          />
        ) : (
          <GComComingSoonPage />
        )
      }
    />
    <Route
      path={`${RequestMobilityPath}/:catalogItemName`}
      render={props => (
        <CatalogItemPage
          catalogItemClass={CatalogItemClass.mobility}
          {...props}
        />
      )}
    />
    {/* TODO: Add conditional WIP rendering when Collaboration Page is available */}
    <Route
      exact
      path={`${RequestCollaborationPath}`}
      render={() => <CollaborationComingSoonPage />}
    />
    {/* Manage */}
    <Route
      path={ManagePersonalRequestsPath}
      component={OrdersAndIncidentsPage}
    />
    <Route
      exact
      path={ManagePersonalTechnologyPath}
      component={TechnologyPage}
    />
    <Route
      exact
      path={ManagePersonalTechnologyCheckoutPath}
      component={ReturnCheckoutPage}
    />
    <Route
      exact
      path={ManagePersonalTechnologyCheckoutConfirmationPath}
      component={ReturnConfirmationPage}
    />
    <Route exact path={ManageApprovals} render={() => <ApprovalsPage />} />
    {/* Search */}
    {showWipSearchPage && (
      <Route exact path={SearchPath} component={SearchPage} />
    )}
    {/* Get Support */}
    <Route exact path={GetSupportPath} component={GetSupportPage} />
    {/* Get Support Search*/}
    <Route path={GetSupportSearchPath} component={GetSupportSearchPage} />
    {/* Incident Creation*/}
    <Route exact path={IncidentCreationPath} component={IncidentCreationPage} />
    {/* Incident Created Confirmation*/}
    <Route
      path={IncidentConfirmationPath}
      component={IncidentConfirmationPage}
    />
    {/* User */}
    {showWipUserPreferencePage && (
      <Route path={UserPreferencesPath} component={UserPreferencesPage} />
    )}
    {/* Miscellaneous */}
    <Route exact path={TermsPath} component={TermsOfUsePage} />
    <Route exact path={MaintenancePath} component={MaintenancePage} />

    {/* External Re-directions*/}
    <Route path={PcSetupPath} component={redirectTo(PcSetupArticle)} />
    <Route
      path={DataTransferPath}
      component={redirectTo(DataTransferArticle)}
    />
    {/* Fallback */}
    <Route
      render={() => <PageNotFoundPage setShowFeedback={setShowFeedback} />}
    />
  </Switch>
);
/**
 * Application root.
 */
const App: React.FC = () => {
  const device = useDevice();
  const [showFeedback, setShowFeedback] = useState(true);
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  loadGeInspiraFont();
  usePreferredLanguage();

  /**
   * Temporary prefix needed for stage.i-o.systems/portal to serve stage app
   * and i-o.systems/portal to serve production app.
   * stage.i-o.systems/portal will proxy http://example.com
   * i-o.systems/portal will proxy http://example.com
   */
  // TODO: remove baseName when revers proxying (dev.|qa.|stage.)example.com
  // to this app is no longer needed
  const baseName = isProxied() ? proxyPrefix + '/' : '/';
  return (
    <Router basename={baseName}>
      <StyledAppContainer
        flexDirection="column"
        addTopMargin={!!oboUser}
        mobileTopMargin={device === Device.Mobile}
      >
        {oboUser && <OBOStickyHeader oboUser={oboUser} />}
        <TopNav />
        <Box flex="1 0 auto" overflow="hidden">
          <ErrorBoundary>
            <SwitchRoutes setShowFeedback={setShowFeedback} />
            <Box display={{ xxs: 'none', md: 'block' }}>
              <GlobalFeedback showFeedback={showFeedback} />
            </Box>
          </ErrorBoundary>
        </Box>
        <ChatButton />
        <Footer />
      </StyledAppContainer>
    </Router>
  );
};
export default App;
