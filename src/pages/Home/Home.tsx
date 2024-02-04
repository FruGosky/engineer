import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import { BMI_LINK } from '../Bmi/Bmi';
import { Link } from 'react-router-dom';
import { BMR_LINK } from '../Bmr/Bmr';
import { EXERCISES_LINK } from '../Exercises/Exercises';
import { CALORIES_LINK } from '../Calories/Calories';
import useAuth from '../../hooks/useAuth';
import { useModals } from '../../context/modalsContext';

export const HOME_TITLE = 'page.home.title';
export const HOME_LINK = '/';

export default function Home() {
	const { t: translation } = useTranslation();
	const [auth] = useAuth();
	const modals = useModals();

	const TRANSLATED_TITLE = translation(HOME_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);

	const HEADER = translation('page.home.header');
	const DESCRIPTION = translation('page.home.description');
	const SUMMARY = translation('page.home.summary');

	//BMI
	const BMI_TITLE = translation('page.home.bmi.title');
	const BMI_DESCRIPTION = translation('page.home.bmi.description');

	//BMR
	const BMR_TITLE = translation('page.home.bmr.title');
	const BMR_DESCRIPTION = translation('page.home.bmr.description');

	//EXERCISES
	const EXERCISES_TITLE = translation('page.home.exercises.title');
	const EXERCISES_DESCRIPTION = translation(
		'page.home.exercises.description'
	);

	//CALORIES
	const CALORIES_TITLE = translation('page.home.calories.title');
	const CALORIES_DESCRIPTION = translation('page.home.calories.description');
	const OPTION_AVAILABLE_ONLY_FOR_LOGIN_USERS = translation(
		'common.option-available-only-for-login-users'
	);
	const CLICK = translation('common.click');
	const HERE = translation('common.here').toLowerCase();
	const TO_REGISTER = translation('common.to-register').toLowerCase();

	// THROWING ERROR EXAMPLES LEAVE IT FOR NOW
	// throw new Error('common.internet-problem');
	// throw Object.assign(new Error('common.there-is-no-such-action'), {
	// 	code: 'nudy',
	// });

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-9 col-xl-7 my-4">
					<article className="row mb-4">
						<h1 className="p-2">{`${HEADER}`}</h1>
						<p className="px-4">{`${DESCRIPTION}`}</p>
					</article>
					<article className="row card">
						<div className="card-body">
							<h2 className="card-title">
								<Link to={BMI_LINK}>{`${BMI_TITLE}`}</Link>
							</h2>
							<p>{`${BMI_DESCRIPTION}`}</p>
						</div>
					</article>
					<article className="row card">
						<div className="card-body">
							<h2 className="card-title">
								<Link to={BMR_LINK}>{`${BMR_TITLE}`}</Link>
							</h2>
							<p>{`${BMR_DESCRIPTION}`}</p>
						</div>
					</article>
					<article className="row card">
						<div className="card-body">
							<h2 className="card-title">
								<Link
									to={EXERCISES_LINK}
								>{`${EXERCISES_TITLE}`}</Link>
							</h2>
							<p>{`${EXERCISES_DESCRIPTION}`}</p>
						</div>
					</article>
					<article className="row card">
						<div className="card-body">
							<h2 className="card-title">
								{auth ? (
									<Link
										to={CALORIES_LINK}
									>{`${CALORIES_TITLE}`}</Link>
								) : (
									`${CALORIES_TITLE}`
								)}
							</h2>
							<p>{`${CALORIES_DESCRIPTION}`}</p>
							<span className="text-danger">
								{`${OPTION_AVAILABLE_ONLY_FOR_LOGIN_USERS} ${CLICK} `}
								<button
									type="button"
									className="btn btn-link p-0 pb-1"
									onClick={() => {
										modals.signupModal?.show();
									}}
								>
									{`${HERE}`}
								</button>
								{` ${TO_REGISTER}`}
							</span>
						</div>
					</article>
					<p className="row">{`${SUMMARY}`}</p>
				</div>
			</div>
		</div>
	);
}
