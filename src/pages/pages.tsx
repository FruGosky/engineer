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
import Food, { LINK as FOOD_LINK, TITLE as FOOD_TITLE } from './Food/Food';
import Profile, {
	LINK as PROFILE_LINK,
	TITLE as PROFILE_TITLE,
} from './Profile/Profile';

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

export const pages: TPages[] = [...menuPages, ...userIconPages];
