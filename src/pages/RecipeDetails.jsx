import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchById } from '../tests/helper/API';
import renderOnRecipeDetails from '../tests/helper/renderRoutes';
import '../App.css';

function RecipeDetails() {
  const { recipeDetail, setRecipeDetail } = useContext(MyContext);
  const path = useHistory().location.pathname;

  useEffect(() => {
    const fetchAux = async (param) => {
      setRecipeDetail(await fetchById(param));
    };

    fetchAux(path);
  }, [path, setRecipeDetail]);

  return <div>{ renderOnRecipeDetails(recipeDetail, path) }</div>;
}

export default RecipeDetails;
