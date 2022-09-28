import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { renderIngredients } from '../tests/helper/API';

function DrinkDetails() {
  const {
    recipeDetail,
  } = useContext(MyContext);

  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = recipeDetail.drinks[0];

  const minSlice1 = 21;
  const maxSlice1 = 36;
  const minSlice2 = 36;
  const maxSlice2 = 52;
  const arrayIngredients = Object.values(recipeDetail.drinks[0])
    .slice(minSlice1, maxSlice1);
  const ingredients = arrayIngredients.filter((elem) => elem !== '' && elem !== null);
  const arrayMeasures = Object.values(recipeDetail.drinks[0])
    .slice(minSlice2, maxSlice2);
  const measures = arrayMeasures.filter((elem) => elem !== '' && elem !== null);

  const finalIngredients = [];
  for (let index = 0; index < measures.length; index += 1) {
    const obj = {
      measure: measures[index], ingredient: ingredients[index],
    };
    finalIngredients.push(obj);
  }

  const recomendations = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
  };
  recomendations();

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrinkThumb }
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <h4 data-testid="recipe-category">{ strAlcoholic }</h4>
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
    </div>
  );
}

export default DrinkDetails;
