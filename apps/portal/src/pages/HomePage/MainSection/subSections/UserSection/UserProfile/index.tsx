import React from 'react';
import { Box, Grid, Typography } from '@lumos/core';
//import { useUserId } from 'containers/AuthContainer/AuthContext';
//import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import AvatarProfile from './AvatarProfile';
import { useUserGreeting } from './utils';
// import {AUTH} from 'constants/authConstants';
import UserService from 'services/userServices';
import styled from 'styled-components';

const LeftUserDetail = styled.span`
  min-width: 100px;
  display: inline-block;
  padding: 8px 0 0 0;
`;
// Constants to set height and width for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;
const TEXT_SKELETON_DEFAULT_WIDTH = 234;
const TEXT_SKELETON_SMALL_WIDTH = 210;

/**
 * User avatar and customized greeting
 */

const UserProfile: React.FC = () => {
  //const userId = useUserId();
  //const breakpoint = useBreakpoint();

  // const { loading, data, error } = useQuery<
  //   UserProfileHome,
  //   UserProfileHomeVariables
  // >(USER_PROFILE_HOME, {
  //   variables: {
  //     userId,
  //   },
  // });

  let dataUser: any = UserService.getCurrentUser();

  let avatar: string | null = '';
  let name: string | null = '',
    first_name = '',
    employee_number = '',
    //location = '',
    manager_name = '';
  if (dataUser) {
    ({
      avatar,
      name,
      first_name,
      employee_number,
      //location,
      manager_name,
    } = dataUser);
  }
  // Fetches internationalized greeting text based on user's system time
  const greeting = useUserGreeting();

  // if (error) {
  //   throw new Error(error.message);
  // }

  return (
    <Grid
      flexDirection={{ xs: 'row', sm: 'column' }}
      alignItems={{ xxs: 'center', sm: 'flex-start', md: 'flex-start' }}
      paddingLeft={{ xs: '23px', s: '38px' }}
    >
      <Box marginTop={{ sm: '25px' }}>
        <AvatarProfile avatar={avatar ? avatar : ''} />
      </Box>
      <Grid flexDirection="column">
        <Typography
          // id="userGreeting"
          color="secondary.0"
          kind="h1"
          fontWeight={600}
          fontSize={{ xxs: 1, sm: 2 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginBottom={0}
        >
          {greeting}
        </Typography>
        <Typography
          id="userPreferredGreeting"
          color="secondary.0"
          kind="h4"
          fontSize={{ xxs: 1, sm: 1 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginTop={0}
        >
          <>
            <LeftUserDetail style={{ minWidth: '100px' }}>
              Employee no
            </LeftUserDetail>
            <span>: {employee_number}</span>
          </>
        </Typography>
        <Typography
          id="userPreferredGreeting"
          color="secondary.0"
          kind="h4"
          fontSize={{ xxs: 1, sm: 1 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginTop={0}
        >
          <>
            <LeftUserDetail style={{ minWidth: '100px' }}>
              Fullname
            </LeftUserDetail>
            <span>: {`${name || first_name}`}</span>
          </>
        </Typography>

        <Typography
          id="userPreferredLocation"
          color="secondary.0"
          kind="h4"
          fontSize={{ xxs: 1, sm: 1 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginTop={0}
        >
          <>
            <LeftUserDetail style={{ minWidth: '100px' }}>
              Manager
            </LeftUserDetail>
            <span>: {manager_name}</span>
          </>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
