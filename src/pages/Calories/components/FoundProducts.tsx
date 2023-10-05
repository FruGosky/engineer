import React from 'react';

export default function FoundProducts() {
	return (
		<div className="card new_product border-success mb-3">
			<div className="d-flex flex-column flex-sm-row justify-content-between">
				<div className="d-flex align-items-center justify-content-center text-center overflow-hidden">
					<p className="mb-2">
						NewProduct - Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Officiis eveniet eos veritatis
						excepturi accusamus cupiditate dolore a eaque ipsam
						tempore ullam, facere ut qui hic alias perferendis nobis
						unde voluptates?
					</p>
				</div>
				<ul className="list-group text-center">
					<li className="list-group-item border-info">350 kcal</li>
					<li className="list-group-item border-info">200g</li>
					<li className="list-group-item border-info">34g protein</li>
					<li className="list-group-item border-info">12g carbs</li>
					<li className="list-group-item border-info">56g fat</li>
				</ul>
			</div>
			<div className="d-flex align-items-center justify-content-center">
				<button className="btn btn-primary mt-3">
					Add this product
				</button>
			</div>
		</div>
	);
}
