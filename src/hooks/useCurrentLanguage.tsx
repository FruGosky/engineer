import { useTranslation } from 'react-i18next';

export default function useCurrentLanguage() {
	const { i18n } = useTranslation();

	if (i18n.language.toLowerCase().includes('en')) return 'en';

	return 'pl';
}
