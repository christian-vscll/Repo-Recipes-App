import React from 'react';
import Footer from '../component/Footer';
import RecipeCard from '../component/RecipeCard';
import Header from '../component/Header';

function Recipes() {
  // const history = useHistory();
  return (
    <div>
      <Header />
      <RecipeCard />
      <Footer />
    </div>
  );
}

export default Recipes;
