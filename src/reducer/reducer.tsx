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
			throw new Error(`Nie ma takiej akcji: ${action.type}`);
	}
};
