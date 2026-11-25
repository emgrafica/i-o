import GEInspiraRegular from 'assets/fonts/GEInspiraSans-Regular-v02.woff';
import GEInspiraBold from 'assets/fonts/GEInspiraSans-Bold-v02.woff';

export const GE_INSPIRA_FONT_FACES = `
  @font-face {
    font-family: 'GE Inspira Sans';
    font-style: normal;
    font-weight: normal;
    src: local('GE Inspira Sans Regular'), local('GEInspiraSans-Regular'), url(${GEInspiraRegular}) format('woff');
  }
  @font-face {
    font-family: 'GE Inspira Sans';
    font-style: normal;
    font-weight: bold;
    src: local('GE Inspira Sans Bold'), local('GEInspiraSans-Bold'), url(${GEInspiraBold}) format('woff');
  }
`;

/**
 * Injects a style tag in <head> element of the document with given id
 *
 * @param {string} cssString - CSS string with font faces you want the browser to load
 * @param {string} styleId - Id of the style tag to be injected into the document
 */
const loadFonts = (cssString: string, styleId: string): void => {
  if (!document.getElementById(`#${styleId}`)) {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerHTML = cssString;
    style.id = `#${styleId}`;
    head.appendChild(style);
  }
};

/** Loads the Ge Inspira font */
export const loadGeInspiraFont = () => {
  loadFonts(GE_INSPIRA_FONT_FACES, 'ge-inspira-font');
};
