import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = {
		hasError: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	// componentDidCatch(error: Error, errorInfo: ErrorInfo) {
	// 	console.log(error);
	// 	console.log(errorInfo);
	// }

	render() {
		document.title = 'Error - 404';

		if (this.state.hasError) {
			return (
				<div className="d-flex align-items-center justify-content-center">
					<div className="alert alert-danger w-auto h-auto">
						Wystąpił jakiś problem: {this.state.error?.message}
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
