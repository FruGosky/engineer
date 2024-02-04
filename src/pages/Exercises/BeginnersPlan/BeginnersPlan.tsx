import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import PlanForBeginnersMan from '../content/PlanForBeginnersMan';
import PlanForBeginnersWoman from '../content/PlanForBeginnersWoman';

export const BEGINNERS_PLAN_TITLE = 'page.exercises.beginners-plan.title';
export const BEGINNERS_PLAN_LINK = '/beginners-plan';

export default function BeginnersPlan() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BEGINNERS_PLAN_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<PlanForBeginnersMan />
			<PlanForBeginnersWoman />
		</div>
	);
}
