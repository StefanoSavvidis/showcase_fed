import React from 'react';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const Propagator = withRouter(RoutePropagator);

import Pokedex from './Pokedex';
import Home from './Home';
import CreateProduct from './routes/Pokemon';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://sdks.shopifycdn.com/polaris/2.2.0/polaris.min.css"
        />
        <Propagator />
        <Switch>
          <Route exact path="/" component={Pokedex} />
          <Route exact path="/mine" component={Home} />
          <Route exact path="/:id" component={CreateProduct} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
