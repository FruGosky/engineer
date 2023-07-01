import Menu from './Menu/Menu';
import Logo from '../Logo/Logo';
import UserIcon from './UserIconMenu/UserIconMenu';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	return (
		<div>
			<nav className="navbar bg-body-tertiary fixed-top">
				<div className="container-fluid">
					{/* LEFT SIDE OF HEADER */}
					<div className="d-flex align-items-center gap-2">
						<Menu />
						<Logo />
					</div>

					{/* RIGHT SIDE OF HEADER */}
					<div className="d-flex align-items-center gap-4">
						<LanguageSwitcher />
						<UserIcon />
					</div>
				</div>
			</nav>
		</div>
	);
}
