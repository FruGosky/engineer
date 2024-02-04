import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import PlanForIntermediate from '../content/PlanForIntermediate';
import Accessory from '../content/Accessory';
import IntermediateInfo from '../content/IntermediateInfo';

export const INTERMEDIATE_PLAN_TITLE = 'page.exercises.intermediate-plan.title';
export const INTERMEDIATE_PLAN_LINK = '/intermediate-plan';

export default function IntermediatePlan() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(INTERMEDIATE_PLAN_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<IntermediateInfo />
			<PlanForIntermediate />
			<Accessory />
		</div>
	);
}
