import { useTranslation } from 'react-i18next';
import './PlanForBeginners.scss';
export default function PlanForBeginnersMan() {
	const { t: translation } = useTranslation();

	const TRANSLATED_MEN = translation('page.exercises.beginners-plan.men');
	const TRANSLATED_CAPTION = translation(
		'page.exercises.we-execute-plan-as-follows'
	);
	const TRANSLATED_MONDAY = translation('page.exercises.monday');
	const TRANSLATED_WEDNESDAY = translation('page.exercises.wednesday');
	const TRANSLATED_FRIDAY = translation('page.exercises.friday');
	const TRANSLATED_TRAINING = translation(
		'page.exercises.beginners-plan.training'
	);
	const TRANSLATED_SQUATS = translation(
		'page.exercises.beginners-plan.squats.title'
	);
	const TRANSLATED_BENCH_PRESS = translation(
		'page.exercises.beginners-plan.bench-press.title'
	);
	const TRANSLATED_ROWING = translation(
		'page.exercises.beginners-plan.rowing.title'
	);
	const TRANSLATED_SIDE_RAISES = translation(
		'page.exercises.beginners-plan.side-raises.title'
	);
	const TRANSLATED_CABLE_CRUNCH = translation(
		'page.exercises.beginners-plan.cable-crunch.title'
	);
	const TRANSLATED_CALVES = translation(
		'page.exercises.beginners-plan.calves.title'
	);
	const TRANSLATED_CLASSIC_DEADLIFT = translation(
		'page.exercises.beginners-plan.classic-deadlift.title'
	);
	const TRANSLATED_MILITARY_PRESS = translation(
		'page.exercises.beginners-plan.military-press.title'
	);
	const TRANSLATED_CLOSE_GRIP_CHIN_UPS = translation(
		'page.exercises.beginners-plan.close-grip-chin-ups.title'
	);
	const TRANSLATED_NARROW_BENCH_PRESS = translation(
		'page.exercises.beginners-plan.narrow-bench-press.title'
	);
	const TRANSLATED_PLANK = translation(
		'page.exercises.beginners-plan.plank.title'
	);

	return (
		<div className="m-0 m-sm-3 mt-5 pt-2 pb-0 card px-0 px-sm-4">
			<div className="card-body px-0 px-sm-4">
				<h2 className="text-center card-title">{TRANSLATED_MEN}</h2>
				<table className="table table-striped table-hover text-center m-0">
					<caption className="text-center">
						{TRANSLATED_CAPTION}:
						<ul className="list-unstyled m-1">
							<li>
								<span>
									{TRANSLATED_MONDAY}
									<span className="letter_red ms-1">A</span>
								</span>
							</li>
							<li>
								<span>
									{TRANSLATED_WEDNESDAY}
									<span className="letter_green ms-1">B</span>
								</span>
							</li>
							<li>
								<span>
									{TRANSLATED_FRIDAY}
									<span className="letter_red ms-1">A</span>
								</span>
							</li>
							<li>
								<span>
									{TRANSLATED_MONDAY}
									<span className="letter_green ms-1">B</span>
								</span>
							</li>
							<li>
								<span>
									{TRANSLATED_WEDNESDAY}
									<span className="letter_red ms-1">A</span>
								</span>
							</li>
							<li>
								<span>
									{TRANSLATED_FRIDAY}
									<span className="letter_green ms-1">B</span>
								</span>
							</li>
						</ul>
					</caption>

					<thead>
						<tr>
							<th scope="col">{`${TRANSLATED_TRAINING} A`}</th>
							<th scope="col">{`${TRANSLATED_TRAINING} B`}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{`${TRANSLATED_SQUATS} 5x5`}</td>
							<td>{`${TRANSLATED_CLASSIC_DEADLIFT} 5x5`}</td>
						</tr>
						<tr>
							<td>{`${TRANSLATED_BENCH_PRESS} 5x5`}</td>
							<td>{`${TRANSLATED_MILITARY_PRESS} 5x5`}</td>
						</tr>
						<tr>
							<td>{`${TRANSLATED_ROWING} 5x5`}</td>
							<td>{`${TRANSLATED_CLOSE_GRIP_CHIN_UPS} 5x5`}</td>
						</tr>
						<tr>
							<td>{`${TRANSLATED_SIDE_RAISES} 3x8`}</td>
							<td>{`${TRANSLATED_NARROW_BENCH_PRESS} 3x8`}</td>
						</tr>
						<tr>
							<td>{'Biceps + Triceps'}</td>
							<td>Biceps 3x8</td>
						</tr>
						<tr>
							<td>{`${TRANSLATED_CABLE_CRUNCH} 3x8`}</td>
							<td>{`${TRANSLATED_PLANK} 3x8`}</td>
						</tr>
						<tr>
							<td>{`${TRANSLATED_CALVES} 3x8`}</td>
							<td>{`${TRANSLATED_CALVES} 3x8`}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
