import Bmi from './Bmi/Bmi';
import Bmr from './Bmr/Bmr';
import Calories from './Calories/Calories';
import Exercises from './Exercises/Exercises';
import FoodExamples from './FoodExamples/FoodExamples';
import Home from './Home/Home';

type TPages = {
	label: string;
	path: string;
	element: JSX.Element;
};

export const pages: TPages[] = [
	{ label: 'Strona główna', path: '/', element: <Home /> },
	{ label: 'Bmi', path: '/bmi', element: <Bmi /> },
	{ label: 'Bmr', path: '/bmr', element: <Bmr /> },
	{ label: 'Kalorie', path: '/calories', element: <Calories /> },
	{ label: 'Ćwiczenia', path: '/exercises', element: <Exercises /> },
	{ label: 'Jedzenie', path: '/food-examples', element: <FoodExamples /> },
];
