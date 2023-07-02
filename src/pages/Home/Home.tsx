import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';

export const HOME_TITLE = 'page.home.title';
export const HOME_LINK = '/';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(HOME_TITLE);
	// TODO! DELETE THIS TRANSLATION BELOW WHEN U WILL START ADDING SOME CONTENT TO THIS PAGE AND ADD YOURS TRANSLATION DO NOT FORGET TO ADD EN AND PL TRANSLATION NOT ONLY ONE ITS VERY VERY IMPORTANT TO HAVE ALL TRANSLATIONS
	const THIS_IS_PAGE = translation('to-be-deleted.this-is-page');

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// THROWING ERROR EXAMPLES LEAVE IT FOR NOW
	// throw new Error('common.internet-problem');
	// throw Object.assign(new Error('common.there-is-no-such-action'), {
	// 	code: 'nudy',
	// });

	// TODO! testPageWithManyLines() IS TEMPORARY FOR TESTING IF U WANT TO ADD CONTENT TO THIS PAGE DELETE THIS
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const testPageWithManyLines = () => {
		const paragraphs = [];

		for (let i = 0; i < 100; i++) {
			paragraphs.push(
				<p key={i}>
					Enim sunt incididunt aute tempor nulla cillum qui dolor in
					velit enim eiusmod non. Occaecat aliquip occaecat sint anim
					occaecat in fugiat sit. Esse velit laborum ad reprehenderit.
					Sit proident et laborum commodo ut consectetur sint qui enim
					duis dolor consectetur est mollit. Proident do tempor in
					tempor velit enim deserunt Lorem eu velit consequat
					excepteur laborum. Duis fugiat aliqua excepteur aliqua magna
					adipisicing cupidatat fugiat.
				</p>
			);
		}

		return paragraphs;
	};
	// return (
	// 	<div className="d-flex align-items-center justify-content-center">
	// 		{testPageWithManyLines()}
	// 	</div>
	// );

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center">
			{`${THIS_IS_PAGE} ${TRANSLATED_TITLE}`}
		</div>
	);
}
