import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import BmrCalculator from './BmrComponents/BmrCalculator';

export const BMR_LINK = '/bmr';
export const BMR_TITLE = 'page.bmr.title';
export const BMR_DESCRIPTION = 'page.bmr.description';
export const BMR_KEYWORDS = 'page.bmr.keywords';

export default function Bmr() {
	const { t: translation } = useTranslation();

	const TITLE = translation(BMR_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(BMR_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(BMR_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<BmrCalculator />
		</div>
	);
}
