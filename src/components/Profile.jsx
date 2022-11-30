import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const history = useHistory();
  const email = () => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (emailLocalStorage) {
      return emailLocalStorage.email;
    }
    return '';
  };

  return (
    <div>
      <Header />
      <p data-testid="profile-email">
        {
          email()
        }
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
