import React, { useEffect, useRef, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './Calories.scss';
import NewProduct from './components/NewProduct';
import SearchFood from './components/SearchFood';
import FoundProducts from './components/FoundProducts';
import AddProductManually from './components/AddProductManually';

export const CALORIES_TITLE = 'page.calories.title';
export const CALORIES_LINK = '/calories';

export default function Calories() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();
	const addProductRef = useRef<HTMLDivElement | null>(null); // Create a ref for the "add_product" div

	const TRANSLATED_TITLE = translation(CALORIES_TITLE);

	useWebsiteTitle(TRANSLATED_TITLE);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Function to scroll to the "add_product" div
	const scrollToProduct = () => {
		if (addProductRef.current) {
			addProductRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center">
			<div className="card shadow">
				<h1 className="text-center border-bottom border-info p-2">
					Monitor your daily calories and macro nutrition here
				</h1>
				<div className="head_section  d-flex border-bottom border-info flex-row justify-content-between">
					<div className="d-flex flex-column justify-content-between">
						<p>USERNAME</p>
						<p>15.01.2024 (current date)</p>
					</div>
					<div className="text-end">
						<p>
							Limits are set according to your BMR and choice of
							goal:
						</p>
						<p>1145/2000 kcal</p>
						<p>11/200 protein</p>
						<p>14/167 carbs</p>
						<p>69/90 fat</p>
					</div>
				</div>
				<div className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center">
					<NewProduct />
					<NewProduct />
					<NewProduct />
					<button
						className="btn btn-primary m-3"
						onClick={scrollToProduct}
					>
						Add product
					</button>
				</div>
				<div className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center">
					<SearchFood />
					<FoundProducts />
					<FoundProducts />
					<FoundProducts />
				</div>
				<div
					id="add_product"
					ref={addProductRef} // Attach the ref to the "add_product" div
					className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center"
				>
					<AddProductManually />
				</div>
			</div>
		</div>
	);
}
