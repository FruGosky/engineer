import React from 'react';

interface IProps {
	className?: string;
}

export default function Logo(props: IProps) {
	const { className } = props;

	return (
		<a className={`navbar-brand ${className}`} href="/">
			DoIt-Healthy
		</a>
	);
}
