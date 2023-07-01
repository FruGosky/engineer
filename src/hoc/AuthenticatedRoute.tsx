import { Route, Navigate } from 'react-router-dom';
import { HOME_LINK } from '../pages/Home/Home';
import useAuth from '../hooks/useAuth';

export default function AuthenticatedRoute(props: any) {
	const [auth] = useAuth();
	const { element: Element, ...rest } = props;

	if (!auth) return <Navigate to={HOME_LINK} replace />;

	return <Route {...rest} element={<Element />} />;
}
