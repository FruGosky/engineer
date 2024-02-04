import { languages } from '../../../../translations/translations';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import useCurrentLanguage from '../../../../hooks/useCurrentLanguage';

export default function LanguageSwitcher() {
	const { i18n, t: translation } = useTranslation();
	const currentLanguage = useCurrentLanguage();
	const [dropdown, setDropdown] = useState<bootstrap.Dropdown | null>(null);

	useEffect(() => {
		const dropdownModalElement = document.getElementById(
			'languageSwitcherDropdown'
		);
		if (!dropdownModalElement) return;
		const bootstrapDropdown = new bootstrap.Dropdown(dropdownModalElement);
		setDropdown(bootstrapDropdown);
	}, []);

	useEffect(() => {
		document.documentElement.lang = currentLanguage;
		document
			.querySelector('meta[name="description"]')
			?.setAttribute('content', translation('common.description'));
	}, [currentLanguage, translation]);

	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle btn btn-outline-primary border-2"
				onClick={() => dropdown?.toggle()}
				aria-expanded="false"
			>
				{i18n.language.toUpperCase()}
			</button>

			<div
				className={`dropdown-menu ${styles.dropdownMenu}`}
				id="languageSwitcherDropdown"
				aria-labelledby="languageDropdown"
			>
				{Object.keys(languages).map((language) => (
					<button
						key={language}
						className="dropdown-item"
						onClick={() => {
							i18n.changeLanguage(language);
							dropdown?.hide();
						}}
						disabled={i18n.language === language}
					>
						{languages[language].nativeName}
					</button>
				))}
			</div>
		</div>
	);
}
