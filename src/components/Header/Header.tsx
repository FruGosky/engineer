import React from 'react';
import Menu from '../Menu/Menu';
import Logo from '../Logo/Logo';
// import styles from './Header.module.scss';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	const pages = [
		{ label: 'Home', path: '/' },
		{ label: 'Bmi', path: '/bmi' },
		{ label: 'Bmr', path: '/bmr' },
		{ label: 'Calories', path: '/calories' },
		{ label: 'Exercises', path: '/exercises' },
		{ label: 'Food examples', path: '/food-examples' },
	];

	return (
		<div>
			<nav className="navbar bg-body-tertiary fixed-top">
				<div className="container-fluid">
					{/* LEFT SIDE OF HEADER */}
					<div className="d-flex align-items-center">
						<Menu pages={pages} />
						<Logo className="ms-2" />
					</div>

					{/* RIGHT SIDE OF HEADER */}
					<div>
						<button className="btn btn-primary">Login</button>
					</div>
				</div>
			</nav>
		</div>
	);
}
