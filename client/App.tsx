import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import '../public/style.scss';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      {/* <Route path="/" exact component={} /> */}
    </Switch>
    // <h1>Hello from App.tsx</h1>
  );
}

export default App;
