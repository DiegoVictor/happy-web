import styled from 'styled-components';

export const Container = styled.aside`
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
