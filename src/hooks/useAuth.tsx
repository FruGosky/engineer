import { useContext } from 'react';
import { ReducerContext } from '../context/reducerContext';

type TSetAuth = (value: boolean) => void;

export default function useAuth(): [boolean, TSetAuth] {
	const reducer = useContext(ReducerContext);

	const auth = reducer.state.isAuthenticated;

	const setAuth: TSetAuth = (value) => {
		if (value) {
			reducer.dispatch({ type: 'login' });
		} else {
			reducer.dispatch({ type: 'logout' });
		}
	};

	return [auth, setAuth];
}
