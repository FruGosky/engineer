import { useState, useEffect } from 'react';

export default function BmiCalculator(): JSX.Element {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [outputLabel, setOutputLabel] = useState<string>('');
	const [BMI, setBmi] = useState<number>(0);

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);
		setWeightValue(0);
		setOutputLabel('');
	};
	//TODO! add change of units working, work on colors depending on the level of BMI or sth + translation
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitted(true);
		setBmi((weightValue / (heightValue * heightValue)) * 10000);
	};
	useEffect(() => {
		if (BMI < 18.5) {
			setOutputLabel('Niedowaga');
		} else if (BMI >= 18.5 && BMI < 24.9) {
			setOutputLabel('Waga w normie');
		} else if (BMI >= 25 && BMI < 29.9) {
			setOutputLabel('Nadwaga');
		} else if (BMI >= 30 && BMI < 34.9) {
			setOutputLabel('Otyłość');
		} else {
			setOutputLabel('Zaczna otyłość');
		}
	}, [BMI]);
	return (
		<div className="card">
			<div className="mb-3">
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="flexRadioDefault"
						id="women"
					/>
					<label className="form-check-label" htmlFor="woman">
						Metric Units
					</label>
				</div>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="flexRadioDefault"
						id="man"
					/>
					<label className="form-check-label" htmlFor="man">
						Imperial Units
					</label>
				</div>
			</div>
			<form onSubmit={submitHandler}>
				<div className="row g-3  mb-3 d-flex justify-content-between">
					<div className="col-auto">
						<label
							htmlFor="height_input"
							className="col-form-label"
						>
							Wzrost -
						</label>
					</div>
					<div className="col-auto">
						<input
							type="number"
							id="height_input"
							className="form-control info_input"
							min="1"
							max="300"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void => {
								setHeightValue(parseFloat(event.target.value));
							}}
							value={heightValue}
							required
						/>
					</div>
					<div className="col-auto text">
						<span id="passwordHelpInline" className="form-text">
							CM
						</span>
					</div>
				</div>
				<div className="row g-3  mb-3 d-flex justify-content-between">
					<div className="col-auto">
						<label
							htmlFor="weight_input"
							className="col-form-label "
						>
							Waga -
						</label>
					</div>
					<div className="col-auto">
						<input
							type="number"
							id="weight_input"
							className="form-control info_input"
							min="1"
							max="300"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void => {
								setWeightValue(parseFloat(event.target.value));
							}}
							value={weightValue}
							required
						/>
					</div>
					<div className="col-auto text">
						<span id="passwordHelpInline" className="form-text">
							KG
						</span>
					</div>
				</div>
				<button className="btn btn-primary col-auto">Oblicz</button>
			</form>
			{isSubmitted ? (
				<div>
					<div className="mt-3 text-center">
						<label htmlFor="customRange1" className="form-label">
							Twoje BMI:
						</label>
						<input
							type="range"
							min="12"
							max="42"
							className="form-range"
							id="customRange1"
							defaultValue={BMI.toFixed(2)}
							disabled
						></input>
						<output>
							{BMI.toFixed(2)} - {outputLabel}
						</output>
					</div>
					<button
						className="btn btn-primary col-auto mt-2"
						onClick={refreshHandler}
					>
						Odśwież
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
