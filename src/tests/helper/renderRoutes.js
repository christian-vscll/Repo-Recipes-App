import DrinkDetails from '../../component/DrinkDetails';
import MealDetails from '../../component/MealDetails';

export default function renderOnRecipeDetails(param, path) {
  if (param !== undefined) return path.includes('/meals') ? <MealDetails /> : <DrinkDetails />;
}
