import React from 'react';
import { Avatar } from '@lumos/core';
import { AvatarSizeType } from '@lumos/core/lib/components/Avatar/Avatar.style';
import { StyledOverlay } from './index.style';

/**
 * AvatarWithOverlay Props
 *
 * @param avatar avatar image path.
 * @param avatarHeight accepts Lumos avatar height. The Lumos height CSS property specifies the height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
 * @param avatarWidth accepts Lumos avatar width. The Lumos width utility parses a component's width prop and converts it into a CSS width declaration. - Numbers from 0-1 are converted to percentage widths. - Numbers greater than 1 are converted to pixel values. - String values are passed as raw CSS values. - And arrays are converted to responsive width styles.
 * @param childrenLeftPosition string left position in pixels to place overlay children.
 * @param childrenTopPosition string top position in pixels to place overlay children.
 */
interface AvatarWithOverlayProps {
  avatar: string;
  avatarHeight:
    | string
    | number
    | (string | number | null)[]
    | {
        [x: string]: string | number | undefined;
        [x: number]: string | number | undefined;
      }
    | null
    | undefined;
  avatarWidth:
    | string
    | number
    | (string | number | null)[]
    | {
        [x: string]: string | number | undefined;
        [x: number]: string | number | undefined;
      }
    | null
    | undefined;
  childrenLeftPosition:
    | string
    | {
        [x: string]: string | number | undefined;
        [x: number]: string | number | undefined;
      };
  childrenTopPosition:
    | string
    | {
        [x: string]: string | number | undefined;
        [x: number]: string | number | undefined;
      };
  size?: AvatarSizeType;
}

/**
 * AvatarWithOverlay Component accepts any children to display on top of an Avatar
 *
 */
const AvatarWithOverlay: React.FC<AvatarWithOverlayProps> = ({
  children,
  avatar,
  avatarHeight,
  avatarWidth,
  childrenLeftPosition,
  childrenTopPosition,
  size,
}) => {
  return (
    <>
      <StyledOverlay left={childrenLeftPosition} top={childrenTopPosition}>
        {children}
      </StyledOverlay>

      <Avatar
        imagePath={avatar}
        alt="Avatar"
        height={avatarHeight}
        width={avatarWidth}
        size={size}
      />
    </>
  );
};

export default AvatarWithOverlay;
