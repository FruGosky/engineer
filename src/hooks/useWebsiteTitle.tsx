import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function useWebsiteTitle(title?: string) {
	const { t: translation } = useTranslation();
	const TRANSLATED_APP_NAME = translation('common.app-name');

	const setTitle = (newTitle: string) => {
		document.title = `${TRANSLATED_APP_NAME} - ${newTitle}`;
	};

	useEffect(() => {
		if (!title) {
			setTitle(TRANSLATED_APP_NAME || 'DoIt-Healthy');
			return;
		}

		setTitle(title);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [title]);

	return setTitle;
}
