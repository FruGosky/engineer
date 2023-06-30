import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

export const TITLE = 'Bmi';
export const LINK = '/bmi';

export default function Bmi() {
	const [loading, setLoading] = useState(true);
	useWebsiteTitle(TITLE);

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
			To jest strona Bmi
		</div>
	);
}
