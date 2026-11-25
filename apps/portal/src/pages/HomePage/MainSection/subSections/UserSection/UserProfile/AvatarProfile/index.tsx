import React from 'react';
import AvatarWithOverlay from 'components/AvatarWithOverlay';
import { StyledOBOAvatarIcon } from 'components/StyledOBOAvatarIcon';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import useDevice, { Device } from 'utils/useDevice';
//import { useOBOInfoLocalState } from 'store/apollo/store/hooks';

//----------------------------------------------------------------------------
// Responsiveness Constants
//----------------------------------------------------------------------------
const avatarHeight = { xs: '50px', sm: '110px', md: '110px', xl: '110px' };
const avatarWidth = { xs: '50px', sm: '110px', md: '110px', xl: '110px' };
const avatarOBOLeftPosition = { xs: '-5px', sm: '0px' };
const avatarOBOTopPosition = { xs: '10px', sm: '67px' };

/**
 * AvatarProfile Props
 */
interface AvatarProfileProps {
  avatar: string;
}

/**
 * Sets the appropriate Avatar size based on device
 * @param device - Current viewport width
 */
const getAvatarSize = (device: number) => {
  if (device <= Device.Tablet) return 'md';
};

/**
 * AvatarProfile Component
 */
const AvatarProfile: React.FC<AvatarProfileProps> = ({ avatar }) => {
  const breakpoint = useBreakpoint();
  const device = useDevice();
  //const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser: any = true; //oboInfoLocalState && oboInfoLocalState.user;
  return (
    <AvatarWithOverlay
      avatar={avatar}
      avatarHeight={avatarHeight}
      avatarWidth={avatarWidth}
      childrenLeftPosition={avatarOBOLeftPosition}
      childrenTopPosition={avatarOBOTopPosition}
      size={getAvatarSize(device)}
    >
      {oboUser && (
        <StyledOBOAvatarIcon
          height={breakpoint < Breakpoint.sm ? '30px' : '40px'}
          width={breakpoint < Breakpoint.sm ? '30px' : '40px'}
          alt="OBO Avatar Image"
        />
      )}
    </AvatarWithOverlay>
  );
};

export default AvatarProfile;
