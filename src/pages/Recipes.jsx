import React from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

function Recipes() {
  // const history = useHistory();
  return (
    <div>
      <Header />
      Recipes
      {/* {console.log(history.location.pathname)} */}
      <Footer />
    </div>
  );
}

export default Recipes;
