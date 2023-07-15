import { useEffect, useState } from 'react';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import ExercisesTitleCard from '../components/ExercisesTitlerCard';
import Accesory from '../content/Accessory';

export const INTERMEDIATE_EXERCISES_TITLE = 'page.intermediate-exercises.title';
export const INTERMEDIATE_EXERCISES_LINK = '/intermediate-exercises';

export default function IntermediateExercises() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(INTERMEDIATE_EXERCISES_TITLE);

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
	];

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="container">
			<div className="container_top">
				<h1>Ćwiczenia dla śreniozaawaansowanych z akcesorium</h1>
			</div>
			<div className="container_bottom row">
				{exercisesArray.map((exercise, index): JSX.Element => {
					return (
						<ExercisesTitleCard
							level="accessory"
							exercise={exercise}
							index={index}
						/>
					);
				})}
			</div>
		</div>
	);
}
