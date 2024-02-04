import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './BeginnerExercises.scss';
import ExercisesTitleCard from '../components/ExercisesTitleCard';
import ExercisesModal from '../components/ExercisesModal';

export const BEGINNERS_EXERCISES_TITLE =
	'page.exercises.beginners-exercises.title';
export const BEGINNERS_EXERCISES_LINK = '/beginners-exercises';

export default function BeginnersExercises() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BEGINNERS_EXERCISES_TITLE);
	const TRANSLATED_EXERCISE_BEGINNERS = translation(
		BEGINNERS_EXERCISES_TITLE
	);

	useWebsiteTitle(TRANSLATED_TITLE);

	const exercisesArray: string[] = [
		'squats',
		'bench-press',
		'rowing',
		'side-raises',
		'cable-crunch',
		'calves',
		'classic-deadlift',
		'military-press',
		'close-grip-chin-ups',
		'barbell-reverse-lunge',
		'abductors',
		'plank',
		'narrow-bench-press',
	];

	return (
		<div className="container exerciseContainer">
			<div className="container_top mb-5 text-center">
				<h2>{TRANSLATED_EXERCISE_BEGINNERS}</h2>
			</div>
			<div className="container_bottom  row">
				{exercisesArray.map((exercise, index): JSX.Element => {
					return (
						<div
							className="d-flex flex-column align-items-center"
							key={index + 'div'}
						>
							<ExercisesTitleCard
								level="beginners-plan"
								exercise={exercise}
								key={index + 'title'}
								target={`#${exercise}`}
							/>
							<ExercisesModal
								link={exercise}
								level="beginners-plan"
								id={exercise}
								exercise={exercise}
								key={index + 'modal'}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
