import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';

export default () => {
  return (
    <Switch>
      <Route component={Landing} path="/" exact />
      <Route component={OrphanagesMap} path="/app" />
    </Switch>
  );
};
