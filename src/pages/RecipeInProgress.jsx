import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../component/Header';
import IngredientList from '../component/IngredientsList';
import drinksIdRequest from '../services/drinksFetch';
import mealsIdRequest from '../services/mealsFetch';

function RecipeInProgress() {
  const { id: recipeId } = useParams();
  const { location: { pathname } } = useHistory();
  const [urlImg, setUrlImg] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [Ingredient, setIngredient] = useState({});
  const [instructions, setInstructions] = useState('');
  useEffect(() => {
    const fetchDrinkWithId = async () => {
      // const drink = await drinksIdRequest('13899' || recipeId);
      const drink = await drinksIdRequest(recipeId);
      setUrlImg(drink.strDrinkThumb);
      setCategory(drink.strCategory);
      setName(drink.strDrink);
      setInstructions(drink.strInstructions);
      const ingredientesKeys = Object.keys(drink)
        .filter((value) => value.includes('strIngredient'));
      const ingredientesObj = {};
      ingredientesKeys.forEach((key, index) => {
        ingredientesObj[drink[key]] = drink[`strMeasure${index + 1}`];
      });
      setIngredient(ingredientesObj);
    };
    const fetchMealsWithId = async () => {
      const meals = await mealsIdRequest(recipeId);
      // const meals = { ...mealsMock };
      // console.log(meals);
      setUrlImg(meals.strMealThumb);
      setCategory(meals.strCategory);
      setName(meals.strMeal);
      setInstructions(meals.strInstructions);
      const ingredientesKeys = Object.keys(meals)
        .filter((value) => value.includes('strIngredient'));
      const ingredientesObj = {};
      ingredientesKeys.forEach((key, index) => {
        ingredientesObj[meals[key]] = meals[`strMeasure${index + 1}`];
      });
      setIngredient(ingredientesObj);
    };

    if (pathname.includes('/drink')) {
      fetchDrinkWithId();
    } else {
      fetchMealsWithId();
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="receita">
        <img
          src={ urlImg }
          alt="recipe"
          data-testid="recipe-photo"
          width="200px"
        />
        <h3 data-testid="recipe-title">{ name || 'sem titulo'}</h3>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Fav</button>
        <p data-testid="recipe-category">{category}</p>
        <div data-testid="instructions">
          {instructions}
        </div>
        <IngredientList ingredients={ Ingredient } />
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
