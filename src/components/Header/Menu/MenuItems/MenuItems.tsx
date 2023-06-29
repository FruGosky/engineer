import { useState } from 'react';
import { pages } from '../../../../pages/pages';
import { Link } from 'react-router-dom';

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
				<Link
					className={
						PAGE_PATH === currentPath
							? 'nav-link active ps-1 border-start border-primary border-3'
							: 'nav-link'
					}
					to={PAGE_PATH}
					onClick={() => setCurrentPath(PAGE_PATH)}
				>
					{PAGE_LABEL}
				</Link>
				{/* <a
                    className={
                        PAGE_PATH === currentPath
                            ? 'nav-link active ps-1 border-start border-primary border-3'
                            : 'nav-link'
                    }
                    href={PAGE_PATH}
                >
                    {PAGE_LABEL}
                </a> */}
			</li>
		);
	});
	return <>{menuItems}</>;
}
