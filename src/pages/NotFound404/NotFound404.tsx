import styles from './NotFound404.module.scss';
import sadSmile from '../../assets/iconmonstr-smiley-24.svg';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HOME_LINK, HOME_TITLE } from '../Home/Home';

export const NOT_FOUND_404_TITLE = 'page.not-found-404.title';

export default function NotFound404() {
	const { t: translation } = useTranslation();
	const TRANSLATED_TITLE = translation(NOT_FOUND_404_TITLE);
	const PAGE_DOES_NOT_EXIST = translation(
		'page.not-found-404.page-does-not-exist'
	);
	const TRY_GOING_TO_HOME_PAGE = translation(
		'page.not-found-404.try-going-to-home-page'
	);
	const TRANSLATED_HOME_TITLE = translation(HOME_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	return (
		<div className="container-fluid">
			<div className="d-flex justify-content-center align-items-center flex-column text-danger h-100 text-center">
				<img
					src={sadSmile}
					alt="sad smile"
					className={`w-25 mb-4 ${styles.icon}`}
				/>

				<h2>{TRANSLATED_TITLE}</h2>
				<p>{`${PAGE_DOES_NOT_EXIST}.`}</p>
				<p>{`${TRY_GOING_TO_HOME_PAGE}.`}</p>

				<Link to={HOME_LINK} className="btn btn-primary">
					{TRANSLATED_HOME_TITLE}
				</Link>
			</div>
		</div>
	);
}
