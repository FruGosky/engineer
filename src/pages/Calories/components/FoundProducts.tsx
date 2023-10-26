import React, { useState } from "react";
import { TProduct } from "../../../types";

export default function FoundProducts(props: { products: TProduct[] }) {
  const [howMuchGramEaten, setHowMuchGramEaten] = useState<number>(0);

  const productsArray = props.products;

  const handleAddThisProduct = () => {
    //here get data from specific product idk how yet
  };

  return (
    <React.Fragment>
      {productsArray.map((el, index) => {
        return (
          <div
            key={index}
            className="d-flex flex-row card new_product border-success mb-3 w-100 d-flex align-items-center justify-content-center"
          >
            <div className="d-flex flex-column align-items-center justify-content-center text-center overflow-hidden">
              <p className="m-2">
                {`${el.product_name_pl} - ${el.ingredients_text_pl}`}
              </p>

              <div className="d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleAddThisProduct}
                >
                  Add this product
                </button>
              </div>
            </div>
            <ul className="list-group text-center">
              <li className="list-group-item border-info">
                {" "}
                {el["energy-kcal_value"]
                  ? `${el["energy-kcal_value"]} kcal`
                  : `--/ kcal`}
              </li>
              <li className="list-group-item border-info">
                <div className="col-auto">
                  <label
                    htmlFor="how_much_eaten_input"
                    className="col-form-label"
                  >
                    how much gram eaten
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="number"
                    id="how_much_eaten_input"
                    className="form-control info_input"
                    min="1"
                    max="300"
                    step={0.01}
                    inputMode="decimal"
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setHowMuchGramEaten(parseFloat(e.target.value));
                    }}
                    value={howMuchGramEaten}
                    required
                  />
                </div>
              </li>
              <li className="list-group-item border-info">
                {el.proteins_value
                  ? `${el.proteins_value} g protein`
                  : `--/g protein`}
              </li>
              <li className="list-group-item border-info">
                {el.carbohydrates_value
                  ? `${el.carbohydrates_value} g carbohydrates`
                  : `--/g carbohydrates`}
              </li>
              <li className="list-group-item border-info">
                {el.fat_value ? `${el.fat_value} g fat` : `--/g fat`}
              </li>
            </ul>
          </div>
        );
      })}
    </React.Fragment>
  );
}
