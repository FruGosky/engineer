import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import ExercisesTitleCard from '../components/ExercisesTitleCard';
import ExercisesModal from '../components/ExercisesModal';
import './IntermediateExercises.scss';

export const INTERMEDIATE_EXERCISES_TITLE =
	'page.exercises.description-card.btn-2';
export const INTERMEDIATE_EXERCISES_LINK = '/intermediate-exercises';

export default function IntermediateExercises() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(INTERMEDIATE_EXERCISES_TITLE);
	const TRANSLATED_EXERCISE_INTERMEDIATE = translation(
		'page.exercises.description-card.btn-2'
	);
	const TRANSLATED_ACCESSORY = translation('page.exercises.accessory.title');
	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const exercisesArray: string[] = [
		'y-rise',
		'butterfly',
		'shoulder-raises-drop',
		'dumbbell-flys',
		'skier',
		'upper-lift-pulldown',
		'leg-curls-lying',
		'nordic-curls',
		'calves-standing',
		'buttock-isolation',
		'adductors',
		'hip-thrust',
	];

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="container">
			<div className="container_top mb-5 text-center">
				<h1>{TRANSLATED_ACCESSORY}</h1>
			</div>
			<div className="container_bottom row">
				{exercisesArray.map((exercise, index): JSX.Element => {
					return (
						<div>
							<ExercisesTitleCard
								level="accessory"
								exercise={exercise}
								index={index}
								target={`#${exercise}`}
							/>
							<ExercisesModal
								link={exercise}
								level="accessory"
								id={exercise}
								exercise={exercise}
								index={index}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
