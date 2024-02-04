import { useEffect, useRef, useState } from 'react';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import styles from './Calories.module.scss';
import NewProduct from './components/NewProduct';
import SearchFood from './components/SearchFood';
import AddProductManually from './components/AddProductManually';
import {
	TNewProduct,
	TNutritionObject,
	TProductsArray,
	TUserPersonalData,
} from '../../types';

export const CALORIES_TITLE = 'page.calories.title';
export const CALORIES_LINK = '/calories';

export default function Calories() {
	const { t: translation } = useTranslation();
	const addProductRef = useRef<HTMLDivElement | null>(null);
	const addConsumedProducts = useRef<HTMLDivElement | null>(null);

	const TRANSLATED_TITLE = translation(CALORIES_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);
	const TRANSLATION_CARBS = translation('page.calories.carbohydrates-2');
	const TRANSLATION_FAT = translation('page.calories.fat-2');
	const TRANSLATION_PROTEIN = translation('page.bmr.protein');
	const token = JSON.parse(localStorage.getItem('token') || 'null');

	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();

	const [units, setUnits] = useState<string | undefined>('metric');
	const [userWeight, setUserWeight] = useState<number | undefined>(0);
	const [caloriesGoal, setCaloriesGoal] = useState<number | undefined>(0);
	const [nutritionGoal, setNutritionGoal] = useState<TNutritionObject>({
		protein: 0,
		fat: 0,
		carbs: 0,
	});
	const [consumedCalories, setConsumedCalories] = useState<number>(0);
	const [consumedNutrition, setConsumedNutrition] =
		useState<TNutritionObject>({
			protein: 0,
			fat: 0,
			carbs: 0,
		});

	const [productsArray, setProductsArray] = useState<TProductsArray>([]);

	const handleRemoveProduct = (id: string) => {
		const newProductsArray = productsArray.filter(
			(product) => product.id !== id
		);
		setProductsArray(newProductsArray);
	};

	const handleAddProduct = (
		product: TNewProduct,
		gramOfProduct: number
	): void => {
		const consumedNutritionFromNewProduct: TNutritionObject = {
			protein: product.proteins_value
				? product.proteins_value * (gramOfProduct / 100)
				: 0,

			fat: product.fat_value
				? product.fat_value * (gramOfProduct / 100)
				: 0,

			carbs: product.carbohydrates_value
				? product.carbohydrates_value * (gramOfProduct / 100)
				: 0,
		};

		const consumedCaloriesFromNewProduct: number =
			(product['energy-kcal_value'] * gramOfProduct) / 100;

		const newID = 'id' + Math.random().toString(16).slice(2);
		const newProductsArray = [
			...productsArray,
			{
				id: newID,
				nameOfProduct: product.product_name_pl,
				descriptionOfProduct: product.ingredients_text_pl,
				consumedCalories: consumedCaloriesFromNewProduct,
				consumedGram: gramOfProduct,
				consumedProtein: consumedNutritionFromNewProduct.protein,
				consumedCarbs: consumedNutritionFromNewProduct.carbs,
				consumedFat: consumedNutritionFromNewProduct.fat,
			},
		];

		setProductsArray(newProductsArray);
		scrollToConsumedProducts();
	};

	const renderProductElements = () => {
		return productsArray.map((product, index) => (
			<NewProduct
				key={`${product.id}_${index}`}
				id={product.id}
				nameOfProduct={product.nameOfProduct}
				descriptionOfProduct={product.descriptionOfProduct}
				consumedCalories={product.consumedCalories}
				consumedGram={product.consumedGram}
				consumedProtein={product.consumedProtein}
				consumedCarbs={product.consumedCarbs}
				consumedFat={product.consumedFat}
				onRemove={() => handleRemoveProduct(product.id)}
			/>
		));
	};

	const scrollToProduct = (): void => {
		if (!addProductRef.current) return;
		addProductRef.current.scrollIntoView({ behavior: 'smooth' });
	};
	const scrollToConsumedProducts = (): void => {
		if (!addConsumedProducts.current) return;
		addConsumedProducts.current.scrollIntoView({ behavior: 'smooth' });
	};
	const handleProductSelectFromDatabase = (
		product: TNewProduct,
		howMuchGramEaten: number
	) => {
		handleAddProduct(product, howMuchGramEaten);
	};

	useEffect(() => {
		let totalCalories = 0;
		let totalProtein = 0;
		let totalFat = 0;
		let totalCarbs = 0;

		productsArray.forEach((product) => {
			totalCalories += product.consumedCalories;

			if (typeof product.consumedProtein === 'number') {
				totalProtein += product.consumedProtein;
			}
			if (typeof product.consumedFat === 'number') {
				totalFat += product.consumedFat;
			}
			if (typeof product.consumedCarbs === 'number') {
				totalCarbs += product.consumedCarbs;
			}
		});

		setConsumedCalories(totalCalories);
		setConsumedNutrition({
			protein: totalProtein,
			fat: totalFat,
			carbs: totalCarbs,
		});
		renderProductElements();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsArray]);

	useEffect(() => {
		const storedUserPersonalData =
			localStorage.getItem('user-personal-data');

		if (!storedUserPersonalData) return;
		const parsedUserPersonalData: TUserPersonalData = JSON.parse(
			storedUserPersonalData
		);
		setCaloriesGoal(parsedUserPersonalData.caloriesToAchieveGoal);
		setNutritionGoal({
			protein: parsedUserPersonalData.protein ?? 0,
			fat: parsedUserPersonalData.fat ?? 0,
			carbs: parsedUserPersonalData.carbs ?? 0,
		});
		parsedUserPersonalData.units === 'metric'
			? setUnits('kg')
			: setUnits('lbs');
		setUserWeight(parsedUserPersonalData.weight);
	}, []);

	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className={`${styles.main_card} card shadow`}>
				<h1 className="text-center border-bottom border-info p-2">
					{translation('page.calories.monitor-your-daily-calories')}
				</h1>
				<div
					className={`${styles.head_section}  d-flex border-bottom border-info flex-row justify-content-between`}
				>
					<div className="d-flex flex-column justify-content-between">
						<p className="h5 text-info">{`${
							token?.displayName
						} - ${userWeight?.toFixed(2)} ${units}`}</p>
						<p>{`${day}/${month}/${year}`}</p>
					</div>
					<div className="text-end">
						<p className="h5 text-info">{`${consumedCalories.toFixed()}/${caloriesGoal} kcal`}</p>
						<p
							className={`${styles.text_protein}`}
						>{`${consumedNutrition.protein.toFixed()}/${
							nutritionGoal.protein
						} g ${TRANSLATION_PROTEIN}`}</p>{' '}
						<p
							className={`${styles.text_fat}`}
						>{`${consumedNutrition.fat.toFixed()}/${
							nutritionGoal.fat
						} g ${TRANSLATION_FAT}`}</p>{' '}
						<p
							className={`${styles.text_carbs}`}
						>{`${consumedNutrition.carbs.toFixed()}/${
							nutritionGoal.carbs
						} g ${TRANSLATION_CARBS}`}</p>{' '}
					</div>
				</div>
				<div
					className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center"
					ref={addConsumedProducts}
				>
					{renderProductElements()}
					<button
						className="btn btn-primary m-3"
						onClick={scrollToProduct}
					>
						{translation('page.calories.add-product')}
					</button>
				</div>
				<div className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center">
					<SearchFood
						onProductSelect={handleProductSelectFromDatabase}
					/>
				</div>
				<div
					id="add_product"
					ref={addProductRef}
					className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center"
				>
					<AddProductManually onAdd={handleAddProduct} />
				</div>
			</div>
		</div>
	);
}
