import React, { useState } from 'react';
import { TAddProductManuallyProps, TNewProduct } from '../../../types';
import { useTranslation } from 'react-i18next';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';

export default function AddProductManually(props: TAddProductManuallyProps) {
	const { onAdd } = props;
	const [kcalOfProduct, setKcalOfProduct] = useState<number>(0);
	const [gramOfProduct, setGramOfProduct] = useState<number>(0);
	const [proteins_value, setProteinOfProduct] = useState<number | undefined>(
		0
	);
	const [carbohydrates_value, setCarbsOfProduct] = useState<
		number | undefined
	>(0);
	const [fat_value, setFatOfProduct] = useState<number | undefined>(0);
	const [product_name_pl, setNameOfProduct] = useState<string>('');
	const [descriptionOfProduct, setDescriptionOfProduct] =
		useState<string>('');
	const { t: translation } = useTranslation();

	const TRANSLATION_IN = translation('page.calories.in');
	const TRANSLATION_PROTEIN_2 = translation('page.calories.protein-2');
	const TRANSLATION_CARBS_2 = translation('page.calories.carbohydrates-2');
	const TRANSLATION_CARBS = translation('page.bmr.carbohydrates');
	const TRANSLATION_FAT = translation('page.bmr.fat');
	const TRANSLATION_FAT_2 = translation('page.calories.fat-2');
	const TRANSLATION_DESCRIPTION_OPTIONAL = translation(
		'page.calories.description-(optional)'
	);
	const TRANSLATION_TYPE_DESCRIPTION = translation(
		'page.calories.type-description..'
	);
	const firebaseConfig = {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.REACT_APP_DATABASE_URL,
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_APP_ID,
	};
	const app = initializeApp(firebaseConfig);
	const db = getDatabase(app);
	const nutrition_data_per = '100g'; //bcs database collets this kind of data and it will be constant every time on POST

	const handleAddNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newProduct: TNewProduct = {
			product_name_pl,
			nutrition_data_per,
			'energy-kcal_value': kcalOfProduct,
			fat_value,
			carbohydrates_value,
			proteins_value,
			ingredients_text_pl: descriptionOfProduct, //description
		};

		const token = localStorage.getItem('token');
		if (token) {
			const tokenData = JSON.parse(token);
			addProductToDatabase(newProduct, tokenData);
		}

		onAdd(newProduct, gramOfProduct);

		setKcalOfProduct(0);
		setGramOfProduct(0);
		setProteinOfProduct(0);
		setCarbsOfProduct(0);
		setFatOfProduct(0); //after adding product it sets value to 0 but when i set here undefined(setFatOfProduct(undefined)) after executing submit handler it keeps previous value instead of setting it to undef..
		setNameOfProduct('');
		setDescriptionOfProduct('');
	};
	const addProductToDatabase = async (
		newProduct: TNewProduct,
		tokenData: { localId: string }
	) => {
		const userUID = tokenData.localId;
		try {
			const usersFoodRef = ref(db, `usersFood/${userUID}`);
			// Push the new product to the user-specific catalog in Firebase
			await push(usersFoodRef, newProduct);
		} catch (error) {
			console.log(error);
		}
	};
	// TODO! fix error with uncontrolled component for protein carbs and fat on input
	return (
		<div>
			<h2 className="m-3 text-center">
				{translation('page.calories.add-your-product')}
			</h2>
			<form onSubmit={handleAddNewProduct}>
				<div className="">
					<div className="mb-3 d-flex align-items-center justify-content-center">
						<div className="add_product row g-3 mb-3 w-100 ">
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="name_input"
										className="col-form-label"
									>
										{translation(
											'page.calories.name-of-the-product'
										) + ':'}
									</label>
								</div>
								<div className="col-auto d-flex flex-column flex-md-row">
									<input
										type="text"
										id="name_input"
										className="form-control ms-2"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setNameOfProduct(e.target.value);
										}}
										value={product_name_pl}
										placeholder={translation(
											'page.calories.type-name'
										)}
										required
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">
											{translation('page.calories.name')}
										</span>
									</div>
								</div>
							</div>

							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="kcal_input"
										className="col-form-label"
									>
										{`Kcal ${TRANSLATION_IN} 100g:`}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="kcal_input"
										className="form-control ms-2"
										min="1"
										max="10000"
										step={1}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setKcalOfProduct(
												parseFloat(e.target.value)
											);
										}}
										value={kcalOfProduct}
										required
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">kcal</span>
									</div>
								</div>
							</div>

							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="gram_input"
										className="col-form-label"
									>
										{translation(
											'page.calories.how-much-gram-eaten'
										)}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="gram_input"
										className="form-control ms-2"
										min="1"
										max="10000"
										step={1}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setGramOfProduct(
												parseFloat(e.target.value)
											);
										}}
										value={gramOfProduct}
										required
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">gram</span>
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="protein_input"
										className="col-form-label"
									>
										{`${TRANSLATION_PROTEIN_2} ${TRANSLATION_IN} 100g:`}{' '}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="protein_input"
										className="form-control ms-2"
										min="0"
										max="10000"
										step={1}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setProteinOfProduct(
												parseFloat(e.target.value)
											);
										}}
										value={proteins_value ?? 0}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">
											{translation('page.bmr.protein')}
										</span>{' '}
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="carbs_input"
										className="col-form-label"
									>
										{`${TRANSLATION_CARBS} ${TRANSLATION_IN} 100g:`}{' '}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="carbs_input"
										className="form-control ms-2"
										min="0"
										max="10000"
										step={1}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setCarbsOfProduct(
												parseFloat(e.target.value)
											);
										}}
										value={carbohydrates_value}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">
											{TRANSLATION_CARBS_2}
										</span>{' '}
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="fat_input"
										className="col-form-label"
									>
										{`${TRANSLATION_FAT} ${TRANSLATION_IN} 100g:`}{' '}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="fat_input"
										className="form-control ms-2"
										min="0"
										max="10000"
										step={1}
										inputMode="decimal"
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										): void => {
											setFatOfProduct(
												parseFloat(e.target.value)
											);
										}}
										value={fat_value}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">
											{TRANSLATION_FAT_2}
										</span>
									</div>
								</div>
							</div>
							<div className="input-group d-flex flex-column">
								<div className="col-auto">
									<label
										htmlFor="description_input"
										className="col-form-label"
									>
										{`${TRANSLATION_DESCRIPTION_OPTIONAL}:`}
									</label>
								</div>
								<textarea
									id="description_input"
									className="form-control w-100"
									aria-label="With textarea"
									placeholder={TRANSLATION_TYPE_DESCRIPTION}
									onChange={(
										e: React.ChangeEvent<HTMLTextAreaElement>
									): void => {
										setDescriptionOfProduct(e.target.value);
									}}
									value={descriptionOfProduct}
								></textarea>
							</div>
						</div>
					</div>
				</div>

				<div className="d-flex align-items-center justify-content-center m-3">
					<button className="btn btn-primary col-auto mt-2">
						{translation('page.calories.add')}
					</button>
				</div>
			</form>
		</div>
	);
}
