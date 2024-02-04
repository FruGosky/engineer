import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import BmrCalculator from './BmrComponents/BmrCalculator';

export const BMR_TITLE = 'page.bmr.title';
export const BMR_LINK = '/bmr';

export default function Bmr() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BMR_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<BmrCalculator />
		</div>
	);
}
