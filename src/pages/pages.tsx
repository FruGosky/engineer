import Home, { HOME_LINK, HOME_TITLE } from './Home/Home';
import Bmi, { BMI_LINK, BMI_TITLE } from './Bmi/Bmi';
import Bmr, { BMR_LINK, BMR_TITLE } from './Bmr/Bmr';
import Calories, { CALORIES_LINK, CALORIES_TITLE } from './Calories/Calories';
import Exercises, {
	EXERCISES_LINK,
	EXERCISES_TITLE,
} from './Exercises/Exercises';
import Food, { FOOD_LINK, FOOD_TITLE } from './Food/Food';
import Profile, { PROFILE_LINK, PROFILE_TITLE } from './Profile/Profile';
import BeginnersPlan, {
	BEGINNERS_PLAN_LINK,
	BEGINNERS_PLAN_TITLE,
} from './Exercises/BeginnersPlan/BeginnersPlan';

type TPages = {
	label: string;
	path: string;
	element: JSX.Element;
	needAuth: boolean;
};

export const menuPages: TPages[] = [
	{ label: HOME_TITLE, path: HOME_LINK, element: <Home />, needAuth: false },
	{ label: BMI_TITLE, path: BMI_LINK, element: <Bmi />, needAuth: false },
	{ label: BMR_TITLE, path: BMR_LINK, element: <Bmr />, needAuth: false },
	{
		label: CALORIES_TITLE,
		path: CALORIES_LINK,
		element: <Calories />,
		needAuth: false,
	},
	{
		label: EXERCISES_TITLE,
		path: EXERCISES_LINK,
		element: <Exercises />,
		needAuth: false,
	},
	{
		label: FOOD_TITLE,
		path: FOOD_LINK,
		element: <Food />,
		needAuth: false,
	},
];

export const userIconPages: TPages[] = [
	{
		label: PROFILE_TITLE,
		path: PROFILE_LINK,
		element: <Profile />,
		needAuth: true,
	},
];

export const exercisePages: TPages[] = [
	{
		label: BEGINNERS_PLAN_TITLE,
		path: EXERCISES_LINK + BEGINNERS_PLAN_LINK,
		element: <BeginnersPlan />,
		needAuth: false,
	},
];

export const pages: TPages[] = [
	...menuPages,
	...userIconPages,
	...exercisePages,
];
