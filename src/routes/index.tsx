import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';

import Landing from '../pages/Landing';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';

export default () => {
  return (
    <Switch>
      <Route component={Landing} path="/" exact />
      <Route component={OrphanagesMap} path="/app" />
      <Route component={CreateOrphanage} path="/orphanages/create" />
      <Route component={Orphanage} path="/orphanages/:id" />
    </Switch>
  );
};
