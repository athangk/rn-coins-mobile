import { MD2LightTheme, useTheme } from 'react-native-paper';

export const theme = {
  ...MD2LightTheme,
  colors: {
    ...MD2LightTheme.colors,
    mainDark: '#242320',
    darkPurple: '#1f0329',
    mainPurple: '#290038',
    lightPurple: '#29003877',
    brightPurple: '#b20db5',
    mainOrange: '#ffb380',
    mainRed: '#fc037b',
    mainErrorRed: '#fc0331',
    mainWhite: '#fcfafa',
    mainWhiteLight: '#fcfafa88',
    mainYellow: '#f7eb39',
    darkOrange: '#fc934c',
    placeholder: 'white',
    text: 'white',
    primary: 'white',
    underlineColor: 'transparent',
    background: '#290038'
  }
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
