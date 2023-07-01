import React from 'react';

type TThemeContext = [TTheme, React.Dispatch<TTheme>];
export type TTheme = 'dark' | 'light';

export const ThemeContext = React.createContext<TThemeContext>([
	'light',
	() => {},
]);

ThemeContext.displayName = 'ThemeContext';
