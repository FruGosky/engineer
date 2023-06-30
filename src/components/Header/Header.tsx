import Menu from './Menu/Menu';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';
import userIcon from '../../assets/iconmonstr-user-20.svg';
import styles from './Header.module.scss';
import {
	LINK as PROFILE_LINK,
	TITLE as PROFILE_TITLE,
} from '../../pages/Profile/Profile';
import { Link } from 'react-router-dom';
// import Searchbar from './Searchbar/Searchbar';

export default function Header() {
	const [auth, setAuth] = useAuth();

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
						{!auth ? (
							<button
								className="btn btn-primary"
								onClick={() => setAuth(true)}
							>
								Zaloguj się
							</button>
						) : (
							<div className="d-flex align-items-center gap-3">
								<div className="dropdown">
									<a
										className="dropdown-toggle"
										href="/#"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<img
											src={userIcon}
											alt="User icon"
											className={styles.userIcon}
										/>
									</a>
									<ul
										className={`dropdown-menu ${styles.dropdownMenu}`}
									>
										<li>
											<Link
												className="dropdown-item"
												to={PROFILE_LINK}
											>
												{PROFILE_TITLE}
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<button
												className="dropdown-item"
												onClick={() => setAuth(false)}
											>
												Wyloguj się
											</button>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
