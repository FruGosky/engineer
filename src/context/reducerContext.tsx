import React from 'react';
interface ContextType {
	state: any;
	dispatch: React.Dispatch<any>;
}

export const ReducerContext = React.createContext<ContextType>({
	state: {},
	dispatch: () => {},
});

ReducerContext.displayName = 'ReducerContext';
