import React from 'react';
import { Box, Grid, Typography } from '@lumos/core';
import { useQuery } from '@apollo/react-hooks';
import Skeleton from 'react-loading-skeleton';
import {
  UserProfileHome,
  UserProfileHomeVariables,
} from '../../../../queries/gqlTypes/UserProfileHome';
import { USER_PROFILE_HOME } from '../../../../queries';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import AvatarProfile from './AvatarProfile';
import { useUserGreeting } from './utils';

// Constants to set height and width for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;
const TEXT_SKELETON_DEFAULT_WIDTH = 234;
const TEXT_SKELETON_SMALL_WIDTH = 210;

/**
 * User avatar and customized greeting
 */
const UserProfile: React.FC = () => {
  const userId = useUserId();
  const breakpoint = useBreakpoint();

  const { loading, data, error } = useQuery<
    UserProfileHome,
    UserProfileHomeVariables
  >(USER_PROFILE_HOME, {
    variables: {
      userId,
    },
  });

  let avatar: string | null = '';
  let preferredName: string | null = '';
  let firstName = '';

  if (data && data.userProfile) {
    ({ avatar, preferredName, firstName } = data.userProfile);
  }

  // Fetches internationalized greeting text based on user's system time
  const greeting = useUserGreeting();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Grid
      flexDirection={{ xs: 'row', sm: 'column' }}
      alignItems={{ xxs: 'center', sm: 'flex-start', md: 'flex-start' }}
      paddingLeft={{ xs: '23px', s: '38px' }}
    >
      <Box marginTop={{ sm: '25px' }}>
        {loading ? (
          <Skeleton
            circle={true}
            height={breakpoint <= Breakpoint.xs ? 50 : 110}
            width={breakpoint <= Breakpoint.xs ? 50 : 110}
          />
        ) : (
          avatar && <AvatarProfile avatar={avatar} />
        )}
      </Box>
      <Grid flexDirection="column">
        <Typography
          id="userGreeting"
          color="secondary.0"
          kind="h1"
          fontWeight={600}
          fontSize={{ xxs: 5, sm: 7 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginBottom={0}
        >
          {loading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={
                breakpoint <= Breakpoint.sm
                  ? TEXT_SKELETON_SMALL_WIDTH
                  : TEXT_SKELETON_DEFAULT_WIDTH
              }
            />
          ) : (
            greeting
          )}
        </Typography>
        <Typography
          id="userPreferredGreeting"
          color="secondary.0"
          kind="h1"
          fontWeight={600}
          fontSize={{ xxs: 5, sm: 7 }}
          marginLeft={{ xxs: '25px', sm: 0, md: 0 }}
          marginTop={0}
        >
          {loading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={
                breakpoint <= Breakpoint.sm
                  ? TEXT_SKELETON_SMALL_WIDTH
                  : TEXT_SKELETON_DEFAULT_WIDTH
              }
            />
          ) : (
            `${preferredName || firstName}!`
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
