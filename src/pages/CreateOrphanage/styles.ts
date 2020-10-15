import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`;

export const Form = styled(UnForm)`
  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  overflow: hidden;
  margin: 64px auto;
  padding: 64px 80px;
  width: 700px;

  fieldset {
    border: 0;

    & + fieldset {
      margin-top: 80px;
    }

    legend {
      border-bottom: 1px solid #d3e2e5;
      color: #5c8599;
      font-size: 32px;
      font-weight: 700;
      line-height: 34px;
      margin-bottom: 40px;
      padding-bottom: 24px;
      width: 100%;
    }
  }
`;

export const InputBlock = styled.div`
  & + InputBlock {
    margin-top: 24px;
  }

  label {
    color: #8fa7b3;
    display: flex;
    line-height: 24px;
    margin-bottom: 8px;

    span {
      color: #8fa7b3;
      font-size: 14px;
      line-height: 24px;
      margin-left: 24px;
    }
  }

  input,
  textarea {
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    color: #5c8599;
    outline: none;
    width: 100%;
  }

  input {
    height: 64px;
    padding: 0 16px;
  }

  textarea {
    line-height: 28px;
    min-height: 120px;
    max-height: 240px;
    padding: 16px;
    resize: vertical;
  }
`;

export const NewImage = styled.button`
  background: #f5f8fa;
  border: 1px dashed #96d2f0;
  border-radius: 20px;
  cursor: pointer;
  height: 64px;
  width: 100%;
`;

export const ButtonSelect = styled.button`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    color: #5c8599;
    cursor: pointer;
    height: 64px;

    &.active {
      background: #edfff6;
      border: 1px solid #a1e9c5;
      color: #37c77f;
    }

    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }

    &:last-child {
      border-left: 0;
      border-radius: 0 20px 20px 0;
    }
  }
`;

export const ConfirmButton = styled.button`
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

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`;
