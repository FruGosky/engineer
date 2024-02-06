import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function useWebsiteKeywords(keywords: string) {
	const { t: translation } = useTranslation();
	const DEFAULT_KEYWORDS = translation('common.keywords');

	const setKeywords = (newKeywords: string) => {
		document
			.querySelector('meta[name="keywords"]')
			?.setAttribute('content', newKeywords);
	};

	useEffect(() => {
		setKeywords(keywords || DEFAULT_KEYWORDS);
	}, [keywords, DEFAULT_KEYWORDS]);

	return setKeywords;
}
