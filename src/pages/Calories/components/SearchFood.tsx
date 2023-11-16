import { FormEvent, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/database";
import FoundProducts from "./FoundProducts";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import { TProduct, TProductSelect } from "../../../types";
import { useTranslation } from "react-i18next";
import {
    getDatabase,
    ref,
    query,
    orderByChild,
    equalTo,
    limitToFirst,
    get,
} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default function SearchFood(props: TProductSelect) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userTokenUID, setUserTokenUID] = useState<string>("");
    const { t: translation } = useTranslation();
    const [showGoogleQuery, setShowGoogleQuery] = useState<boolean>(false);
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

            const db = getDatabase(app);
            const mainDatabaseRef = ref(db, "food");

            const mainDatabaseResponse = await query(
                mainDatabaseRef,
                orderByChild(`product_name_${selectedLanguage}`),
                equalTo(searchQuery),
                limitToFirst(5)
            );
            const mainSnapshot = await get(mainDatabaseResponse);

            const mainResults: TProduct[] = [];
            mainSnapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                mainResults.push(childData);
            });

            // Check if the token exists before querying the user-specific database
            let userResults: TProduct[] = [];
            if (token) {
                const usersFoodRef = ref(db, `usersFood/${userTokenUID}`);

                const usersFoodDatabaseResponse = await query(
                    usersFoodRef,
                    orderByChild(`product_name_${selectedLanguage}`),
                    equalTo(searchQuery)
                );
                const usersSnapshot = await get(usersFoodDatabaseResponse);

                usersSnapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    userResults.push(childData);
                });
            }

            // Combine mainResults and userResults
            const combinedResults = [...mainResults, ...userResults];
            setSearchResults(combinedResults);
            combinedResults.length === 0
                ? setShowGoogleQuery(true)
                : setShowGoogleQuery(false);
        } catch (error) {
            console.error(error);
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
            {showGoogleQuery ? (
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
