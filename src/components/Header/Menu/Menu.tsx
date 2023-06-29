import styles from './Menu.module.scss';
import Logo from '../../Logo/Logo';
import MenuItems from './MenuItems/MenuItems';

export default function Menu() {
	return (
		<>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasNavbar"
				aria-controls="offcanvasNavbar"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div
				className="offcanvas offcanvas-start"
				tabIndex={-1}
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel"
			>
				<div className={`offcanvas-header ${styles.menuHeader}`}>
					<h5
						className="offcanvas-title m-auto"
						id="offcanvasNavbarLabel"
					>
						<Logo />
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
						<MenuItems />
					</ul>
				</div>
			</div>
		</>
	);
}
