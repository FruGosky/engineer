import { useTranslation } from 'react-i18next';

export default function Accessory() {
	const { t: translation } = useTranslation();

	const TRANSLATED_SIDE_RAISES = translation(
		'page.exercises.beginners-plan.side-raises.title'
	);
	const TRANSLATED_CABLE_CRUNCH = translation(
		'page.exercises.beginners-plan.cable-crunch.title'
	);
	const TRANSLATED_PLANK = translation(
		'page.exercises.beginners-plan.plank.title'
	);

	const TRANSLATED_ACCESSORY = translation('page.exercises.accessory.title');

	const TRANSLATED_FACEPULL = translation(
		'page.exercises.accessory.facepull.title'
	);
	const TRANSLATED_YRISE = translation(
		'page.exercises.accessory.y-rise.title'
	);
	const TRANSLATED_BUTTERFLY = translation(
		'page.exercises.accessory.butterfly.title'
	);
	const TRANSLATED_SHOULDER_RAISES_DROP = translation(
		'page.exercises.accessory.shoulder-raises-drop.title'
	);
	const TRANSLATED_DUMBBELL_FLYS = translation(
		'page.exercises.accessory.dumbbell-flys.title'
	);
	const TRANSLATED_SKIER = translation(
		'page.exercises.accessory.skier.title'
	);
	const TRANSLATED_UPPER_LIFT_PULLDOWN = translation(
		'page.exercises.accessory.upper-lift-pulldown.title'
	);
	const TRANSLATED_LEG_CURLS_LYING = translation(
		'page.exercises.accessory.leg-curls-lying.title'
	);
	const TRANSLATED_NORDIC_CURLS = translation(
		'page.exercises.accessory.nordic-curls.title'
	);
	const TRANSLATED_CALVES_STANDING = translation(
		'page.exercises.accessory.calves-standing.title'
	);
	const TRANSLATED_BUTTOCK_ISOLATION = translation(
		'page.exercises.accessory.buttock-isolation.title'
	);
	const TRANSLATED_ADDUCTORS = translation(
		'page.exercises.accessory.adductors.title'
	);

	const accessoryArray: string[] = [
		TRANSLATED_LEG_CURLS_LYING,
		TRANSLATED_NORDIC_CURLS,
		TRANSLATED_CALVES_STANDING,
		TRANSLATED_BUTTOCK_ISOLATION,
		TRANSLATED_ADDUCTORS,
		TRANSLATED_CABLE_CRUNCH,
		TRANSLATED_PLANK,
		'Hollow Body',
	];

	const accessoryLoop = (accessoryArray: string[]): JSX.Element[] => {
		return accessoryArray.map((el, index) => (
			<tr key={index}>
				<td>{el}</td>
				<td>-</td>
				<td>-</td>
				<td>{el}</td>
			</tr>
		));
	};

	return (
		<div className="m-0 m-sm-3 mt-5 pt-2 pb-0 card table-responsive px-0 px-md-4">
			<div className="card-body px-0 px-md-4">
				<h2 className="text-center card-title mb-3">
					{TRANSLATED_ACCESSORY}
				</h2>
				<table className="table table-striped-columns text-center">
					<thead>
						<tr>
							<th scope="col">{`${TRANSLATED_ACCESSORY} A `}</th>
							<th scope="col">{`${TRANSLATED_ACCESSORY} B `}</th>
							<th scope="col">{`${TRANSLATED_ACCESSORY} C `}</th>
							<th scope="col">{`${TRANSLATED_ACCESSORY} D `}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{TRANSLATED_SIDE_RAISES}</td>
							<td>{TRANSLATED_LEG_CURLS_LYING}</td>
							<td>{TRANSLATED_SIDE_RAISES}</td>
							<td>{TRANSLATED_SIDE_RAISES}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_FACEPULL}</td>
							<td>{TRANSLATED_NORDIC_CURLS}</td>
							<td>{TRANSLATED_FACEPULL}</td>
							<td>{TRANSLATED_FACEPULL}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_YRISE}</td>
							<td>{TRANSLATED_CALVES_STANDING}</td>
							<td>{TRANSLATED_YRISE}</td>
							<td>{TRANSLATED_YRISE}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_BUTTERFLY}</td>
							<td>{TRANSLATED_BUTTOCK_ISOLATION}</td>
							<td>{TRANSLATED_BUTTERFLY}</td>
							<td>{'-'}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_SHOULDER_RAISES_DROP}</td>
							<td>{TRANSLATED_ADDUCTORS}</td>
							<td>{TRANSLATED_SHOULDER_RAISES_DROP}</td>
							<td>{TRANSLATED_SHOULDER_RAISES_DROP}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_DUMBBELL_FLYS}</td>
							<td>{`${TRANSLATED_CABLE_CRUNCH} 3x8`}</td>
							<td>{TRANSLATED_DUMBBELL_FLYS}</td>
							<td>{TRANSLATED_DUMBBELL_FLYS}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_SKIER}</td>
							<td>{TRANSLATED_PLANK}</td>
							<td>{TRANSLATED_SKIER}</td>
							<td>{TRANSLATED_SKIER}</td>
						</tr>
						<tr>
							<td>{TRANSLATED_UPPER_LIFT_PULLDOWN}</td>
							<td>Hollow Body</td>
							<td>{TRANSLATED_UPPER_LIFT_PULLDOWN}</td>
							<td>{TRANSLATED_UPPER_LIFT_PULLDOWN}</td>
						</tr>
						{accessoryLoop(accessoryArray)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
