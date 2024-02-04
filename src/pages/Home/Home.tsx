import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';

export const HOME_TITLE = 'page.home.title';
export const HOME_LINK = '/';

export default function Home() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(HOME_TITLE);
	const HEADER = translation('page.home.header');

	useWebsiteTitle(TRANSLATED_TITLE);

	// THROWING ERROR EXAMPLES LEAVE IT FOR NOW
	// throw new Error('common.internet-problem');
	// throw Object.assign(new Error('common.there-is-no-such-action'), {
	// 	code: 'nudy',
	// });

	return (
		<div className="d-flex align-items-center justify-content-center">
			<h1>{`${HEADER}`}</h1>
		</div>
	);
}
