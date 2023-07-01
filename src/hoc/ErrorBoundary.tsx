import React, { Component, ReactNode } from 'react';
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

	static getDerivedStateFromError(error: Error): ErrorBoundaryState | null {
		return { hasError: true, error };
	}

	render() {
		const { t: translation } = this.props;
		const ISSUE_HAS_OCCURRED = translation('common.issue-has-occurred');

		if (this.state.hasError) {
			const TRANSLATED_ERROR_MESSAGE = translation(
				`${this.state.error?.message}`
			);
			const error = this.state.error as Error & { code?: string }; // Type assertion to access the 'code' property

			return (
				<div className="d-flex align-items-center justify-content-center">
					<div className="alert alert-danger w-auto h-auto">
						{`${ISSUE_HAS_OCCURRED}: ${TRANSLATED_ERROR_MESSAGE}${
							error?.code ? ': ' + error.code : ''
						}`}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default withTranslation()(ErrorBoundary);
