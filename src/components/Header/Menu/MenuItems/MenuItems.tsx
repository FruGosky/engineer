import { useState } from 'react';
import { menuPages } from '../../../../pages/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IPages {
	label: string;
	path: string;
}

type TMenuItemProps = {
	hideNavbar: () => void;
};

export default function MenuItems(props: TMenuItemProps) {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	const { t: translation } = useTranslation();

	const menuItems = menuPages.map((page: IPages, pageIndex) => {
		const { label: PAGE_LABEL, path: PAGE_PATH } = page;
		const PAGE_LABEL_TRANSLATED = translation(PAGE_LABEL);

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
