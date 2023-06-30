import { useContext } from 'react';
import Menu from './Menu/Menu';
import Logo from '../Logo/Logo';
import { ReducerContext } from '../../context/reducerContext';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	const reducer = useContext(ReducerContext);
	// reducer.dispatch({ type: 'set-loading', loading: false });
	return (
		<div>
			<nav className="navbar bg-body-tertiary fixed-top">
				<div className="container-fluid">
					{/* LEFT SIDE OF HEADER */}
					<div className="d-flex align-items-center">
						<Menu />
						<Logo className="ms-2" />
					</div>

					{/* RIGHT SIDE OF HEADER */}
					<div>
						{!reducer.state.isAuthenticated ? (
							<button
								className="btn btn-primary"
								onClick={() =>
									reducer.dispatch({ type: 'login' })
								}
							>
								Zaloguj się
							</button>
						) : (
							<button
								className="btn btn-primary"
								onClick={() =>
									reducer.dispatch({ type: 'logout' })
								}
							>
								Wyloguj się
							</button>
						)}
						{/* <button className="btn btn-primary">Zaloguj się</button> */}
					</div>
				</div>
			</nav>
		</div>
	);
}
