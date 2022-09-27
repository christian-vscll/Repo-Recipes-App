export const saveEmail = (email) => localStorage.setItem('user', JSON.stringify({ email }));

export const saveMealsToken = () => localStorage.setItem('mealsToken', 1);

export const saveDrinksToken = () => localStorage.setItem('drinksToken', 1);
