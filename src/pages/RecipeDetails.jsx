import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails() {
  const path = useHistory().location.pathname;

  const fetchAPI = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    // let id;
    let URL;
    const sliceCaseMeals = -5;
    const sliceCaseDrinks = -6;
    // console.log(path);
    if (path.includes('/meals')) {
      // id = path.slice(sliceCaseMeals);
      // console.log('inclui meals');
      URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseMeals)}`;
    } else {
      // console.log('inclui drinks');
      // id = path.slice(sliceCaseDrinks);
      URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseDrinks)}`;
    }

    fetchAPI(URL);
  }, [path]);

  return (
    <div>
      RecipeDetails
    </div>
  );
}

export default RecipeDetails;
