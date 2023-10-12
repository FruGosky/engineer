export const validateEmail = (text: string): boolean => {
	const regExr = /^\S+@\S+\.\S+$/;
	return regExr.test(text);
};

export const validatePassword = (text: string): boolean => {
	const regExr =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
	return regExr.test(text);
};
