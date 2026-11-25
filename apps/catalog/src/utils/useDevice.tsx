import { useState, useEffect } from 'react';
import useBreakpoint, { Breakpoint } from './useBreakpoint';

/** Enumeration for the different supported devices. */
export enum Device {
  /** 0px - 767px (xxs, xs, sm) */
  Mobile,
  /** 768px - 1279px (md) */
  Tablet,
  /** 1280px - 1919px (lg, xl) */
  Desktop,
  /** 1920px+ (xxl) */
  Ultrawide,
}

/**
 * Returns Device value based on a given viewport width.
 * @param breakpoint The current breakpoint
 */
const getDevice = (breakpoint: Breakpoint): Device => {
  if (breakpoint <= Breakpoint.sm) return Device.Mobile;
  else if (breakpoint <= Breakpoint.md) return Device.Tablet;
  else if (breakpoint <= Breakpoint.xl) return Device.Desktop;
  else return Device.Ultrawide;
};

/** Hook to access the current Device type based off the screen width. */
const useDevice = () => {
  const breakpoint = useBreakpoint();
  const [device, setDevice] = useState(() => getDevice(breakpoint));

  useEffect(() => {
    setDevice(getDevice(breakpoint));
  }, [breakpoint]);

  return device;
};
export default useDevice;
