import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './BeginnerExercises.scss';
import ExercisesTitleCard from '../components/ExercisesTitlerCard';
export const BEGINNERS_EXERCISES_TITLE = 'page.exercises.beginners-plan.title';
export const BEGINNERS_EXERCISES_LINK = '/beginners-exercises';

export default function BeginnersPlan() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BEGINNERS_EXERCISES_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<div className="container_top">
				<h1>Ćwiczenia dla początkujących</h1>
			</div>
			<div className="container_bottom row">
				{exercisesArray.map((exercise, index): JSX.Element => {
					return (
						<ExercisesTitleCard
							level="beginners-plan"
							exercise={exercise}
							index={index}
						/>
					);
				})}
			</div>
		</div>
	);
}
