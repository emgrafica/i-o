import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import { getAvatarName } from "../../common/functions/functions";
import UserService from "../../services/userService";
import OktaSignInWidget from "../OktaSignInWidget";
import { AUTH, ROUTER } from "./../../constants";
import "./index.scss";
import PolicyComponent from "./Policy.component";
import { useAppInsightsContext, useTrackEvent } from "@microsoft/applicationinsights-react-js";

const Login = (props) => { 
  const { oktaAuth, authState } = useOktaAuth();

  const { config } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [referrerPath, setReferrerPath] = useState('');

  const appInsights = useAppInsightsContext();
  const trackLogin = useTrackEvent(appInsights, "Login", authState);
  
  useEffect(() => { 
    setReferrerPath(sessionStorage.getItem("referrerPath"));
    (async () => { 
      var settingsResponse = await UserService.getSettings();
      if (
        settingsResponse &&
        settingsResponse.data &&
        settingsResponse.data.length > 0
      ) {
        const settingsData = settingsResponse.data.reduce(
          (obj, item) => ({
            ...obj,
            [item.variable_name]: item.value,
          }),
          {}
        );
        localStorage.setItem(AUTH.SETTINGS, JSON.stringify(settingsData));
        if (settingsData.BROWSER_NAME) {
          document.title = settingsData.BROWSER_NAME;
        }
      } 
      if(settingsResponse == "") {
        window.location.href = "/503";
      }
    })();  
  }, []);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo({
        isAuthenticated: false,
        user: null,
        error: null,
      });

      localStorage.clear();
      sessionStorage.clear();

    } else {
      oktaAuth.getUser().then(async (info) => {
        let pilotUser = await UserService.checkAllowAccess(info.email);
        let currentUser = await getUserProfile(info.email);

        if (!currentUser || currentUser === "undefined" || !currentUser.uid) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = ROUTER.PILOT_MODE;
          return;
        }

        props = { ...props, ...currentUser };
        currentUser.allowAccess = false;

        if (pilotUser && pilotUser.data) {
          currentUser.allowAccess = pilotUser.data.allowed_access;
        }
        const pwdChangedDate = localStorage.getItem(AUTH.CURRENT_USER_PWDCHANGEDATE);
        if(pwdChangedDate){
          currentUser.password_changed_date = pwdChangedDate;
        }

        localStorage.setItem(AUTH.CURRENT_USER, JSON.stringify(currentUser));
        setUserInfo({
          isAuthenticated: true,
          user: currentUser,
          error: null,
        });

        if(referrerPath){
          window.location.href = referrerPath;
        } else{
          window.location.href = "/home";
        }
      });
    }
  }, [authState]); // Update if authState changes

  const onSuccess = (tokens) => {
    trackLogin();
    oktaAuth.handleLoginRedirect(tokens);
    oktaAuth.session.get().then(session=>{
      if(session){
        session.user().then(user => {
          //console.log("USEr", user);
          if(user && user.passwordChanged){
            localStorage.setItem(AUTH.CURRENT_USER_PWDCHANGEDATE, user.passwordChanged);
          }
        });
      }
    });
  };

  const onError = (err) => {
    console.log("error logging in", err);
    setUserInfo({
      isAuthenticated: false,
      user: null,
      error: err,
    });
  };

  // <getUserProfileSnippet>
  const getUserProfile = async (user_email) => {
    try {
      var userResponse = await UserService.getUserDetailByEmail('bnguyen42@dxc.com');

      let user_data = null;
      if (userResponse && userResponse.data && userResponse.data.length > 0) {
        let userData = userResponse.data[0];
        const avatar_name = getAvatarName(userData.name);
        const moreInfo = {
          uid: userData.uid,
          name: userData.name,
          user_name: userData.user_name,
          avatar_name: avatar_name,
          first_name: userData.first_name,
          last_name: userData.last_name,
          employee_number: userData.employee_number,
          mobile_phone: userData.mobile_phone,
          time_zone: userData.timeZone,
          city: userData.city,
          state: userData.state,
          country: userData.country,
          preferred_language: userData.preferred_language,
          manager_name: userData.manager_name,
          location: userData.location,
          locationId: userData.locationId,
          email: userData.email,
        };
        user_data = { ...user_data, ...moreInfo };
      }

      //console.log(userInfo);
      user_data["avatar"] = null;
      //console.log("user info:>>", userInfo);

      return user_data;
    } catch (err) {   
      setUserInfo({
        isAuthenticated: false,
        user: null,
        error: err,
      });
    }
  };

  if (authState.isPending) return null;

  return !authState.isAuthenticated && (
    <div className="wrapper-login-section">
      <div className="bg-login"></div>

      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />

      <PolicyComponent />
    </div>
  );
};

export default Login;
