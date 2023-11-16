import { FormEvent, useEffect, useState } from "react";
import axios from "../../../axios";
import FoundProducts from "./FoundProducts";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import { TProduct, TProductSelect } from "../../../types";
import { useTranslation } from "react-i18next";

export default function SearchFood(props: TProductSelect) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userTokenUID, setUserTokenUID] = useState<string>("");
    const { t: translation } = useTranslation();

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

            const mainDatabaseSearchURL = `${process.env.REACT_APP_DATABASE_URL}food
      .json?auth=${process.env.REACT_APP_DATABASE_SECRET}
      &orderBy="product_name_${selectedLanguage}"
      &equalTo=${encodedSearchQuery}&limitToFirst=5`;

            const mainDatabaseResponse = await axios.get(mainDatabaseSearchURL);

            let mainResults: TProduct[] = [];
            if (mainDatabaseResponse.data !== null) {
                mainResults = Object.values(mainDatabaseResponse.data);
            }

            // Check if the token exists before querying the user-specific database
            let userResults: TProduct[] = [];
            if (token) {
                const usersFoodSearchURL = `${process.env.REACT_APP_DATABASE_URL}usersFood/${userTokenUID}
        .json?auth=${process.env.REACT_APP_DATABASE_SECRET}
        &orderBy="product_name_${selectedLanguage}"
        &equalTo=${encodedSearchQuery}`;
                const usersFoodDatabaseResponse = await axios.get(
                    usersFoodSearchURL
                );

                if (usersFoodDatabaseResponse.data !== null) {
                    userResults = Object.values(usersFoodDatabaseResponse.data);
                }
            }

            // Combine mainResults and userResults
            const combinedResults = [...mainResults, ...userResults];

            setSearchResults(combinedResults);
        } catch (error) {
            console.log(error);
            setSearchResults([]);
        } finally {
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
        <div className="w-100">
            <h1 className="m-3 text-center">
                {translation(
                    "page.calories.look-through-our-food-product-database"
                )}
            </h1>
            <form onSubmit={handleSearch}>
                <div className="input-group mb-3 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={translation(
                            "page.calories.type-name-of-the-product-here..."
                        )}
                        aria-label={translation(
                            "page.calories.type-name-of-the-product-here..."
                        )}
                        aria-describedby="button-addon2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="submit"
                        id="button-addon2">
                        {translation("common.find")}
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
            {searchResults.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                    {translation("page.calories.no-data-found")}{" "}
                    <a
                        href={`https://www.google.com/search?q=${searchQuery}+kcal`}
                        className="alert-link"
                        target="_blank"
                        rel="noopener noreferrer">
                        {translation("page.calories.visit-this-page")}
                    </a>{" "}
                    {translation("page.calories.to-look-for-more-products")}
                </div>
            ) : null}
        </div>
    );
}
