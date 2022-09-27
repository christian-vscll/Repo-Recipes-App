const verifyLocalStorage = (recipeId) => {
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({}));
  }
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipes[recipeId] === null || recipes[recipeId] === undefined) {
    recipes[recipeId] = {};
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
  }
};

const saveStatusTrue = (recipeId, key) => {
  verifyLocalStorage(recipeId);
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  recipes[recipeId][key] = true;
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
};

const saveStatusFalse = (recipeId, key) => {
  verifyLocalStorage(recipeId);
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  recipes[recipeId][key] = false;
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
};

const getStatus = (recipeId) => {
  verifyLocalStorage(recipeId);
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return recipes[recipeId];
};

export default {
  saveStatusTrue,
  saveStatusFalse,
  getStatus,
};
