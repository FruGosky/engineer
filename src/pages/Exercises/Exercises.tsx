import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
// import MainPageCard from './components/MainPageCard';
import './Exercises.scss';

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						fill="#000"
						height="200px"
						width="200px"
						version="1.1"
						id="Layer_1"
						viewBox="0 0 503.018 503.018"
						xmlSpace="preserve"
					>
						<g>
							<g>
								<g>
									<path d="M71.86,161.684c-9.908,0-17.965,8.057-17.965,17.965v143.719c0,9.908,8.057,17.965,17.965,17.965     s17.965-8.057,17.965-17.965V179.649C89.825,169.741,81.767,161.684,71.86,161.684z" />
									<path d="M17.965,188.632C8.057,188.632,0,196.689,0,206.596v89.825c0,9.908,8.057,17.965,17.965,17.965     s17.965-8.057,17.965-17.965v-89.825C35.93,196.689,27.873,188.632,17.965,188.632z" />
									<path d="M377.263,134.737c-9.908,0-17.965,8.057-17.965,17.965v44.912H143.719v-44.912c0-9.908-8.057-17.965-17.965-17.965     s-17.965,8.057-17.965,17.965v197.614c0,9.908,8.057,17.965,17.965,17.965s17.965-8.057,17.965-17.965v-44.912h215.579v44.912     c0,9.908,8.057,17.965,17.965,17.965c9.908,0,17.965-8.057,17.965-17.965V152.702     C395.228,142.794,387.171,134.737,377.263,134.737z M269.474,224.561c4.958,0,8.982,4.024,8.982,8.982s-4.024,8.982-8.982,8.982     s-8.982-4.024-8.982-8.982S264.515,224.561,269.474,224.561z M251.509,206.596c4.958,0,8.982,4.024,8.982,8.982     c0,4.958-4.024,8.982-8.982,8.982s-8.982-4.024-8.982-8.982C242.526,210.621,246.55,206.596,251.509,206.596z M260.491,251.509     c0,4.958-4.024,8.982-8.982,8.982s-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982S260.491,246.55,260.491,251.509z      M233.544,224.561c4.958,0,8.982,4.024,8.982,8.982s-4.024,8.982-8.982,8.982c-4.958,0-8.982-4.024-8.982-8.982     S228.586,224.561,233.544,224.561z M215.579,206.596c4.958,0,8.982,4.024,8.982,8.982c0,4.958-4.024,8.982-8.982,8.982     s-8.982-4.024-8.982-8.982C206.596,210.621,210.621,206.596,215.579,206.596z M215.579,242.526c4.958,0,8.982,4.024,8.982,8.982     s-4.024,8.982-8.982,8.982s-8.982-4.024-8.982-8.982S210.621,242.526,215.579,242.526z M215.579,296.421     c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982s8.982,4.024,8.982,8.982S220.537,296.421,215.579,296.421z      M233.544,278.456c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982c4.958,0,8.982,4.024,8.982,8.982     S238.502,278.456,233.544,278.456z M251.509,296.421c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982     s8.982,4.024,8.982,8.982S256.467,296.421,251.509,296.421z M269.474,278.456c-4.958,0-8.982-4.024-8.982-8.982     s4.024-8.982,8.982-8.982s8.982,4.024,8.982,8.982S274.432,278.456,269.474,278.456z M287.439,296.421     c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982s8.982,4.024,8.982,8.982S292.397,296.421,287.439,296.421z      M287.439,260.491c-4.958,0-8.982-4.024-8.982-8.982s4.024-8.982,8.982-8.982s8.982,4.024,8.982,8.982     S292.397,260.491,287.439,260.491z M287.439,224.561c-4.958,0-8.982-4.024-8.982-8.982c0-4.958,4.024-8.982,8.982-8.982     s8.982,4.024,8.982,8.982C296.421,220.537,292.397,224.561,287.439,224.561z" />
									<path d="M431.158,161.684c-9.908,0-17.965,8.057-17.965,17.965v143.719c0,9.908,8.057,17.965,17.965,17.965     s17.965-8.057,17.965-17.965V179.649C449.123,169.741,441.066,161.684,431.158,161.684z" />
									<path d="M485.053,188.632c-9.908,0-17.965,8.057-17.965,17.965v89.825c0,9.908,8.057,17.965,17.965,17.965     s17.965-8.057,17.965-17.965v-89.825C503.018,196.689,494.96,188.632,485.053,188.632z" />
								</g>
							</g>
						</g>
					</svg>
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
