import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import PlanForBegginersMan from '../content/PlanForBeginnersMan';
import PlanForBegginersWoman from '../content/PlanForBeginnersWoman';

export const BEGINNERS_PLAN_TITLE = 'page.exercises.beginners-plan.title';
export const BEGINNERS_PLAN_LINK = '/beginners-plan';

export default function BeginnersPlan() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BEGINNERS_PLAN_TITLE);

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
			<PlanForBegginersMan />
			<PlanForBegginersWoman />
		</div>
	);
}
