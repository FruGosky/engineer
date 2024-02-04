import { useTranslation } from 'react-i18next';

type TProps = {
	className?: string;
};

export default function Logo(props: TProps) {
	const { className = '' } = props;
	const { t: translation } = useTranslation();
	const TRANSLATED_APP_NAME = translation('common.app-name');

	return (
		// const { className } = props;
		// const HOME_PAGE = pages.find((page) => page.element === <Home />);

		// return (
		// <Link
		// 	className={`navbar-brand ${className}`}
		// 	to={HOME_PAGE ? HOME_PAGE.path : '/'}
		// 	// onClick={() => setCurrentPath(HOME_PAGE?.path)}
		// >
		// 	{`${TRANSLATED_APP_NAME}`}
		// </Link>
		<a className={`navbar-brand ${className}`} href="/">
			{`${TRANSLATED_APP_NAME}`}
		</a>
	);
}
