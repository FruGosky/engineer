import { useState } from 'react';
import { pages } from '../../../../pages/pages';
import { NavLink } from 'react-router-dom';

interface IPages {
	label: string;
	path: string;
}

export default function MenuItems() {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	const menuItems = pages.map((page: IPages, pageIndex) => {
		const { label: PAGE_LABEL, path: PAGE_PATH } = page;

		return (
			<li className="nav-item" key={pageIndex}>
				<NavLink
					className={
						PAGE_PATH === currentPath
							? 'nav-link ps-1 border-start border-primary border-3'
							: 'nav-link'
					}
					to={PAGE_PATH}
					onClick={() => setCurrentPath(PAGE_PATH)}
				>
					{PAGE_LABEL}
				</NavLink>
			</li>
		);
	});
	return <>{menuItems}</>;
}
