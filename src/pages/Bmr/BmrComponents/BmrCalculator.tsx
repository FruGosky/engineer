/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './BmrCalculator.scss';
import BmrResult from './BmrResult';
import {
	TUnits,
	TSex,
	TActivity,
	TWeightUnit,
	THeightUnit,
	THelperUnit,
	TBmrData,
	TUserPersonalData,
	TGoal,
} from '../../../types';

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
	const T_UNITS = translation('page.bmi.calculator.units');
	const T_IMPERIAL = translation('page.bmi.calculator.imperial');
	const T_METRIC = translation('page.bmi.calculator.metric');
	const T_HEIGHT = translation('page.bmi.calculator.height');
	const T_WEIGHT = translation('page.bmi.calculator.weight');
	const T_CALCULATOR_TITLE = translation('page.bmr.calculator-title');
	const T_CALCULATE = translation('common.calculate');
	const T_WRONG_SEX_INPUT = translation('page.bmr.wrong-sex-input');
	const T_CHOOSE_GOAL = translation('page.bmr.choose-goal');
	const T_LOSE_WEIGHT = translation('page.bmr.lose-weight');
	const T_GAIN_WEIGHT = translation('page.bmr.gain-weight');
	const T_WEIGHT_MAINTENANCE = translation('page.bmr.weight-maintenance');

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [weightValueAsKg, setWeightValueAsKg] = useState<number>(0);
	const [units, setUnits] = useState<TUnits>('metric');
	const [weightUnit, setWeightUnit] = useState<TWeightUnit>('kg');
	const [heightUnit, setHeightUnit] = useState<THeightUnit>('cm');
	const [helperUnit, setHelperUnit] = useState<THelperUnit>('500g');
	const [sex, setSex] = useState<TSex>('male');
	const [activity, setActivity] = useState<TActivity>('none');
	const [goal, setGoal] = useState<TGoal>('keepWeight');
	const [age, setAge] = useState<number>(0);
	const [BMR, setBMR] = useState<number>(0);
	const [TDEE, setTDEE] = useState<number>(0);

	const refreshHandler = (): void => {
		setIsSubmitted(false);
		setHeightValue(0);
		setWeightValue(0);
		setAge(0);
		setBMR(0);
		setTDEE(0);
		setActivity('none');
	};

	const calculateBMR = (
		sex: TSex,
		weightValueAsKg: number,
		heightValueAsCm: number,
		age: number
	): number => {
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

	const onGoalChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setGoal(e.target.value as TGoal);
		setIsSubmitted(false);
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const bmrData: TBmrData = {
			units,
			sex,
			activity,
			height: heightValue,
			weight: weightValue,
			age,
			goal,
		};
		setAllStatesFromData(bmrData);
		setIsSubmitted(true);
		saveBMRToLocalStorage(bmrData);
	};

	const setAllStatesFromData = (props: TBmrData): void => {
		setUnits(props.units);
		setSex(props.sex);
		setHeightValue(props.height);
		setWeightValue(props.weight);
		setAge(props.age);
		setActivity(props.activity);
		setGoal(props.goal);
		const weightValueAsKg = calcWeightValueAsKg(props.units, props.weight);
		setWeightValueAsKg(weightValueAsKg);
		const heightValueAsCm = calcHeightValueAsCm(props.units, props.height);
		const bmrValue = calculateBMR(
			props.sex,
			weightValueAsKg,
			heightValueAsCm,
			props.age
		);
		setBMR(bmrValue);
		const TDEEValue = calcTDEE(props.activity, bmrValue);
		setTDEE(TDEEValue);
	};

	const saveBMRToLocalStorage = (bmrData: TBmrData) => {
		const storedUserPersonalData =
			localStorage.getItem('user-personal-data');
		if (storedUserPersonalData) {
			const parsedUserPersonalData: TUserPersonalData = JSON.parse(
				storedUserPersonalData
			);
			localStorage.setItem(
				'user-personal-data',
				JSON.stringify({ ...parsedUserPersonalData, ...bmrData })
			);
			return;
		}
		localStorage.setItem('user-personal-data', JSON.stringify(bmrData));
	};

	useEffect(() => {
		const storedUserPersonalData =
			localStorage.getItem('user-personal-data');
		if (!storedUserPersonalData) return;
		const parsedUserPersonalData: TUserPersonalData = JSON.parse(
			storedUserPersonalData
		);
		if (
			parsedUserPersonalData.height === undefined ||
			parsedUserPersonalData.weight === undefined ||
			parsedUserPersonalData.units === undefined ||
			parsedUserPersonalData.activity === undefined ||
			parsedUserPersonalData.age === undefined ||
			parsedUserPersonalData.sex === undefined ||
			parsedUserPersonalData.goal === undefined
		) {
			return;
		}
		//TODO? Puzzles to discover why it needs type below if ure checking type before
		setAllStatesFromData(parsedUserPersonalData as TBmrData);
		setIsSubmitted(true);
	}, []);

	const checkAndSetUnitTypes = (units: TUnits) => {
		if (units === 'metric') {
			setWeightUnit('kg');
			setHeightUnit('cm');
			setHelperUnit('500g');
		} else if (units === 'imperial') {
			setWeightUnit('lbs');
			setHeightUnit('ft');
			setHelperUnit('1.1 lb');
		}
	};
	useEffect(() => {
		checkAndSetUnitTypes(units);
	}, [units]);

	const calcTDEE = (activity: TActivity, BMR: number): number => {
		const activityMultipliers = {
			none: 1.2,
			low: 1.375,
			medium: 1.55,
			high: 1.725,
			'very-high': 2,
		};
		const multiplier = activityMultipliers[activity];
		//TODO! ADD TRANSLATION FOR THIS ERROR
		if (multiplier === undefined) throw new Error('Activity invalid');
		return BMR * multiplier;
	};

	const calcWeightValueAsKg = (
		units: TUnits,
		weightValue: number
	): number => {
		if (units === 'imperial') {
			return weightValue * 0.45359237;
		} else if (units === 'metric') {
			return weightValue;
		}
		//TODO! ADD TRANSLATION FOR THIS ERROR
		throw new Error('Units invalid');
	};

	const calcHeightValueAsCm = (
		units: TUnits,
		heightValue: number
	): number => {
		if (units === 'imperial') {
			return heightValue * 30.48;
		} else if (units === 'metric') {
			return heightValue;
		}
		//TODO! ADD TRANSLATION FOR THIS ERROR
		throw new Error('Units invalid');
	};

	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="card">
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
					<label htmlFor="goalSelect" className="mb-2">
						{`${T_CHOOSE_GOAL}:`}
					</label>
					<select
						id="goalSelect"
						className="form-select mb-3"
						onChange={onGoalChange}
						value={goal}
					>
						<option value="loseWeight">{T_LOSE_WEIGHT}</option>
						<option value="keepWeight">
							{T_WEIGHT_MAINTENANCE}
						</option>
						<option value="gainWeight">{T_GAIN_WEIGHT}</option>
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
								value={age.toFixed(0)}
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
					<BmrResult
						TDEE={TDEE}
						BMR={BMR}
						helperUnit={helperUnit}
						refreshHandler={refreshHandler}
						weightValueAsKg={weightValueAsKg}
						goal={goal}
					/>
				)}
			</div>
		</div>
	);
}
