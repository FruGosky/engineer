import { useTranslation } from 'react-i18next';
import './ExercisesTitleCard.scss';

interface ExercisesHeaderCardProps {
	level: string;
	exercise: string;
	target: string;
}
export default function ExercisesTitleCard(
	props: ExercisesHeaderCardProps
): JSX.Element {
	const { t: translation } = useTranslation();
	return (
		<div
			data-bs-toggle="modal"
			data-bs-target={props.target}
			className="exercise-card col shadow text-center grow d-flex align-items-center justify-content-center"
		>
			<span className="fs-3 text-dark">
				{translation(
					`page.exercises.${props.level}.${props.exercise}.title`
				)}
			</span>
		</div>
	);
}
