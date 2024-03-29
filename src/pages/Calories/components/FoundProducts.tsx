import React, { useState } from 'react';
import { TProduct } from '../../../types';
import styles from '../Calories.module.scss';
import { useTranslation } from 'react-i18next';

export default function FoundProducts(props: {
	products: TProduct[];
	selectedLanguage: string;
	onProductSelect(product: TProduct, howMuchGramEaten: number): void;
}) {
	const { t: translation } = useTranslation();
	const TRANSLATION_CARBS = translation('page.bmr.carbohydrates');
	const TRANSLATION_FAT = translation('page.bmr.fat');
	const TRANSLATION_PROTEIN = translation('page.bmr.protein');

	const [howMuchGramEaten, setHowMuchGramEaten] = useState<number>(0);

	const productsArray = props.products;

	const handleAddThisProduct = (product: TProduct) => {
		props.onProductSelect(product, howMuchGramEaten);
	};

	return (
		<React.Fragment>
			{productsArray.map((el, index) => {
				return (
					<div
						key={index}
						className={`d-flex flex-md-row flex-sm-column card ${styles.item_card} ${styles.new_product} border-success mb-3 w-100 d-flex align-items-center justify-content-around`}
					>
						<div className="d-flex flex-column align-items-center justify-content-center text-center overflow-hidden">
							<p className="m-2">
								{props.selectedLanguage === 'pl'
									? `${el.product_name_pl} - ${
											el.ingredients_text_pl || ''
									  }`
									: `${el.product_name_en} - ${
											el.ingredients_text_en || ''
									  }`}
							</p>

							<div className="d-flex align-items-center justify-content-center">
								<button
									className="btn btn-primary mt-3 mb-3"
									onClick={() => handleAddThisProduct(el)}
								>
									{translation(
										'page.calories.add-this-product'
									)}
								</button>
							</div>
						</div>
						<ul className="list-group text-center">
							<li className="list-group-item border-info">
								{' '}
								{el['energy-kcal_value']
									? `${el['energy-kcal_value']} kcal`
									: `--/ kcal`}
							</li>
							<li className="list-group-item border-info">
								<div className="col-auto">
									<label
										htmlFor="how_much_eaten_input"
										className="col-form-label"
									>
										{translation(
											'page.calories.how-much-gram-eaten'
										)}
									</label>
								</div>
								<div className="col-auto">
									<input
										type="number"
										id="how_much_eaten_input"
										className="form-control info_input"
										min="1"
										max="300"
										step={0.01}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setHowMuchGramEaten(
												parseFloat(e.target.value)
											);
										}}
										value={howMuchGramEaten}
										required
									/>
								</div>
							</li>
							<li className="list-group-item border-info">
								{el.proteins_value
									? `${el.proteins_value} g ${TRANSLATION_PROTEIN}`
									: `--/g ${TRANSLATION_PROTEIN}`}
							</li>
							<li className="list-group-item border-info">
								{el.carbohydrates_value
									? `${el.carbohydrates_value} g ${TRANSLATION_CARBS}`
									: `--/g ${TRANSLATION_CARBS}`}
							</li>
							<li className="list-group-item border-info">
								{el.fat_value
									? `${el.fat_value} g ${TRANSLATION_FAT}`
									: `--/g ${TRANSLATION_FAT}`}
							</li>
						</ul>
					</div>
				);
			})}
		</React.Fragment>
	);
}
