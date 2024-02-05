import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutBmi.module.scss';

type aboutBmiProps = {
	bmiInfo: string;
};
export default function AboutBmi(props: aboutBmiProps): JSX.Element {
	const { t: translation } = useTranslation();

	const T_UNDERWEIGHT = translation('page.bmi.calculator.underweight');
	const T_WEIGHT_NORMAL = translation('page.bmi.calculator.weight-normal');
	const T_OVERWEIGHT = translation('page.bmi.calculator.overweight');
	const T_OBESITY = translation('page.bmi.calculator.obesity');
	const T_SIGNIFICANT_OBESITY = translation(
		'page.bmi.calculator.significant-obesity'
	);
	const T_ABOUT_BMI_INFO = translation('page.bmi.about-bmi.about-bmi-info');
	const T_UNDERWEIGHT_INFO = translation(
		'page.bmi.about-bmi.underweight-info'
	);
	const T_NORMAL_WEIGHT_INFO = translation(
		'page.bmi.about-bmi.weight-normal-info'
	);
	const T_OVERWEIGHT_INFO = translation('page.bmi.about-bmi.overweight-info');
	const T_OBESITY_INFO = translation('page.bmi.about-bmi.obesity-info');
	const T_SIGNIFICANT_OBESITY_INFO = translation(
		'page.bmi.about-bmi.significant-obesity-info'
	);
	const [aboutBmi, setAboutBmi] = useState<string>('');
	useEffect(() => {
		if (props.bmiInfo === T_UNDERWEIGHT) {
			setAboutBmi(T_UNDERWEIGHT_INFO);
		} else if (props.bmiInfo === T_WEIGHT_NORMAL) {
			setAboutBmi(T_NORMAL_WEIGHT_INFO);
		} else if (props.bmiInfo === T_OVERWEIGHT) {
			setAboutBmi(T_OVERWEIGHT_INFO);
		} else if (props.bmiInfo === T_OBESITY) {
			setAboutBmi(T_OBESITY_INFO);
		} else if (props.bmiInfo === T_SIGNIFICANT_OBESITY) {
			setAboutBmi(T_SIGNIFICANT_OBESITY_INFO);
		} else {
			setAboutBmi(T_ABOUT_BMI_INFO);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.bmiInfo]);

	return <div className={`card m-4 p-4 ${styles.about_bmi}`}>{aboutBmi}</div>;
}
