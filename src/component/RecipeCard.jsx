import React from 'react';
import mockFoodData from '../helpers/mockFoodData';

function RecipeCard() {
  const NUMBER_OF_OBJECTS_NEEDED = 12;
  const splitData = mockFoodData.slice(0, NUMBER_OF_OBJECTS_NEEDED);
  console.log(splitData);

  const foodCardsCreator = (data) => (
    data.map(({
      idMeal,
      strMeal,
      strMealThumb,
    }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
        <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
        <img
          data-testid={ `${index}-card-img` }
          className="recipe-card-img"
          src={ strMealThumb }
          alt={ `${strMeal}` }
        />
      </div>
    ))
  );

  return (
    <div>
      <h1>RECIPE CARDS</h1>
      { foodCardsCreator(splitData) }
    </div>
  );
}

export default RecipeCard;
