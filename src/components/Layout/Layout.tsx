import { ReactElement } from 'react';
import styles from './Layout.module.scss';

interface IProps {
	header?: ReactElement;
	content?: ReactElement;
	footer?: ReactElement;
}

export default function Layout(props: IProps) {
	const { header, content, footer } = props;

	return (
		<>
			{header && (
				<header className={`${styles.header} sticky-top`}>
					{header}
				</header>
			)}
			{content && (
				<main
					className={`${styles.main} overflow-y-scroll container-fluid bg-body-secondary`}
				>
					{content}
				</main>
			)}
			{footer && (
				<footer className={`${styles.footer} fixed-bottom`}>
					{footer}
				</footer>
			)}
		</>
	);
}
