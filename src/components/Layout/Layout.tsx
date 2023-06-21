import React, { ReactElement } from 'react';
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
			{header && <header className={styles.header}>{header}</header>}
			{content && <main className={styles.main}>{content}</main>}
			{footer && <footer className={styles.footer}>{footer}</footer>}
		</>
	);
}
