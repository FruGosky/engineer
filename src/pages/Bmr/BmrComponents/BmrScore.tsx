import { useTranslation } from 'react-i18next';
import {
	TGoalsNutrition,
	TGoalsRainbowStyle,
	TGoalsTextAlignStyle,
	THelperUnit,
} from './BmrCalculator';

type TProps = {
	TDEE: number;
	BMR: number;
	helperUnit: THelperUnit;
	goalsNutrition: TGoalsNutrition;
	goalsTextAlignStyle: TGoalsTextAlignStyle;
	goalsRainbowStyle: TGoalsRainbowStyle;
	refreshHandler: () => void;
};

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

	const {
		BMR,
		helperUnit,
		goalsNutrition,
		goalsTextAlignStyle,
		goalsRainbowStyle,
		TDEE,
		refreshHandler,
	} = props;

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
					{`(-${helperUnit} / ${T_WEEK})`}
				</label>

				<div className="nutritions">
					<p className="text_nutrition text1">
						{T_PROTEIN}
						<span>
							{`${goalsNutrition.loseWeight.protein.toFixed(0)}g`}
						</span>
					</p>
					<p
						className="text_nutrition text2 margin_left_fat"
						style={goalsTextAlignStyle.loseWeight.fat}
					>
						{T_FAT}
						<span>
							{`${goalsNutrition.loseWeight.fat.toFixed(0)}g
                    `}
						</span>
					</p>
					<p
						className="text_nutrition text3 margin_left_carbs"
						style={goalsTextAlignStyle.loseWeight.carbs}
					>
						{T_CARBS}
						<span>
							{`${goalsNutrition.loseWeight.carbs.toFixed(0)}g
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
							{`${goalsNutrition.keepWeight.protein.toFixed(0)}g`}
						</span>
					</p>
					<p
						className="text_nutrition text2 margin_left_fat"
						style={goalsTextAlignStyle.keepWeight.fat}
					>
						{T_FAT}
						<span>
							{`${goalsNutrition.keepWeight.fat.toFixed(0)}g
                    `}
						</span>
					</p>
					<p
						className="text_nutrition text3 margin_left_carbs"
						style={goalsTextAlignStyle.keepWeight.carbs}
					>
						{T_CARBS}
						<span>
							{`${goalsNutrition.keepWeight.carbs.toFixed(0)}g
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
							{`${goalsNutrition.gainWeight.protein.toFixed(0)}g`}
						</span>
					</p>
					<p
						className="text_nutrition text2 margin_left_fat"
						style={goalsTextAlignStyle.gainWeight.fat}
					>
						{T_FAT}
						<span>
							{`${goalsNutrition.gainWeight.fat.toFixed(0)}g
                    `}
						</span>
					</p>
					<p
						className="text_nutrition text3 margin_left_carbs"
						style={goalsTextAlignStyle.gainWeight.carbs}
					>
						{T_CARBS}
						<span>
							{`${goalsNutrition.gainWeight.carbs.toFixed(0)}g
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
	);
}
