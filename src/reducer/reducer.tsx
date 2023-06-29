export const initialState = {
	loading: true,
	isAuthenticated: false,
};

export const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'set-loading':
			return { ...state, loading: action.loading };
		case 'login':
			return { ...state, isAuthenticated: true };
		case 'logout':
			return { ...state, isAuthenticated: false };
		default:
			throw new Error(`Nie ma takiej akcji: ${action.type}`);
	}
};
