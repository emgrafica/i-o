import React, { useEffect, useState } from 'react';

import { MsalProvider, useMsal } from '@azure/msal-react';
import authInstance, { loginRequestConfig } from 'config/auth';
import AuthContext, { IAccountInfo } from './AuthContext';

interface AuthProps {}

const AuthComponent: React.FC<AuthProps> = props => {
  const { instance, inProgress } = useMsal();
  const [waitingForToken, setWaitingForToken] = useState<boolean>(false);
  const [tokenValidated, setTokenValidated] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [account] = instance.getAllAccounts();

  const authFlowCompleted = inProgress === 'none';
  const authSuccessful =
    authFlowCompleted && !waitingForToken && tokenValidated;

  useEffect(() => {
    const tokenInvalid = !waitingForToken && !tokenValidated;
    if (!authFlowCompleted) {
      return;
    }

    if (error || tokenInvalid) {
      instance.loginRedirect(loginRequestConfig);
    }
  }, [
    authFlowCompleted,
    authSuccessful,
    error,
    instance,
    tokenValidated,
    waitingForToken,
  ]);

  if (error) {
    return null;
  }

  if (account && !waitingForToken && !tokenValidated) {
    // This is a pre-check to make sure the app's authentication credentials are
    // still valid. Otherwise, the app would first have to attempt to load (while making several API requests)
    // before realizing that, say, the refresh token is invalid. That makes for a bad user experience since
    // the components would fail before the app attempts to recover.
    setWaitingForToken(true);
    instance
      .acquireTokenSilent({
        ...loginRequestConfig,
        account,
      })
      .then(_ => {
        setTokenValidated(true);
        setError(null);
      })
      .catch(err => {
        setTokenValidated(false);
        setError(err);
      })
      .finally(() => setWaitingForToken(false));
  }

  if (authSuccessful) {
    const accountInfo: IAccountInfo = {
      account: {
        accountIdentifier: account.localAccountId,
        environment: account.environment,
        homeAccountIdentifier: account.homeAccountId,
        name: account.name || '',
        sid: '',
        userName: account.username,
      },
    };

    // Only render the components after the auth flow is successful to avoid re-rendering them
    // several times during the authentication flow.
    return (
      <AuthContext.Provider value={accountInfo}>
        {props.children}
      </AuthContext.Provider>
    );
  }

  // Blank page during the login process
  return null;
};

/**
 * ** This container should be rendered before using any functionality that require authentication**
 *
 * Uses react msal component with MSAL under the hood
 *  - Abstracts auth logic from consumer
 *  - Temporary logic for unauthenticated users
 */
const AuthContainer: React.FC<AuthProps> = props => {
  return (
    <MsalProvider instance={authInstance}>
      <AuthComponent>{props.children}</AuthComponent>
    </MsalProvider>
  );
};

export default AuthContainer;
