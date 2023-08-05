import { useState, useEffect } from 'react';
import AboutBmi from './AboutBmi';
import { useTranslation } from 'react-i18next';
// import { Suspense } from 'react';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n'; // Your i18n instance

export default function BmiCalculator(): JSX.Element {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [outputLabel, setOutputLabel] = useState<string>('');
	const [units, setUnits] = useState<string>('metric');
	const [weightUnit, setWeightUnit] = useState<string>('kg');
	const [heightUnit, setHeightUnit] = useState<string>('cm');

	const [BMI, setBmi] = useState<number>(0);

	const { t: translation } = useTranslation();

	const T_UNITS = translation('page.bmi.calculator.units');
	const T_IMPERIAL = translation('page.bmi.calculator.imperial');
	const T_METRIC = translation('page.bmi.calculator.metric');
	const T_HEIGHT = translation('page.bmi.calculator.height');
	const T_WEIGHT = translation('page.bmi.calculator.weight');
	const T_YOUR_BMI = translation('page.bmi.calculator.your-bmi');
	const T_LOW = translation('page.bmi.calculator.low');
	const T_HIGH = translation('page.bmi.calculator.high');
	const T_UNDERWEIGHT = translation('page.bmi.calculator.underweight');
	const T_WEIGHT_NORMAL = translation('page.bmi.calculator.weight-normal');
	const T_OVERWEIGHT = translation('page.bmi.calculator.overweight');
	const T_OBESITY = translation('page.bmi.calculator.obesity');
	const T_SIGNIFICANT_OBESITY = translation(
		'page.bmi.calculator.significant-obesity'
	);
	const T_CALCULATE = translation('common.calculate');
	const T_REFRESH = translation('common.refresh');

	useEffect(() => {
		if (units === 'metric') {
			setWeightUnit('kg');
			setHeightUnit('cm');
		} else if (units === 'imperial') {
			setWeightUnit('lbs');
			setHeightUnit('ft');
		}
	}, [units]);

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);

		setWeightValue(0);
		setOutputLabel('');
	};
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitted(true);
		if (units === 'metric') {
			setBmi((weightValue / (heightValue * heightValue)) * 10000);
		} else {
			const convertedHeight = heightValue * 12;
			setBmi((weightValue * 703) / (convertedHeight * convertedHeight));
		}
	};
	useEffect(() => {
		if (BMI < 18.5 && BMI !== 0) {
			setOutputLabel(T_UNDERWEIGHT);
		} else if (BMI >= 18.5 && BMI < 24.9) {
			setOutputLabel(T_WEIGHT_NORMAL);
		} else if (BMI >= 25 && BMI < 29.9) {
			setOutputLabel(T_OVERWEIGHT);
		} else if (BMI >= 30 && BMI < 34.9) {
			setOutputLabel(T_OBESITY);
		} else if (BMI >= 35 && BMI <= 42) {
			setOutputLabel(T_SIGNIFICANT_OBESITY);
		}
	}, [
		BMI,
		T_UNDERWEIGHT,
		T_WEIGHT_NORMAL,
		T_OVERWEIGHT,
		T_OBESITY,
		T_SIGNIFICANT_OBESITY,
	]);

	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="card shadow">
				<div className="mb-3">
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="metric"
							defaultChecked
							onChange={() => {
								setUnits('metric');
								refreshHandler();
							}}
						/>
						<label className="form-check-label" htmlFor="metric">
							{T_METRIC} {T_UNITS}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="imperial"
							onChange={(): void => {
								setUnits('imperial');
								refreshHandler();
							}}
						/>
						<label className="form-check-label" htmlFor="imperial">
							{T_IMPERIAL} {T_UNITS}
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
								{T_HEIGHT} -
							</label>
						</div>
						<div className="col-auto">
							<input
								type="number"
								id="height_input"
								className="form-control info_input"
								min="1"
								max="300"
								step={0.01}
								inputMode="decimal"
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								): void => {
									setHeightValue(
										parseFloat(event.target.value)
									);
								}}
								value={heightValue}
								required
							/>
						</div>
						<div className="col-auto text">
							<span id="passwordHelpInline" className="form-text">
								{heightUnit}
							</span>
						</div>
					</div>
					<div className="row g-3  mb-3 d-flex justify-content-between">
						<div className="col-auto">
							<label
								htmlFor="weight_input"
								className="col-form-label "
							>
								{T_WEIGHT} -
							</label>
						</div>
						<div className="col-auto">
							<input
								type="number"
								id="weight_input"
								className="form-control info_input"
								min="1"
								max="500"
								step={0.1}
								inputMode="decimal"
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								): void => {
									setWeightValue(
										parseFloat(event.target.value)
									);
								}}
								value={weightValue}
								required
							/>
						</div>
						<div className="col-auto text">
							<span id="passwordHelpInline" className="form-text">
								{weightUnit}
							</span>
						</div>
					</div>
					<button className="btn btn-primary col-auto">
						{T_CALCULATE}
					</button>
				</form>
				{isSubmitted && (
					<div>
						<div className="mt-3 text-center">
							<label
								htmlFor="customRange1"
								className="form-label"
							>
								{T_YOUR_BMI}:
							</label>
							<div>
								<span className="float-start">{T_LOW}</span>
								<span className="float-end">{T_HIGH}</span>
							</div>

							<input
								type="range"
								min="12"
								max="42"
								className="form-range colors_bmi"
								id="customRange1"
								value={BMI.toFixed(2)}
								readOnly
							></input>
							<output>
								{BMI.toFixed(2)} - {outputLabel}
							</output>
						</div>
						<button
							className="btn btn-primary col-auto mt-2"
							onClick={refreshHandler}
						>
							{T_REFRESH}
						</button>
					</div>
				)}
			</div>
			//!TODO fix not translatin aboutbmiinfo at first load
			{/* <I18nextProvider i18n={i18n}>
				<Suspense fallback={<div>Loading...</div>}> */}
			<AboutBmi bmiInfo={outputLabel} />
			{/* </Suspense>
			</I18nextProvider> */}
		</div>
	);
}
