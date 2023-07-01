export const initialState = {
	isAuthenticated: false,
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
