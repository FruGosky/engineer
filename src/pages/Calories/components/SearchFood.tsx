import React, { useState } from 'react';
import axios from '../../../axios';

export default function SearchFood() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = () => {
    // Build the URL with query parameters to filter by 'product_name_pl'
    const searchURL = `${process.env.REACT_APP_DATABASE_URL}.json?auth=${process.env.REACT_APP_DATABASE_SECRET}&orderBy="product_name_pl"&equalTo="${searchQuery}"`;
	console.log(searchQuery);
    axios
      .get(searchURL)
      .then((response) => {
        // Assuming the response is an object with product data
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setSearchResults(null); // Clear previous results on error  
      });
  };
  

  return (
    <div>
      <h1 className="m-3 text-center">Look through our food product database</h1>
      <div className="input-group mb-3">
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

      {searchResults && (
        <div>
          <h2>Search Results</h2>
          {/* Display search results as needed */}
          <div>{JSON.stringify(searchResults["1"], null, 2)}</div>
        </div>
      )}  
    </div>
  );
}
