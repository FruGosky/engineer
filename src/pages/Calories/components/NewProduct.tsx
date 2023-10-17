import React from 'react';
import { NewProductProps } from '../../../types';

export default function NewProduct(props: NewProductProps) {
  const {
    id,
    nameOfProduct,
    descriptionOfProduct,
    consumedCalories,
    consumedGram,
    consumedProtein,
    consumedCarbs,
    consumedFat,
    onRemove
  } = props;

  return (
    <div className="card new_product border-success m-2 alert alert-dismissible fade show ">
      <div className="d-flex flex-column flex-sm-row justify-content-between">
        <div className="d-flex align-items-center justify-content-center text-center overflow-hidden">
          <p className="mb-2 ">
            {nameOfProduct} - {descriptionOfProduct}
          </p>
        </div>
        <ul className="list-group text-center">
          <li className="list-group-item border-info">{`${consumedCalories.toFixed()} kcal`}</li>
          <li className="list-group-item border-info">{`${consumedGram.toFixed()} g`}</li>
          <li className="list-group-item border-info">{consumedProtein ? `${consumedProtein?.toFixed()} g protein` : '--  / g protein'}</li>
          <li className="list-group-item border-info">{consumedCarbs ? `${consumedCarbs?.toFixed()} g carbohydrates` : '--  / g carbohydrates'}</li>
          <li className="list-group-item border-info">{consumedFat ? `${consumedFat?.toFixed()} g fat` : '--  / g fat'}</li>
        </ul>
      </div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        onClick={() => onRemove(id)} // Use an arrow function to pass the id correctly
      ></button>
    </div>
  );
}