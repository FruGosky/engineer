export type TUnits = 'metric' | 'imperial';

export type TWeightUnit = 'kg' | 'lbs';

export type THeightUnit = 'cm' | 'ft';

export type THelperUnit = '500g' | '1.1 lb';

export type TActivity = 'none' | 'low' | 'medium' | 'high' | 'very-high';

export type TSex = 'male' | 'female';

export type TNutritionObject = {
	protein: number;
	fat: number;
	carbs: number;
};

export type TGoal = 'loseWeight' | 'keepWeight' | 'gainWeight';

export type TBmiData = {
	units: TUnits;
	height: number;
	weight: number;
};

export type TBmrData = {
	units: TUnits;
	height: number;
	weight: number;
	sex: TSex;
	activity: TActivity;
	age: number;
	goal: TGoal;
};

export type TUserPersonalData = {
	units?: TUnits;
	height?: number;
	weight?: number;
	sex?: TSex;
	activity?: TActivity;
	age?: number;
	goal?: TGoal;
};
