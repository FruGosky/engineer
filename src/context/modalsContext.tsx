import { createContext, useContext, useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import Modals from '../components/Modals/Modals';

type TModalsContextProvider = {
	children: JSX.Element;
};

const defaultValue = {
	hideAllModals: () => {},
	loginModal: null as bootstrap.Modal | null,
	signupModal: null as bootstrap.Modal | null,
};

const ModalsContext = createContext(defaultValue);

export const useModals = () => useContext(ModalsContext);

export default function ModalsContextProvider({
	children,
}: TModalsContextProvider) {
	const [loginModal, setLoginModal] = useState<bootstrap.Modal | null>(null);
	const [signupModal, setSignupModal] = useState<bootstrap.Modal | null>(
		null
	);

	const hideAllModals = (): void => {
		if (loginModal) loginModal.hide();
		if (signupModal) signupModal.hide();
	};

	useEffect(() => {
		const loginModalElement = document.getElementById('loginModal');
		if (!loginModalElement) return;
		setLoginModal(new bootstrap.Modal(loginModalElement));
	}, []);

	useEffect(() => {
		const signupModalElement = document.getElementById('signupModal');
		if (!signupModalElement) return;
		setSignupModal(new bootstrap.Modal(signupModalElement));
	}, []);

	return (
		<ModalsContext.Provider
			value={{
				hideAllModals,
				loginModal,
				signupModal,
			}}
		>
			<Modals />
			{children}
		</ModalsContext.Provider>
	);
}
