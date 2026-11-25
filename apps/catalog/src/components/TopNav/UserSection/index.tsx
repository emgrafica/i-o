import React, { useState } from 'react';
import { Box, Grid, Typography, PopoverMenu } from '@lumos/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { USER_PROFILE_TOP_NAV } from './queries';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import {
  UserProfileTopNav,
  UserProfileTopNavVariables,
} from './queries/gqlTypes/UserProfileTopNav';
import LogoutModal from '../LogoutModal';
import AvatarWithOverlay from 'components/AvatarWithOverlay';
import { StyledOBOAvatarIcon } from 'components/StyledOBOAvatarIcon';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { showWipSignOut } from 'utils/showWorkInProgress';

/**
 * Renders Request items for the Request section in the navigation
 * @param props
 */
const UserSection: React.FC = () => {
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;

  const userId = useUserId();
  const { t } = useTranslation('topNav');
  const [expanded, setExpanded] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const menuOptions = [
    {
      label: t('signOut'),
      value: '',
      onClickFn: () => {
        setExpanded(!expanded);
        setLogoutModalOpen(true);
      },
    },
  ];

  // Query for Profile
  const { loading, data, error } = useQuery<
    UserProfileTopNav,
    UserProfileTopNavVariables
  >(USER_PROFILE_TOP_NAV, {
    variables: {
      userId,
    },
  });

  if (loading || error || !data) return <></>;

  const userNameAndLogo = (
    <Grid
      alignItems="center"
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <Box marginRight={3}>
        <AvatarWithOverlay
          avatar={data.userProfile.avatar as string}
          avatarHeight="40px"
          avatarWidth="40px"
          childrenLeftPosition="-15px"
          childrenTopPosition="0px"
        >
          {oboUser && (
            <StyledOBOAvatarIcon
              height="40px"
              width="40px"
              alt="OBO Avatar Image"
            />
          )}
        </AvatarWithOverlay>
      </Box>
      <Grid alignItems="center">
        <Typography kind="button" fontWeight="bold">
          {data.userProfile.preferredName || data.userProfile.firstName}
        </Typography>
        {showWipSignOut &&
          (expanded ? (
            <ExpandLess fontSize="large" />
          ) : (
            <ExpandMore fontSize="large" />
          ))}
      </Grid>
    </Grid>
  );

  return (
    <>
      {showWipSignOut ? (
        <PopoverMenu id="userMenu" options={menuOptions}>
          {userNameAndLogo}
        </PopoverMenu>
      ) : (
        userNameAndLogo
      )}
      <LogoutModal
        isModalOpen={logoutModalOpen}
        setIsModalOpen={setLogoutModalOpen}
      />
    </>
  );
};

export default UserSection;
