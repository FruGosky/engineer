import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import { useModals } from '../../../context/modalsContext';

export default function LoginModal() {
	const { t: translation } = useTranslation();

	const LOGIN = translation('common.login');

	const modals = useModals();

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
							<h2
								className="modal-title fs-5"
								id="loginModalLabel"
							>
								{LOGIN}
							</h2>
							<button
								type="button"
								className="btn-close"
								aria-label="Close"
								onClick={() => modals.hideAllModals()}
							/>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</>
	);
}
