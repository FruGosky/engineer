/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { fullValidationEmail } from '../../helpers/validations';

export const SETTINGS_TITLE = 'page.settings.title';
export const SETTINGS_LINK = '/settings';

export default function Settings() {
	const [isLoading, setIsLoading] = useState(true);
	const { t: translation } = useTranslation();
	const [token, setToken] = useState({});
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [formErrors, setFormErrors] = useState({
		hasError: false,
		backendError: '',
	});
	const [errors, setErrors] = useState({
		displayName: '',
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

	useWebsiteTitle(TRANSLATED_TITLE);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		saveData();
	};

	const saveData = async (): Promise<boolean> => {
		return await axios
			.post(
				`${process.env.REACT_APP_UPDATE_URL}?key=${process.env.REACT_APP_API_KEY}`,
				{
					idToken: JSON.parse(localStorage.getItem('token') || '')
						?.idToken,
					displayName,
					returnSecureToken: false,
				}
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
				setIsLoading(false);
				return true;
			})
			.catch((error) => {
				console.error(error);
				toast.error(`${T_FAILED_TO_CHANGE_DATA}!!!`, {
					duration: 1000,
					position: 'top-right',
				});
				setIsLoading(false);
				return false;
			});
	};

	useEffect(() => {
		fullValidationEmail(email, INVALID_EMAIL, setErrors, setFormErrors);
	}, [email]);

	useEffect(() => {
		const tokenFromLocalStorage = JSON.parse(
			localStorage.getItem('token') || '{}'
		);
		setToken(tokenFromLocalStorage);
		setDisplayName(tokenFromLocalStorage?.displayName);
		setEmail(tokenFromLocalStorage?.email);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1_000);
	}, []);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="col-md-12 col-lg-6 col-xl-5 card shadow">
				<div className="d-flex justify-content-center mb-3 ">
					<h2>{TRANSLATED_TITLE}</h2>
				</div>
				<div className="col-md- mb-3 border-bottom border-info">
					{/* <p className="text-center">DESCRIPTION</p> */}
				</div>
				<form onSubmit={submitHandler}>
					<div className="row g-3 mb-3 d-flex justify-content-center mt-2">
						<div className="col-auto">
							<label
								htmlFor="displayName_input"
								className="col-form-label"
							>
								{`${T_USERNAME}:`}
							</label>
						</div>
						<div className="col-auto flex-row">
							<input
								type="text"
								id="displayName_input"
								className={`form-control ${
									displayName.length
										? 'is-valid'
										: 'is-invalid'
								}`}
								onChange={(e) => setDisplayName(e.target.value)}
								value={displayName}
								required
							/>
						</div>
					</div>
					<div className="row g-3 mb-3 d-flex justify-content-center mt-2">
						<div className="col-auto">
							<label
								htmlFor="email_input"
								className="col-form-label"
							>
								{`Email:`}
							</label>
						</div>
						<div className="col-auto flex-row">
							<input
								type="email"
								id="email_input"
								className={`form-control ${
									errors.email ? 'is-invalid' : 'is-valid'
								}`}
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								placeholder="email@gmail.com"
								required
							/>
						</div>
						<div className="invalid-feedback">{errors.email}</div>
					</div>

					<div className="d-flex align-items-center justify-content-center m-3">
						{isLoading ? (
							<LoadingIcon />
						) : (
							<button
								className="btn btn-primary col-auto mt-2"
								disabled={formErrors.hasError}
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
