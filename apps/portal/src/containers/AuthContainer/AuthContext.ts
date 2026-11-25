import React from 'react';

export interface IAccountInfo {
  account: {
    accountIdentifier: string;
    homeAccountIdentifier: string;
    userName: string;
    name: string;
    sid: string;
    environment: string;
  };
}

/**
 * Auth context that exposes user's account information to component tree
 */
const AuthContext = React.createContext<IAccountInfo | null>({
  account: {
    accountIdentifier: '',
    homeAccountIdentifier: '',
    userName: '',
    name: '',
    sid: '',
    environment: '',
  },
});

export const useUserId = () => {
  let userId: string | undefined;

  const userAccountInfo = React.useContext(AuthContext);

  if (userAccountInfo) {
    userId = userAccountInfo.account.userName.split('@')[0];
  }

  //TODO: dummy data for test
  if (!userId) {
    userId = '123';
  }

  return userId;
};

export default AuthContext;
