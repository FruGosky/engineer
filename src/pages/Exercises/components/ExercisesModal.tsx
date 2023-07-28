import { useTranslation } from 'react-i18next';

interface ExercisesModalProps {
	level: string;
	id: string;
	exercise: string;
	link: string;
}

export default function ExercisesModal(
	props: ExercisesModalProps
): JSX.Element {
	const { t: translation } = useTranslation();

	const TRANSLATED_CLOSE = translation('common.close');

	const handleLink = () => {
		window.open(
			translation(`page.exercises.${props.level}.${props.exercise}.link`)
		);
	};
	return (
		<div className="modal fade" id={props.id} tabIndex={-1}>
			<div className="modal-dialog modal-dialog-centered">
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
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							{TRANSLATED_CLOSE}
						</button>
						<button
							type="button"
							className="btn btn-info"
							onClick={handleLink}
						>
							LINK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
