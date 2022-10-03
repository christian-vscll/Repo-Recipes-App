import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';
import userLocalStorage from '../services/userLocalStorage';

function Profile() {
  const email = userLocalStorage.getEmail();
  const history = useHistory();

  const logoutButton = () => {
    userLocalStorage.logout();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <p>
        <span>Email:</span>
        <span data-testid="profile-email">{email}</span>
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutButton }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
