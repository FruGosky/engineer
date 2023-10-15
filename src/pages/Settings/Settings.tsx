import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SETTINGS_TITLE = 'page.settings.title';
export const SETTINGS_LINK = '/settings';

export default function Settings() {
	const [isLoading, setIsLoading] = useState(true);
	const { t: translation } = useTranslation();
	const [token, setToken] = useState({});
	const [displayName, setDisplayName] = useState('');

	const TRANSLATED_TITLE = translation(SETTINGS_TITLE);
	const T_SAVE = translation('common.save');
	const T_USERNAME = translation('common.username');
	const T_DATA_CHANGED_SUCCESSFULLY = translation(
		'common.data-changed-successfully'
	);
	const T_FAILED_TO_CHANGE_DATA = translation('common.failed-to-change-data');

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
					duration: 3000,
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
					duration: 3000,
					position: 'top-right',
				});
				setIsLoading(false);
				return false;
			});
	};

	useEffect(() => {
		const tokenFromLocalStorage = JSON.parse(
			localStorage.getItem('token') || '{}'
		);
		setToken(tokenFromLocalStorage);
		setDisplayName(tokenFromLocalStorage?.displayName);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1_000);
	}, []);

	return isLoading ? (
		<LoadingIcon />
	) : (
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
								className="form-control info_input"
								onChange={(e) => setDisplayName(e.target.value)}
								value={displayName}
								required
							/>
						</div>
					</div>

					<div className="d-flex align-items-center justify-content-center m-3">
						{isLoading ? (
							<LoadingIcon />
						) : (
							<button className="btn btn-primary col-auto mt-2">
								{T_SAVE}
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
