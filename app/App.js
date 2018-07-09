import React from 'react';
import {Switch, Route, withRouter} from 'react-router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const Propagator = withRouter(RoutePropagator);

import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import Home from './Home';
export default function() {
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
        <Route exact path="/:id" component={Pokemon} />
      </Switch>
    </React.Fragment>
  );
}
