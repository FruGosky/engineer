/* eslint-disable react-hooks/exhaustive-deps */
import useAuth from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { FormEvent, useEffect, useState } from 'react';
import {
	fullValidationEmail,
	fullValidationPassword,
} from '../../../helpers/validations';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useModals } from '../../../context/modalsContext';
import LoadingIcon from '../../LoadingIcon/LoadingIcon';

export default function LoginForm() {
	const [, setAuth] = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formErrors, setFormErrors] = useState({
		enabled: false,
		hasError: false,
		backendError: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const { t: translation } = useTranslation();
	const modals = useModals();

	const LOGIN = translation('common.login');
	const SIGNUP = translation('common.signup');
	const PASSWORD = translation('common.password');
	const NO_ACCOUNT_YET = translation('common.no-account-yet');
	const INVALID_EMAIL = translation('common.invalid-email');
	const INVALID_PASSWORD = translation('common.invalid-password');
	const UNSUCCESSFUL_LOGIN = translation('common.unsuccessful-login');

	const login = async (): Promise<boolean> => {
		return await axios
			.post(
				`${process.env.REACT_APP_SIGN_IN_URL}?key=${process.env.REACT_APP_API_KEY}`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)
			.then((response) => {
				setFormErrors((oldFormErrors) => ({
					...oldFormErrors,
					backendError: '',
					enabled: false,
					hasError: false,
				}));
				setEmail('');
				setPassword('');
				setAuth(true, response.data);
				setIsLoading(false);
				return true;
			})
			.catch((error) => {
				console.error(error);
				setFormErrors((oldFormErrors) => ({
					...oldFormErrors,
					backendError: error.response.data.error.message,
				}));
				toast.error(`${UNSUCCESSFUL_LOGIN}!!!`, {
					duration: 1000,
					position: 'top-right',
				});
				setIsLoading(false);
				return false;
			});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setFormErrors((oldFormErrors) => ({ ...oldFormErrors, enabled: true }));
		if (
			!fullValidationEmail(
				email,
				INVALID_EMAIL,
				setErrors,
				setFormErrors
			) ||
			!fullValidationPassword(
				password,
				INVALID_PASSWORD,
				setErrors,
				setFormErrors
			)
		) {
			setIsLoading(false);
			return;
		}
		if (await login()) modals.hideAllModals();
	};

	useEffect(() => {
		fullValidationEmail(email, INVALID_EMAIL, setErrors, setFormErrors);
	}, [email]);

	useEffect(() => {
		fullValidationPassword(
			password,
			INVALID_PASSWORD,
			setErrors,
			setFormErrors
		);
	}, [password]);

	return (
		<form onSubmit={handleSubmit}>
			<div className="modal-body d-flex flex-column gap-2">
				<div className="form-group">
					<label className="form-label">{`Email:`}</label>
					<input
						className={`form-control ${formErrors.enabled
								? errors.email
									? 'is-invalid'
									: 'is-valid'
								: null
							}`}
						type="email"
						required={true}
						placeholder="email@gmail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className="invalid-feedback">{errors.email}</div>
					{/* <div className="valid-feedback">Everything is OK!</div> */}
				</div>
				<div className="form-group">
					<label className="form-label">{`${PASSWORD}:`}</label>
					<input
						className={`form-control ${formErrors.enabled
								? errors.password
									? 'is-invalid'
									: 'is-valid'
								: null
							}`}
						type="password"
						required={true}
						placeholder="************"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="invalid-feedback">{errors.password}</div>
					{/* <div className="valid-feedback">Everything is OK!</div> */}
				</div>
				{formErrors.enabled && formErrors.backendError !== '' ? (
					<div className="alert alert-danger">
						{formErrors.backendError}
					</div>
				) : null}
			</div>
			<div className="modal-footer justify-content-center flex-column">
				{isLoading ? (
					<LoadingIcon />
				) : (
					<button
						type="submit"
						className="btn btn-primary"
						disabled={formErrors.hasError && formErrors.enabled}
					>
						{LOGIN}
					</button>
				)}
				<div className="d-flex gap-1">
					{`${NO_ACCOUNT_YET}?`}
					<a
						href="!"
						onClick={(e) => {
							e.preventDefault();
							modals.hideAllModals();
							modals.signupModal?.show();
						}}
					>
						{SIGNUP}
					</a>
				</div>
			</div>
		</form>
	);
}
