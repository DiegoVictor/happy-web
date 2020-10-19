import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import Routes from './routes';
import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Theme />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
