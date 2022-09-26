import React from 'react';
import { useHistory } from 'react-router-dom';
import mockFoodData from '../helpers/mockFoodsData';
import mockDrinkData from '../helpers/mockDrinksData';

function RecipeCard() {
  const history = useHistory();

  const NUMBER_OF_ITEMS_NEEDED = 12;
  const splitFoodData = mockFoodData.slice(0, NUMBER_OF_ITEMS_NEEDED);
  // console.log('Food Data');
  // console.log(splitFoodData);

  const splitDrinkData = mockDrinkData.slice(0, NUMBER_OF_ITEMS_NEEDED);
  // console.log('Drink Data');
  // console.log(splitDrinkData);

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

  const drinkCardsCreator = (data) => (
    data.map(({
      idDrink,
      strDrink,
      strDrinkThumb,
    }, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
        <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
        <img
          data-testid={ `${index}-card-img` }
          className="recipe-card-img"
          src={ strDrinkThumb }
          alt={ `${strDrink}` }
        />
      </div>
    ))
  );

  const isMeals = history.location.pathname === '/meals';

  return (
    <div className="recipe-card-div">
      <h1>RECIPE CARDS</h1>
      { isMeals ? foodCardsCreator(splitFoodData) : drinkCardsCreator(splitDrinkData) }
    </div>
  );
}

export default RecipeCard;
