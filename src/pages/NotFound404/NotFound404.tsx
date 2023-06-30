import styles from './NotFound404.module.scss';
import sadSmile from '../../assets/iconmonstr-smiley-24.svg';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

export default function NotFound404() {
	useWebsiteTitle('Error - 404');

	return (
		<div className="d-flex justify-content-center align-items-center flex-column text-danger">
			<img
				src={sadSmile}
				alt="sad smile"
				className={`w-25 mb-4 ${styles.icon}`}
			/>
			<h2>Error 404</h2>
			<h3>Page Not Found</h3>
			<p>Nie znaleziono takiej strony.</p>
		</div>
	);
}
