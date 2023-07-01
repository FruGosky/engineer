import { Route, Routes, Navigate } from 'react-router-dom';
import { pages } from '../../pages/pages';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import useAuth from '../../hooks/useAuth';
import { LINK as HOME_LINK } from '../../pages/Home/Home';

export default function ContentRoutes() {
	const [auth] = useAuth();

	return (
		<Routes>
			{pages.map((page, pageIndex) => (
				<Route
					key={pageIndex}
					path={page.path}
					element={
						page.needAuth && !auth ? (
							<Navigate to={HOME_LINK} replace />
						) : (
							page.element
						)
					}
				/>
			))}
			<Route path="*" element={<NotFound404 />} />
		</Routes>
	);
}
