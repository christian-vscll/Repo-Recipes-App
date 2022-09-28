import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../App.css';

function DrinkOrMealDetail(param) {
  const {
    recipeDetail,
  } = useContext(MyContext);

  const renderIngredients = (ingredientes) => {
    console.log(ingredientes);
    return ingredientes.map((elem, index) => (
      <div key={ index }>
        <span data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${elem.ingredient} - ${elem.measure}`}
        </span>
        <br />
      </div>
    ));
  };

  const renderMeal = () => {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
    } = recipeDetail.meals[0];

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

    // console.log(finalIngredients);

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
      </div>
    );
  };

  const renderDrink = () => {
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

    console.log(arrayIngredients);

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
  };

  const { path } = param;
  return path.includes('/meals') ? renderMeal() : renderDrink();
}

export default DrinkOrMealDetail;
