import React, { useState } from 'react';

type TNewProduct = {
	product_name: string;
	nutrition_data_per: string;
	'energy-kcal_value': number;
	fat_value: number;
	carbohydrates_value: number;
	proteins_value: number;
	ingredients_text_pl: string; //description?
};

export default function AddProductManually() {
	const [kcalOfProduct, setKcalOfProduct] = useState<number>(0);
	const [gramOfProduct, setGramOfProduct] = useState<number>(0);
	const [proteinOfProduct, setProteinOfProduct] = useState<number>(0);
	const [carbsOfProduct, setCarbsOfProduct] = useState<number>(0);
	const [fatOfProduct, setFatOfProduct] = useState<number>(0);
	const [nameOfProduct, setNameOfProduct] = useState<string>('');
	const [descriptionOfProduct, setDescriptionOfProduct] =
		useState<string>('');
	const NUTRITIION_DATA_PER = '100g'; //bcs database collets this kind of data and it will be constant everitime on POST

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newProduct: TNewProduct = {
			product_name: nameOfProduct,
			nutrition_data_per: NUTRITIION_DATA_PER,
			'energy-kcal_value': kcalOfProduct,
			fat_value: fatOfProduct,
			carbohydrates_value: carbsOfProduct,
			proteins_value: proteinOfProduct,
			ingredients_text_pl: descriptionOfProduct, //description?
		};
		console.log(newProduct);
		//adding product to newProduct array and posting it to database
	};

	return (
		<div>
			<h1 className="m-3 text-center">Add your product</h1>
			<form onSubmit={submitHandler}>
				<div className="">
					<div className="mb-3 d-flex align-items-center justify-content-center">
						<div className="add_product row g-3 mb-3 w-100 ">
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="name_input"
										className="col-form-label"
									>
										{`Name of the product:`}
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
										value={nameOfProduct}
										placeholder="Type name.."
										required
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">name</span>
									</div>
								</div>
							</div>

							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="kcal_input"
										className="col-form-label"
									>
										{`Kcal in 100g:`}
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
										{`How much eaten:`}
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
										{`Protein in 100g:`}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="protein_input"
										className="form-control ms-2"
										min="1"
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
										value={proteinOfProduct}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">
											protein
										</span>
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="carbs_input"
										className="col-form-label"
									>
										{`Carbohydrates in 100g:`}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="carbs_input"
										className="form-control ms-2"
										min="1"
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
										value={carbsOfProduct}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">carbs</span>
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row justify-content-between border-bottom border-secondary p-2">
								<div className="col-auto">
									<label
										htmlFor="fat_input"
										className="col-form-label"
									>
										{`Fat in 100g:`}
									</label>
								</div>
								<div className="col-auto d-flex flex-row">
									<input
										type="number"
										id="fat_input"
										className="form-control ms-2"
										min="1"
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
										value={fatOfProduct}
									/>
									<div className="col-auto text d-flex align-items-center justify-content-center">
										<span className="form-text">fat</span>
									</div>
								</div>
							</div>
							<div className="input-group d-flex flex-column">
								<div className="col-auto">
									<label
										htmlFor="description_input"
										className="col-form-label"
									>
										{`Description (optional):`}
									</label>
								</div>
								<textarea
									id="description_input"
									className="form-control w-100"
									aria-label="With textarea"
									placeholder="Type description.."
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
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
