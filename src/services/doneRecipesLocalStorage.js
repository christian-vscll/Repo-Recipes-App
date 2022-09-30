const verifyLS = () => {
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
};

const addDoneRecipe = (recipe) => {
  verifyLS();
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const newRecipes = [...recipes, recipe];
  localStorage.setItem('doneRecipes', JSON.stringify(newRecipes));
};

const getAllDoneRecipe = () => {
  verifyLS();
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return recipes;
};

export default {
  addDoneRecipe,
  getAllDoneRecipe,
};
