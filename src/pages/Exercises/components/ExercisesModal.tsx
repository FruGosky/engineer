import { useTranslation } from 'react-i18next';

interface ExercisesModalProps {
	level: string;
	id: string;
	index: number;
	exercise: string;
	link: string;
}

export default function ExercisesModal(
	props: ExercisesModalProps
): JSX.Element {
	const { t: translation } = useTranslation();
	return (
		<div
			className="modal fade"
			id={props.id}
			tabIndex={-1}
			key={props.index}
			// aria-labelledby="exampleModalLabel"
			// aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							{translation(
								`page.exercises.${props.level}.${props.exercise}.title`
							)}
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						{translation(
							`page.exercises.${props.level}.${props.exercise}.description`
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Close
						</button>
						{/* <button
							type="button"
							className="btn btn-secondary"
							ref={`page.exercises.${props.level}.${props.exercise}.link`}
						>
							LINK
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
}
