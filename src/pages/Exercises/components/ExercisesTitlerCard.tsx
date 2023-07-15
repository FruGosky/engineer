import { useTranslation } from 'react-i18next';

interface ExercisesHeaderCardProps {
	level: string;
	index: number;
	exercise: string;
}
export default function ExercisesTitleCard(
	props: ExercisesHeaderCardProps
): JSX.Element {
	const { t: translation } = useTranslation();
	return (
		<div key={props.index} className="exercise-card col shadow">
			<span className="header text-dark">
				{translation(
					`page.exercises.${props.level}.${props.exercise}.title`
				)}
			</span>
		</div>
	);
}
