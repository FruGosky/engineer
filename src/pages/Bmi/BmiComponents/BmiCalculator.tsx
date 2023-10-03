import { useState, useEffect } from 'react';
import AboutBmi from './AboutBmi';
import { useTranslation } from 'react-i18next';
import styles from './BmiCalculator.module.scss';

type TBmiData = {
	units: 'metric' | 'imperial';
	height: number;
	weight: number;
	bmiValue: number;
};

export default function BmiCalculator(): JSX.Element {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [nameOfBmiRange, setNameOfBmiRange] = useState<string>('');
	const [units, setUnits] = useState<string>('metric');
	const [weightUnit, setWeightUnit] = useState<string>('kg');
	const [heightUnit, setHeightUnit] = useState<string>('cm');
	const [heightValueAsCm, setHeightValueAsCm] = useState<number>(0);
	const [weightValueAsKg, setWeightValueAsKg] = useState<number>(0);
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
	const T_CALCULATOR_TITLE = translation('page.bmi.calculator.title');
	const T_BMI_CATEGORY_FOR = translation(
		'page.bmi.calculator.bmi-category-for'
	);
	const T_DOESNT_EXIST = translation('common.doesnt-exist').toLowerCase();

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);

		setWeightValue(0);
		setNameOfBmiRange('');
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitted(true);
		const newBmiValue = calculateBMI();
		const bmiData: TBmiData = {
			units: 'metric',
			height: heightValue,
			weight: weightValue,
			bmiValue: newBmiValue,
		};
		setBmi(newBmiValue);

		localStorage.setItem('bmi-data', JSON.stringify(bmiData));
	};

	const calculateBMI = (): number => {
		const bmi =
			(weightValueAsKg / (heightValueAsCm * heightValueAsCm)) * 10000;
		setNameOfBmiRange(calcBmiRange(bmi));
		return bmi;
	};

	const calcBmiRange = (bmi: number): string => {
		if (bmi < 18.5 && bmi !== 0) {
			return T_UNDERWEIGHT;
		} else if (bmi >= 18.5 && bmi < 25) {
			return T_WEIGHT_NORMAL;
		} else if (bmi >= 25 && bmi < 30) {
			return T_OVERWEIGHT;
		} else if (bmi >= 30 && bmi < 35) {
			return T_OBESITY;
		} else if (bmi >= 35 && bmi <= 42) {
			return T_SIGNIFICANT_OBESITY;
		}
		throw new Error(
			`${T_BMI_CATEGORY_FOR} '${bmi.toFixed(2)}' ${T_DOESNT_EXIST}`
		);
	};

	useEffect(() => {
		const storedBMI = localStorage.getItem('bmi-data');
		const storedPersonalData = localStorage.getItem('user-personal-data');
		if (storedPersonalData) {
			const parsedPersonalData = JSON.parse(storedPersonalData);
			setIsSubmitted(true);
			setUnits(parsedPersonalData.units);
			setHeightValue(parsedPersonalData.height);
			setWeightValue(parsedPersonalData.weight);
			setBmi(parsedPersonalData.bmiValue);
		} else if (storedBMI) {
			const parsedBMIdata = JSON.parse(storedBMI);
			setIsSubmitted(true);
			setUnits(parsedBMIdata.units);
			setHeightValue(parseFloat(parsedBMIdata.height));
			setWeightValue(parseFloat(parsedBMIdata.weight));
			setBmi(parsedBMIdata.bmiValue);
		}
	}, []);
	useEffect(() => {
		if (units === 'metric') {
			setWeightUnit('kg');
			setHeightUnit('cm');
		} else if (units === 'imperial') {
			setWeightUnit('lbs');
			setHeightUnit('ft');
		}
	}, [units]);

	useEffect(() => {
		if (units === 'imperial') {
			setWeightValueAsKg(weightValue * 0.45359237);
		} else {
			setWeightValueAsKg(weightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weightValue, units]);

	useEffect(() => {
		if (units === 'imperial') {
			setHeightValueAsCm(heightValue * 30.48);
		} else {
			setHeightValueAsCm(heightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heightValue, units]);
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className={`card m-4 p-5 shadow`}>
				<div className="d-flex justify-content-center mb-3">
					<h2>{T_CALCULATOR_TITLE}</h2>
				</div>
				<div className="mb-3 d-flex flex-column align-items-center">
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="metric"
							checked={units === 'metric'}
							onChange={() => {
								setUnits('metric');
								refreshHandler();
							}}
						/>
						<label className="form-check-label" htmlFor="metric">
							{`${T_METRIC} ${T_UNITS}`}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="imperial"
							checked={units === 'imperial'}
							onChange={(): void => {
								setUnits('imperial');
								refreshHandler();
							}}
						/>
						<label className="form-check-label" htmlFor="imperial">
							{`${T_IMPERIAL} ${T_UNITS}`}
						</label>
					</div>
				</div>
				<form
					onSubmit={submitHandler}
					className="d-flex flex-column align-items-center"
				>
					<div className="row g-3 mb-3 d-flex justify-content-between">
						<div className="col-auto">
							<label
								htmlFor="height_input"
								className={styles.colFormLabel}
							>
								{`${T_HEIGHT}:`}
							</label>
						</div>
						<div className="col-auto">
							<input
								type="number"
								id="height_input"
								className={`form-control ${styles.info_input}`}
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
						<div className={`col-auto ${styles.text}`}>
							<span id="passwordHelpInline" className="form-text">
								{heightUnit}
							</span>
						</div>
					</div>
					<div className="row g-3 mb-3 d-flex justify-content-between">
						<div className="col-auto">
							<label
								htmlFor="weight_input"
								className={styles.colFormLabel}
							>
								{`${T_WEIGHT}:`}
							</label>
						</div>
						<div className="col-auto">
							<input
								type="number"
								id="weight_input"
								className={`form-control ${styles.info_input}`}
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
						<div className={`col-auto ${styles.text}`}>
							<span id="passwordHelpInline" className="form-text">
								{weightUnit}
							</span>
						</div>
					</div>
					<div className="d-flex justify-content-around w-100">
						<button
							className="btn btn-secondary col-auto"
							onClick={refreshHandler}
						>
							{T_REFRESH}
						</button>
						<button
							type="submit"
							className="btn btn-primary col-auto align-self-end"
						>
							{T_CALCULATE}
						</button>
					</div>
				</form>
				{isSubmitted && (
					<div className="mt-3 text-center">
						<label htmlFor="customRange1" className="form-label">
							{`${T_YOUR_BMI}:`}
						</label>
						<div className="d-flex gap-2">
							<span>{T_LOW}</span>
							<input
								type="range"
								min="12"
								max="42"
								className={`form-range ${styles.colors_bmi}`}
								id="customRange1"
								value={BMI.toFixed(2)}
								readOnly
							></input>
							<span>{T_HIGH}</span>
						</div>

						<output className="mt-2">
							{`${BMI.toFixed(2)} - ${nameOfBmiRange}`}
						</output>
					</div>
				)}
			</div>
			<AboutBmi bmiInfo={nameOfBmiRange} />
		</div>
	);
}
