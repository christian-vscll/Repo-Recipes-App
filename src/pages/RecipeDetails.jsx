import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkDetails from '../component/DrinkDetails';
import MealDetails from '../component/MealDetails';
import MyContext from '../context/MyContext';
import { fetchById } from '../tests/helper/API';
import '../App.css';

function RecipeDetails() {
  const { recipeDetail, setRecipeDetail } = useContext(MyContext);
  const path = useHistory().location.pathname;

  useEffect(() => {
    const fetch = async (param) => {
      setRecipeDetail(await fetchById(param));
    };

    fetch(path);
  }, [path, setRecipeDetail]);

  return (
    <div>
      {
        recipeDetail !== undefined && (
          path.includes('/meals')
            ? <MealDetails />
            : <DrinkDetails />
        )
      }
    </div>
  );
}

export default RecipeDetails;
