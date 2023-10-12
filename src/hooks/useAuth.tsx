import { useContext } from 'react';
import { ReducerContext } from '../context/reducerContext';

type TSetAuth = (isAuthenticated: boolean, tokenData?: object | null) => void;

export default function useAuth(): [boolean, TSetAuth] {
	const reducer = useContext(ReducerContext);

	const auth = reducer.state.isAuthenticated;

	const setAuth: TSetAuth = (isAuthenticated, tokenData = null) => {
		if (isAuthenticated) {
			reducer.dispatch({ type: 'login' });

			if (tokenData) {
				window.localStorage.setItem('token', JSON.stringify(tokenData));
			}
		} else {
			reducer.dispatch({ type: 'logout' });
			window.localStorage.removeItem('token');
		}
	};

	return [auth, setAuth];
}
