import { useEffect } from 'react';

export default function useWebsiteTitle(title: string) {
	const setTitle = (newTitle: string) => {
		document.title = `DoIt-Healthy - ${newTitle}`;
	};

	useEffect(() => {
		setTitle(title || 'DoIt-Healthy');
	}, [title]);

	return setTitle;
}
