import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

let receita;
function RecipeDetails() {
  const path = useHistory().location.pathname;

  const fetchAPI = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    receita = json;
  };

  useEffect(() => {
    let URL;
    const sliceCaseMeals = -5;
    const sliceCaseDrinks = -6;
    if (path.includes('/meals')) URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseMeals)}`;
    else URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseDrinks)}`;

    fetchAPI(URL);
    console.log(receita);
  }, [path]);

  return (
    <div>
      {
        receita !== undefined && <h1>{receita}</h1>
      }
      RecipeDetails
    </div>
  );
}

export default RecipeDetails;
