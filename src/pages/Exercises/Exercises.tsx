import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import MainPageCard from './components/MainPageCard';
import styles from './ExercisesContent.module.scss';
import PlanForBegginersWoman from './content/PlanForBeginnersWoman';
import PlanForBegginersMan from './content/PlanForBeginnersMan';
import PlanForIntermediate from './content/PlanForIntermedaite';
import Accesory from './content/Accesory';
import IntermediateInfo from './content/IntermediateInfo';
import ExercisesCard from './components/ExercisesCard';
import SingleExercise from './components/SingleExercise';
import { BEGINNERS_PLAN_LINK } from './BeginnersPlan/BeginnersPlan';

export const EXERCISES_TITLE = 'page.exercises.title';
export const EXERCISES_LINK = '/exercises';

//TODO! finish intermediate and acessory section with translation also fix resposivness

export default function Exercises() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(EXERCISES_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);

	const TRANSLATED_PLAN_CARD_HEADER = translation(
		'page.exercises.exercises-main-page-card.plan-card.header'
	);
	const TRANSLATED_PLAN_CARD_DESCRIPTION = translation(
		'page.exercises.exercises-main-page-card.plan-card.description'
	);
	const TRANSLATED_PLAN_CARD_BTN1 = translation(
		'page.exercises.exercises-main-page-card.plan-card.btn-1'
	);
	const TRANSLATED_PLAN_CARD_BTN2 = translation(
		'page.exercises.exercises-main-page-card.plan-card.btn-2'
	);

	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_HEADER = translation(
		'page.exercises.exercises-main-page-card.exercises-description-card.header'
	);
	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_DESCRIPTION = translation(
		'page.exercises.exercises-main-page-card.exercises-description-card.description'
	);
	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1 = translation(
		'page.exercises.exercises-main-page-card.exercises-description-card.btn-1'
	);
	const TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2 = translation(
		'page.exercises.exercises-main-page-card.exercises-description-card.btn-2'
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
		<div>
			<div className={`${styles.exercises_main_content} `}>
				<section className="header_section" id="main-card-page-section">
					<MainPageCard
						header={TRANSLATED_PLAN_CARD_HEADER}
						description={TRANSLATED_PLAN_CARD_DESCRIPTION}
						buttonDescription_1={TRANSLATED_PLAN_CARD_BTN1}
						buttonDescription_2={TRANSLATED_PLAN_CARD_BTN2}
						bHref="#beginner-plan-section"
						iHref="#intermediate-plan-section"
					/>
					<MainPageCard
						header={TRANSLATED_EXERCISE_DESCRIPTION_CARD_HEADER}
						description={
							TRANSLATED_EXERCISE_DESCRIPTION_CARD_DESCRIPTION
						}
						buttonDescription_1={
							TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN1
						}
						buttonDescription_2={
							TRANSLATED_EXERCISE_DESCRIPTION_CARD_BTN2
						}
						bHref="#beginner-exercises-section"
						iHref="#beginner-exercises-section"
					/>
				</section>
			</div>

			<section
				id="beginner-plan-section"
				className={`${styles.training_plan_section} ${styles.section_clip_path} border-top d-flex align-items-center justify-content-center`}
			>
				<PlanForBegginersWoman />
			</section>
			<section
				id="beginner-plan-section"
				className={`${styles.training_plan_section} ${styles.section_clip_path} border-top d-flex align-items-center justify-content-center`}
			>
				<PlanForBegginersMan />
			</section>
			<section
				id="intermediate-plan-section"
				className={`${styles.training_plan_section} ${styles.section_clip_path}`}
			>
				<IntermediateInfo />
				<PlanForIntermediate />
			</section>
			<section
				id="Accesory"
				className={`${styles.training_plan_section} ${styles.section_clip_path}`}
			>
				<Accesory />
			</section>
			<section
				id="beginner-exercises-section"
				className={`${styles.training_plan_section} ${styles.section_clip_path}`}
			>
				<SingleExercise />
				<ExercisesCard />
			</section>
		</div>
	);
}
