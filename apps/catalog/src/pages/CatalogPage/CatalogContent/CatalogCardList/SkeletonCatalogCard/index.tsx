import { Box } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import SkeletonCardTemplate from 'components/SkeletonCardTemplate';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

/**
 * Constants to set height and width skeleton for image, large device
 */
const TEXT_SKELETON_IMAGE_WIDTH = 296;
const TEXT_SKELETON_IMAGE_HEIGHT = 150;

/**
 * Constants to set height and width skeleton for image, medium device
 */
const TEXT_SKELETON_IMAGE_TABLET_WIDTH = 203;
const TEXT_SKELETON_IMAGE_TABLET_HEIGHT = 150;

/**
 * Constant to set width for text skeleton subtitle (first and thrid subtitles), large device
 */

const TEXT_SKELETON_SUBTITLE_WIDTH = 234;
/**
 *  Constant to set width for text skeleton subtitle, medium device
 */
const TEXT_SKELETON_SUBTITLE_TABLET_WIDTH = 203;

/**
 *  Constant to set width for the shorter text skeleton subtitle, large device
 */
const TEXT_SKELETON_SUBTITLE_TWO_WIDTH = 117;
/**
 *  Constant to set width for the shorter text skeleton subtitle, medium device
 */
const TEXT_SKELETON_SUBTITLE_TWO_TABLET_WIDTH = 103;

/**
 *  Constant to set height for text skeleton for all subtitles
 */
const TEXT_SKELETON_SUBTITLE_HEIGHT = 16;

/**
 *  Constants to set height and width skeleton for the button on the left
 */
const TEXT_SKELETON_BUTTON_LEFT_WIDTH = 50;
const TEXT_SKELETON_BUTTON_LEFT_HEIGHT = 24;

/**
 *  Constant to set width skeleton for the button on the right, large device
 */
const TEXT_SKELETON_BUTTON_RIGHT_WIDTH = 68;
/**
 *  Constant to set width skeleton for the button on the right, medium device
 */
const TEXT_SKELETON_BUTTON_RIGHT_TABLET_WIDTH = 89;
/**
 *   Constant to set height skeleton for the button on the right
 */
const TEXT_SKELETON_BUTTON_RIGHT_HEIGHT = 34;

/**
 * Identifies skeleton type
 */
export enum SkeletonType {
  Image = 'image',
  Subtitle = 'subtitle',
  SubtitleTwo = 'subtitleTwo',
  ButtonLeft = 'buttonLeft',
  ButtonRight = 'buttonRight',
  SubtitleHeight = 'subtitleHight',
}

/**
 * Function for width conditions for tablet and desktop.
 * Breakpoint parameter is optional because some width do not have a condition
 */
const getWidth = (type: SkeletonType, breakpoint?: number) => {
  if (type === SkeletonType.Image) {
    if (breakpoint! <= Breakpoint.md) {
      return TEXT_SKELETON_IMAGE_TABLET_WIDTH;
    } else {
      return TEXT_SKELETON_IMAGE_WIDTH;
    }
  } else if (type === SkeletonType.Subtitle) {
    if (breakpoint! <= Breakpoint.md) {
      return TEXT_SKELETON_SUBTITLE_TABLET_WIDTH;
    } else {
      return TEXT_SKELETON_SUBTITLE_WIDTH;
    }
  } else if (type === SkeletonType.SubtitleTwo) {
    if (breakpoint! <= Breakpoint.md) {
      return TEXT_SKELETON_SUBTITLE_TWO_TABLET_WIDTH;
    } else {
      return TEXT_SKELETON_SUBTITLE_TWO_WIDTH;
    }
  } else if (type === SkeletonType.ButtonLeft) {
    return TEXT_SKELETON_BUTTON_LEFT_WIDTH;
  } else if (type === SkeletonType.ButtonRight) {
    if (breakpoint! <= Breakpoint.md) {
      return TEXT_SKELETON_BUTTON_RIGHT_TABLET_WIDTH;
    } else {
      return TEXT_SKELETON_BUTTON_RIGHT_WIDTH;
    }
  }
};

/**
 * Function for height conditions for tablet and desktop.
 * Breakpoint parameter is optional because some height do not have a condition
 */
const getHeight = (type: SkeletonType, breakpoint?: number) => {
  if (type === SkeletonType.Image) {
    if (breakpoint! <= Breakpoint.md) {
      return TEXT_SKELETON_IMAGE_TABLET_HEIGHT;
    } else {
      return TEXT_SKELETON_IMAGE_HEIGHT;
    }
  } else if (type === SkeletonType.SubtitleHeight) {
    return TEXT_SKELETON_SUBTITLE_HEIGHT;
  } else if (type === SkeletonType.ButtonLeft) {
    return TEXT_SKELETON_BUTTON_LEFT_HEIGHT;
  } else if (type === SkeletonType.ButtonRight) {
    return TEXT_SKELETON_BUTTON_RIGHT_HEIGHT;
  }
};

const SkeletonCatalogCard: React.FC = () => {
  const breakpoint = useBreakpoint();
  return (
    <SkeletonCardTemplate
      paddingRight="12px"
      paddingLeft="12px"
      paddingBottom="12px"
      flexDirection="column"
      marginBottom={{ md: '22px', lg: '24px', xl: '24px', xxl: '24px' }}
      height={{ md: '319px', lg: '400px', xl: '400px', xxl: '400px' }}
      width={{ md: '227px', lg: '320px', xl: '320px', xxl: '320px' }}
    >
      <Box>
        {/* Image */}
        <Box marginTop="12px">
          <Skeleton
            width={getWidth(SkeletonType.Image, breakpoint)}
            height={getHeight(SkeletonType.Image, breakpoint)}
          />
        </Box>
        {/* Text */}
        <Box marginTop="16px">
          <Skeleton
            width={getWidth(SkeletonType.Subtitle, breakpoint)}
            height={getHeight(SkeletonType.SubtitleHeight)}
          />
        </Box>
        <Box marginTop={{ md: '8px', lg: '16px', xl: '16px', xxl: '16px' }}>
          <Skeleton
            width={getWidth(SkeletonType.SubtitleTwo, breakpoint)}
            height={getHeight(SkeletonType.SubtitleHeight)}
          />
        </Box>
        <Box marginTop={{ md: '8px', lg: '24px', xl: '24px', xxl: '24px' }}>
          <Skeleton
            width={getWidth(SkeletonType.Subtitle, breakpoint)}
            height={getHeight(SkeletonType.SubtitleHeight)}
          />
        </Box>
      </Box>
      {/* Buttons */}
      <Box
        marginTop={{ md: '32px', lg: '85px', xl: '85px', xxl: '85px' }}
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box marginBottom="12px">
          <Skeleton
            width={getWidth(SkeletonType.ButtonLeft)}
            height={getHeight(SkeletonType.ButtonLeft)}
          />
        </Box>
        <Box marginTop="-11px">
          <Skeleton
            width={getWidth(SkeletonType.ButtonRight, breakpoint)}
            height={getHeight(SkeletonType.ButtonRight)}
          />
        </Box>
      </Box>
    </SkeletonCardTemplate>
  );
};

export default SkeletonCatalogCard;
