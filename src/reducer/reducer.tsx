const token = window.localStorage.getItem('token');
const parsedToken = token ? JSON.parse(token) : null;
const expiredDate: number = parsedToken?.expireDate || 0;
const getIsAuthenticated = expiredDate > Date.now();

if (!getIsAuthenticated) window.localStorage.removeItem('token');

export const initialState = {
	isAuthenticated: getIsAuthenticated,
};

export const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'login':
			return { ...state, isAuthenticated: true };
		case 'logout':
			return { ...state, isAuthenticated: false };
		default:
			throw Object.assign(new Error('common.there-is-no-such-action'), {
				code: action.type,
			});
	}
};
