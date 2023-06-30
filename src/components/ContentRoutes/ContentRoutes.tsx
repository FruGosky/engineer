import { Route, Routes } from 'react-router-dom';
import { pages } from '../../pages/pages';
import NotFound404 from '../../pages/NotFound404/NotFound404';

export default function ContentRoutes() {
	return (
		<Routes>
			{pages.map((page, pageIndex) => {
				return (
					<Route
						path={page.path}
						element={page.element}
						key={pageIndex}
					/>
				);
			})}
			<Route path={'*'} element={<NotFound404 />} />
		</Routes>
	);
}
