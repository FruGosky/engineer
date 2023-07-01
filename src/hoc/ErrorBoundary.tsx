import { Component, ReactNode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface ErrorBoundaryProps extends WithTranslation {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	render() {
		const { t: translation } = this.props;

		if (this.state.hasError) {
			return (
				<div className="d-flex align-items-center justify-content-center">
					<div className="alert alert-danger w-auto h-auto">
						{`${translation(
							'common.issue-has-occurred'
						)}: ${translation(`${this.state.error?.message}`)}`}
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default withTranslation()(ErrorBoundary);
