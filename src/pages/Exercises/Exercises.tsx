import { useContext, useEffect } from 'react';
import { ReducerContext } from '../../context/reducerContext';

export default function Exercises() {
	const reducer = useContext(ReducerContext);

	useEffect(() => {
		reducer.dispatch({ type: 'set-loading', loading: true });

		setTimeout(() => {
			reducer.dispatch({ type: 'set-loading', loading: false });
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (reducer.state.loading) return null;

	return (
		<div className="d-flex align-items-center justify-content-center text-light">
			To jest strona Ćwiczeń
		</div>
	);
}
