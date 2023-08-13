import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './Exercises.scss';
import dumbbell from '../../assets/dumbbell.svg';
import { BEGINNERS_PLAN_LINK } from './BeginnersPlan/BeginnersPlan';
import { NavLink } from 'react-router-dom';
import { INTERMEDIATE_PLAN_LINK } from './IntermediatePlan/IntermediatePlan';
import { BEGINNERS_EXERCISES_LINK } from './BeginnerExercises/BeginnerExercises';
import { INTERMEDIATE_EXERCISES_LINK } from './IntermediateExercises/IntermediateExercises';

export const EXERCISES_TITLE = 'page.exercises.title';
export const EXERCISES_LINK = '/exercises';

export default function Exercises() {
	const backdropElement: HTMLElement | null =
		document.querySelector('.modal-backdrop');
	if (backdropElement) {
		backdropElement.remove();
	}
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(EXERCISES_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);

	const TRANSLATED_PLAN_CARD_BTN1 = translation(
		'page.exercises.plan-card.btn-1'
	);
	const TRANSLATED_PLAN_CARD_BTN2 = translation(
		'page.exercises.plan-card.btn-2'
	);

	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1 = translation(
		'page.exercises.description-card.btn-1'
	);
	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2 = translation(
		'page.exercises.description-card.btn-2'
	);
	const TRANSLATED_TITLE_MAIN_PAGE = translation(
		'page.exercises.main-page-card.title'
	);
	const TRANSLATED_DESCRIPTION_MAIN_PAGE = translation(
		'page.exercises.main-page-card.description'
	);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return loading ? (
		<LoadingIcon />
	) : (
		<div className="site-wrapper text-center d-flex align-items-center justify-content-center">
			<div className="container inner exercises_main_content rounded shadow">
				<div>
					<img src={dumbbell} alt="dumbbell" />
					<h1 className="cover-heading text-center">
						{TRANSLATED_TITLE_MAIN_PAGE}
					</h1>
					<p className="lead text-center">
						{TRANSLATED_DESCRIPTION_MAIN_PAGE}
					</p>
					<div className="lead">
						<div className="row">
							<div className="col-sm-6 col-md-6 col-lg-3 mb-5">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated"
									to={EXERCISES_LINK + BEGINNERS_PLAN_LINK}
								>
									{TRANSLATED_PLAN_CARD_BTN1}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-5">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated"
									to={EXERCISES_LINK + INTERMEDIATE_PLAN_LINK}
								>
									{TRANSLATED_PLAN_CARD_BTN2}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-5">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated"
									to={
										EXERCISES_LINK +
										BEGINNERS_EXERCISES_LINK
									}
								>
									{TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-5">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated"
									to={
										EXERCISES_LINK +
										INTERMEDIATE_EXERCISES_LINK
									}
								>
									{TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2}
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
