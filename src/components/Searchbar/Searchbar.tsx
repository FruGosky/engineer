import React from 'react';
import styles from './Searchbar.module.scss';

export default function Searchbar() {
	return (
		<div className="d-flex">
			<input
				type="text"
				className={styles.input}
				placeholder="Szukaj..."
			/>
			<button className="btn btn-primary">Szukaj</button>
		</div>
	);
}
