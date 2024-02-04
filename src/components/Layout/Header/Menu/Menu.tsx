import styles from './Menu.module.scss';
import Logo from '../../../Logo/Logo';
import MenuItems from './MenuItems/MenuItems';
import * as bootstrap from 'bootstrap';
import { useEffect, useState } from 'react';

export default function Menu() {
	const [navbar, setNavbar] = useState<bootstrap.Offcanvas | null>(null);

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
				aria-label="Toggle navigation"
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
						aria-label="Close"
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
