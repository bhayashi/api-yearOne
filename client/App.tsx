import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import DetailsContainer from './containers/DetailsContainer';
import '../public/style.scss';

function App() {
  return (
    <Switch>
      <Route path="/details/:imdbID" component={DetailsContainer} />
      <Route path="/" exact component={HomeContainer} />
    </Switch>
  );
}

export default App;
