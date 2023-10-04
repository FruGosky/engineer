import { useTranslation } from 'react-i18next';
import { THelperUnit } from './BmrCalculator';
import { useEffect, useState } from 'react';

type TProps = {
	TDEE: number;
	BMR: number;
	helperUnit: THelperUnit;
	refreshHandler: () => void;
	weightValueAsKg: number;
	goal: string;
	sex: string;
	units: string;
	heightValueAsCm: number;
	age: number;
	activity: string;
};
type TBmrData = {
	units: string;
	sex: string;
	activity: string;
	heightValueAsCm: number;
	weightValueAsKg: number;
	age: number;
	bmrValue: number;
	goal: String;
	nutrition: TNutritionObject;
};
export type TNutritionObject = {
	protein: number;
	fat: number;
	carbs: number;
};

type TFatCarbsTextAlignStyle = {
	fat: {
		left: string;
	};
	carbs: {
		left: string;
	};
};
type TGoalsTextAlignStyle = Record<TGoal, TFatCarbsTextAlignStyle>;

type TBackgroundStyleObject = { background: string };
type TGoalsRainbowStyle = Record<TGoal, TBackgroundStyleObject>;

type TGoal = 'loseWeight' | 'keepWeight' | 'gainWeight';
type TGoalsNutrition = Record<TGoal, TNutritionObject>;

export default function BmrScore(props: TProps) {
	const { t: translation } = useTranslation();
	const T_YOUR_BMR = translation('page.bmr.your-bmr');
	const T_YOUR_CALORIC_NEEDS = translation(
		'page.bmr.your-caloric-and-macronutrient-needs'
	);
	const T_WEIGHT_MAINTANCE = translation('page.bmr.weight-maintenance');
	const T_PROTEIN = translation('page.bmr.protein');
	const T_FAT = translation('page.bmr.fat');
	const T_CARBS = translation('page.bmr.carbohydrates');
	const T_WEEK = translation('page.bmr.week');
	const T_REFRESH = translation('common.refresh');

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

	const {
		BMR,
		helperUnit,
		TDEE,
		refreshHandler,
		weightValueAsKg,
		goal,
		sex,
		units,
		heightValueAsCm,
		age,
		activity,
	} = props;

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

	const calculateCarbs = (
		protein: number,
		fat: number,
		actualTDEE: number
	): number => (actualTDEE - (protein * 4 + fat * 9)) / 4;

	const getNutritionData = (): TNutritionObject => {
		if (goal === 'loseWeight') {
			const nutrition = goalsNutrition.loseWeight;
			return nutrition;
		} else if (goal === 'keepWeight') {
			const nutrition = goalsNutrition.keepWeight;
			return nutrition;
		} else {
			const nutrition = goalsNutrition.gainWeight;
			return nutrition;
		}
	};

	const saveBMRToLocalStorage = (bmrData: TBmrData) => {
		localStorage.setItem('bmr-data', JSON.stringify(bmrData));
	};
	useEffect(() => {
		setGoalsNutrition({
			loseWeight: calculateNutrition('loseWeight'),
			keepWeight: calculateNutrition('keepWeight'),
			gainWeight: calculateNutrition('gainWeight'),
		});
	}, [TDEE, goal]);

	useEffect(() => {
		const bmrData: TBmrData = {
			units: units,
			sex: sex,
			activity: activity,
			heightValueAsCm: heightValueAsCm,
			weightValueAsKg: weightValueAsKg,
			age: age,
			bmrValue: BMR,
			goal: goal,
			nutrition: getNutritionData(),
		};

		saveBMRToLocalStorage(bmrData);
	}, [goalsNutrition, goal, TDEE]);
	return (
		<div>
			<div className="text-center mt-3">
				<label className="form-check-label" htmlFor="bmr">
					{`${T_YOUR_BMR}:`}
				</label>
				<h1 className="text-info bg-info bg-opacity-10 border border-info rounded p-2 mt-2">
					{`${BMR.toFixed(0)} kcal`}
				</h1>
			</div>

			{goal === 'loseWeight' && (
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
								{`${goalsNutrition.loseWeight.fat.toFixed(0)}g`}
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
								)}g`}
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
			)}
			{goal === 'keepWeight' && (
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
								{`${goalsNutrition.keepWeight.fat.toFixed(0)}g`}
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
								)}g`}
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
			)}
			{goal === 'gainWeight' && (
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
								{`${goalsNutrition.gainWeight.fat.toFixed(0)}g`}
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
								)}g`}
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
			)}
			<div className="d-flex align-items-center justify-content-center m-3">
				<button
					className="btn btn-secondary col-auto mt-2"
					onClick={refreshHandler}
				>
					{T_REFRESH}
				</button>
			</div>
		</div>
	);
}
