/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#E91E63'; // Pink
const tintColorDark = '#F8BBD9'; // Light pink

export const Colors = {
  light: {
    text: '#2D2D2D',
    background: '#fff',
    tint: tintColorLight,
    icon: '#E91E63',
    tabIconDefault: '#C2185B',
    tabIconSelected: tintColorLight,
    primary: '#E91E63',
    secondary: '#F8BBD9',
    accent: '#FCE4EC',
    surface: '#FFFFFF',
    onSurface: '#2D2D2D',
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D2D2D',
    tint: tintColorDark,
    icon: '#F8BBD9',
    tabIconDefault: '#E1BEE7',
    tabIconSelected: tintColorDark,
    primary: '#F8BBD9',
    secondary: '#E91E63',
    accent: '#AD1457',
    surface: '#424242',
    onSurface: '#FFFFFF',
  },
};
