import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import PlanForIntermediate from '../content/PlanForIntermedaite';
import Accesory from '../content/Accessory';
import IntermediateInfo from '../content/IntermediateInfo';

export const INTERMEDIATE_PLAN_TITLE = 'page.exercises.intermediate-plan.title';
export const INTERMEDIATE_PLAN_LINK = '/intermediate-plan';

export default function IntermediatePlan() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(INTERMEDIATE_PLAN_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
	}, []);

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center">
			<IntermediateInfo />
			<PlanForIntermediate />
			<Accesory />
		</div>
	);
}
