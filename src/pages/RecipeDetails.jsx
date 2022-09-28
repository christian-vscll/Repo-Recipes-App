import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkOrMealDetail from '../component/DrinkOrMealDetail';
import MyContext from '../context/MyContext';

function RecipeDetails() {
  const {
    recipeDetail, setRecipeDetail,
  } = useContext(MyContext);

  const path = useHistory().location.pathname;

  useEffect(() => {
    let URL;
    const sliceCaseMeals = -5;
    const sliceCaseDrinks = -6;
    if (path.includes('/meals')) URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseMeals)}`;
    else URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path.slice(sliceCaseDrinks)}`;

    const fetchAPI = async (param) => {
      const response = await fetch(param);
      const json = await response.json();
      setRecipeDetail(json);
    };
    fetchAPI(URL);
  }, [path, setRecipeDetail]);

  console.log('recipe', recipeDetail);
  // console.log('recipe', recipeDetail.meals[0]);

  return (
    <div>
      {/* {
        recipeDetail !== undefined && (
          path.includes('/meals') ? renderMeal() : renderDrink()
        )
      } */}
      {
        recipeDetail !== undefined && <DrinkOrMealDetail path={ path } />
      }
    </div>
  );
}

export default RecipeDetails;
