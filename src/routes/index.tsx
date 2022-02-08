import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';

import Landing from '../pages/Landing';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';

export default () => {
  return (
    <Routes>
      <Route element={Landing} path="/" />
      <Route element={OrphanagesMap} path="/app" />
      <Route element={CreateOrphanage} path="/orphanages/create" />
      <Route element={Orphanage} path="/orphanages/:id" />
    </Routes>
  );
};
