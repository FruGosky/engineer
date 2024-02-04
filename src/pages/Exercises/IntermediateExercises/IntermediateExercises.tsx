import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import ExercisesTitleCard from '../components/ExercisesTitleCard';
import ExercisesModal from '../components/ExercisesModal';
import './IntermediateExercises.scss';

export const INTERMEDIATE_EXERCISES_TITLE =
	'page.exercises.description-card.btn-2';
export const INTERMEDIATE_EXERCISES_LINK = '/intermediate-exercises';

export default function IntermediateExercises() {
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(INTERMEDIATE_EXERCISES_TITLE);
	const TRANSLATED_ACCESSORY = translation('page.exercises.accessory.title');
	useWebsiteTitle(TRANSLATED_TITLE);

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

	return (
		<div className="container">
			<div className="container_top m-5 text-center">
				<h1>{TRANSLATED_ACCESSORY}</h1>
			</div>
			<div className="container_bottom row">
				{exercisesArray.map((exercise, index): JSX.Element => {
					return (
						<div
							className="d-flex flex-column align-items-center"
							key={index + 'div'}
						>
							<ExercisesTitleCard
								level="accessory"
								exercise={exercise}
								key={index + 'title'}
								target={`#${exercise}`}
							/>
							<ExercisesModal
								link={exercise}
								level="accessory"
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
