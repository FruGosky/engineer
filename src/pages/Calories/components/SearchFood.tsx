import React from 'react';

export default function SearchFood() {
	return (
		<div>
			<h1 className="m-3 text-center">
				Look through our food product database
			</h1>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Type name of the product here..."
					aria-label="Type name of the product here..."
					aria-describedby="button-addon2"
				/>
				<button
					className="btn btn-outline-primary"
					type="button"
					id="button-addon2"
				>
					Find
				</button>
			</div>
		</div>
	);
}

function getDatabase() {
	throw new Error('Function not implemented.');
}

