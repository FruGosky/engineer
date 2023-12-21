import { useState } from 'react';
import { TPages, menuPages } from '../../../../../pages/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../../hooks/useAuth';

type TMenuItemProps = {
	hideNavbar: () => void;
};

export default function MenuItems(props: TMenuItemProps) {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	const { t: translation } = useTranslation();
	const [auth] = useAuth();

	const menuItems = menuPages.map((page: TPages, pageIndex) => {
		const { label: PAGE_LABEL, path: PAGE_PATH } = page;
		const PAGE_LABEL_TRANSLATED = translation(PAGE_LABEL);

		if (page.needAuth && !auth) return null;

		return (
			<li className="nav-item" key={pageIndex}>
				<NavLink
					className={
						PAGE_PATH === currentPath
							? 'nav-link ps-1 border-start border-primary border-3'
							: 'nav-link'
					}
					to={PAGE_PATH}
					onClick={() => {
						props.hideNavbar();
						setCurrentPath(PAGE_PATH);
					}}
				>
					{PAGE_LABEL_TRANSLATED}
				</NavLink>
			</li>
		);
	});
	return <>{menuItems}</>;
}
