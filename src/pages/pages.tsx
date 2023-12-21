import Home, { HOME_LINK, HOME_TITLE } from './Home/Home';
import Bmi, { BMI_LINK, BMI_TITLE } from './Bmi/Bmi';
import Bmr, { BMR_LINK, BMR_TITLE } from './Bmr/Bmr';
import Calories, { CALORIES_LINK, CALORIES_TITLE } from './Calories/Calories';
import Exercises, {
	EXERCISES_LINK,
	EXERCISES_TITLE,
} from './Exercises/Exercises';
import Profile, { PROFILE_LINK, PROFILE_TITLE } from './Profile/Profile';
import BeginnersPlan, {
	BEGINNERS_PLAN_LINK,
	BEGINNERS_PLAN_TITLE,
} from './Exercises/BeginnersPlan/BeginnersPlan';
import IntermediatePlan, {
	INTERMEDIATE_PLAN_LINK,
	INTERMEDIATE_PLAN_TITLE,
} from './Exercises/IntermediatePlan/IntermediatePlan';
import BeginnersExercises, {
	BEGINNERS_EXERCISES_LINK,
	BEGINNERS_EXERCISES_TITLE,
} from './Exercises/BeginnerExercises/BeginnerExercises';
import IntermediateExercises, {
	INTERMEDIATE_EXERCISES_LINK,
	INTERMEDIATE_EXERCISES_TITLE,
} from './Exercises/IntermediateExercises/IntermediateExercises';
import Settings, { SETTINGS_LINK, SETTINGS_TITLE } from './Settings/Settings';

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
];

export const userIconPages: TPages[] = [
	{
		label: PROFILE_TITLE,
		path: PROFILE_LINK,
		element: <Profile />,
		needAuth: true,
	},
	{
		label: SETTINGS_TITLE,
		path: SETTINGS_LINK,
		element: <Settings />,
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
	{
		label: INTERMEDIATE_PLAN_TITLE,
		path: EXERCISES_LINK + INTERMEDIATE_PLAN_LINK,
		element: <IntermediatePlan />,
		needAuth: false,
	},
	{
		label: BEGINNERS_EXERCISES_TITLE,
		path: EXERCISES_LINK + BEGINNERS_EXERCISES_LINK,
		element: <BeginnersExercises />,
		needAuth: false,
	},
	{
		label: INTERMEDIATE_EXERCISES_TITLE,
		path: EXERCISES_LINK + INTERMEDIATE_EXERCISES_LINK,
		element: <IntermediateExercises />,
		needAuth: false,
	},
];

export const pages: TPages[] = [
	...menuPages,
	...userIconPages,
	...exercisePages,
];
