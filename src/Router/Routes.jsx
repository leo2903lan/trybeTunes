import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/trybeTunes/" component={ Login } />
        <Route path="/trybeTunes/search" component={ Search } />
        <Route path="/trybeTunes/favorites" component={ Favorites } />
        <Route path="/trybeTunes/profile/edit" component={ ProfileEdit } />
        <Route path="/trybeTunes/profile" component={ Profile } />
        <Route
          path="/trybeTunes/album/:id"
          render={ (props) => <Album { ...props } /> }
        />
        <Route path="" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
