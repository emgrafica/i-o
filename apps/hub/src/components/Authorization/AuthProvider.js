// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

import { config } from '../../config';
import GraphService from '../../services/GraphService';
import UserService from '../../services/userService';
import {SESSIONSTORAGEKEYS} from "../../constants/storageConstants";
import { AUTH } from '../../constants';
import cacheService from 'services/cacheService';

// export interface AuthComponentProps {
//   error: any;
//   isAuthenticated: boolean;
//   user: any;
//   login: Function;
//   logout: Function;
//   getAccessToken: Function;
//   setError: Function;
// }

// interface AuthProviderState {
//   error: any;
//   isAuthenticated: boolean;
//   user: any;
// }

export default function withAuthProvider(WrappedComponent) {
  return class extends React.Component {
    publicClientApplication = null;

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isAuthenticated: false,
        user: {}
      };
      
      let redirectUrl = window.location.origin;
      //let redirectUrl = window.location.origin + "/home";
      //console.log("REdicrect>>>>", redirectUrl);
      // Initialize the MSAL application object
      this.publicClientApplication = new PublicClientApplication({
        auth: {
          clientId: config.appId,
          redirectUri: redirectUrl
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: true
        }
      });
    }

    componentDidMount() {
      // If MSAL already has an account, the user
      // is already logged in
      const accounts = this.publicClientApplication.getAllAccounts();

      if (accounts && accounts.length > 0) {
        // Enhance user object with data from Graph
        this.getUserProfile();
      }
    }

    render() {
      return <WrappedComponent
        error={this.state.error}
        isAuthenticated={this.state.isAuthenticated}
        user={this.state.user}
        login={() => this.login()}
        logout={() => this.logout()}
        getAccessToken={(scopes) => this.getAccessToken(scopes)}
        setError={(message, debug) => this.setErrorMessage(message, debug)}
        {...this.props} />;
    }

    async login() {
      try {
        // Login via popup
        await this.publicClientApplication.loginPopup(
          {
            scopes: config.scopes,
            prompt: "select_account"
          });

        // After login, get the user's profile
        const currentUser = await this.getUserProfile();
        localStorage.setItem(AUTH.CURRENT_USER, JSON.stringify(currentUser));
        //navigate to Home page
        window.location.href="/home";
      }
      catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err)
        });
      }
    }

    logout() {
      // localStorage.removeItem(AUTH.CURRENT_USER);
      // sessionStorage.removeItem(SESSIONSTORAGEKEYS.LOGGED_IN);
      cacheService.cacheClearPolicy();
      localStorage.clear();
      sessionStorage.clear();
      this.publicClientApplication.logout();
    }

    async getAccessToken(scopes) {
      try {
        const accounts = this.publicClientApplication
          .getAllAccounts();

        if (accounts.length <= 0) throw new Error('login_required');
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token
        var silentResult = await this.publicClientApplication
          .acquireTokenSilent({
            scopes: scopes,
            account: accounts[0]
          });

        return silentResult.accessToken;
      } catch (err) {
        // If a silent request fails, it may be because the user needs
        // to login or grant consent to one or more of the requested scopes
        if (this.isInteractionRequired(err)) {
          var interactiveResult = await this.publicClientApplication
            .acquireTokenPopup({
              scopes: scopes
            });

          return interactiveResult.accessToken;
        } else {
          throw err;
        }
      }
    }

    // <getUserProfileSnippet>
    async getUserProfile() {
      try {        
        var accessToken = await this.getAccessToken(config.scopes);

        if (accessToken) {
          // Get the user's profile from Graph
          var user = await GraphService.getUserDetails(accessToken);
          var userResponse = await UserService.getUserDetailByEmail(user.mail);
          let userInfo = user;
          if(userResponse && userResponse.data && userResponse.data.length>0){
            let userData = userResponse.data[0];
            const moreInfo = {
              uid: userData.uid,
              name: userData.name,
              user_name: userData.user_name,
              first_name: userData.first_name,
              last_name: userData.last_name,
              employee_number: userData.employee_number,
              mobile_phone: userData.mobile_phone,
              time_zone: userData.time_zone,
              city: userData.city,
              state: userData.state,
              country: userData.country,
              preferred_language: userData.preferred_language,
              manager_name: userData.manager_name,
              location: userData.location,
              locationId:userData.locationId,
              email: userData.email
            }
            userInfo = {...userInfo, ...moreInfo}
          }
          //console.log(userInfo);
          userInfo['avatar'] = await GraphService.getUserPhoto(accessToken);
          //console.log("user info:>>", userInfo);

          // Set LoggedIn indicating user logged in, which can be used in App.js routes
          sessionStorage.setItem(SESSIONSTORAGEKEYS.LOGGED_IN, true);
          this.setState({
            isAuthenticated: true,
            user: userInfo,
            error: null
          });
          return userInfo;
        }
        return null;
      }
      catch(err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err)
        });
      }
    }
    // </getUserProfileSnippet>

    setErrorMessage(message, debug) {
      this.setState({
        error: { message: message, debug: debug }
      });
    }

    normalizeError(error) {
      var normalizedError = {};
      if (typeof (error) === 'string') {
        var errParts = error.split('|');
        normalizedError = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: error };
      } else {
        normalizedError = {
          message: error.message,
          debug: JSON.stringify(error)
        };
      }
      return normalizedError;
    }

    isInteractionRequired(error) {
      if (!error.message || error.message.length <= 0) {
        return false;
      }

      return (
        error.message.indexOf('consent_required') > -1 ||
        error.message.indexOf('interaction_required') > -1 ||
        error.message.indexOf('login_required') > -1 ||
        error.message.indexOf('no_account_in_silent_request') > -1
      );
    }
  }
}
