/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
	fullValidationEmail,
	fullValidationUsername,
} from '../../helpers/validations';

export const SETTINGS_TITLE = 'page.settings.title';
export const SETTINGS_LINK = '/settings';

type TBodyForPostUpdate = {
	idToken: string;
	returnSecureToken: boolean;
	email?: string;
	displayName?: string;
};

export default function Settings() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { t: translation } = useTranslation();
	const [token, setToken] = useState<any>({});
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [formErrors, setFormErrors] = useState({
		hasError: false,
		backendError: '',
	});
	const [errors, setErrors] = useState({
		username: '',
		email: '',
	});

	const TRANSLATED_TITLE = translation(SETTINGS_TITLE);
	const T_SAVE = translation('common.save');
	const T_USERNAME = translation('common.username');
	const T_DATA_CHANGED_SUCCESSFULLY = translation(
		'common.data-changed-successfully'
	);
	const T_FAILED_TO_CHANGE_DATA = translation('common.failed-to-change-data');
	const INVALID_EMAIL = translation('common.invalid-email');
	const INVALID_USERNAME = translation('common.invalid-username');

	useWebsiteTitle(TRANSLATED_TITLE);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitted(true);
		saveData();
	};

	const loadDataFromLocalStorage = () => {
		const tokenFromLocalStorage = JSON.parse(
			localStorage.getItem('token') || '{}'
		);
		setToken(tokenFromLocalStorage);
		setUsername(tokenFromLocalStorage?.displayName);
		setEmail(tokenFromLocalStorage?.email);
	};

	const saveData = async (): Promise<boolean> => {
		const bodyForPost: TBodyForPostUpdate = {
			idToken: JSON.parse(localStorage.getItem('token') || '')?.idToken,
			returnSecureToken: false,
		};
		if (token.email !== email) bodyForPost.email = email;
		if (token.displayName !== username) bodyForPost.displayName = username;
		return await axios
			.post(
				`${process.env.REACT_APP_UPDATE_URL}?key=${process.env.REACT_APP_API_KEY}`,
				bodyForPost
			)
			.then((response) => {
				toast.success(`${T_DATA_CHANGED_SUCCESSFULLY}.`, {
					duration: 1000,
					position: 'top-right',
				});
				localStorage.setItem(
					'token',
					JSON.stringify({
						...token,
						...response.data,
					})
				);
				loadDataFromLocalStorage();
				setIsSubmitted(false);
				return true;
			})
			.catch((error) => {
				console.error(error);
				setFormErrors((oldFormErrors) => ({
					...oldFormErrors,
					backendError: error.response.data.error.message,
				}));
				toast.error(`${T_FAILED_TO_CHANGE_DATA}!!!`, {
					duration: 1000,
					position: 'top-right',
				});
				setIsSubmitted(false);
				return false;
			});
	};

	useEffect(() => {
		fullValidationUsername(
			username,
			INVALID_USERNAME,
			setErrors,
			setFormErrors
		);
	}, [username]);

	useEffect(() => {
		fullValidationEmail(email, INVALID_EMAIL, setErrors, setFormErrors);
	}, [email]);

	useEffect(() => {
		loadDataFromLocalStorage();
	}, []);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 card shadow">
				<div className="d-flex justify-content-center mb-3">
					<h2>{TRANSLATED_TITLE}</h2>
				</div>
				<div className="col-md- mb-3 border-bottom border-info">
					{/* <p className="text-center">DESCRIPTION</p> */}
				</div>
				<form onSubmit={submitHandler}>
					<div className="form-group mb-3">
						<label className="form-label">{`${T_USERNAME}:`}</label>
						<input
							className={`form-control ${
								errors.username ? 'is-invalid' : 'is-valid'
							}`}
							type="text"
							required={true}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<div className="invalid-feedback">
							{errors.username}
						</div>
					</div>

					{/* <div className="form-group mb-3">
						<label className="form-label">{`Email:`}</label>
						<input
							className={`form-control ${
								errors.email ? 'is-invalid' : 'is-valid'
							}`}
							type="email"
							required={true}
							placeholder="email@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="invalid-feedback">{errors.email}</div>
					</div> */}

					{formErrors.backendError !== '' ? (
						<div className="alert alert-danger">
							{formErrors.backendError}
						</div>
					) : null}

					<div className="d-flex align-items-center justify-content-center mt-3">
						{isSubmitted ? (
							<LoadingIcon />
						) : (
							<button
								className="btn btn-primary col-auto mt-2"
								disabled={
									formErrors.hasError ||
									(token.email === email &&
										token.displayName === username)
								}
							>
								{T_SAVE}
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
