/**
 * Get offset of an element form the center of the screen.
 * Used as helper function for opening an article in a new
 * window.
 *
 * @param {Number} w - element width
 * @param {Number} h - element height
 *
 * @return {Object} offsets
 */
const getWindowOffsets = (w: number, h: number) => {
  let leftOffset = 0;
  let topOffset = 0;
  leftOffset = window.screen.width / 2 - w / 2;
  topOffset = window.screen.height / 2 - h / 2;

  return { leftOffset, topOffset };
};

const openWindows: { [key: string]: Window | null } = {};

/**
 * Opens an article in a new window
 *
 * @param url - url to open
 * @param options.width - width of the windows, defaulted to 900 px
 * @param options.height - height of the window, defaulted to 700 px
 * @param options.avoidDuplicates - if true and a windows with the given url is open,
 * will bring focus to the windows instead of reopening a new one.
 */
export const openInWindow = (
  url: string,
  {
    width = 900,
    height = 700,
    avoidDuplicates = true,
  }: { width?: number; height?: number; avoidDuplicates?: boolean } = {},
) => {
  const { leftOffset, topOffset } = getWindowOffsets(width, height);
  try {
    const alreadyOpen = openWindows[url] && !openWindows[url]!.closed;
    if (avoidDuplicates && alreadyOpen) {
      openWindows[url]!.focus();
    } else {
      openWindows[url] = window.open(
        `${url}`,
        `_blank`,
        `
      toolbar=no,
      scrollbars=1,
      menubar=no,
      resizable=no,
      height=${height},
      width=${width},
      top=${topOffset},
      left=${leftOffset}
      `,
      );
    }
  } catch (e) {
    console.error(e);
  }
};
