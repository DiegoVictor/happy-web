import styled from 'styled-components';

import LandingImg from '../../images/landing.svg';

export const Container = styled.div`
  align-items: center;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export const Content = styled.div`
  align-items: flex-start;
  background: url(${LandingImg}) no-repeat 80% center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  max-height: 680px;
  max-width: 1100px;
  position: relative;
  width: 100%;

  main {
    max-width: 350px;

    h1 {
      font-size: 76px;
      font-weight: 900;
      line-height: 70px;
    }

    p {
      font-size: 24px;
      margin-top: 40px;
      line-height: 34px;
    }
  }
`;

export const Location = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 34px;
  position: absolute;
  right: 0px;
  text-align: right;
  top: 0px;

  strong {
    font-weight: 800;
  }
`;

export const EnterButton = styled.a`
  align-items: center;
  background-color: #ffd666;
  border-radius: 30px;
  bottom: 0px;
  display: flex;
  height: 80px;
  justify-content: center;
  position: absolute;
  right: 0px;
  transition: background-color 0.2s;
  width: 80px;

  &:hover {
    background-color: #96feff;
  }
`;
