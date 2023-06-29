import { Route, Routes } from 'react-router-dom';
import { pages } from '../../pages/pages';

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
		</Routes>
	);
}
