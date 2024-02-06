import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import BmiCalculator from './BmiComponents/BmiCalculator';

export const BMI_LINK = '/bmi';
export const BMI_TITLE = 'page.bmi.title';
export const BMI_DESCRIPTION = 'page.bmi.description';
export const BMI_KEYWORDS = 'page.bmi.keywords';

export default function Bmi() {
	const { t: translation } = useTranslation();

	const TITLE = translation(BMI_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(BMI_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(BMI_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	return (
		<div className="d-flex align-items-center justify-content-center ">
			<BmiCalculator />
		</div>
	);
}
