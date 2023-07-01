import { useTranslation } from 'react-i18next';

export default function Searchbar() {
	const { t: translation } = useTranslation();
	const SEARCH = translation('common.search');

	return (
		<div className="d-flex">
			<input type="text" placeholder={`${SEARCH}...`} />
			<button className="btn btn-primary">{SEARCH}</button>
		</div>
	);
}
