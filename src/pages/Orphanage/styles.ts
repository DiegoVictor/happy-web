import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  main {
    flex: 1;
  }
`;

export const Aside = styled.aside`
  align-items: center;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 32px 24px;
  position: fixed;

  img {
    width: 48px;
  }

  footer {
    a,
    button {
      align-items: center;
      background: #12afcb;
      border: 0;
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      height: 48px;
      justify-content: center;
      transition: background-color 0.2s;
      width: 48px;

      &:hover {
        background: #17d6eb;
      }
    }
  }
`;

export const Details = styled.div`
  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  margin: 64px auto;
  overflow: hidden;
  width: 700px;

  > img {
    object-fit: cover;
    height: 300px;
    width: 100%;
  }
`;

export const Images = styled.div`
  column-gap: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 16px 40px 0;

  button {
    background: none;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    height: 88px;
    opacity: 0.6;
    overflow: hidden;
    outline: none;

    &.active {
      opacity: 1;
    }

    img {
      object-fit: cover;
      height: 88px;
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  padding: 80px;

  h1 {
    color: #4d6f80;
    font-size: 54px;
    line-height: 54px;
    margin-bottom: 8px;
  }

  p {
    color: #5c8599;
    line-height: 28px;
    margin-top: 24px;
  }

  hr {
    background: #d3e2e6;
    border: 0;
    height: 1px;
    margin: 64px 0;
    width: 100%;
  }

  h2 {
    color: #4d6f80;
    font-size: 36px;
    line-height: 46px;
  }

  button {
    &.contact-button {
      align-items: center;
      background: #3cdc8c;
      border: 0;
      border-radius: 20px;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      font-weight: 800;
      height: 64px;
      justify-content: center;
      margin-top: 64px;
      transition: background-color 0.2s;
      width: 100%;

      &:hover {
        background: #36cf82;
      }

      svg {
        margin-right: 16px;
      }
    }
  }
`;

export const OpenDetails = styled.div`
  column-gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 24px;

  div {
    border-radius: 20px;
    line-height: 28px;
    padding: 32px 24px;

    &.hour {
      background: linear-gradient(149.97deg, #e6f7fb 8.13%, #ffffff 92.67%);
      border: 1px solid #b3dae2;
      color: #5c8599;
    }

    &.open-on-weekends {
      background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
      border: 1px solid #a1e9c5;
      color: #37c77f;
    }

    svg {
      display: block;
      margin-bottom: 20px;
    }
  }
`;

export const MapContainer = styled.div`
  background: #e6f7fb;
  border: 1px solid #b3dae2;
  border-radius: 20px;
  margin-top: 64px;

  footer {
    padding: 20px 0;
    text-align: center;

    a {
      line-height: 24px;
      color: #0089a5;
      text-decoration: none;
    }
  }

  .leaflet-container {
    border-bottom: 1px solid #dde3f0;
    border-radius: 20px;
  }
`;
