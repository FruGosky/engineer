import { useTranslation } from 'react-i18next';

export default function LoadingIcon() {
	const { t: translation } = useTranslation();
	const LOADING = translation('common.loading');

	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="spinner-border text-info" role="status">
				<span className="visually-hidden">{`${LOADING}...`}</span>
			</div>
		</div>
	);
}
