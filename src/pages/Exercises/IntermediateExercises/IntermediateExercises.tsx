import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import useWebsiteDescription from '../../../hooks/useWebsiteDescription';
import useWebsiteKeywords from '../../../hooks/useWebsiteKeywords';
import { useTranslation } from 'react-i18next';
import ExercisesTitleCard from '../components/ExercisesTitleCard';
import ExercisesModal from '../components/ExercisesModal';
import './IntermediateExercises.scss';

export const INTERMEDIATE_EXERCISES_LINK = '/intermediate-exercises';
export const INTERMEDIATE_EXERCISES_TITLE =
	'page.exercises.intermediate-exercises.title';
export const INTERMEDIATE_EXERCISES_DESCRIPTION =
	'page.exercises.intermediate-exercises.description';
export const INTERMEDIATE_EXERCISES_KEYWORDS =
	'page.exercises.intermediate-exercises.keywords';

export default function IntermediateExercises() {
	const { t: translation } = useTranslation();

	const TITLE = translation(INTERMEDIATE_EXERCISES_TITLE);
	useWebsiteTitle(TITLE);
	const DESCRIPTION = translation(INTERMEDIATE_EXERCISES_DESCRIPTION);
	useWebsiteDescription(DESCRIPTION);
	const KEYWORDS = translation(INTERMEDIATE_EXERCISES_KEYWORDS);
	useWebsiteKeywords(KEYWORDS);

	const TRANSLATED_ACCESSORY = translation('page.exercises.accessory.title');

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
		<div className="container exerciseContainer">
			<div className="container_top m-5 text-center">
				<h2>{TRANSLATED_ACCESSORY}</h2>
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
