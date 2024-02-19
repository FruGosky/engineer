import Menu from './Menu/Menu';
import Logo from '../../Logo/Logo';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import UserMenu from './UserMenu/UserMenu';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	return (
		<div>
			<nav className="navbar bg-body-tertiary fixed-top">
				<div className="container-fluid">
					{/* LEFT SIDE OF HEADER */}
					<div className="d-flex align-items-center gap-sm-3 col-8 order-0 col-sm-5">
						<div className="col-4 col-sm-auto">
							<Menu />
						</div>
						<div className="col-8 col-sm-auto">
							<Logo />
						</div>
					</div>
					{/* RIGHT SIDE OF HEADER */}
					<div className="d-flex align-items-center justify-content-end gap-3 col-12 col-sm-5 col-xl-6 order-2 order-sm-1">
						<ThemeSwitcher />
						<LanguageSwitcher />
					</div>
					<div className='d-flex justify-content-end col-4 col-sm-auto order-1 order-sm-2 mb-2 mb-sm-0'>
						<UserMenu />
					</div>
				</div>
			</nav>
		</div>
	);
}
