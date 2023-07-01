import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

export const PROFILE_TITLE = 'page.profile.title';
export const PROFILE_LINK = '/profile';

export default function Profile() {
	const [loading, setLoading] = useState(true);

	useWebsiteTitle(PROFILE_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center text-light">
			To jest strona Mojego Profilu
		</div>
	);
}
