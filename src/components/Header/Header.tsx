import Menu from './Menu/Menu';
import Logo from '../Logo/Logo';
import UserIcon from './UserIconMenu/UserIconMenu';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
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
						<UserIcon />
					</div>
				</div>
			</nav>
		</div>
	);
}
