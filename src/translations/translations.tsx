import i18next from 'i18next';
import pl from './pl.json';
import en from './en.json';

i18next.init({
	// debug: true,
	fallbackLng: 'pl',
	resources: {
		pl,
		en,
	},
});
