import Menu from './Menu/Menu';
import Logo from '../Logo/Logo';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import UserMenu from './UserMenu/UserMenu';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	return (
		<div>
			<nav className="navbar bg-body-tertiary fixed-top">
				<div className="container-fluid flex-column flex-sm-row justify-content-around">
					<div className="row col-12 gap-2 gap-sm-0">
						{/* LEFT SIDE OF HEADER */}
						<div className="d-flex align-items-center gap-3 col-12 col-sm-6 p-0">
							<div className="col-4 col-sm-auto">
								<Menu />
							</div>
							<div className="col-8  col-sm-auto">
								<Logo />
							</div>
						</div>
						{/* RIGHT SIDE OF HEADER */}
						<div className="d-flex align-items-center gap-3 col-12 col-sm-6 justify-content-center justify-content-sm-end p-0">
							<ThemeSwitcher />
							<LanguageSwitcher />
							<UserMenu />
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
