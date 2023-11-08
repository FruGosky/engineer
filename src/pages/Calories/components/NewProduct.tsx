import React from "react";
import { TNewProductProps } from "../../../types";
import styles from "../Calories.module.scss";

export default function NewProduct(props: TNewProductProps) {
  const {
    id,
    nameOfProduct,
    descriptionOfProduct,
    consumedCalories,
    consumedGram,
    consumedProtein,
    consumedCarbs,
    consumedFat,
    onRemove,
  } = props;

  return (
    <div
      className={`card ${styles.new_product} border-success m-2 alert alert-dismissible fade show`}
    >
      <div className="d-flex flex-column flex-sm-row justify-content-between">
        <div className="d-flex align-items-center justify-content-center text-center">
          <p className="mb-2 ">
            {nameOfProduct} - {descriptionOfProduct}
          </p>
        </div>
        <ul className="list-group text-center">
          <li className="list-group-item border-info">{`${consumedCalories.toFixed()} kcal`}</li>
          <li className="list-group-item border-info">{`${consumedGram.toFixed()} g`}</li>
          <li className="list-group-item border-info">
            {consumedProtein
              ? `${consumedProtein?.toFixed()} g protein`
              : "--  / g protein"}
          </li>
          <li className="list-group-item border-info">
            {consumedCarbs
              ? `${consumedCarbs?.toFixed()} g carbohydrates`
              : "--  / g carbohydrates"}
          </li>
          <li className="list-group-item border-info">
            {consumedFat ? `${consumedFat?.toFixed()} g fat` : "--  / g fat"}
          </li>
        </ul>
      </div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        onClick={() => onRemove(id)}
      ></button>
    </div>
  );
}
