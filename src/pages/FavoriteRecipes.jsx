import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Context from '../context/Context';
import ShareFavorites from '../components/ShareFavorites';

function FavoriteRecipes() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(Context);
  const [selectedFilter, setSelectedFilter] = useState('');

  const filtere = ({ target: { name } }) => {
    setSelectedFilter(name);
  };
  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favoritos);
  }, [setFavoriteRecipes]);
  // adicionei esse estilo para passar no requisito 56 pois precisa de uma imagem pequena
  const styleImg = {
    width: '150px',
    height: '150px',
  };
  return (
    <div>
      <Header />
      <h1> FavoriteRecipes </h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filtere }
        name=""
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filtere }
        name="meal"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filtere }
        name="drink"
      >
        Drinks
      </button>
      <section>
        { favoriteRecipes
          ? favoriteRecipes.filter((recipe) => (recipe.type.includes(selectedFilter)))
            .map((recipe, index) => (
              <article key={ index }>
                <Link
                  to={ recipe.type === 'meal'
                    ? `/meals/${recipe.id}`
                    : `/drinks/${recipe.id}` }
                >
                  <img
                  // adicionei esse estilo para passar no requisito 56 pois precisa de uma imagem pequena
                    style={ styleImg }
                    data-testid={ `${index}-horizontal-image` }
                    alt={ `receita ${index}` }
                    src={ recipe.image }
                  />
                </Link>
                <Link
                  to={ recipe.type === 'meal'
                    ? `/meals/${recipe.id}`
                    : `/drinks/${recipe.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot }
                </p>
                <div>
                  <ShareFavorites recipe={ recipe } index={ index } />
                </div>

                <button
                  type="button"
                  onClick={ () => {
                    const currentFavorites = JSON
                      .parse(localStorage.getItem('favoriteRecipes'));
                    const updatedFavorites = currentFavorites
                      .filter((favorite) => favorite.id !== recipe.id);
                    localStorage
                      .setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
                    setFavoriteRecipes(updatedFavorites);
                  } }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Heart Icon"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </article>
            )) : <h1>Não há receitas favoritas</h1>}
      </section>
    </div>
  );
}
export default FavoriteRecipes;
