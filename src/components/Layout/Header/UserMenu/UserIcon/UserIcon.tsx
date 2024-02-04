import userIcon from '../../../../../assets/iconmonstr-user-20.svg';
import styles from './UserIcon.module.scss';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { userIconPages } from '../../../../../pages/pages';

export default function UserIcon() {
	const [, setAuth] = useAuth();
	const { t: translation } = useTranslation();
	const [dropdown, setDropdown] = useState<bootstrap.Dropdown | null>(null);

	useEffect(() => {
		const dropdownModalElement =
			document.getElementById('userIconDropdown');
		if (!dropdownModalElement) return;
		const bootstrapDropdown = new bootstrap.Dropdown(dropdownModalElement);
		setDropdown(bootstrapDropdown);
	}, []);

	const LOGOUT = translation('common.logout');

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
					{userIconPages.map((page, pageIndex) => {
						return (
							<li key={pageIndex}>
								<Link
									className="dropdown-item"
									to={page.path}
									onClick={() => dropdown?.hide()}
								>
									{translation(page.label)}
								</Link>
							</li>
						);
					})}
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
									duration: 1000,
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
