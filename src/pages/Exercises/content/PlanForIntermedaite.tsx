import { useTranslation } from 'react-i18next';

export default function PlanForIntermediate() {
	const { t: translation } = useTranslation();

	const TRANSLATED_INTERMEDIATE = translation(
		'page.exercises.plan-card.btn-2'
	);
	const TRANSLATED_CAPTION = translation(
		'page.exercises.we-execute-plan-as-follows'
	);
	const TRANSLATED_MONDAY = translation('page.exercises.monday');
	const TRANSLATED_WEDNESDAY = translation('page.exercises.wednesday');
	const TRANSLATED_THURSDAY = translation('page.exercises.thursday');
	const TRANSLATED_SATURDAY = translation('page.exercises.saturday');
	const TRANSLATED_TRAINING = translation(
		'page.exercises.beginners-plan.training'
	);

	const TRANSLATED_PUSH = translation(
		'page.exercises.intermediate-plan.push'
	);
	const TRANSLATED_PULL = translation(
		'page.exercises.intermediate-plan.pull'
	);
	const TRANSLATED_BOTH_LEGS = translation(
		'page.exercises.intermediate-plan.both-legs'
	);
	const TRANSLATED_SINGLE_LEG = translation(
		'page.exercises.intermediate-plan.single-leg'
	);
	const TRANSLATED_HORIZONTAL = translation(
		'page.exercises.intermediate-plan.horizontal'
	);
	const TRANSLATED_VERTICAL = translation(
		'page.exercises.intermediate-plan.vertical'
	);
	const TRANSLATED_FREELY = translation(
		'page.exercises.intermediate-plan.freely'
	);
	const TRANSLATED_LOWER = translation(
		'page.exercises.intermediate-plan.lower'
	);

	const TRANSLATED_POWER_FBW = translation(
		'page.exercises.intermediate-plan.power-fbw'
	);
	const TRANSLATED_HYPER_LOW = translation(
		'page.exercises.intermediate-plan.hyper-low'
	);
	const TRANSLATED_HYPER_UP = translation(
		'page.exercises.intermediate-plan.hyper-up'
	);
	const TRANSLATED_BALANS_FBW = translation(
		'page.exercises.intermediate-plan.balans-fbw'
	);
	const TRANSLATED_TO = translation('common.to');
	const TRANSLATED_ACCESSORY = translation('page.exercises.accessory.title');

	return (
		<div className="mt-5 card-body shadow table-responsive">
			<h2 className="text-center">{TRANSLATED_INTERMEDIATE}</h2>
			<table className="table text-center">
				<caption className="text-center">
					{TRANSLATED_CAPTION}
					<ul className="list-unstyled">
						<li>
							<a>{`${TRANSLATED_MONDAY} 1.`}</a>
						</li>
						<li>
							<a>{`${TRANSLATED_WEDNESDAY} 2.`}</a>
						</li>
						<li>
							<a>{`${TRANSLATED_THURSDAY} 3.`}</a>
						</li>
						<li>
							<a>{`${TRANSLATED_SATURDAY} 4.`}</a>
						</li>
					</ul>
				</caption>

				<thead>
					<tr>
						<th scope="col">{`1. ${TRANSLATED_TRAINING} A | ${TRANSLATED_POWER_FBW.slice(
							0,
							9
						)} (4x3 ${TRANSLATED_TO} 5)`}</th>
						<th scope="col">{`2. ${TRANSLATED_TRAINING} B | ${TRANSLATED_HYPER_LOW.slice(
							0,
							9
						)} (4x8 ${TRANSLATED_TO} 10)`}</th>
						<th scope="col">{`3. ${TRANSLATED_TRAINING} C | ${TRANSLATED_HYPER_UP.slice(
							0,
							8
						)} (4x8 ${TRANSLATED_TO} 10)`}</th>
						<th scope="col">{`4. ${TRANSLATED_TRAINING} C | ${TRANSLATED_BALANS_FBW.slice(
							0,
							11
						)} (4x8 ${TRANSLATED_TO} 10)`}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_BOTH_LEGS}`}</td>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_BOTH_LEGS}`}</td>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_HORIZONTAL}`}</td>
						<td>{`${TRANSLATED_PUSH}/${TRANSLATED_PULL} ${TRANSLATED_LOWER}`}</td>
					</tr>
					<tr>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_BOTH_LEGS}`}</td>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_BOTH_LEGS}`}</td>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_VERTICAL}`}</td>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_FREELY}`}</td>
					</tr>
					<tr>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_HORIZONTAL}`}</td>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_SINGLE_LEG}`}</td>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_VERTICAL}`}</td>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_FREELY}`}</td>
					</tr>
					<tr>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_VERTICAL}`}</td>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_FREELY}`}</td>
						<td>{`${TRANSLATED_PULL} ${TRANSLATED_VERTICAL}`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
					</tr>
					<tr>
						<td>{`${TRANSLATED_PUSH} ${TRANSLATED_VERTICAL}`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>Biceps + Triceps 2x8 - 10</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
					</tr>
					<tr>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
					</tr>
					<tr>
						<td>-</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
						<td>{`${TRANSLATED_ACCESSORY} 2x8 - 10`}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
