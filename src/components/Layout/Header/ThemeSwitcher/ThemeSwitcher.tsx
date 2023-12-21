import { useContext } from 'react';
import { ThemeContext } from '../../../../context/themeContext';

export default function ThemeSwitcher() {
	const [theme, setTheme] = useContext(ThemeContext);
	const isThemeDark = theme === 'dark' ? true : false;
	const oppositeThemeName = isThemeDark ? 'light' : 'dark';

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
				/>
			</div>
		</>
	);
}
