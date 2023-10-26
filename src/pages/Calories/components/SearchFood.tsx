import React, { useState } from "react";
import axios from "../../../axios";
import FoundProducts from "./FoundProducts";

export default function SearchFood() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const searchQueryJSON = JSON.stringify(searchQuery); // Ensure searchQuery is a JSON primitive
      const encodedSearchQuery = encodeURIComponent(
        JSON.stringify(searchQuery).toLowerCase()
      );
      // const searchURL = `${process.env.REACT_APP_DATABASE_URL}food.json?auth=${process.env.REACT_APP_DATABASE_SECRET}&orderBy="product_name_pl"&equalTo=${encodedSearchQuery}`;
      const searchURL = `${process.env.REACT_APP_DATABASE_URL}food.json?auth=${process.env.REACT_APP_DATABASE_SECRET}&orderBy="product_name_pl"&startAt=${encodedSearchQuery}&endAt=${encodedSearchQuery}\uf8ff`;
      //! add case inSensitive search
      const response = await axios.get(searchURL);

      if (response) {
        setSearchResults(Object.values(response.data));
      }
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h1 className="m-3 text-center">
        Look through our food product database
      </h1>
      <div className="input-group mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control"
          placeholder="Type name of the product here..."
          aria-label="Type name of the product here..."
          aria-describedby="button-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          id="button-addon2"
          onClick={handleSearch}
        >
          Find
        </button>
      </div>
      <FoundProducts products={searchResults} />
    </div>
  );
}
