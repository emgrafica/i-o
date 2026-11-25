//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, PopoverMenu } from '@lumos/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import LogoutModal from '../LogoutModal';
import AvatarWithOverlay from 'components/AvatarWithOverlay';
import { StyledOBOAvatarIcon } from 'components/StyledOBOAvatarIcon';
import { showWipSignOut } from 'utils/showWorkInProgress';
import { OktaAuth } from '@okta/okta-auth-js';
import UserService from 'services/userServices';
import { LoginPath } from '../../../utils/routes';

import styled from 'styled-components';
import { IoOverlay } from '@i-o/design-system';

const BoxInfo = styled.div`
  display: flex;
`;
interface UserSection {
  oktaAuth?: OktaAuth;
}

/**
 * Renders Request items for the Request section in the navigation
 * @param props
 */
const UserSection: React.FC<IUserSection> = props => {
  //const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = null;//oboInfoLocalState && oboInfoLocalState.user;

  //const userId = useUserId();
  const { t } = useTranslation('topNav');
  const [expanded, setExpanded] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [imgUserInfo, setImgUserInfo] = useState();
  const [showImg, setShowImg] = useState(true);
  const [overlayInfo, setOverlayInfo] = useState(false);
  const ref = useRef(null);
  const { oktaAuth,color } = props;
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
  // const { loading, data, error } = useQuery<
  //   UserProfileTopNav,
  //   UserProfileTopNavVariables
  // >(USER_PROFILE_TOP_NAV, {
  //   variables: {
  //     userId,
  //   },
  // });
  let dataUser: any = UserService.getCurrentUser();

  useEffect(() => {
    const getAvatartUser = async () => {
      let userInfo = UserService.getCurrentUser();

      if (!userInfo) {
        const response = await UserService.getUserDetailByEmail(dataUser.email);
        userInfo = response.data[0];
      }
      if (userInfo != null) {
        const ImageUserInfo = userInfo.photo;
        setImgUserInfo(ImageUserInfo);
        setShowImg(true);
      } else {
        setShowImg(false);
        return 'not valued';
      }
    };
    getAvatartUser();
  }, []);

  useEffect(() => {
    const handleClick = e => {
      if (ref.current.contains(e.target)) return;
      setExpanded(false);
      setOverlayInfo(false);
    };
    document.addEventListener('click', handleClick, false);
    return () => {
      document.removeEventListener('click', handleClick, false);
      setExpanded(false);
      setOverlayInfo(false);
    };
  }, []);

  if (!dataUser) {
    if (oktaAuth) oktaAuth.signOut();
    return <></>;
  }

  const userNameAndLogo = (
    <Grid
      alignItems="center"
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <Box marginRight={3}>
        {imgUserInfo && showImg ? (
          <Avatar src={imgUserInfo} style={{ height: '40px', width: '40px' }} />
        ) : (
          <AvatarWithOverlay
            avatar={dataUser.avatar as string}
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
        )}
      </Box>
      <Grid alignItems="center">
        <Typography kind="button" fontWeight="bold" color={props.color ? props.color : "#fff"}>
          {dataUser.avatar_name}
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
        <div ref={ref}>
          <BoxInfo
            onClick={() => {
              setExpanded(!expanded);
              setOverlayInfo(!overlayInfo);
            }}
          >
            {userNameAndLogo}
          </BoxInfo>
          {overlayInfo && (
            <IoOverlay
              userInfo={dataUser}
              imgAvatar={localStorage.getItem('IMAGE_USER_INFO')}
              language=""
              handleLogout={() => setLogoutModalOpen(true)}
            />
          )}
        </div>
      ) : (
        userNameAndLogo
      )}
      <LogoutModal
        isModalOpen={logoutModalOpen}
        setIsModalOpen={setLogoutModalOpen}
        signOutFC={() => {
          if (oktaAuth) {
            oktaAuth.signOut();
            localStorage.clear();
            window.location.href = LoginPath;
          }
        }}
      />
    </>
  );
};

export default UserSection;
