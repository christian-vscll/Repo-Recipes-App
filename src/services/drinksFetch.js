// const MEALIDREQUEST = 'www.themealdb.com/api/json/v1/1/lookup.php?i=52772';

const drinksIdRequest = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
};

export default drinksIdRequest;
