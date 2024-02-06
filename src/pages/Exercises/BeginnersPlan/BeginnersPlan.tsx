import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import PlanForBeginnersMan from '../content/PlanForBeginnersMan';
import PlanForBeginnersWoman from '../content/PlanForBeginnersWoman';

export const BEGINNERS_PLAN_LINK = '/beginners-plan';
export const BEGINNERS_PLAN_TITLE = 'page.exercises.beginners-plan.title';
export const BEGINNERS_PLAN_DESCRIPTION =
	'page.exercises.beginners-plan.description';
export const BEGINNERS_PLAN_KEYWORDS = 'page.exercises.beginners-plan.keywords';

export default function BeginnersPlan() {
	const { t: translation } = useTranslation();

	const TITLE = translation(BEGINNERS_PLAN_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(BEGINNERS_PLAN_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(BEGINNERS_PLAN_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<PlanForBeginnersMan />
			<PlanForBeginnersWoman />
		</div>
	);
}
