import { useState } from 'react';
import { Link } from 'react-router-dom';
// import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import styles from './styles/DoneRecipes.module.css';
import ShareButton from '../components/ShareButton';
// const twoThousand = 2000;

function DoneRecipes({ history: { location: { pathname } } }) {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes') || '[]'),
  );
  // const [linkCopied, setLinkCopied] = useState('');

  // function whenClickShareBtn(e) {
  //   setLinkCopied('Link copied!');
  //   copy(`http://localhost:3000/${e.target.id}`);
  //   setTimeout(() => {
  //     setLinkCopied('');
  //   }, twoThousand);
  // }
  console.log(doneRecipes);
  function filterMeals() {
    setDoneRecipes(
      JSON.parse(localStorage.getItem('doneRecipes')).filter(
        (element) => element.type === 'meal',
      ),
    );
  }

  function fliterDrinks() {
    setDoneRecipes(
      JSON.parse(localStorage.getItem('doneRecipes')).filter(
        (element) => element.type === 'drink',
      ),
    );
  }

  function filterAll() {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }

  return (
    <div>
      <Header />
      <h1> DoneRecipes </h1>
      <button type="button" data-testid="filter-by-all-btn" onClick={ filterAll }>
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn" onClick={ filterMeals }>
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ fliterDrinks }>
        Drinks
      </button>

      {doneRecipes.map((element, index) => (
        <div key={ element.id } id={ element.id }>
          <Link to={ `${element.type}s/${element.id}` }>
            <img
              className={ styles.eIMG }
              src={ element.image }
              alt={ element.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {element.type === 'meal'
              ? `${element.nationality} - ${element.category}`
              : element.alcoholicOrNot}
          </p>
          <Link to={ `${element.type}s/${element.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>
          <ShareButton
            index={ index }
            pathname={ pathname }
            type={ element.type }
            id={ element.id }
          />
          {element.tags.map((tag) => (
            <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag + index }>
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DoneRecipes;
