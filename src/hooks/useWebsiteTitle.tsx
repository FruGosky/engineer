import { useEffect } from 'react';

export default function useWebsiteTitle(title?: string) {
	const setTitle = (newTitle: string) => {
		document.title = newTitle;
	};

	useEffect(() => {
		if (!title) {
			setTitle('DoIt-Healthy');
			return;
		}

		setTitle(title);
	}, [title]);

	return setTitle;
}
