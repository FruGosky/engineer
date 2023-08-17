import { useState, useEffect } from 'react';
import AboutBmi from './AboutBmi';
import { useTranslation } from 'react-i18next';
import styles from './BmiCalculator.module.scss';

type TBmiData = {
	units: 'metric' | 'imperial';
	height: number;
	weight: number;
};

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
	const T_CALCULATOR_TITLE = translation('page.bmi.calculator.title');
	const T_BMI_CATEGORY_FOR = translation(
		'page.bmi.calculator.bmi-category-for'
	);
	const T_DOESNT_EXIST = translation('common.doesnt-exist');

	useEffect(() => {
		if (units === 'metric') {
			setMetricUnits();
		} else if (units === 'imperial') {
			setImperialUnits();
		}
	}, [units]);

	const setMetricUnits = () => {
		setWeightUnit('kg');
		setHeightUnit('cm');
	};

	const setImperialUnits = () => {
		setWeightUnit('lbs');
		setHeightUnit('ft');
	};

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);

		setWeightValue(0);
		setOutputLabel('');
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitted(true);
		const bmiData: TBmiData = {
			units: 'metric',
			height: heightValue,
			weight: weightValue,
		};
		if (units === 'metric') {
			setBmi(calcMetricBmi());
		} else {
			bmiData.units = 'imperial';
			setBmi(calcImperialBmi());
		}
		localStorage.setItem('bmi-data', JSON.stringify(bmiData));
	};

	const calcMetricBmi = (bmiData?: TBmiData): number => {
		if (bmiData) {
			const weightValue = bmiData.weight;
			const heightValue = bmiData.height;
			const bmi = (weightValue / (heightValue * heightValue)) * 10000;
			setOutputLabel(calcBmiRange(bmi));
			return bmi;
		}
		const bmi = (weightValue / (heightValue * heightValue)) * 10000;
		setOutputLabel(calcBmiRange(bmi));
		return bmi;
	};

	const calcImperialBmi = (bmiData?: TBmiData): number => {
		if (bmiData) {
			const weightValue = bmiData.weight;
			const heightValue = bmiData.height;
			const convertedHeight = heightValue * 12;
			const bmi =
				(weightValue * 703) / (convertedHeight * convertedHeight);
			setOutputLabel(calcBmiRange(bmi));
			return bmi;
		}
		const convertedHeight = heightValue * 12;
		const bmi = (weightValue * 703) / (convertedHeight * convertedHeight);
		setOutputLabel(calcBmiRange(bmi));
		return bmi;
	};

	const calcBmiRange = (bmi: number): string => {
		if (bmi < 18.5 && bmi !== 0) {
			return T_UNDERWEIGHT;
		} else if (bmi >= 18.5 && bmi < 24.9) {
			return T_WEIGHT_NORMAL;
		} else if (bmi >= 25 && bmi < 29.9) {
			return T_OVERWEIGHT;
		} else if (bmi >= 30 && bmi < 34.9) {
			return T_OBESITY;
		} else if (bmi >= 35 && bmi <= 42) {
			return T_SIGNIFICANT_OBESITY;
		}
		throw new Error(
			`${T_BMI_CATEGORY_FOR} '${bmi.toFixed(2)}' ${T_DOESNT_EXIST}`
		);
	};

	useEffect(() => {
		if (!localStorage.getItem('bmi-data')) return;

		const bmiData: TBmiData = JSON.parse(
			'' + localStorage.getItem('bmi-data')
		);
		setUnits(bmiData.units);
		setHeightValue(bmiData.height);
		setWeightValue(bmiData.weight);

		if (bmiData.units === 'metric') {
			setMetricUnits();
			setIsSubmitted(true);
			setBmi(calcMetricBmi(bmiData));
		} else {
			setImperialUnits();
			setIsSubmitted(true);
			setBmi(calcImperialBmi(bmiData));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							{T_YOUR_BMI}:
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

						<output>{`${BMI.toFixed(2)} - ${outputLabel}`}</output>
					</div>
				)}
			</div>
			<AboutBmi bmiInfo={outputLabel} />
		</div>
	);
}
