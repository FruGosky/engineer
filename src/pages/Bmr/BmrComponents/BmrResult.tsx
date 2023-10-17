/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TGoal, THelperUnit, TNutritionObject } from '../../../types';

type TProps = {
	TDEE: number;
	BMR: number;
	helperUnit: THelperUnit;
	refreshHandler: () => void;
	weightValueAsKg: number;
	goal: TGoal;
};
type TFatCarbsTextAlignStyle = {
	fat: {
		left: string;
	};
	carbs: {
		left: string;
	};
};
type TBackgroundStyleObject = { background: string };

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

	const initialTextAlign: TFatCarbsTextAlignStyle = {
		fat: {
			left: '',
		},
		carbs: {
			left: '',
		},
	};

	const initialRainbow: TBackgroundStyleObject = { background: '' };

	const [nutrition, setNutrition] = useState<TNutritionObject>({
		...initialNutrition,
	});
	const [rainbowStyle, setRainbowStyle] = useState<TBackgroundStyleObject>({
		...initialRainbow,
	});
	const [textAlignStyle, setTextAlignStyle] =
		useState<TFatCarbsTextAlignStyle>({
			...initialTextAlign,
		});
	const [caloriesToAchieveGoal, setCaloriesToAchieveGoal] = useState(0);

	const { BMR, helperUnit, TDEE, refreshHandler, weightValueAsKg } = props;

	const calculateNutrition = (
		goal: TGoal,
		newCaloriesToAchiveGoal: number
	): TNutritionObject => {
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
		setRainbowStyle(getBackgroundGradientStyle(nutritionPercentage));
		setTextAlign(nutritionPercentage);

		const nutrition = {
			protein,
			fat,
			carbs: calculateCarbs(protein, fat, actualTDEE),
		};
		const userPersonalData = localStorage.getItem('user-personal-data');
		let dataForLocalStorage = '';
		if (userPersonalData) {
			const parsedUserPersonalData = JSON.parse(userPersonalData);
			dataForLocalStorage = JSON.stringify({
				...parsedUserPersonalData,
				protein: parseInt(nutrition.protein.toFixed(0)),
				fat: parseInt(nutrition.fat.toFixed(0)),
				carbs: parseInt(nutrition.carbs.toFixed(0)),
				// BMR: parseInt(BMR.toFixed(0)),
				TDEE: parseInt(TDEE.toFixed(0)),
				caloriesToAchieveGoal: newCaloriesToAchiveGoal,
			});
		} else {
			dataForLocalStorage = JSON.stringify({
				protein: parseInt(nutrition.protein.toFixed(0)),
				fat: parseInt(nutrition.fat.toFixed(0)),
				carbs: parseInt(nutrition.carbs.toFixed(0)),
				// BMR: parseInt(BMR.toFixed(0)),
				TDEE: parseInt(TDEE.toFixed(0)),
				caloriesToAchieveGoal: newCaloriesToAchiveGoal,
			});
		}
		localStorage.setItem('user-personal-data', dataForLocalStorage);

		return nutrition;
	};

	const calculateCaloriesToAchieveGoal = (): number => {
		let caloriesForGoal = 0;
		switch (props.goal) {
			case 'loseWeight': {
				caloriesForGoal = parseInt((TDEE - 500).toFixed(0));
				break;
			}
			case 'keepWeight': {
				caloriesForGoal = parseInt(TDEE.toFixed(0));
				break;
			}
			case 'gainWeight': {
				caloriesForGoal = parseInt((TDEE + 500).toFixed(0));
				break;
			}
		}
		return caloriesForGoal;
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

	const setTextAlign = (nutritionPercentage: TNutritionObject) => {
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

		setTextAlignStyle(textAlign);
	};

	const calculateCarbs = (
		protein: number,
		fat: number,
		actualTDEE: number
	): number => (actualTDEE - (protein * 4 + fat * 9)) / 4;

	useEffect(() => {
		const newCaloriesToAchiveGoal = calculateCaloriesToAchieveGoal();
		setCaloriesToAchieveGoal(newCaloriesToAchiveGoal);
		setNutrition(calculateNutrition(props.goal, newCaloriesToAchiveGoal));
	}, [TDEE]);

	useEffect(() => {
		const newCaloriesToAchiveGoal = calculateCaloriesToAchieveGoal();
		setCaloriesToAchieveGoal(newCaloriesToAchiveGoal);
		setNutrition(calculateNutrition(props.goal, newCaloriesToAchiveGoal));
	}, []);

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
			<div className="mt-3 text-center">
				<label className="form-label m-3">
					{T_YOUR_CALORIC_NEEDS}
					<br />
					{props.goal === 'loseWeight'
						? `(-${helperUnit} / ${T_WEEK})`
						: null}
					{props.goal === 'keepWeight'
						? `(${T_WEIGHT_MAINTANCE})`
						: null}
					{props.goal === 'gainWeight'
						? `(+${helperUnit} / ${T_WEEK})`
						: null}
				</label>
				<div className="nutritions">
					<p className="text_nutrition text1">
						{T_PROTEIN}
						<span>{`${nutrition.protein.toFixed(0)}g`}</span>
					</p>
					<p
						className="text_nutrition text2 margin_left_fat"
						style={textAlignStyle.fat}
					>
						{T_FAT}
						<span>{`${nutrition.fat.toFixed(0)}g`}</span>
					</p>
					<p
						className="text_nutrition text3 margin_left_carbs"
						style={textAlignStyle.carbs}
					>
						{T_CARBS}
						<span>{`${nutrition.carbs.toFixed(0)}g`}</span>
					</p>
				</div>
				<div className="colors_bmi" style={rainbowStyle} />
				<output className="mt-2 text-info">
					{`${caloriesToAchieveGoal} kcal`}
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
	);
}
