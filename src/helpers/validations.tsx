type TOldErrors = Record<string, string>;
type TOldErrorsWithEmail = TOldErrors & { email: string };
type TOldErrorsWithPassword = TOldErrors & { password: string };
type TOldErrorsWithUsername = TOldErrors & { username: string };
type TOldFormErrors = { hasError: boolean } & Record<string, any>;

export const validateEmail = (text: string): boolean => {
	const regExr = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
	return regExr.test(text);
};

export const fullValidationEmail = (
	email: string,
	invalidEmailMessage: string,
	setErrors: any,
	setFormErrors: any
): boolean => {
	if (validateEmail(email)) {
		setErrors((oldErrors: TOldErrorsWithEmail) => {
			const newErrors = {
				...oldErrors,
				email: '',
			};
			setFormErrors((oldFormErrors: TOldFormErrors) => ({
				...oldFormErrors,
				hasError: Object.values(newErrors).some((x) => x !== ''),
			}));
			return newErrors;
		});
		return true;
	} else {
		setErrors((oldErrors: TOldErrorsWithEmail) => ({
			...oldErrors,
			email: invalidEmailMessage,
		}));
		setFormErrors((oldFormErrors: TOldFormErrors) => ({
			...oldFormErrors,
			hasError: true,
		}));
		return false;
	}
};

export const validatePassword = (text: string): boolean => {
	const regExr =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
	return regExr.test(text);
};

export const fullValidationPassword = (
	password: string,
	invalidPasswordMessage: string,
	setErrors: any,
	setFormErrors: any
): boolean => {
	if (validatePassword(password)) {
		setErrors((oldErrors: TOldErrorsWithPassword) => {
			const newErrors = {
				...oldErrors,
				password: '',
			};
			setFormErrors((oldFormErrors: TOldFormErrors) => ({
				...oldFormErrors,
				hasError: Object.values(newErrors).some((x) => x !== ''),
			}));
			return newErrors;
		});
		return true;
	} else {
		setErrors((oldErrors: TOldErrorsWithPassword) => ({
			...oldErrors,
			password: invalidPasswordMessage,
		}));
		setFormErrors((oldFormErrors: TOldFormErrors) => ({
			...oldFormErrors,
			hasError: true,
		}));
		return false;
	}
};

export const validateUsername = (text: string): boolean => {
	const regExr = /^[A-Za-z0-9]+$/;
	return regExr.test(text);
};

export const fullValidationUsername = (
	username: string,
	invalidUsernameMessage: string,
	setErrors: any,
	setFormErrors: any
): boolean => {
	if (validateUsername(username)) {
		setErrors((oldErrors: TOldErrorsWithUsername) => {
			const newErrors = {
				...oldErrors,
				username: '',
			};
			setFormErrors((oldFormErrors: TOldFormErrors) => ({
				...oldFormErrors,
				hasError: Object.values(newErrors).some((x) => x !== ''),
			}));
			return newErrors;
		});
		return true;
	} else {
		setErrors((oldErrors: TOldErrorsWithUsername) => ({
			...oldErrors,
			username: invalidUsernameMessage,
		}));
		setFormErrors((oldFormErrors: TOldFormErrors) => ({
			...oldFormErrors,
			hasError: true,
		}));
		return false;
	}
};
