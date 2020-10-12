import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import LogoImg from '../../images/logo.svg';
import { Container, Content, Location, EnterButton } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Location>
          <strong>Mogi Mirim</strong>
          <span>São Paulo</span>
        </Location>

        <EnterButton to="/app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </EnterButton>
      </Content>
    </Container>
  );
};

export default Landing;
