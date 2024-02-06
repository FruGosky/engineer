import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function useWebsiteDescription(description: string) {
	const { t: translation } = useTranslation();
	const DEFAULT_DESCRIPTION = translation('common.description');

	const setDescription = (newDescription: string) => {
		document
			.querySelector('meta[name="description"]')
			?.setAttribute('content', newDescription);
	};

	useEffect(() => {
		setDescription(description || DEFAULT_DESCRIPTION);
	}, [description, DEFAULT_DESCRIPTION]);

	return setDescription;
}
