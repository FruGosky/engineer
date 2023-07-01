import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';

export const BMI_TITLE = 'page.bmi.title';
export const BMI_LINK = '/bmi';

export default function Bmi() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(BMI_TITLE);
	// TODO! DELETE THIS TRANSLATION BELOW WHEN U WILL START ADDING SOME CONTENT TO THIS PAGE AND ADD YOURS TRANSLATION DO NOT FORGET TO ADD EN AND PL TRANSLATION NOT ONLY ONE ITS VERY VERY IMPORTANT TO HAVE ALL TRANSLATIONS
	const THIS_IS_PAGE = translation('to-be-deleted.this-is-page');

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center text-light">
			{`${THIS_IS_PAGE} ${TRANSLATED_TITLE}`}
		</div>
	);
}
