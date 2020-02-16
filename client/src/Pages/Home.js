import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  /*****************************************************
    SETTING THE HOOK STATE
    ******************************************************/
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  /*****************************************************
     CALLING API WITH USE EFFECT
     *****************************************************/
  useEffect(() => {
    const getApiData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/restaurants/search/miami/${query}`
      );
      setApiData(result.data);
    };
    getApiData();
  }, [query]);
  /***************************************************
       GETTING THE USER INPUT
       ***************************************************/
  const handleChange = event => {
    setSearch(event.target.value);
  };
  /***************************************************
      EDIT THE SEARCH WHEN THE USER SUBMIT
      ***************************************************/
  const handleSubmit = event => {
    event.preventDefault();
    setQuery(search);
  };
  /***************************************************
       THE ACTION RETURN WITH THE USER INFO
       ***************************************************/

  return (
    <>
      <div id="background-img">
        <h1 style={{ backgroundColor: 'blue', padding: 15 }}>Munchies</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Restaurants"
            onChange={handleChange}
          />
        </form>
        <div>
          <ul>
            {apiData.map(item => {
              return <p>{item.name}</p>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
