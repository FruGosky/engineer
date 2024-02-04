import { useTranslation } from 'react-i18next';
import dumbbell from '../../../assets/dumbbell.svg';
import { INTERMEDIATE_PLAN_TITLE } from '../IntermediatePlan/IntermediatePlan';
export default function IntermediateInfo() {
	const { t: translation } = useTranslation();

	const TRANSLATED_INTERMEDIATE = translation(INTERMEDIATE_PLAN_TITLE);
	const TRANSLATED_POWER_FBW = translation(
		'page.exercises.intermediate-plan.power-fbw'
	);
	const TRANSLATED_HYPER_LOW = translation(
		'page.exercises.intermediate-plan.hyper-low'
	);
	const TRANSLATED_HYPER_UP = translation(
		'page.exercises.intermediate-plan.hyper-up'
	);
	const TRANSLATED_BALANS_FBW = translation(
		'page.exercises.intermediate-plan.balans-fbw'
	);
	const TRANSLATED_ABOUT_PUSH = translation(
		'page.exercises.intermediate-plan.about-push'
	);

	return (
		<div className="px-4 py-5 my-5 text-center">
			<img src={dumbbell} alt="dumbbell" />
			<h2 className="display-5 fw-bold text-body-emphasis">
				{`${TRANSLATED_INTERMEDIATE}:`}
			</h2>
			<div className="col-lg-6 mx-auto">
				<p className="lead mb-4">
					{TRANSLATED_POWER_FBW}
					<br />
					{TRANSLATED_HYPER_LOW}
					<br />
					{TRANSLATED_HYPER_UP}
					<br />
					{TRANSLATED_BALANS_FBW}
					<br />
					{TRANSLATED_ABOUT_PUSH}
				</p>
				<div className="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
			</div>
		</div>
	);
}
