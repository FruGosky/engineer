import Home, { LINK as HOME_LINK, TITLE as HOME_TITLE } from './Home/Home';
import Bmi, { LINK as BMI_LINK, TITLE as BMI_TITLE } from './Bmi/Bmi';
import Bmr, { LINK as BMR_LINK, TITLE as BMR_TITLE } from './Bmr/Bmr';
import Calories, {
	LINK as CALORIES_LINK,
	TITLE as CALORIES_TITLE,
} from './Calories/Calories';
import Exercises, {
	LINK as EXERCISES_LINK,
	TITLE as EXERCISES_TITLE,
} from './Exercises/Exercises';
import FoodExamples, {
	LINK as FOOD_LINK,
	TITLE as FOOD_TITLE,
} from './Food/Food';

type TPages = {
	label: string;
	path: string;
	element: JSX.Element;
};

export const pages: TPages[] = [
	{ label: HOME_TITLE, path: HOME_LINK, element: <Home /> },
	{ label: BMI_TITLE, path: BMI_LINK, element: <Bmi /> },
	{ label: BMR_TITLE, path: BMR_LINK, element: <Bmr /> },
	{ label: CALORIES_TITLE, path: CALORIES_LINK, element: <Calories /> },
	{ label: EXERCISES_TITLE, path: EXERCISES_LINK, element: <Exercises /> },
	{
		label: FOOD_TITLE,
		path: FOOD_LINK,
		element: <FoodExamples />,
	},
];
