import React from 'react';
import styles from './Menu.module.scss';
import Logo from '../Logo/Logo';

interface IProps {
	pages: IPages[];
}

interface IPages {
	label: string;
	path: string;
}

export default function Menu(props: IProps) {
	const { pages } = props;

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
						{pages.map((page: IPages) => {
							const CURRENT_PATH = window.location.pathname;
							const { label: PAGE_LABEL, path: PAGE_PATH } = page;

							return (
								<li className="nav-item">
									<a
										className={
											PAGE_PATH === CURRENT_PATH
												? 'nav-link active ps-1 border-start border-primary border-3'
												: 'nav-link'
										}
										href={PAGE_PATH}
									>
										{PAGE_LABEL}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
