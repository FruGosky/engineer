export type TUnits = "metric" | "imperial";

export type TWeightUnit = "kg" | "lbs";

export type THeightUnit = "cm" | "ft";

export type THelperUnit = "500g" | "1.1 lb";

export type TActivity = "none" | "low" | "medium" | "high" | "very-high";

export type TSex = "male" | "female";

export type TNutritionObject = {
  protein: number;
  fat: number;
  carbs: number;
};

export type TGoal = "loseWeight" | "keepWeight" | "gainWeight";

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
  caloriesToAchieveGoal?: number;
  TDEE?: number;
  carbs?: number;
  fat?: number;
  protein?: number;
  units?: TUnits;
  height?: number;
  weight?: number;
  sex?: TSex;
  activity?: TActivity;
  age?: number;
  goal?: TGoal;
};
export type TNewProduct = {
  id: string;
  product_name_pl: string;
  nutrition_data_per: string;
  "energy-kcal_value": number;
  fat_value: number | undefined;
  carbohydrates_value: number | undefined;
  proteins_value: number | undefined;
  ingredients_text_pl: string | undefined; //description?
};
export type TProductsArray = Array<{
  id: string;
  nameOfProduct: string;
  descriptionOfProduct?: string | undefined;
  consumedCalories: number;
  consumedGram: number;
  consumedProtein?: number | undefined;
  consumedCarbs?: number | undefined;
  consumedFat?: number | undefined;
}>;

export type TNewProductProps = {
  id: string;
  nameOfProduct: string;
  descriptionOfProduct?: string;
  consumedCalories: number;
  consumedGram: number;
  consumedProtein?: number | undefined;
  consumedCarbs?: number | undefined;
  consumedFat?: number | undefined;
  onRemove: (id: string) => void;
};
export type TAddProductManuallyProps = {
  onAdd: (product: TNewProduct, gramOfProduct: number) => void;
};
export type TProduct = {
  brands?: string;
  product_name_pl?: string;
  product_name_en?: string;
  ingredients_text_pl?: string;
  ingredients_text_en?: string;
  proteins_value?: number;
  fat_value?: number;
  carbohydrates_value?: number;
  ["energy-kcal_value"]?: number;
};
export type TToken = {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
};
export type TProductSelect = {
  onProductSelect: (product: TNewProduct, howMuchGramEaten) => void;
};
