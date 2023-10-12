import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';

export default function LoginModal() {
	const { t: translation } = useTranslation();

	const LOGIN = translation('common.login');

	return (
		<>
			<div
				className="modal fade"
				id="loginModal"
				tabIndex={-1}
				aria-labelledby="loginModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="loginModalLabel"
							>
								{LOGIN}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</>
	);
}
