import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import useAuth from '../../hooks/useAuth';

export const TITLE = 'Mój Profil';
export const LINK = '/profile';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useAuth();

	useWebsiteTitle(TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// throw new Error('Problem z internetem');

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center text-light">
			To jest strona Mojego Profilu
		</div>
	);
}
