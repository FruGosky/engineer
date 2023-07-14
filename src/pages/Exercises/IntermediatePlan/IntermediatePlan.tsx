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
	// TODO! DELETE THIS TRANSLATION BELOW WHEN U WILL START ADDING SOME CONTENT TO THIS PAGE AND ADD YOURS TRANSLATION DO NOT FORGET TO ADD EN AND PL TRANSLATION NOT ONLY ONE ITS VERY VERY IMPORTANT TO HAVE ALL TRANSLATIONS
	const THIS_IS_PAGE = translation('to-be-deleted.this-is-page');

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
