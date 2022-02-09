import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import MapMarkerImg from '../../images/map-marker.svg';
import { Container } from './styles';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <img src={MapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </Container>
  );
};

export default Sidebar;
