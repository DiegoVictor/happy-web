import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100vw;

  aside {
    background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 80px;
    width: 440px;

    h2 {
      font-size: 40px;
      font-weight: 800;
      line-height: 42px;
      margin-top: 64px;
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }

    footer {
      display: flex;
      flex-direction: column;
      line-height: 24px;

      strong {
        font-weight: 800;
      }
    }
  }
`;

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;

  > div {
    height: 100%;
  }
`;

export const AddOrphanage = styled(Link)`
  align-items: center;
  background-color: #15c3d6;
  border-radius: 20px;
  bottom: 40px;
  display: flex;
  height: 64px;
  justify-content: center;
  position: absolute;
  right: 40px;
  transition: background-color 0.2s;
  width: 64px;
  z-index: 2;

  &:hover {
    background-color: #17d6eb;
  }
`;
