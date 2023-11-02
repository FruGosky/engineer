import React, { FormEvent, useEffect, useState } from "react";
import axios from "../../../axios";

import FoundProducts from "./FoundProducts";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import { TProductSelect } from "../../../types";

export default function SearchFood(props: TProductSelect) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [dataFound, setDataFound] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userTokenUID, setUserTokenUID] = useState<string>("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      const tokenData = JSON.parse(token);
      setUserTokenUID(tokenData.localId);
    }

    try {
      getCurrentLanguage();
      const searchQueryJSON = JSON.stringify(searchQuery);
      const encodedSearchQuery = encodeURIComponent(searchQueryJSON);

      //TODO! check if secret below is necessery or only at registered user
      const mainDatabaseSearchURL = `${process.env.REACT_APP_DATABASE_URL}food.json?auth=${process.env.REACT_APP_DATABASE_SECRET}&orderBy="product_name_${selectedLanguage}"&equalTo=${encodedSearchQuery}&limitToFirst=5`;

      const mainDatabaseResponse = await axios.get(mainDatabaseSearchURL);

      if (mainDatabaseResponse.data !== null) {
        setSearchResults(Object.values(mainDatabaseResponse.data));
      } else {
        setSearchResults([]);
      }
      //!TODO here i ended i have to try every way possible of fetching data, some thing works some dont(yet) and try to add case InSensitive search

      // Check if the token exists before querying the user-specific database
      if (token) {
        const usersFoodSearchURL = `${process.env.REACT_APP_DATABASE_URL}usersFood/${userTokenUID}.json?auth=${process.env.REACT_APP_DATABASE_SECRET}&orderBy="product_name_${selectedLanguage}"&equalTo=${encodedSearchQuery}`;
        const usersFoodDatabaseResponse = await axios.get(usersFoodSearchURL);
        console.log(usersFoodDatabaseResponse);
        if (usersFoodDatabaseResponse.data !== null) {
          setSearchResults((prevValue) =>
            prevValue.concat(Object.values(usersFoodDatabaseResponse.data))
          );
        } else {
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    } finally {
      //!here is bug that on the first find press it shows no data, but if you click seccond time it displays as should
      searchResults.length === 0 ? setDataFound(false) : setDataFound(true);
      setIsLoading(false);
    }
  };

  const getCurrentLanguage = () => {
    const selectedLanguageData = localStorage.getItem("i18nextLng");
    if (selectedLanguageData) {
      setSelectedLanguage(selectedLanguageData);
    }
  };

  useEffect(() => {
    getCurrentLanguage();
  }, []);

  return (
    <div>
      <h1 className="m-3 text-center">
        Look through our food product database
      </h1>
      <form onSubmit={handleSearch}>
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
            type="submit"
            id="button-addon2"
          >
            Find
          </button>
        </div>
      </form>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <FoundProducts
          products={searchResults}
          selectedLanguage={selectedLanguage}
          onProductSelect={props.onProductSelect}
        />
      )}
      {dataFound ? (
        <></>
      ) : (
        <div className="alert alert-warning" role="alert">
          No data found{" "}
          <a
            href={`https://www.google.com/search?q=${searchQuery}+kcal&oq=baron+proteinowy+kcal&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMgoIAhAAGA0YDxgeMgoIAxAAGAUYDRgeMgoIBBAAGAUYDRgeMgoIBRAAGAUYDRgeMgoIBhAAGAgYDRgeMgoIBxAAGAgYDRgeMgoICBAAGAgYDRgeMgoICRAAGAgYDRge0gEINDI3MWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8`}
            className="alert-link"
          >
            visit this page
          </a>{" "}
          to look for more products
        </div>
      )}
    </div>
  );
}
