interface IProps {
	className?: string;
}

export default function Logo(props: IProps) {
	const { className = '' } = props;

	return (
		// const { className } = props;
		// const HOME_PAGE = pages.find((page) => page.element === <Home />);

		// return (
		// <Link
		// 	className={`navbar-brand ${className}`}
		// 	to={HOME_PAGE ? HOME_PAGE.path : '/'}
		// 	// onClick={() => setCurrentPath(HOME_PAGE?.path)}
		// >
		// 	DoIt-Healthy
		// </Link>
		<a className={`navbar-brand ${className}`} href="/">
			DoIt-Healthy
		</a>
	);
}
