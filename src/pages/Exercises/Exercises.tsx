import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import './Exercises.scss';
import dumbbell from '../../assets/dumbbell.svg';
import {
	BEGINNERS_PLAN_LINK,
	BEGINNERS_PLAN_TITLE,
} from './BeginnersPlan/BeginnersPlan';
import { NavLink } from 'react-router-dom';
import {
	INTERMEDIATE_PLAN_LINK,
	INTERMEDIATE_PLAN_TITLE,
} from './IntermediatePlan/IntermediatePlan';
import {
	BEGINNERS_EXERCISES_LINK,
	BEGINNERS_EXERCISES_TITLE,
} from './BeginnerExercises/BeginnerExercises';
import {
	INTERMEDIATE_EXERCISES_LINK,
	INTERMEDIATE_EXERCISES_TITLE,
} from './IntermediateExercises/IntermediateExercises';

export const EXERCISES_LINK = '/exercises';
export const EXERCISES_TITLE = 'page.exercises.title';
export const EXERCISES_DESCRIPTION = 'page.exercises.description';
export const EXERCISES_KEYWORDS = 'page.exercises.keywords';

export default function Exercises() {
	const backdropElement: HTMLElement | null =
		document.querySelector('.modal-backdrop');
	if (backdropElement) backdropElement.remove();

	const { t: translation } = useTranslation();

	const TITLE = translation(EXERCISES_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(EXERCISES_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(EXERCISES_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	const TRANSLATED_PLAN_CARD_BTN1 = translation(BEGINNERS_PLAN_TITLE);
	const TRANSLATED_PLAN_CARD_BTN2 = translation(INTERMEDIATE_PLAN_TITLE);

	const TRANSLATED_EXERCISE_BEGINNERS_EXERCISES_TITLE = translation(
		BEGINNERS_EXERCISES_TITLE
	);
	const TRANSLATED_INTERMEDIATE_EXERCISES_TITLE = translation(
		INTERMEDIATE_EXERCISES_TITLE
	);
	const TRANSLATED_TITLE_MAIN_PAGE = translation(
		'page.exercises.main-page-card.title'
	);
	const TRANSLATED_DESCRIPTION_MAIN_PAGE = translation(
		'page.exercises.main-page-card.description'
	);

	return (
		<div className="site-wrapper text-center d-flex align-items-center justify-content-center">
			<div className="container inner rounded">
				<div>
					<img src={dumbbell} alt="dumbbell" />
					<h2 className="cover-heading text-center">
						{TRANSLATED_TITLE_MAIN_PAGE}
					</h2>
					<p className="lead text-center">
						{TRANSLATED_DESCRIPTION_MAIN_PAGE}
					</p>
					<div className="lead mt-5">
						<div className="row">
							<div className="col-sm-6 col-md-6 col-lg-3 mb-4">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated mt-0"
									to={EXERCISES_LINK + BEGINNERS_PLAN_LINK}
								>
									{TRANSLATED_PLAN_CARD_BTN1}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-4">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated mt-0"
									to={EXERCISES_LINK + INTERMEDIATE_PLAN_LINK}
								>
									{TRANSLATED_PLAN_CARD_BTN2}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-4">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated mt-0"
									to={
										EXERCISES_LINK +
										BEGINNERS_EXERCISES_LINK
									}
								>
									{
										TRANSLATED_EXERCISE_BEGINNERS_EXERCISES_TITLE
									}
								</NavLink>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-3 mb-4">
								<NavLink
									className="button btn w-100 d-flex align-items-center justify-content-center text-wrap button--white button--animated mt-0"
									to={
										EXERCISES_LINK +
										INTERMEDIATE_EXERCISES_LINK
									}
								>
									{TRANSLATED_INTERMEDIATE_EXERCISES_TITLE}
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
