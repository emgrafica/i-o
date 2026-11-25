import React from 'react';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import useDevice, { Device } from 'utils/useDevice';

/** Props for the ShowFor component */
interface ShowForProps {
  /** If set the content will be shown in the mobile screen sizes*/
  mobile?: boolean;
  /** If set the content will be shown in the tablet screen sizes*/
  tablet?: boolean;
  /** If set the content will be shown in the desktop screen sizes*/
  desktop?: boolean;
  /** If set the content will be shown in the ultrawide screen sizes*/
  ultrawide?: boolean;
  /** If set the content will be shown in the xxs breakpoint*/
  xxs?: boolean;
  /** If set the content will be shown in the xs breakpoint*/
  xs?: boolean;
  /** If set the content will be shown in the sm breakpoint*/
  sm?: boolean;
  /** If set the content will be shown in the md breakpoint*/
  md?: boolean;
  /** If set the content will be shown in the lg breakpoint*/
  lg?: boolean;
  /** If set the content will be shown in the xl breakpoint*/
  xl?: boolean;
  /** If set the content will be shown in the xxl breakpoint*/
  xxl?: boolean;

  /** If set the content will be shown in the tablet screen sizes and smaller*/
  tabletAndSmaller?: boolean;
  /** If set the content will be shown in the desktop screen sizes and smaller*/
  desktopAndSmaller?: boolean;
  /** If set the content will be shown in the xxs breakpoint and smaller*/
  xsAndSmaller?: boolean;
  /** If set the content will be shown in the sm breakpoint and smaller*/
  smAndSmaller?: boolean;
  /** If set the content will be shown in the md breakpoint and smaller*/
  mdAndSmaller?: boolean;
  /** If set the content will be shown in the lg breakpoint and smaller*/
  lgAndSmaller?: boolean;
  /** If set the content will be shown in the xl breakpoint and smaller*/
  xlAndSmaller?: boolean;

  /** If set the content will be shown in the tablet screen sizes and larger*/
  tabletAndLarger?: boolean;
  /** If set the content will be shown in the desktop screen sizes and larger*/
  desktopAndLarger?: boolean;
  /** If set the content will be shown in the xs breakpoint and larger*/
  xsAndLarger?: boolean;
  /** If set the content will be shown in the sm breakpoint and larger*/
  smAndLarger?: boolean;
  /** If set the content will be shown in the md breakpoint and larger*/
  mdAndLarger?: boolean;
  /** If set the content will be shown in the lg breakpoint and larger*/
  lgAndLarger?: boolean;
  /** If set the content will be shown in the xl breakpoint and larger*/
  xlAndLarger?: boolean;
}

/**
 * Display content when the size of the screen
 * belongs to one of the specified ranges
 */
const ShowFor: React.FC<ShowForProps> = props => {
  const device = useDevice();
  const breakpoint = useBreakpoint();
  const shouldRender =
    (props.mobile && device === Device.Mobile) ||
    (props.tablet && device === Device.Tablet) ||
    (props.desktop && device === Device.Desktop) ||
    (props.ultrawide && device === Device.Ultrawide) ||
    (props.xxs && breakpoint === Breakpoint.xxs) ||
    (props.xs && breakpoint === Breakpoint.xs) ||
    (props.sm && breakpoint === Breakpoint.sm) ||
    (props.md && breakpoint === Breakpoint.md) ||
    (props.lg && breakpoint === Breakpoint.lg) ||
    (props.xl && breakpoint === Breakpoint.xl) ||
    (props.xxl && breakpoint === Breakpoint.xxl) ||
    //
    (props.tabletAndSmaller && device <= Device.Tablet) ||
    (props.desktopAndSmaller && device <= Device.Desktop) ||
    (props.xsAndSmaller && breakpoint <= Breakpoint.xs) ||
    (props.smAndSmaller && breakpoint <= Breakpoint.sm) ||
    (props.mdAndSmaller && breakpoint <= Breakpoint.md) ||
    (props.lgAndSmaller && breakpoint <= Breakpoint.lg) ||
    (props.xlAndSmaller && breakpoint <= Breakpoint.xl) ||
    //
    (props.tabletAndLarger && device >= Device.Tablet) ||
    (props.desktopAndLarger && device >= Device.Desktop) ||
    (props.xsAndLarger && breakpoint >= Breakpoint.xs) ||
    (props.smAndLarger && breakpoint >= Breakpoint.sm) ||
    (props.mdAndLarger && breakpoint >= Breakpoint.md) ||
    (props.lgAndLarger && breakpoint >= Breakpoint.lg) ||
    (props.xlAndLarger && breakpoint >= Breakpoint.xl);

  return <>{shouldRender && props.children}</>;
};

export default ShowFor;
