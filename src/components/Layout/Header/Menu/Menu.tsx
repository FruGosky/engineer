import styles from './Menu.module.scss';
import Logo from '../../../Logo/Logo';
import MenuItems from './MenuItems/MenuItems';
import * as bootstrap from 'bootstrap';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Menu() {
	const [navbar, setNavbar] = useState<bootstrap.Offcanvas | null>(null);
	const { t: translation } = useTranslation();

	const TOGGLE = translation('common.toggle');
	const MENU = translation('common.menu').toLowerCase();
	const CLOSE = translation('common.close');

	useEffect(() => {
		const navbarModalElement = document.getElementById('offcanvasNavbar');
		if (!navbarModalElement) return;
		const bootstrapNavbar = new bootstrap.Offcanvas(navbarModalElement);
		setNavbar(bootstrapNavbar);
	}, []);

	return (
		<>
			<button
				className="navbar-toggler border-2"
				type="button"
				onClick={() => navbar?.show()}
				aria-controls="offcanvasNavbar"
				title={`${TOGGLE} ${MENU}`}
				aria-label={`${TOGGLE} ${MENU}`}
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className="offcanvas offcanvas-start"
				tabIndex={-1}
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel"
			>
				<div className={`offcanvas-header ${styles.menuHeader}`}>
					<span
						className="offcanvas-title m-auto"
						id="offcanvasNavbarLabel"
					>
						<Logo Tag={'h2'} />
					</span>
					<button
						type="button"
						className="btn-close"
						onClick={() => navbar?.hide()}
						title={`${CLOSE} ${MENU}`}
						aria-label={`${CLOSE} ${MENU}`}
					/>
				</div>
				<div className="offcanvas-body">
					<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
						<MenuItems hideNavbar={() => navbar?.hide()} />
					</ul>
				</div>
			</div>
		</>
	);
}
