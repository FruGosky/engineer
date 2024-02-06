import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import PlanForIntermediate from '../content/PlanForIntermediate';
import Accessory from '../content/Accessory';
import IntermediateInfo from '../content/IntermediateInfo';

export const INTERMEDIATE_PLAN_LINK = '/intermediate-plan';
export const INTERMEDIATE_PLAN_TITLE = 'page.exercises.intermediate-plan.title';
export const INTERMEDIATE_PLAN_DESCRIPTION =
	'page.exercises.intermediate-plan.description';
export const INTERMEDIATE_PLAN_KEYWORDS =
	'page.exercises.intermediate-plan.keywords';

export default function IntermediatePlan() {
	const { t: translation } = useTranslation();

	const TITLE = translation(INTERMEDIATE_PLAN_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(INTERMEDIATE_PLAN_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(INTERMEDIATE_PLAN_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<IntermediateInfo />
			<PlanForIntermediate />
			<Accessory />
		</div>
	);
}
