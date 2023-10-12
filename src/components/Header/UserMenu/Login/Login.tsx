import { useTranslation } from 'react-i18next';
import LoginModal from '../../../Modals/LoginModal/LoginModal';

export default function Login() {
	const { t: translation } = useTranslation();

	const LOGIN = translation('common.login');

	return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#loginModal"
			>
				{LOGIN}
			</button>
			<LoginModal />
		</>
	);
}
