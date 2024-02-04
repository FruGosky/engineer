import { useContext } from 'react';
import { ThemeContext } from '../../../../context/themeContext';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
	const { t: translation } = useTranslation();
	const [theme, setTheme] = useContext(ThemeContext);
	const isThemeDark = theme === 'dark' ? true : false;
	const oppositeThemeName = isThemeDark ? 'light' : 'dark';

	const SWITCH_TO = translation('common.switch-to');
	const DARK = translation('common.dark').toLowerCase();
	const LIGHT = translation('common.light').toLowerCase();
	const THEME = translation('common.theme').toLowerCase();

	const ariaLabelForThemeSwitcher = isThemeDark
		? `${SWITCH_TO} ${LIGHT} ${THEME}`
		: `${SWITCH_TO} ${DARK} ${THEME}`;

	return (
		<>
			<div className="form-check form-switch d-flex align-items-center justify-content-center">
				<input
					className="form-check-input"
					type="checkbox"
					role="switch"
					checked={isThemeDark}
					onChange={() => {
						setTheme(oppositeThemeName);
						localStorage.setItem('theme', oppositeThemeName);
					}}
					aria-label={ariaLabelForThemeSwitcher}
					aria-checked={isThemeDark}
				/>
			</div>
		</>
	);
}
