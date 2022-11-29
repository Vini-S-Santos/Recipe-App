import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
