import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import { useTranslation } from 'react-i18next';
import {
	TActivity,
	THeightUnit,
	TSex,
	TUnits,
	TWeightUnit,
} from '../Bmr/BmrComponents/BmrCalculator';
import './Profile.scss';
import { NavLink } from 'react-router-dom';
import { BMI_LINK } from '../Bmi/Bmi';
import { BMR_LINK } from '../Bmr/Bmr';
import { CALORIES_LINK } from '../Calories/Calories';

export const PROFILE_TITLE = 'page.profile.title';
export const PROFILE_LINK = '/profile';

type TUserPersonalData = {
	sex: string;
	activity: string;
	height: number;
	weight: number;
	goalWeight: number;
	age: number;
	bmrValue: number;
	bmiValue: number;
	units: string;
};

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const { t: translation } = useTranslation();

	const TRANSLATED_TITLE = translation(PROFILE_TITLE);
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
	const T_WRONG_SEX_INPUT = translation('page.bmr.wrong-sex-input');

	const T_CALORIES = translation('page.calories.title');
	const T_HELLO = translation('common.hello');
	const T_INFO1 = translation('page.profile.info1');
	const T_INFO2 = translation('page.profile.info2');
	const T_SUCCESS_INFO1 = translation('page.profile.success-info1');
	const T_SUCCESS_INFO2 = translation('page.profile.success-info2');
	const T_SAVE = translation('common.save');
	const T_GOAL = translation('page.profile.goal');

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [heightValueAsCm, setHeightValueAsCm] = useState<number>(0);
	const [weightValue, setWeightValue] = useState<number>(0);
	const [weightValueAsKg, setWeightValueAsKg] = useState<number>(0);
	const [goalWeightValue, setGoalWeightValue] = useState<number>(0);
	const [goalWeightValueAsKg, setGoalWeightValueAsKg] = useState<number>(0);
	const [units, setUnits] = useState<TUnits>('metric');
	const [weightUnit, setWeightUnit] = useState<TWeightUnit>('kg');
	const [heightUnit, setHeightUnit] = useState<THeightUnit>('cm');
	const [sex, setSex] = useState<TSex>('male');
	const [activity, setActivity] = useState<TActivity>('none');
	const [age, setAge] = useState<number>(0);

	useWebsiteTitle(TRANSLATED_TITLE);

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

	const calculateBMI = (): number => {
		const bmi =
			(weightValueAsKg / (heightValueAsCm * heightValueAsCm)) * 10000;
		return bmi;
	};
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newBmrValue = calculateBMR();
		const newBmiValue = calculateBMI();
		const userPersonalData: TUserPersonalData = {
			sex: sex,
			activity: activity,
			height: heightValueAsCm,
			weight: weightValueAsKg,
			goalWeight: goalWeightValueAsKg,
			age: age,
			bmrValue: newBmrValue,
			bmiValue: newBmiValue,
			units: units,
		};
		setIsSubmitted(true);
		saveUserPersonalDataToLocalStorage(userPersonalData);
	};
	const saveUserPersonalDataToLocalStorage = (
		userPersonalData: TUserPersonalData
	) => {
		localStorage.setItem(
			'user-personal-data',
			JSON.stringify(userPersonalData)
		);
	};
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1_000);
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
	}, [weightValue]);
	useEffect(() => {
		if (units === 'imperial') {
			setGoalWeightValueAsKg(goalWeightValue * 0.45359237);
		} else {
			setGoalWeightValueAsKg(goalWeightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goalWeightValue]);

	useEffect(() => {
		if (units === 'imperial') {
			setHeightValueAsCm(heightValue * 30.48);
		} else {
			setHeightValueAsCm(heightValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heightValue]);

	useEffect(() => {
		const storedPersonalData = localStorage.getItem('user-personal-data');
		if (storedPersonalData) {
			const parsedPersonalData = JSON.parse(storedPersonalData);
			setIsSubmitted(true);
			setUnits(parsedPersonalData.units);
			setSex(parsedPersonalData.sex);
			setHeightValue(parseFloat(parsedPersonalData.height));
			setWeightValue(parseFloat(parsedPersonalData.weight));
			setGoalWeightValue(parseFloat(parsedPersonalData.goalWeight));
			setAge(parseFloat(parsedPersonalData.age));
			setActivity(parsedPersonalData.activity);
		}
	}, []);

	return loading ? (
		<LoadingIcon />
	) : (
		<div className="d-flex align-items-center justify-content-center">
			<div className="card shadow">
				<div className="d-flex justify-content-center mb-3 ">
					<h2>{`${T_HELLO} - User!`}</h2>
				</div>
				<div className="mb-3 border-bottom border-info">
					<p className="text-center">
						{T_INFO1}
						<br />
						{T_INFO2}
					</p>
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
									setIsSubmitted(false);
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
									setIsSubmitted(false);
								}}
								value={age}
								required
							/>
						</div>
						<div className="col-auto text">
							<span className="form-text">{T_YEARS}</span>
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
									setIsSubmitted(false);
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
								htmlFor="weight_input"
								className="col-form-label"
							>
								{`${T_GOAL}:`}
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
									setGoalWeightValue(
										parseFloat(e.target.value)
									);
									setIsSubmitted(false);
								}}
								value={goalWeightValue}
								required
							/>
						</div>
						<div className="col-auto text">
							<span className="form-text">{weightUnit}</span>
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-center m-3">
						<button className="btn btn-primary col-auto mt-2">
							{T_SAVE}
						</button>
					</div>
				</form>
				{isSubmitted && (
					<div
						className="alert alert-success alert-dismissible fade show text-center"
						role="alert"
					>
						<div className="">
							{T_SUCCESS_INFO1}
							<br />
							{T_SUCCESS_INFO2}
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close"
								onClick={() => setIsSubmitted(false)}
							></button>
						</div>

						<div className="d-flex justify-content-around align-items-center flex-column m-2">
							<NavLink
								className="btn btn-outline-info w-lg-25 w-sm-75 m-2"
								to={BMI_LINK}
							>
								BMI
							</NavLink>
							<NavLink
								className="btn btn-outline-info w-lg-25 w-sm-75 m-2"
								to={BMR_LINK}
							>
								BMR
							</NavLink>
							<NavLink
								className="btn btn-outline-info w-lg-25 w-sm-75 m-2"
								to={CALORIES_LINK}
							>
								{T_CALORIES}
							</NavLink>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
