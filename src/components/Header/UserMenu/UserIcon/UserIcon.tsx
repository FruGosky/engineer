import userIcon from '../../../../assets/iconmonstr-user-20.svg';
import styles from './UserIcon.module.scss';
import { PROFILE_LINK, PROFILE_TITLE } from '../../../../pages/Profile/Profile';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export default function UserIcon() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [auth, setAuth] = useAuth();
	const { t: translation } = useTranslation();
	const [dropdown, setDropdown] = useState<bootstrap.Dropdown | null>(null);

	useEffect(() => {
		const dropdownModalElement =
			document.getElementById('userIconDropdown');
		if (!dropdownModalElement) return;
		const bootstarpDropdown = new bootstrap.Dropdown(dropdownModalElement);
		setDropdown(bootstarpDropdown);
	}, []);

	const LOGOUT = translation('common.logout');
	const PROFILE_TITLE_TRANSLATED = translation(PROFILE_TITLE);

	const SUCCESSFUL_LOGOUT = translation('common.successful-logout');

	return (
		<div className="d-flex align-items-center gap-3">
			<div className="dropdown">
				<a
					className="dropdown-toggle"
					href="!"
					role="button"
					aria-expanded="false"
					onClick={(e) => {
						e.preventDefault();
						dropdown?.toggle();
					}}
				>
					<img
						src={userIcon}
						alt="User icon"
						className={styles.userIcon}
					/>
				</a>
				<ul
					className={`dropdown-menu ${styles.dropdownMenu}`}
					id="userIconDropdown"
				>
					<li>
						<Link
							className="dropdown-item"
							to={PROFILE_LINK}
							onClick={() => dropdown?.hide()}
						>
							{PROFILE_TITLE_TRANSLATED}
						</Link>
					</li>
					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<button
							className="dropdown-item"
							onClick={() => {
								dropdown?.hide();
								setAuth(false);
								toast.success(`${SUCCESSFUL_LOGOUT}.`, {
									duration: 3000,
									position: 'top-right',
								});
							}}
						>
							{LOGOUT}
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
