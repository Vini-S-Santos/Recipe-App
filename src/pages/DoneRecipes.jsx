import { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareButton from '../images/shareIcon.svg';
import styles from './styles/DoneRecipes.module.css';

const twoThousand = 2000;

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes') || '[]'),
  );
  const [linkCopied, setLinkCopied] = useState('');

  function whenClickShareBtn(e) {
    setLinkCopied('Link copied!');
    copy(`http://localhost:3000/${e.target.id}`);
    setTimeout(() => {
      setLinkCopied('');
    }, twoThousand);
  }

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
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes') || '[]'));
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
          <button
            id={ `${element.type}s/${element.id}` }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareButton }
            onClick={ whenClickShareBtn }
          >
            <img
              id={ `${element.type}s/${element.id}` }
              src={ shareButton }
              alt="Share button"
            />
            {linkCopied}
          </button>
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
