import React, { useEffect, useRef, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import './Calories.scss';
import NewProduct from './components/NewProduct';
import SearchFood from './components/SearchFood';
import FoundProducts from './components/FoundProducts';
import AddProductManually from './components/AddProductManually';
import { TNewProduct, TNutritionObject, TProductsArray } from '../../types';

export const CALORIES_TITLE = 'page.calories.title';
export const CALORIES_LINK = '/calories';

export default function Calories() {
	
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();
	const addProductRef = useRef<HTMLDivElement | null>(null); // Create a ref for the "add_product" div
	const addConsumedProducts = useRef<HTMLDivElement | null>(null); // Create a ref for the "add_product" div

	const TRANSLATED_TITLE = translation(CALORIES_TITLE);
	useWebsiteTitle(TRANSLATED_TITLE);

	const fakeCaloriesGoal = 3534 
	const fakeProteinGoal = 156
	const fakeCarbsGoal = 507
	const fakeFatGoal= 98

		const token = JSON.parse(localStorage.getItem('token') || 'null');

	const currentDate = new Date()
	let day = currentDate.getDate();
	let month = currentDate.getMonth();
	let year = currentDate.getFullYear();


	const [consumedCalories, setConsumedCalories] = useState<number>(0)
	const [consumedNutriotion, setConsumedNutrition] = useState<TNutritionObject>({
		protein:0,
		fat:0,
		carbs:0
	})

const [productsArray, setProductsArray] = useState<TProductsArray>([
	//dummy data for testing
	{
		id: "id" + Math.random().toString(16).slice(2),
	  nameOfProduct: 'Product 1',
	  descriptionOfProduct: 'Description 1',
	  consumedCalories: 100,
	  consumedGram: 50,
	  consumedProtein: 23,
	  consumedCarbs: 16,
	  consumedFat: 28
	},
	{
		id: "id" + Math.random().toString(16).slice(2),
	  nameOfProduct: 'Product 2',
	  descriptionOfProduct: 'Description 2',
	  consumedCalories: 154,
	  consumedGram: 50,
	  consumedProtein: undefined,
	  consumedCarbs: undefined,
	  consumedFat: undefined
	},
	{
		id: "id" + Math.random().toString(16).slice(2),
	  nameOfProduct: 'Product 3',
	  descriptionOfProduct: 'Description 3',
	  consumedCalories: 100,
	  consumedGram: 50,
	  consumedProtein: 23,
	  consumedCarbs: 16,
	  consumedFat: 28
	},
	{
		id: "id" + Math.random().toString(16).slice(2),
	  nameOfProduct: 'Product 4',
	  descriptionOfProduct: 'Description 4',
	  consumedCalories: 154,
	  consumedGram: 50,
	  consumedProtein: undefined,
	  consumedCarbs: undefined,
	  consumedFat: undefined
	},
  ]);
  const handleRemoveProduct = (id: string) => {

	// Create a new array that excludes the product with the specified id
	const newProductsArray = productsArray.filter(product => product.id !== id);
  
	// Update the state with the new array
	setProductsArray(newProductsArray);
  };
 const hanldeAddProductManually = (product: TNewProduct, gramOfProduct: number): void =>{

	const consumedNutriotionFromNewProduct: TNutritionObject = {
		protein: product.proteins_value !== undefined ? product.proteins_value * (gramOfProduct / 100) : 0,
		fat: product.fat_value !== undefined ? product.fat_value * (gramOfProduct / 100) : 0,
		carbs: product.carbohydrates_value !== undefined ? product.carbohydrates_value * (gramOfProduct / 100) : 0
	}

	const consumedCaloriesFromNewProduct: number = (product['energy-kcal_value']*gramOfProduct/100)
	//! here add some POST method to post to firebase newProduct to some separate collection 

	//Updating products array with new product
	const newProductsArray = [
		...productsArray,
		{
		  id: product.id,
		  nameOfProduct: product.product_name,
		  descriptionOfProduct: product.ingredients_text_pl,
		  consumedCalories: consumedCaloriesFromNewProduct,
		  consumedGram: gramOfProduct,
		  consumedProtein: consumedNutriotionFromNewProduct.protein,
		  consumedCarbs: consumedNutriotionFromNewProduct.carbs,
		  consumedFat: consumedNutriotionFromNewProduct.fat,
		},
	  ];
	
	  // Update the state with the new array
	  setProductsArray(newProductsArray);
	  scrollToConsumedProducts()
 }
 const generateProductElements = () => {
    return productsArray.map((product) => (
      <NewProduct
        key={product.id}
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
	// Function to scroll to the "add_product" div
	const scrollToProduct = (): void => {
		if (addProductRef.current) {
			addProductRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const scrollToConsumedProducts = (): void => {
		if (addConsumedProducts.current) {
			addConsumedProducts.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		// Calculate the consumed calories and nutrition
		let totalCalories = 0;
		let totalProtein = 0;
		let totalFat = 0;
		let totalCarbs = 0;
	  
		productsArray.forEach((product) => {
		  totalCalories += product.consumedCalories;
	  
		  // Check if nutrition values are defined before adding them
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
	  
		// Update state with the calculated values
		setConsumedCalories(totalCalories);
		setConsumedNutrition({
		  protein: totalProtein,
		  fat: totalFat,
		  carbs: totalCarbs,
		});
		generateProductElements()
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [productsArray]);
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
						<p>{token?.displayName}</p>
						<p>{`${day}/${month}/${year}`}</p>
					</div>
					<div className="text-end">
						<p>
							Limits are set according to your BMR and choice of
							goal:
						</p>
						<p>{`${consumedCalories.toFixed()}/${fakeCaloriesGoal} kcal`}</p>
						<p>{`${consumedNutriotion.protein.toFixed()}/${fakeProteinGoal} protein`}</p>
						<p>{`${consumedNutriotion.carbs.toFixed()}/${fakeCarbsGoal} carbs`}</p>
						<p>{`${consumedNutriotion.fat.toFixed()}/${fakeFatGoal} fat`}</p>
						
					</div>
				</div>
				<div className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center" ref={addConsumedProducts} >
				{generateProductElements()}
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
					<AddProductManually onAdd={hanldeAddProductManually}/>
				</div>
			</div>
		</div>
	);
}
