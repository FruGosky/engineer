import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './BeginnerExercises.scss';
import ExercisesTitleCard from '../components/ExercisesTitleCard';
import ExercisesModal from '../components/ExercisesModal';

export const BEGINNERS_EXERCISES_TITLE =
	'page.exercises.description-card.btn-1';
export const BEGINNERS_EXERCISES_LINK = '/beginners-exercises';

export default function BeginnersExercises() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BEGINNERS_EXERCISES_TITLE);
	const TRANSLATED_EXERCISE_BEGINNERS = translation(
		'page.exercises.description-card.btn-1'
	);

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
	}, []);

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

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="container">
			<div className="container_top mb-5 text-center">
				<h1>{TRANSLATED_EXERCISE_BEGINNERS}</h1>
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
