import { env, api, variables } from './env';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getAccessToken } from './auth';

interface MTAuthTokenObject {
  token: string;
}

/**
 * The shape of the decoded MTAuth Token
 */
export interface MTAuthJWT extends JwtPayload {
  /**
   * An array of string values stating the users roles
   */
  roles: Array<string>;
}

const STORAGE_KEY = 'MTAuthToken';

/**
 * Retrieves a token from the user service that contains user roles. This is a separate token from the one
 * set on the `Authorization` header and should instead be set on the `X-MTAuth` header.
 */
export async function getMTAuthToken(): Promise<any | undefined> {
  ///Promise<MTAuthJWT | undefined> {
  const existingToken = localStorage.getItem(STORAGE_KEY);

  if (existingToken) {
    const decoded = jwtDecode<MTAuthJWT>(existingToken);

    if (!isTokenExpired(decoded)) {
      return decoded;
    }
  }

  try {
    const accessToken = await getAccessToken();
    // const response = await fetch(env(api.baseApiUrl) + '/users/login', {
    //   headers: {
    //     'Ocp-Apim-Subscription-Key': env(variables.appApiSubscriptionKey),
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const data: MTAuthTokenObject = await response.json();
    // localStorage.setItem(STORAGE_KEY, data.token);
    // const token = jwtDecode<MTAuthJWT>(data.token);

    // return token;
    return accessToken;
  } catch (error) {
    console.error('Error retrieving MTAuth token');
    // Re-throw to retain original stack trace and let the consumer of this utility handle the error.
    throw error;
  }
}

/**
 * This utility accepts any valid decoded JWT and determines if the token is expired.
 * If `exp` is undefined it will return true.
 * @param token Decoded JWT payload
 */
export function isTokenExpired(token: JwtPayload): boolean {
  return token.exp === undefined || token.exp * 1000 <= Date.now();
}

/**
 * This utility checks for a specific role's existence on the MTAuth token retrieved
 * from the user service
 * @param role user role that should be checked for
 */
export async function hasRole(role: string): Promise<boolean> {
  const token = await getMTAuthToken();
  return !!token && token.roles.includes(role);
}
