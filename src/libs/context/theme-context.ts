import { createContext } from 'react';

export enum Theme {
  DARK = 'dark', LIGHT = 'light'
}

export const ThemeContext = createContext(
  window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT
);