import authInstance, { loginRequestConfig } from 'config/auth';

export const getAccessToken = async (): Promise<string> => {
  const [account] = authInstance.getAllAccounts();

  // This shouldn't happen
  if (!account) {
    throw new Error('Account should be set');
  }

  // TODO: handle error when refresh token is expired
  const { accessToken } = await authInstance.acquireTokenSilent({
    ...loginRequestConfig,
    account,
  });

  return accessToken;
};
