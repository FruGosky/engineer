import React, { useEffect, useRef, useState } from "react";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { useTranslation } from "react-i18next";
import styles from "./Calories.module.scss";
import NewProduct from "./components/NewProduct";
import SearchFood from "./components/SearchFood";
import AddProductManually from "./components/AddProductManually";
import {
  TNewProduct,
  TNutritionObject,
  TProductsArray,
  TUserPersonalData,
} from "../../types";

export const CALORIES_TITLE = "page.calories.title";
export const CALORIES_LINK = "/calories";

export default function Calories() {
  const [loading, setLoading] = useState(true);
  const { t: translation } = useTranslation();
  const addProductRef = useRef<HTMLDivElement | null>(null);
  const addConsumedProducts = useRef<HTMLDivElement | null>(null);

  const TRANSLATED_TITLE = translation(CALORIES_TITLE);
  useWebsiteTitle(TRANSLATED_TITLE);

  const token = JSON.parse(localStorage.getItem("token") || "null");

  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  const [units, setUnits] = useState<string | undefined>("metric");
  const [userWeight, setUserWeight] = useState<number | undefined>(0);
  const [caloriesGoal, setCaloriesGoal] = useState<number | undefined>(0);
  const [nutritionGoal, setNutritionGoal] = useState<TNutritionObject>({
    protein: 0,
    fat: 0,
    carbs: 0,
  });
  const [consumedCalories, setConsumedCalories] = useState<number>(0);
  const [consumedNutriotion, setConsumedNutrition] = useState<TNutritionObject>(
    {
      protein: 0,
      fat: 0,
      carbs: 0,
    }
  );

  const [productsArray, setProductsArray] = useState<TProductsArray>([
    //dummy data for testing
    {
      id: "id" + Math.random().toString(16).slice(2),
      nameOfProduct: "Product 1",
      descriptionOfProduct: "Description 1",
      consumedCalories: 100,
      consumedGram: 50,
      consumedProtein: 23,
      consumedCarbs: 16,
      consumedFat: 28,
    },
    {
      id: "id" + Math.random().toString(16).slice(2),
      nameOfProduct: "Product 2",
      descriptionOfProduct: "Description 2",
      consumedCalories: 154,
      consumedGram: 50,
      consumedProtein: undefined,
      consumedCarbs: undefined,
      consumedFat: undefined,
    },
    {
      id: "id" + Math.random().toString(16).slice(2),
      nameOfProduct: "Product 3",
      descriptionOfProduct: "Description 3",
      consumedCalories: 100,
      consumedGram: 50,
      consumedProtein: 23,
      consumedCarbs: 16,
      consumedFat: 28,
    },
    {
      id: "id" + Math.random().toString(16).slice(2),
      nameOfProduct: "Product 4",
      descriptionOfProduct: "Description 4",
      consumedCalories: 154,
      consumedGram: 50,
      consumedProtein: undefined,
      consumedCarbs: undefined,
      consumedFat: undefined,
    },
  ]);

  const handleRemoveProduct = (id: string) => {
    const newProductsArray = productsArray.filter(
      (product) => product.id !== id
    );
    setProductsArray(newProductsArray);
  };

  const hanldeAddProduct = (
    product: TNewProduct,
    gramOfProduct: number
  ): void => {
    const consumedNutriotionFromNewProduct: TNutritionObject = {
      protein:
        product.proteins_value !== undefined
          ? product.proteins_value * (gramOfProduct / 100)
          : 0,

      fat:
        product.fat_value !== undefined
          ? product.fat_value * (gramOfProduct / 100)
          : 0,

      carbs:
        product.carbohydrates_value !== undefined
          ? product.carbohydrates_value * (gramOfProduct / 100)
          : 0,
    };

    const consumedCaloriesFromNewProduct: number =
      (product["energy-kcal_value"] * gramOfProduct) / 100;

    let newID = "id" + Math.random().toString(16).slice(2);
    const newProductsArray = [
      ...productsArray,
      {
        id: newID,
        nameOfProduct: product.product_name_pl,
        descriptionOfProduct: product.ingredients_text_pl,
        consumedCalories: consumedCaloriesFromNewProduct,
        consumedGram: gramOfProduct,
        consumedProtein: consumedNutriotionFromNewProduct.protein,
        consumedCarbs: consumedNutriotionFromNewProduct.carbs,
        consumedFat: consumedNutriotionFromNewProduct.fat,
      },
    ];

    setProductsArray(newProductsArray);
    scrollToConsumedProducts();
  };

  const renderProductElements = () => {
    return productsArray.map((product, index) => (
      <NewProduct
        key={`${product.id}_${index}`}
        id={product.id}
        nameOfProduct={product.nameOfProduct}
        descriptionOfProduct={product.descriptionOfProduct}
        consumedCalories={product.consumedCalories}
        consumedGram={product.consumedGram}
        consumedProtein={product.consumedProtein}
        consumedCarbs={product.consumedCarbs}
        consumedFat={product.consumedFat}
        onRemove={() => handleRemoveProduct(product.id)}
      />
    ));
  };

  const scrollToProduct = (): void => {
    if (addProductRef.current) {
      addProductRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToConsumedProducts = (): void => {
    if (addConsumedProducts.current) {
      addConsumedProducts.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleProductSelectFromDatabase = (
    product: TNewProduct,
    howMuchGramEaten: number
  ) => {
    hanldeAddProduct(product, howMuchGramEaten);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    productsArray.forEach((product) => {
      totalCalories += product.consumedCalories;

      if (typeof product.consumedProtein === "number") {
        totalProtein += product.consumedProtein;
      }
      if (typeof product.consumedFat === "number") {
        totalFat += product.consumedFat;
      }
      if (typeof product.consumedCarbs === "number") {
        totalCarbs += product.consumedCarbs;
      }
    });

    setConsumedCalories(totalCalories);
    setConsumedNutrition({
      protein: totalProtein,
      fat: totalFat,
      carbs: totalCarbs,
    });
    renderProductElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsArray]);

  useEffect(() => {
    const storedUserPersonalData = localStorage.getItem("user-personal-data");

    if (!storedUserPersonalData) return;
    const parsedUserPersonalData: TUserPersonalData = JSON.parse(
      storedUserPersonalData
    );
    setCaloriesGoal(parsedUserPersonalData.caloriesToAchieveGoal);
    setNutritionGoal({
      protein: parsedUserPersonalData.protein ?? 0,
      fat: parsedUserPersonalData.fat ?? 0,
      carbs: parsedUserPersonalData.carbs ?? 0,
    });
    parsedUserPersonalData.units === "metric"
      ? setUnits("kg")
      : setUnits("lbs");
    setUserWeight(parsedUserPersonalData.weight);
  }, []);

  return loading ? (
    <LoadingIcon />
  ) : (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`${styles.main_card} card shadow`}>
        <h1 className="text-center border-bottom border-info p-2">
          Monitor your daily calories and macro nutrition here
        </h1>
        <div
          className={`${styles.head_section}  d-flex border-bottom border-info flex-row justify-content-between`}
        >
          <div className="d-flex flex-column justify-content-between">
            <p className="h5 text-info">{`${
              token?.displayName
            } - ${userWeight?.toFixed(2)} ${units}`}</p>
            <p>{`${day}/${month}/${year}`}</p>
          </div>
          <div className="text-end">
            <p className="h5 text-info">{`${consumedCalories.toFixed()}/${caloriesGoal} kcal`}</p>
            <p
              className={`${styles.text_protein}`}
            >{`${consumedNutriotion.protein.toFixed()}/${
              nutritionGoal.protein
            } g protein`}</p>
            <p
              className={`${styles.text_fat}`}
            >{`${consumedNutriotion.fat.toFixed()}/${
              nutritionGoal.fat
            } g fat`}</p>
            <p
              className={`${styles.text_carbs}`}
            >{`${consumedNutriotion.carbs.toFixed()}/${
              nutritionGoal.carbs
            } g carbs`}</p>
          </div>
        </div>
        <div
          className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center"
          ref={addConsumedProducts}
        >
          {renderProductElements()}
          <button className="btn btn-primary m-3" onClick={scrollToProduct}>
            Add product
          </button>
        </div>
        <div className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center">
          <SearchFood onProductSelect={handleProductSelectFromDatabase} />
        </div>
        <div
          id="add_product"
          ref={addProductRef} // Attach the ref to the "add_product" div
          className="mb-3 border-bottom border-info flex-column d-flex align-items-center justify-content-center"
        >
          <AddProductManually onAdd={hanldeAddProduct} />
        </div>
      </div>
    </div>
  );
}
