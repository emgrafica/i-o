declare const DefaultLumosTheme: {
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    gradient: string[][];
    grayScale: string[];
    state: {
      success: string;
      warning: string;
      danger: string;
      active: string;
      productPrimary: string;
    };
    background: {
      enabled: string;
      hover: string;
      focus: string;
      disabled: string;
    };
    button: {
      primary: {
        enabled: string;
        hover: string;
        pressed: string;
      };
      accent: {
        enabled: string;
        hover: string;
        pressed: string;
      };
    };
    form: {
      text: {
        label: {
          enabled: string;
          disabled: string;
        };
        input: {
          placeholder: string;
          enabled: string;
          disabled: string;
        };
        menu: {
          enabled: string;
          hover: string;
        };
      };
      input: {
        border: {
          enabled: string;
          focus: string;
          disabled: string;
        };
        background: {
          enabled: string;
          disabled: string;
        };
      };
    };
    navigation: {
      dark: string;
      bright: string;
      medium: string;
      light: string;
      text: {
        dark: string;
        light: string;
        disabled: string;
      };
    };
  };
  fonts: {
    primary: string;
  };
  fontSizes: number[];
  sizes: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  space: number[];
  zIndices: number[];
  radii: number[];
  lineHeights: number[];
  shadows: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: string[] & {
    [key: string]: any;
  };
  gutters: number[] & {
    [key: string]: any;
  };
};
export default DefaultLumosTheme;
