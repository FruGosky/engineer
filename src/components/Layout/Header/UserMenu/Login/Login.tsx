import { useTranslation } from 'react-i18next';
import { useModals } from '../../../../../context/modalsContext';

export default function Login() {
	const { t: translation } = useTranslation();

	const LOGIN = translation('common.login');

	const modals = useModals();

	return (
		<button
			type="button"
			className="btn btn-primary p-2 p-md-primary"
			onClick={() => modals.loginModal?.show()}
		>
			{LOGIN}
		</button>
	);
}
