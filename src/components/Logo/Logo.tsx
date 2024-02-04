import { useTranslation } from 'react-i18next';

type TLogoProps = {
	Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function Logo(props: TLogoProps) {
	const { Tag = 'h1' } = props;
	const { t: translation } = useTranslation();
	const TRANSLATED_APP_NAME = translation('common.app-name');
	const TRANSLATED_HOME_TITLE = translation('page.home.title');

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
		<Tag className={'navbar-brand m-0 fw-normal'}>
			<a
				className="navbar-brand"
				href="/"
				title={TRANSLATED_HOME_TITLE}
			>{`${TRANSLATED_APP_NAME}`}</a>
		</Tag>
	);
}
