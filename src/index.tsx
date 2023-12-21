import React from 'react';
// For React v18
import ReactDOM from 'react-dom/client';
// For React v17
// import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { getLCP, getFID, getCLS } from 'web-vitals';

// For React v18
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

getLCP((metric) => {
	if (metric.value > 3000) {
		console.log('LCP', metric);
	}
}, true);

getFID((metric) => {
	if (metric.value > 100) {
		console.log('FID', metric);
	}
}, true);

getCLS((metric) => {
	if (metric.value > 0.25) {
		console.log('CLS', metric);
	}
}, true);

// For React v17
// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );
