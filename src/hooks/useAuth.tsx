import { useContext, useEffect, useState } from 'react';
import { ReducerContext } from '../context/reducerContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

type TSetAuth = (isAuthenticated: boolean, tokenData?: object & { expiresIn: number } | null, showToast?: boolean) => void;

export default function useAuth(): [boolean, TSetAuth] {
	const { t: translation } = useTranslation();
	const reducer = useContext(ReducerContext);
	const [expireTime, setExpireTime] = useState<number | null>(null);

	const SUCCESSFUL_LOGIN = translation('common.successful-login');
	const SUCCESSFUL_LOGOUT = translation('common.successful-logout');
	const auth = reducer.state.isAuthenticated;

	const setAuth: TSetAuth = (isAuthenticated, tokenData = null, showToast = true) => {
		if (isAuthenticated) {
			reducer.dispatch({ type: 'login' });

			if (tokenData) {
				const expireTimeInMs = tokenData.expiresIn * 1000;
				const expireDate = Date.now() + expireTimeInMs;
				const tokenDataWithExpiresDate = { ...tokenData, expireDate };
				window.localStorage.setItem('token', JSON.stringify(tokenDataWithExpiresDate));
				setExpireTime(expireTimeInMs);
				if (!showToast) return;
				toast.success(`${SUCCESSFUL_LOGIN}.`, {
					duration: 1000,
					position: 'top-right',
				});
			}
		} else {
			reducer.dispatch({ type: 'logout' });
			window.localStorage.removeItem('token');
			setExpireTime(null);
			if (!showToast) return;
			toast.success(`${SUCCESSFUL_LOGOUT}.`, {
				duration: 1000,
				position: 'top-right',
			});
		}
	};

	useEffect(() => {
		if (expireTime === null) return;

		const timeoutId = setTimeout(() => setAuth(false, null, false), expireTime);

		return () => clearTimeout(timeoutId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expireTime])

	useEffect(() => {
		const token = window.localStorage.getItem('token');
		if (!token) return;
		const parsedToken = JSON.parse(token);

		const expiredDate: undefined | number = parsedToken?.expireDate;
		if (!expiredDate) return;

		const isExpired = expiredDate <= Date.now() ? true : false;
		const refreshToken = parsedToken.refreshToken;
		if (isExpired || !refreshToken) {
			setAuth(false);
			return;
		}

		setExpireTime(expiredDate - Date.now());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [auth, setAuth];
}
