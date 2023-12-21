import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';

export const HOME_TITLE = 'page.home.title';
export const HOME_LINK = '/';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(HOME_TITLE);
	const WELCOME_MESSAGE = translation('page.home.welcome');

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// THROWING ERROR EXAMPLES LEAVE IT FOR NOW
	// throw new Error('common.internet-problem');
	// throw Object.assign(new Error('common.there-is-no-such-action'), {
	// 	code: 'nudy',
	// });

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center">
			{`${WELCOME_MESSAGE}`}
		</div>
	);
}
