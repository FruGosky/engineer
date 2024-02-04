import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import BmiCalculator from './BmiComponents/BmiCalculator';

export const BMI_TITLE = 'page.bmi.title';
export const BMI_LINK = '/bmi';

export default function Bmi() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BMI_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);

	return (
		<div className="d-flex align-items-center justify-content-center ">
			<BmiCalculator />
		</div>
	);
}
