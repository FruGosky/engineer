import React, { useReducer } from 'react';
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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="App">
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
					<Router>
						<Layout
							header={<Header />}
							content={
								<ErrorBoundary>
									<ContentRoutes />
								</ErrorBoundary>
							}
							footer={<Footer />}
						/>
					</Router>
				</ReducerContext.Provider>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
