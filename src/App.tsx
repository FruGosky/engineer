import React, { useEffect, useReducer } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import { reducer as reducerV, initialState } from './reducer/reducer';
import LoadingIcon from './components/LoadingIcon/LoadingIcon';
import { ReducerContext } from './context/reducerContext';
import { AuthContext } from './context/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ContentRoutes from './components/ContentRoutes/ContentRoutes';

function App() {
	const [state, dispatch] = useReducer(reducerV, initialState);

	useEffect(() => {
		setTimeout(() => {
			dispatch({ type: 'set-loading', loading: false });
		}, 1_000);
	}, []);

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
								<>
									<ContentRoutes />
									{state.loading ? <LoadingIcon /> : null}
								</>
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
