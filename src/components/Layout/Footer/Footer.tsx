import { useTranslation } from 'react-i18next';
import { creators } from '../../../creators';

export default function Footer() {
	const { t: translation } = useTranslation();
	const SITE_CREATED_BY = translation('common.site-created-by');

	return (
		<div
			className={`d-flex justify-content-center align-items-center text-secondary h-auto`}
		>
			<span>{`${SITE_CREATED_BY}: ${creators.join(', ')}.`}</span>
		</div>
	);
}
