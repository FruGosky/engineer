const arr = [
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
<div className="d-flex align-items-center justify-content-center">
	{arr.map((ex) => {
		return (
			<div className="container">
				<span className="header">
					{translation(`page.exercises.beginners-plan.${ex}.title`)}
				</span>
				<div className="description">
					{translation(
						`page.exercises.beginners-plan.${ex}.description`
					)}
				</div>
				<div className="link">
					{translation(`page.exercises.beginners-plan.${ex}.link`)}
				</div>
			</div>
		);
	})}
</div>;
