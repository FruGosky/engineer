import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';

function App() {
	return (
		<div className="App">
			<Layout
				header={<Header />}
				content={<></>}
				footer={
					<div
						className="footer d-flex justify-content-center align-items-center"
						style={{ backgroundColor: 'rgb(248,249,250)' }}
					>
						<span>
							Page created by <strong>FruGosky</strong>
						</span>
					</div>
				}
			/>
		</div>
	);
}

export default App;
