import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { renderIngredients } from '../tests/helper/API';
import imgShare from '../images/shareIcon.svg';
import '../App.css';

const copy = require('clipboard-copy');

function MealDetails() {
  const {
    recipeDetail,
    recomendations,
    setRecomendations,
    copied,
    setCopied,
  } = useContext(MyContext);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    idMeal,
  } = recipeDetail.meals[0];
  console.log(recipeDetail.meals[0]);

  const history = useHistory();

  const urlVideo = strYoutube.replace('watch?v=', 'embed/');

  const minSlice1 = 9;
  const maxSlice1 = 29;
  const minSlice2 = 29;
  const maxSlice2 = 49;
  const arrayIngredients = Object.values(
    recipeDetail.meals[0],
  ).slice(minSlice1, maxSlice1);
  const ingredients = arrayIngredients.filter((elem) => elem !== '' && elem !== null);
  const arrayMeasures = Object.values(
    recipeDetail.meals[0],
  ).slice(minSlice2, maxSlice2);
  const measures = arrayMeasures.filter((elem) => elem !== '' && elem !== null);

  const finalIngredients = [];
  for (let index = 0; index < measures.length; index += 1) {
    const obj = {
      measure: measures[index], ingredient: ingredients[index],
    };
    finalIngredients.push(obj);
  }

  const verifyDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null || doneRecipes.length === 0) return false;
    return doneRecipes.some((recipe) => recipe.name === strMeal);
  };

  const verifyRecipeInProgress = () => {
    const mealsInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (mealsInProgress === null || mealsInProgress.length === 0) return;
    if (
      mealsInProgress !== null && mealsInProgress.length !== 0
    ) return Object.keys(mealsInProgress.meals).includes(idMeal);
  };

  useEffect(() => {
    const fetchRecomendations = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const json = await response.json();
      const maxSlice = 6;
      setRecomendations(json.drinks.slice(0, maxSlice));
    };
    fetchRecomendations();
  }, [setRecomendations]);

  useEffect(() => { setCopied(); }, [setCopied]);
  console.log(history);

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMealThumb }
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <h2 data-testid="recipe-category">{ strCategory }</h2>
      <div>
        <h4> Ingredientes </h4>
        {
          renderIngredients(finalIngredients)
        }
      </div>
      <div>
        <h4> Instruções </h4>
        <span data-testid="instructions">{ strInstructions }</span>
      </div>
      <iframe
        data-testid="video"
        title={ strMeal }
        src={ urlVideo }
      />
      <h4> Recommended </h4>
      <div className="div-recomendations-um">
        {
          recomendations !== undefined && (
            recomendations.map((drink, index) => (
              <div key={ index } className="div-recomendations-dois">
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-recommendation-card` }
                  className="recomendation-card"
                />
                <h3 data-testid={ `${index}-recommendation-title` }>
                  { drink.strDrink }
                </h3>
              </div>
            ))
          )
        }
      </div>
      {
        copied !== undefined && (
          <div className="copied-div">
            <h3>Link copied!</h3>
          </div>
        )
      }
      {
        verifyDoneRecipes() === false && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="bt-start-recipe"
            onClick={ () => history.push(`/meals/${idMeal}/in-progress`) }
          >
            {
              verifyRecipeInProgress() === true
                ? 'Continue Recipe'
                : 'Start Recipe'
            }
          </button>
        )
      }
      <div className="div-footer">
        <button
          className="share"
          type="button"
          data-testid="share-btn"
          onClick={ async () => {
            copy(`http://localhost:3000${history.location.pathname}`);
            await setCopied(true);
          } }
        >
          <img src={ imgShare } alt="Share Icon" className="share-icon" />
        </button>
        <button className="favorite" type="button" data-testid="favorite-btn">
          Favorite
        </button>
      </div>
    </div>
  );
}

export default MealDetails;
