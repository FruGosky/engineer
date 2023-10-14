import React, { useReducer, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import { reducer, initialState } from './reducer/reducer';
import { ReducerContext } from './context/reducerContext';
import { AuthContext } from './context/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ContentRoutes from './components/ContentRoutes/ContentRoutes';
import ErrorBoundary from './hoc/ErrorBoundary';
import './translations/translations';
import { ThemeContext, TTheme } from './context/themeContext';
import { Toaster } from 'react-hot-toast';
import ModalsContextProvider from './context/modalsContext';

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const localTheme = localStorage.getItem('theme');
	const localThemeColor =
		(localTheme === 'dark' ? 'dark' : 'light') ?? 'light';
	const [theme, setTheme] = useState<TTheme>(localThemeColor);

	return (
		<div className={`App bg-body bs-text-${theme}`} data-bs-theme={theme}>
			<AuthContext.Provider
				value={{
					isAuthenticated: state.isAuthenticated,
					login: () => dispatch({ type: 'login' }),
					logout: () => dispatch({ type: 'logout' }),
				}}
			>
				<ReducerContext.Provider
					value={{
						state: state,
						dispatch: dispatch as React.Dispatch<any>,
					}}
				>
					<ThemeContext.Provider value={[theme, setTheme]}>
						<Router>
							<ErrorBoundary>
								<Toaster />
								<ModalsContextProvider>
									<Layout
										header={<Header />}
										content={<ContentRoutes />}
										footer={<Footer />}
									/>
								</ModalsContextProvider>
							</ErrorBoundary>
						</Router>
					</ThemeContext.Provider>
				</ReducerContext.Provider>
			</AuthContext.Provider>
		</div>
	);
}
