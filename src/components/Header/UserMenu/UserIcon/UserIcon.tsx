import userIcon from '../../../../assets/iconmonstr-user-20.svg';
import styles from './UserIcon.module.scss';
import { PROFILE_LINK, PROFILE_TITLE } from '../../../../pages/Profile/Profile';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function UserIcon() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [auth, setAuth] = useAuth();
	const { t: translation } = useTranslation();

	const LOGOUT = translation('common.logout');
	const PROFILE_TITLE_TRANSLATED = translation(PROFILE_TITLE);

	const SUCCESSFUL_LOGOUT = translation('common.successful-logout');

	return (
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
				<ul className={`dropdown-menu ${styles.dropdownMenu}`}>
					<li>
						<Link className="dropdown-item" to={PROFILE_LINK}>
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
