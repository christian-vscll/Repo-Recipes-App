import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NUMBER_OF_ITEMS_NEEDED = 12;
const NUMBER_OF_CATEGORIES_NEEDED = 5;

function RecipeCard() {
  const history = useHistory();
  const isMeals = history.location.pathname === '/meals';

  const [originalMeals, setOriginalMeals] = useState([]);
  const [renderedMeals, setRenderedMeals] = useState([]);
  const [originalDrinks, setOriginalDrinks] = useState([]);
  const [renderedDrinks, setRenderedDrinks] = useState([]);
  const [originalMealsCategories, setOriginalMealsCategories] = useState([]);
  const [originalDrinksCategories, setOriginalDrinksCategories] = useState([]);
  const [mealCategorySelected, setMealCategorySelected] = useState('');
  const [mealCategorySelectedArray, setMealCategorySelectedArray] = useState([]);
  const [drinkCategorySelected, setDrinkCategorySelected] = useState('');
  const [drinkCategorySelectedArray, setDrinkCategorySelectedArray] = useState([]);
  const [toggleOn, setToggleOn] = useState(false);

  const getMeals = async () => {
    const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataMeals = await responseMeals.json();
    const { meals } = dataMeals;
    const splitFoodData = meals.slice(0, NUMBER_OF_ITEMS_NEEDED);
    setOriginalMeals(splitFoodData);
    setRenderedMeals(splitFoodData);
    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDrinks = await responseDrinks.json();
    const { drinks } = dataDrinks;
    const splitDrinkData = drinks.slice(0, NUMBER_OF_ITEMS_NEEDED);
    setOriginalDrinks(splitDrinkData);
    setRenderedDrinks(splitDrinkData);
  };

  const getMealsCategories = async () => {
    const responseMealsCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const dataMealsCategories = await responseMealsCategories.json();
    const { meals } = dataMealsCategories;
    setOriginalMealsCategories(meals.slice(0, NUMBER_OF_CATEGORIES_NEEDED));
    const responseDrinksCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const dataDrinksCategories = await responseDrinksCategories.json();
    const { drinks } = dataDrinksCategories;
    setOriginalDrinksCategories(drinks.slice(0, NUMBER_OF_CATEGORIES_NEEDED));
  };

  useEffect(() => {
    getMeals();
    getMealsCategories();
  }, []);

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

  const handleAllButton = (string) => {
    if (string === 'food') setRenderedMeals(originalMeals);
    else setRenderedDrinks(originalDrinks);
  };

  const getMealCategoryArray = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    setMealCategorySelectedArray(data);
    const { meals } = data;
    setRenderedMeals(meals.slice(0, NUMBER_OF_ITEMS_NEEDED));
  };

  const handleFoodsCatButtons = (category) => {
    if (!toggleOn) {
      setMealCategorySelected(category);
      getMealCategoryArray(category);
    } else {
      handleAllButton('food');
    }
    setToggleOn((prevState) => !prevState);
  };

  const getDrinkCategoryArray = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    setDrinkCategorySelectedArray(data);
    const { drinks } = data;
    setRenderedDrinks(drinks.slice(0, NUMBER_OF_ITEMS_NEEDED));
    console.log(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  };

  const handleDrinksCatButtons = async (category) => {
    if (!toggleOn) {
      setDrinkCategorySelected(category);
      getDrinkCategoryArray(category);
    } else {
      handleAllButton('drinks');
    }
    setToggleOn((prevState) => !prevState);
  };

  // função que vai criar os botões de categoria dinamicamente
  const categorieButtonCreator = (categories, string) => (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => handleAllButton(string) }
      >
        All
      </button>
      { categories.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ index }
          type="button"
          className="recipe-card-buttons"
          onClick={ isMeals
            ? () => handleFoodsCatButtons(strCategory)
            : () => handleDrinksCatButtons(strCategory) }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );

  return (
    <div className="recipe-card-div">
      <h1>RECIPE CARDS</h1>
      { isMeals ? foodCardsCreator(renderedMeals) : drinkCardsCreator(renderedDrinks) }
      { isMeals
        ? categorieButtonCreator(originalMealsCategories, 'food')
        : categorieButtonCreator(originalDrinksCategories, 'drinks') }
    </div>
  );
}

export default RecipeCard;
