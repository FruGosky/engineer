import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './BmrCalculator.scss';
import { rest, set } from 'lodash';

type NutritionObject = {
	protein: number;
	fat: number;
	carbs: number;
};
type bmrData = {
	units: string;
	sex: string;
	activity: string;
	height: number;
	weight: number;
	age: number;
	bmrValue: number;
};
export default function BmrCalculator(): JSX.Element {
	const { t: translation } = useTranslation();
	const T_MAN = translation('common.man');
	const T_WOMAN = translation('common.woman');
	const T_AGE = translation('common.age');
	const T_CHOOSE_PHYSICAL_ACTIVITY = translation(
		'page.bmr.choose-physical-activity'
	);
	const T_NONE_ACTIVITY = translation('page.bmr.none-activity');
	const T_LOW_ACTIVITY = translation('page.bmr.low-activity');
	const T_MEDIUM_ACTIVITY = translation('page.bmr.medium-activity');
	const T_HIGH_ACTIVITY = translation('page.bmr.high-activity');
	const T_VERY_HIGH_ACTIVITY = translation('page.bmr.very-high-activity');

	const T_YEARS = translation('page.bmr.years');
	const T_YOUR_BMR = translation('page.bmr.your-bmr');
	const T_YOUR_CALORIC_NEEDS = translation(
		'page.bmr.your-caloric-and-macronutrient-needs'
	);
	const T_WEIGHT_MAINTANCE = translation('page.bmr.weight-maintenance');
	const T_PROTEIN = translation('page.bmr.protein');
	const T_FAT = translation('page.bmr.fat');
	const T_CARBS = translation('page.bmr.carbohydrates');
	const T_WEEK = translation('page.bmr.week');
	const T_UNITS = translation('page.bmi.calculator.units');
	const T_IMPERIAL = translation('page.bmi.calculator.imperial');
	const T_METRIC = translation('page.bmi.calculator.metric');
	const T_HEIGHT = translation('page.bmi.calculator.height');
	const T_WEIGHT = translation('page.bmi.calculator.weight');
	const T_CALCULATOR_TITLE = translation('page.bmr.calculator-title');
	const T_CALCULATE = translation('common.calculate');
	const T_REFRESH = translation('common.refresh');

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [units, setUnits] = useState<string>('metric');
	const [weightUnit, setWeightUnit] = useState<string>('kg');
	const [heightUnit, setHeightUnit] = useState<string>('cm');
	const [helperUnit, setHeleperUnit] = useState<string>('500g');
	const [sex, setSex] = useState<string>('male');
	const [activity, setActivity] = useState<string>('none');
	const [age, setAge] = useState<number>(0);
	const [BMR, setBmr] = useState<number>(0);
	const [TDEE, setTDEE] = useState<number>(0);
	const [keepWeightNutrition, setKeepWeightNutrition] =
		useState<NutritionObject>({
			protein: 0,
			fat: 0,
			carbs: 0,
		});
	const [gainWeightNutrition, setGainWeightNutrition] =
		useState<NutritionObject>({
			protein: 0,
			fat: 0,
			carbs: 0,
		});
	const [loseWeightNutrition, setLoseWeightNutrition] =
		useState<NutritionObject>({
			protein: 0,
			fat: 0,
			carbs: 0,
		});

	useEffect(() => {
		if (units === 'metric') {
			setWeightUnit('kg');
			setHeightUnit('cm');
			setHeleperUnit('600g');
		} else if (units === 'imperial') {
			setWeightUnit('lbs');
			setHeightUnit('ft');
			setHeleperUnit('1,3 lb');
		}
	}, [units]);

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);
		setWeightValue(0);
		setAge(0);
		setBmr(0);
		setTDEE(0);
		setActivity('none');
	};

	useEffect(() => {
		if (activity === 'none') {
			setTDEE(BMR * 1.2);
		} else if (activity === 'low') {
			setTDEE(BMR * 1.375);
		} else if (activity === 'medium') {
			setTDEE(BMR * 1.55);
		} else if (activity === 'high') {
			setTDEE(BMR * 1.725);
		} else if (activity === 'very-high') {
			setTDEE(BMR * 2);
		}
	}, [BMR, activity]);

	useEffect(() => {
		setKeepWeightNutrition({
			protein: (TDEE * 0.3) / 4,
			fat: (TDEE * 0.25) / 9,
			carbs: (TDEE * 0.45) / 4,
		});
		setGainWeightNutrition({
			protein: weightValue * 2.1,
			fat: ((TDEE + 600) * 0.25) / 9,
			carbs: calculateGainWeightCarbs(),
		});
		setLoseWeightNutrition({
			protein: weightValue * 2.3,
			fat: ((TDEE - 600) / 9 / 100) * 20,
			carbs: calculateLoseWeightCarbs(),
		});
	}, [TDEE]);
	const calculateLoseWeightCarbs = (): number => {
		const loseWeightCarbs =
			TDEE -
			600 -
			(loseWeightNutrition.protein * 4 + loseWeightNutrition.fat * 9);
		return loseWeightCarbs / 4;
	};
	const calculateGainWeightCarbs = (): number => {
		const gainWeightCarbs =
			TDEE +
			600 -
			(gainWeightNutrition.protein * 4 + gainWeightNutrition.fat * 9);
		return gainWeightCarbs / 4;
	};
	const onUnitsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUnits(e.target.value);
		setWeightValue(0);
		setHeightValue(0);
		setIsSubmitted(false);
	};

	const onSexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSex(e.target.value);
		setIsSubmitted(false);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitted(true);
		if (units === 'metric') {
			if (sex === 'male') {
				const result =
					9.99 * weightValue + 6.25 * heightValue - 4.92 * age + 5;
				const bmrData: bmrData = {
					units: units,
					sex: sex,
					activity: activity,
					height: heightValue,
					weight: weightValue,
					age: age,
					bmrValue: result,
				};
				setBmr(result);

				saveBMRToLocalStorage(bmrData);
			} else {
				const result =
					9.99 * weightValue + 6.25 * heightValue - 4.92 * age - 161;
				const bmrData: bmrData = {
					units: units,
					sex: sex,
					activity: activity,
					height: heightValue,
					weight: weightValue,
					age: age,
					bmrValue: result,
				};
				setBmr(result);
				saveBMRToLocalStorage(bmrData);
			}
		} else {
			if (sex === 'male') {
				const result =
					66 +
					6.23 * weightValue +
					12.7 * (heightValue * 12) -
					6.8 * age;
				const bmrData: bmrData = {
					units: units,
					sex: sex,
					activity: activity,
					height: heightValue,
					weight: weightValue,
					age: age,
					bmrValue: result,
				};
				setBmr(result);
				saveBMRToLocalStorage(bmrData);
			} else {
				const result =
					655 +
					4.35 * weightValue +
					4.7 * (heightValue * 12) -
					4.7 * age;
				setBmr(result);
				const bmrData: bmrData = {
					units: units,
					sex: sex,
					activity: activity,
					height: heightValue,
					weight: weightValue,
					age: age,
					bmrValue: result,
				};
				saveBMRToLocalStorage(bmrData);
			}
		}
	};

	const saveBMRToLocalStorage = (bmrData?: object) => {
		if (bmrData) {
			localStorage.setItem('bmr-data', JSON.stringify(bmrData));
		}
	};
	useEffect(() => {
		const storedBMR = localStorage.getItem('bmr-data');
		if (storedBMR) {
			const parsedBMR = JSON.parse(storedBMR);
			setIsSubmitted(true);
			setUnits(parsedBMR.units);
			setSex(parsedBMR.sex);
			setBmr(parseFloat(parsedBMR.bmrValue));
			setHeightValue(parseFloat(parsedBMR.height));
			setWeightValue(parseFloat(parsedBMR.weight));
			setAge(parseFloat(parsedBMR.age));
			setActivity(parsedBMR.activity);
		}
	}, []);

	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="card shadow">
				<div className="d-flex justify-content-center mb-3">
					<h2>{T_CALCULATOR_TITLE}</h2>
				</div>
				<div className="mb-3 border-bottom border-info">
					<div className="form-check d-flex align-items-center justify-content-center">
						<input
							className="form-check-input "
							type="radio"
							name="flexRadioDefault"
							id="metric"
							value="metric"
							checked={units === 'metric'}
							onChange={onUnitsChange}
						/>
						<label
							className="form-check-label ms-2"
							htmlFor="metric"
						>
							{`${T_METRIC} ${T_UNITS}`}
						</label>
					</div>
					<div className="form-check d-flex align-items-center justify-content-center mb-2">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="imperial"
							value="imperial"
							checked={units === 'imperial'}
							onChange={onUnitsChange}
						/>
						<label
							className="form-check-label ms-2"
							htmlFor="imperial"
						>
							{`${T_IMPERIAL} ${T_UNITS}`}
						</label>
					</div>
				</div>
				<form onSubmit={submitHandler}>
					<div className="mb-3 d-flex align-items-center justify-content-center flex-column">
						<div className="form-check ">
							<input
								className="form-check-input"
								type="radio"
								name="sex"
								id="male"
								value="male"
								checked={sex === 'male'}
								required
								onChange={onSexChange}
							/>
							<label className="form-check-label" htmlFor="male">
								{T_MAN}
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="sex"
								id="female"
								value="female"
								checked={sex === 'female'}
								required
								onChange={onSexChange}
							/>
							<label
								className="form-check-label"
								htmlFor="female"
							>
								{T_WOMAN}
							</label>
						</div>
					</div>
					<label htmlFor="activitySelect" className="mb-2">
						{`${T_CHOOSE_PHYSICAL_ACTIVITY}:`}
					</label>
					<select
						id="activitySelect"
						className="form-select mb-3"
						onChange={(event) => {
							setActivity(event.target.value);
						}}
					>
						<option value="none">{T_NONE_ACTIVITY}</option>
						<option value="low">{T_LOW_ACTIVITY}</option>
						<option value="medium">{T_MEDIUM_ACTIVITY}</option>
						<option value="high">{T_HIGH_ACTIVITY}</option>
						<option value="very-high">
							{T_VERY_HIGH_ACTIVITY}
						</option>
					</select>
					<div className="row g-3  mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="height_input"
								className="col-form-label"
							>
								{`${T_HEIGHT} -`}
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
							<span className="form-text">{heightUnit}</span>
						</div>
					</div>
					<div className="row g-3  mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="weight_input"
								className="col-form-label "
							>
								{`${T_WEIGHT} -`}
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
							<span className="form-text">{weightUnit}</span>
						</div>
					</div>
					<div className="row g-3  mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="age_input"
								className="col-form-label"
							>
								{`${T_AGE} -`}
							</label>
						</div>
						<div className="col-auto flex-row">
							<input
								type="number"
								id="age_input"
								className="form-control info_input"
								min="1"
								max="150"
								step="1"
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								): void => {
									setAge(parseInt(event.target.value));
								}}
								value={age}
								required
							/>
						</div>
						<div className="col-auto text">
							<span className="form-text">{T_YEARS}</span>
						</div>
					</div>

					<div className="d-flex align-items-center justify-content-center m-3">
						<button className="btn btn-primary col-auto mt-2">
							{T_CALCULATE}
						</button>
					</div>
				</form>
				{isSubmitted && (
					<div>
						<div className="text-center mt-3">
							<label className="form-check-label" htmlFor="bmr">
								{`${T_YOUR_BMR}:`}
							</label>
							<h1 className="text-info bg-info bg-opacity-10 border border-info rounded p-2 mt-2">
								{`${BMR.toFixed(0)} kcal`}
							</h1>
						</div>
						<div className="mt-3 text-center ">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(${T_WEIGHT_MAINTANCE})`}
							</label>
							<div></div>
							<div className="nutritions">
								<p className="text_nutrition text1 ">
									{T_PROTEIN}
									<span>
										{`${keepWeightNutrition.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p className="text_nutrition text2 margin_left_fat">
									{T_FAT}
									<span>
										{`${keepWeightNutrition.fat.toFixed(0)}g
										`}
									</span>
								</p>
								<p className="text_nutrition text3 margin_left_carbs">
									{T_CARBS}
									<span>
										{`${keepWeightNutrition.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div className="colors_bmi"></div>
							<output className="mt-2 text-info">
								{`${TDEE.toFixed(0)} kcal`}
							</output>
						</div>
						<div className="mt-3 text-center ">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(+${helperUnit} / ${T_WEEK})`}
							</label>

							<div className="nutritions">
								<p className="text_nutrition text1">
									{T_PROTEIN}
									<span>
										{`${gainWeightNutrition.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p className="text_nutrition text2  margin_left_fat">
									{T_FAT}
									<span>
										{`${gainWeightNutrition.fat.toFixed(0)}g
										`}
									</span>
								</p>
								<p className="text_nutrition text3 margin_left_carbs">
									{T_CARBS}
									<span>
										{`${gainWeightNutrition.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div className="colors_bmi"></div>
							<output className="mt-2 text-info">
								{`${(TDEE + 600).toFixed(0)} kcal`}
							</output>
						</div>
						<div className="mt-3 text-center ">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(-${helperUnit} / ${T_WEEK})`}
							</label>

							<div className="nutritions">
								<p className="text_nutrition text1">
									{T_PROTEIN}
									<span>
										{`${loseWeightNutrition.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p className="text_nutrition text2  margin_left_fat">
									{T_FAT}
									<span>
										{`${loseWeightNutrition.fat.toFixed(0)}g
										`}
									</span>
								</p>
								<p className="text_nutrition text3 margin_left_carbs">
									{T_CARBS}
									<span>
										{`${loseWeightNutrition.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div className="colors_bmi"></div>
							<output className="mt-2 text-info">
								{`${(TDEE - 600).toFixed(0)} kcal`}
							</output>
						</div>
						<div className="d-flex align-items-center justify-content-center m-3">
							<button
								className="btn btn-secondary col-auto mt-2"
								onClick={refreshHandler}
							>
								{T_REFRESH}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
