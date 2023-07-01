import { languages } from '../../../translations/translations';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();

	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle btn btn-outline-primary border-2"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{i18n.language.toUpperCase()}
			</button>

			<div
				className={`dropdown-menu ${styles.dropdownMenu}`}
				aria-labelledby="languageDropdown"
			>
				{Object.keys(languages).map((language) => (
					<button
						key={language}
						className="dropdown-item"
						onClick={() => i18n.changeLanguage(language)}
						disabled={i18n.language === language}
					>
						{languages[language].nativeName}
					</button>
				))}
			</div>
		</div>
	);
}
