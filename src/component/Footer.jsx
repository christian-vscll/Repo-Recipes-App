import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <img
        src={ mealIcon }
        alt="mealIcon"
        data-testid="meals-bottom-btn"
      />
      <img
        src={ drinkIcon }
        alt="drinkIcon"
        data-testid="drinks-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
