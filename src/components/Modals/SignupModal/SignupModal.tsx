import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm';

export default function SignupModal() {
	const { t: translation } = useTranslation();

	const SIGNUP = translation('common.signup');

	return (
		<>
			<div
				className="modal fade"
				id="signupModal"
				tabIndex={-1}
				aria-labelledby="signupModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2
								className="modal-title fs-5"
								id="signupModalLabel"
							>
								{SIGNUP}
							</h2>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<SignupForm />
					</div>
				</div>
			</div>
		</>
	);
}
