import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './BmrCalculator.scss';

type TNutritionObject = {
	protein: number;
	fat: number;
	carbs: number;
};

type TBmrData = {
	units: string;
	sex: string;
	activity: string;
	height: number;
	weight: number;
	age: number;
	bmrValue: number;
};

type TBackgroundStyleObject = { background: string };

type TGoal = 'loseWeight' | 'keepWeight' | 'gainWeight';

type TFatCarbsTextAlignStyle = {
	fat: {
		left: string;
	};
	carbs: {
		left: string;
	};
};

type TUnits = 'metric' | 'imperial';

type TWeightUnit = 'kg' | 'lbs';

type THeightUnit = 'cm' | 'ft';

type THelperUnit = '500g' | '1.1 lb';

type TActivity = 'none' | 'low' | 'medium' | 'high' | 'very-high';

type TSex = 'male' | 'female';

type TGoalsRainbowStyle = Record<TGoal, TBackgroundStyleObject>;

type TGoalsNutrition = Record<TGoal, TNutritionObject>;

type TGoalsTextAlignStyle = Record<TGoal, TFatCarbsTextAlignStyle>;

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
	const T_WRONG_SEX_INPUT = translation('page.bmr.wrong-sex-input');

	const initialNutrition: TNutritionObject = {
		protein: 0,
		fat: 0,
		carbs: 0,
	};
	const initialGoalsNutrition: TGoalsNutrition = {
		loseWeight: { ...initialNutrition },
		keepWeight: { ...initialNutrition },
		gainWeight: { ...initialNutrition },
	};

	const initialTextAlign: TFatCarbsTextAlignStyle = {
		fat: {
			left: '',
		},
		carbs: {
			left: '',
		},
	};
	const initialGoalsTextAlign: TGoalsTextAlignStyle = {
		loseWeight: { ...initialTextAlign },
		keepWeight: { ...initialTextAlign },
		gainWeight: { ...initialTextAlign },
	};

	const initialRainbow: TBackgroundStyleObject = { background: '' };
	const initialGoalsRainbow: TGoalsRainbowStyle = {
		loseWeight: { ...initialRainbow },
		keepWeight: { ...initialRainbow },
		gainWeight: { ...initialRainbow },
	};

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [heightValueAsCm, setHeightValueAsCm] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [weightValueAsKg, setWeightValueAsKg] = useState<number>(0);
	const [units, setUnits] = useState<TUnits>('metric');
	const [weightUnit, setWeightUnit] = useState<TWeightUnit>('kg');
	const [heightUnit, setHeightUnit] = useState<THeightUnit>('cm');
	const [helperUnit, setHeleperUnit] = useState<THelperUnit>('500g');
	const [sex, setSex] = useState<TSex>('male');
	const [activity, setActivity] = useState<TActivity>('none');
	const [age, setAge] = useState<number>(0);
	const [BMR, setBmr] = useState<number>(0);
	const [TDEE, setTDEE] = useState<number>(0);
	const [goalsNutrition, setGoalsNutrition] = useState<TGoalsNutrition>({
		...initialGoalsNutrition,
	});
	const [goalsRainbowStyle, setGoalsRainbowStyle] =
		useState<TGoalsRainbowStyle>({
			...initialGoalsRainbow,
		});
	const [goalsTextAlignStyle, setGoalsTextAlignStyle] =
		useState<TGoalsTextAlignStyle>({
			...initialGoalsTextAlign,
		});

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);
		setWeightValue(0);
		setAge(0);
		setBmr(0);
		setTDEE(0);
		setActivity('none');
	};

	const calculateNutrition = (goal: TGoal): TNutritionObject => {
		let protein = 0;
		let fat = 0;
		let actualTDEE = 0;

		switch (goal) {
			case 'loseWeight': {
				actualTDEE = TDEE - 500;
				protein = weightValueAsKg * 2.5;
				fat = (actualTDEE * 0.2) / 9;
				break;
			}
			case 'keepWeight': {
				actualTDEE = TDEE;
				protein = (TDEE * 0.3) / 4;
				fat = (actualTDEE * 0.25) / 9;
				break;
			}
			case 'gainWeight': {
				actualTDEE = TDEE + 500;
				protein = weightValueAsKg * 2;
				fat = (actualTDEE * 0.25) / 9;
				break;
			}
		}

		const nutritionPercentage = getNutritionPercentage(
			protein,
			fat,
			actualTDEE
		);
		setGoalsRainbowStyle((oldRainbow) => ({
			...oldRainbow,
			[goal]: getBackgroundGradientStyle(nutritionPercentage),
		}));
		setTextAlign(nutritionPercentage, goal);

		const nutrition = {
			protein,
			fat,
			carbs: calculateCarbs(protein, fat, actualTDEE),
		};

		return nutrition;
	};

	const calculateCarbs = (
		protein: number,
		fat: number,
		actualTDEE: number
	): number => (actualTDEE - (protein * 4 + fat * 9)) / 4;

	const calculateBMR = (): number => {
		if (sex !== 'male' && sex !== 'female') {
			throw new Error(`${T_WRONG_SEX_INPUT} '${sex}'`);
		}

		if (sex === 'male') {
			return (
				9.99 * weightValueAsKg + 6.25 * heightValueAsCm - 4.92 * age + 5
			);
		} else {
			return (
				9.99 * weightValueAsKg +
				6.25 * heightValueAsCm -
				4.92 * age -
				161
			);
		}
	};

	const getNutritionPercentage = (
		protein: number,
		fat: number,
		actualTDEE: number
	): TNutritionObject => {
		const proteinPercentage = ((protein * 4) / actualTDEE) * 100;
		const fatPercentage = ((fat * 9) / actualTDEE) * 100;
		const carbsPercentage =
			actualTDEE - (proteinPercentage + fatPercentage);

		return {
			protein: proteinPercentage,
			fat: fatPercentage,
			carbs: carbsPercentage,
		};
	};

	const getBackgroundGradientStyle = (
		nutritionPercentage: TNutritionObject
	): TBackgroundStyleObject => ({
		background: `linear-gradient(
				to right,
				rgb(236, 46, 135) 0%,
				rgb(236, 46, 135) ${nutritionPercentage.protein}%,
				rgb(175, 190, 33) ${nutritionPercentage.protein}%,
				rgb(175, 190, 33) ${nutritionPercentage.fat + nutritionPercentage.protein}%,
				rgb(16, 175, 114) ${nutritionPercentage.fat + nutritionPercentage.protein}%,
				rgb(16, 175, 114) 100%)`,
	});

	const setTextAlign = (
		nutritionPercentage: TNutritionObject,
		goal: TGoal
	) => {
		const fatAlign = {
			left: `${nutritionPercentage.protein}%`,
		};
		const carbsAlign = {
			left: `${nutritionPercentage.protein + nutritionPercentage.fat}%`,
		};
		const textAlign = {
			fat: fatAlign,
			carbs: carbsAlign,
		};

		setGoalsTextAlignStyle((oldGoals) => ({
			...oldGoals,
			[goal]: textAlign,
		}));
	};

	const onUnitsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUnits(e.target.value as TUnits);
		setWeightValue(0);
		setHeightValue(0);
		setIsSubmitted(false);
	};

	const onSexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSex(e.target.value as TSex);
		setIsSubmitted(false);
	};

	const onActivityChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setActivity(e.target.value as TActivity);
		setIsSubmitted(false);
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitted(true);
		const newBmrValue = calculateBMR();
		const bmrData: TBmrData = {
			units,
			sex,
			activity,
			height: heightValue,
			weight: weightValue,
			age,
			bmrValue: newBmrValue,
		};
		setBmr(newBmrValue);
		saveBMRToLocalStorage(bmrData);
	};

	const saveBMRToLocalStorage = (bmrData: TBmrData) => {
		localStorage.setItem('bmr-data', JSON.stringify(bmrData));
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

	useEffect(() => {
		if (units === 'metric') {
			setWeightUnit('kg');
			setHeightUnit('cm');
			setHeleperUnit('500g');
		} else if (units === 'imperial') {
			setWeightUnit('lbs');
			setHeightUnit('ft');
			setHeleperUnit('1.1 lb');
		}
	}, [units]);

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
		setGoalsNutrition({
			loseWeight: calculateNutrition('loseWeight'),
			keepWeight: calculateNutrition('keepWeight'),
			gainWeight: calculateNutrition('gainWeight'),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [TDEE]);

	useEffect(() => {
		if (units === 'imperial') {
			setWeightValueAsKg(weightValue * 0.45359237);
		} else {
			setWeightValueAsKg(weightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weightValue]);

	useEffect(() => {
		if (units === 'imperial') {
			setHeightValueAsCm(heightValue * 30.48);
		} else {
			setHeightValueAsCm(heightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heightValue]);

	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="card shadow">
				<div className="d-flex justify-content-center mb-3">
					<h2>{T_CALCULATOR_TITLE}</h2>
				</div>
				<div className="mb-3 border-bottom border-info">
					<div className="form-check d-flex align-items-center justify-content-center">
						<input
							className="form-check-input"
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
						<div className="form-check">
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
						onChange={onActivityChange}
						value={activity}
					>
						<option value="none">{T_NONE_ACTIVITY}</option>
						<option value="low">{T_LOW_ACTIVITY}</option>
						<option value="medium">{T_MEDIUM_ACTIVITY}</option>
						<option value="high">{T_HIGH_ACTIVITY}</option>
						<option value="very-high">
							{T_VERY_HIGH_ACTIVITY}
						</option>
					</select>
					<div className="row g-3 mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="height_input"
								className="col-form-label"
							>
								{`${T_HEIGHT}:`}
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
									e: React.ChangeEvent<HTMLInputElement>
								): void => {
									setHeightValue(parseFloat(e.target.value));
								}}
								value={heightValue}
								required
							/>
						</div>
						<div className="col-auto text">
							<span className="form-text">{heightUnit}</span>
						</div>
					</div>
					<div className="row g-3 mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="weight_input"
								className="col-form-label"
							>
								{`${T_WEIGHT}:`}
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
									e: React.ChangeEvent<HTMLInputElement>
								): void => {
									setWeightValue(parseFloat(e.target.value));
								}}
								value={weightValue}
								required
							/>
						</div>
						<div className="col-auto text">
							<span className="form-text">{weightUnit}</span>
						</div>
					</div>
					<div className="row g-3 mb-3 d-flex justify-content-center">
						<div className="col-auto">
							<label
								htmlFor="age_input"
								className="col-form-label"
							>
								{`${T_AGE}:`}
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
									e: React.ChangeEvent<HTMLInputElement>
								): void => {
									setAge(parseInt(e.target.value));
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
						<div className="mt-3 text-center">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(-${helperUnit} / ${T_WEEK})`}
							</label>

							<div className="nutritions">
								<p className="text_nutrition text1">
									{T_PROTEIN}
									<span>
										{`${goalsNutrition.loseWeight.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p
									className="text_nutrition text2 margin_left_fat"
									style={goalsTextAlignStyle.loseWeight.fat}
								>
									{T_FAT}
									<span>
										{`${goalsNutrition.loseWeight.fat.toFixed(
											0
										)}g
										`}
									</span>
								</p>
								<p
									className="text_nutrition text3 margin_left_carbs"
									style={goalsTextAlignStyle.loseWeight.carbs}
								>
									{T_CARBS}
									<span>
										{`${goalsNutrition.loseWeight.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div
								className="colors_bmi"
								style={goalsRainbowStyle.loseWeight}
							></div>
							<output className="mt-2 text-info">
								{`${(TDEE - 500).toFixed(0)} kcal`}
							</output>
						</div>
						<div className="mt-3 text-center">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(${T_WEIGHT_MAINTANCE})`}
							</label>
							<div className="nutritions">
								<p className="text_nutrition text1">
									{T_PROTEIN}
									<span>
										{`${goalsNutrition.keepWeight.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p
									className="text_nutrition text2 margin_left_fat"
									style={goalsTextAlignStyle.keepWeight.fat}
								>
									{T_FAT}
									<span>
										{`${goalsNutrition.keepWeight.fat.toFixed(
											0
										)}g
										`}
									</span>
								</p>
								<p
									className="text_nutrition text3 margin_left_carbs"
									style={goalsTextAlignStyle.keepWeight.carbs}
								>
									{T_CARBS}
									<span>
										{`${goalsNutrition.keepWeight.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div
								className="colors_bmi"
								style={goalsRainbowStyle.keepWeight}
							></div>
							<output className="mt-2 text-info">
								{`${TDEE.toFixed(0)} kcal`}
							</output>
						</div>
						<div className="mt-3 text-center">
							<label className="form-label m-3">
								{T_YOUR_CALORIC_NEEDS}
								<br />
								{`(+${helperUnit} / ${T_WEEK})`}
							</label>

							<div className="nutritions">
								<p className="text_nutrition text1">
									{T_PROTEIN}
									<span>
										{`${goalsNutrition.gainWeight.protein.toFixed(
											0
										)}g`}
									</span>
								</p>
								<p
									className="text_nutrition text2 margin_left_fat"
									style={goalsTextAlignStyle.gainWeight.fat}
								>
									{T_FAT}
									<span>
										{`${goalsNutrition.gainWeight.fat.toFixed(
											0
										)}g
										`}
									</span>
								</p>
								<p
									className="text_nutrition text3 margin_left_carbs"
									style={goalsTextAlignStyle.gainWeight.carbs}
								>
									{T_CARBS}
									<span>
										{`${goalsNutrition.gainWeight.carbs.toFixed(
											0
										)}g
										`}
									</span>
								</p>
							</div>
							<div
								className="colors_bmi"
								style={goalsRainbowStyle.gainWeight}
							></div>
							<output className="mt-2 text-info">
								{`${(TDEE + 500).toFixed(0)} kcal`}
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
