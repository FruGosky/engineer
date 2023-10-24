import React, { useState } from 'react';
import axios from 'axios';

export default function SearchFood() {
  const [searchTerm, setSearchTerm] = useState('');
	const [foodData, setFoodData] = useState(null);
	



	
	
  const handleSearch = async () => {
    try {
	const databaseURL = 'https://engineer-81890-default-rtdb.europe-west1.firebasedatabase.app/'
      // Send a GET request to the Firebase Realtime Database
      const response = await axios.get(`https://engineer-81890-default-rtdb.europe-west1.firebasedatabase.app.json?orderBy="product_name_pl"&equalTo="${searchTerm}"&auth=${process.env.REACT_APP_API_KEY}`);

      // Update the state with the retrieved data
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <h1 className="m-3 text-center">
        Look through our food product database
      </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type product name (e.g., Sylt Lingon)..."
          aria-label="Type product name here..."
          aria-describedby="button-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      {foodData && (
        <div>
          {/* Render the retrieved data here */}
          <pre>{JSON.stringify(foodData, null, 2)}</pre>
        </div> ) }
    
    </div>
  );
}

function getDatabase() {
	throw new Error('Function not implemented.');
}

