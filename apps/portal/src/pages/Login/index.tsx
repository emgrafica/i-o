// @ts-nocheck
import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import OktaSignInWidget from './OktaSignInWidget';
import { Grid, Row, Col, Box } from '@lumos/core';
import { BackgroundLoginBox } from './Login.style';
import { HomePath, PilotModePath } from 'utils/routes';
import UserService from 'services/userServices';
import { getAvatarName } from 'utils/function';
import { AUTH } from 'constants/authConstants';

import {
  PilotImage,
} from 'assets/images';
import { useHistory } from 'react-router-dom';


const Login = (props: any) => {
  const { oktaAuth } = useOktaAuth();
  const { config } = props;
  const history = useHistory();

  useEffect(() => {
    oktaAuth.isAuthenticated().then((res: any) => {
      if (res) {
        window.location.href = HomePath;
      }
    });
  }, []);


  const onSuccess = async (tokens: any) => {
    let currentUser = await getUserProfile(tokens.accessToken.claims.sub);
    const userName = currentUser.user_name;
    const checkUserPilot = await UserService.checkUserPilotMode(userName);
    const statusCheckPilot = checkUserPilot.data?.success;
    if (!!currentUser) {
      UserService.saveCurrentUser(currentUser);
      oktaAuth.handleLoginRedirect(tokens);
      oktaAuth.session.get().then((session: any) => {
        if (session) {
          session.user().then((user: any) => {
            if (user && user.passwordChanged) {
              localStorage.setItem(
                AUTH.CURRENT_USER_SECRET_KEY_CHANGEDATE,
                user.passwordChanged,
              );
            }
            if (statusCheckPilot === false) {
              history.push(PilotModePath);
            }
          });
        }
      });
    } else {
      oktaAuth.signOut();
    }
  };

  const getUserProfile = async (user_email: String) => {
    try {
      var userResponse = await UserService.getUserDetailByEmail(user_email);
      let user_data = {};
      if (userResponse && userResponse.data && userResponse.data.length > 0) {
        let userData = userResponse.data[0];
        const moreInfo = {
          uid: userData.uid,
          name: userData.name,
          user_name: userData.user_name,
          phone: userData.phone,
          // avatar_name: avatar_name,
          first_name: userData.first_name,
          last_name: userData.last_name,
          employee_number: userData.employee_number,
          vip: userData.vip,
          photo: userData.photo,
          mobile_phone: userData.mobile_phone,
          time_zone: userData.timeZone,
          avatar_name: getAvatarName(userData.name),
          city: userData.city,
          state: userData.state,
          country: userData.country,
          department: userData.department,
          manager_email: userData.manager_email,
          preferred_language: userData.preferred_language,
          manager_name: userData.manager_name,
          location: userData.location,
          locationId: userData.locationId,
          email: userData.email,
          address: userData.address,
        };
        user_data = { ...user_data, ...moreInfo };
      }
      return user_data;
    } catch (err) {
      return null;
    }
  };

  return (
    <Box
      height="100%"
      width="100%"
      paddingBottom="32px"
      paddingTop="10px"
      display="flex"
      justifyContent="center"
      backgroundColor="#fafafa"
    >
      <Grid
        height="100%"
        width="100%"
        maxWidth={{
          xs: '340px',
          sm: '800px',
          md: '900px',
          lg: '1095px',
          xl: '1400px',
          xxl: '1400px',
        }}
        backgroundColor="secondary.4"
      >
        <Row>
          <Col colspan={{
            xxs: '12',
            xs: '12',
            sm: '12',
            md: '6',
            lg: '8',
            xl: '8',
            xxl: '8',
          }}>
            <Box
              height={{
                xxs: '200px',
                xs: '200px',
                sm: '200px',
                md: '100%',
              }}
              width="100%"
              display="flex"
              backgroundImage={{
                _: `url(${PilotImage})`,
              }}
              backgroundSize={{ xxs: 'contain', xxl: 'contain' }}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              justifyContent="center"
            ></Box>
          </Col>
          <Col colspan={{
            xxs: '12',
            xs: '12',
            sm: '12',
            md: '6',
            lg: '4',
            xl: '4',
            xxl: '4',
            }}>
            <Box>
              <BackgroundLoginBox className="bg-login" />
              <OktaSignInWidget
                config={config}
                onSuccess={onSuccess}
                onError={() => { }}
              />
            </Box>
          </Col>
        </Row>
      </Grid>
    </Box>
  );
};

export default Login;
