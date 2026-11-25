// @ts-nocheck
import { useState, useEffect } from 'react';
import theme from './lumosTheme';

/** Enumeration for the different supported breakpoints. */
export enum Breakpoint {
  /** 0px - 374px */
  xxs,
  /** 375px - 599px */
  xs,
  /** 600px - 767px */
  sm,
  /** 768px - 1279px */
  md,
  /** 1280px - 1439px */
  lg,
  /** 1440px - 1919px */
  xl,
  /** 1920px and above */
  xxl,
}

const parseBreakpoint = (width: string): number => {
  return parseInt(width, 10);
};

/**
 * Returns size value based on a given viewport width.
 * @param width The viewport width
 */
const getBreakpoint = (width: number): Breakpoint => {
  if (width >= parseBreakpoint(theme.breakpoints.xxl)) return Breakpoint.xxl;
  else if (width >= parseBreakpoint(theme.breakpoints.xl)) return Breakpoint.xl;
  else if (width >= parseBreakpoint(theme.breakpoints.lg)) return Breakpoint.lg;
  else if (width >= parseBreakpoint(theme.breakpoints.md)) return Breakpoint.md;
  else if (width >= parseBreakpoint(theme.breakpoints.sm)) return Breakpoint.sm;
  else if (width >= parseBreakpoint(theme.breakpoints.xs)) return Breakpoint.xs;
  else return Breakpoint.xxs;
};

/** Hook to access the current breakpoint of the screen. */
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
export default useBreakpoint;
