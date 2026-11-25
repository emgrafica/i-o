import DefaultLumosTheme from '@lumos/core/lib/system/theme';

export default {
  name: 'portal',
  ...DefaultLumosTheme,
  colors: {
    ...DefaultLumosTheme.colors,
    primary: ['#0D1623', '#1E2F46', '#344B6B', '#0870D8', '#00B5E2'],
    secondary: ['#212322', '#3D3F45', '#BCBEC0', '#D9D8D6', '#D2DCE5'],
    impact: ['#0870D8', '#007BFF', '#0A5DB1'],
    background: ['#FFFFFF', '#F4FAFF', '#F2F2F2'],
    state: {
      ...DefaultLumosTheme.colors.state,
      success: '#278802',
      danger: '#CE0E10',
      warning: '#F46606',
      active: '#00B5E2',
      onBlur: '#1E2F46',
      background: '#F4FAFF',
    },
    buttonText: {
      accent: '#000000',
      secondary: '#000000',
    },
  },
  fonts: {
    primary: 'GE Inspira Sans',
  },
};
